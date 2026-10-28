// PDF page remover + metadata cleaner using pdf-lib (vendored, MIT). Runs locally.
// The result is built as a NEW document from the pages you keep (copyPages), so removed pages leave no trace in the file.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;
  var state = null; // {file, doc, count}

  function parseRanges(text, count) {
    var remove = {};
    var parts = text.split(/[,;\s]+/).filter(Boolean);
    for (var i = 0; i < parts.length; i++) {
      var m = /^(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(parts[i]);
      if (!m) return { error: RO.fmt(T.badRange, { x: parts[i] }) };
      var a = +m[1], b = m[2] ? +m[2] : a;
      if (a > b) { var t = a; a = b; b = t; }
      if (a < 1 || b > count) return { error: RO.fmt(T.outOfRange, { n: count }) };
      for (var k = a; k <= b; k++) remove[k - 1] = true;
    }
    return { remove: remove };
  }

  var panel = h('div', { class: 'tool__panel', hidden: true });
  var message = h('div', { 'aria-live': 'polite' });

  function showError(text) {
    message.replaceChildren(RO.notice(text, 'error'));
  }

  function load(file) {
    message.replaceChildren();
    panel.hidden = true;
    state = null;
    file.arrayBuffer().then(function (buf) {
      return PDFLib.PDFDocument.load(buf, { updateMetadata: false }).then(function (doc) {
        state = { file: file, doc: doc, count: doc.getPageCount() };
        render();
      });
    }).catch(function (err) {
      showError(/encrypt/i.test(String(err && err.message)) ? T.encrypted : T.broken);
    });
  }

  function metaLine(doc) {
    var bits = [];
    var add = function (label, v) { if (v) bits.push(label + ': ' + v); };
    try {
      add(T.mTitle, doc.getTitle());
      add(T.mAuthor, doc.getAuthor());
      add(T.mCreator, doc.getCreator());
      add(T.mProducer, doc.getProducer());
    } catch (e) {}
    return bits.length ? bits.join(' · ') : T.noMeta;
  }

  function render() {
    var range = h('input', { id: 'pp-range', type: 'text', class: 'tool__input', placeholder: T.rangePlaceholder, autocomplete: 'off', inputmode: 'text' });
    var meta = h('input', { type: 'checkbox', id: 'pp-meta', checked: RO.root.getAttribute('data-preset') === 'meta' });
    var go = h('button', { type: 'button', class: 'btn btn--primary' }, T.create);
    var out = h('div', { 'aria-live': 'polite' });

    go.addEventListener('click', function () {
      out.replaceChildren();
      var parsed = parseRanges(range.value.trim(), state.count);
      if (parsed.error) return out.replaceChildren(RO.notice(parsed.error, 'error'));
      var keep = [];
      for (var i = 0; i < state.count; i++) if (!parsed.remove[i]) keep.push(i);
      var removed = state.count - keep.length;
      if (!keep.length) return out.replaceChildren(RO.notice(T.allPages, 'error'));
      if (!removed && !meta.checked) return out.replaceChildren(RO.notice(T.nothingToDo, 'warning'));
      go.disabled = true;
      PDFLib.PDFDocument.create({ updateMetadata: false }).then(function (dst) {
        return dst.copyPages(state.doc, keep).then(function (pages) {
          pages.forEach(function (p) { dst.addPage(p); });
          if (!meta.checked) {
            var src = state.doc;
            try {
              if (src.getTitle()) dst.setTitle(src.getTitle());
              if (src.getAuthor()) dst.setAuthor(src.getAuthor());
              if (src.getSubject()) dst.setSubject(src.getSubject());
              if (src.getCreator()) dst.setCreator(src.getCreator());
            } catch (e) {}
          }
          return dst.save();
        });
      }).then(function (bytes) {
        var blob = new Blob([bytes], { type: 'application/pdf' });
        var name = RO.stripExt(state.file.name) + '-edited.pdf';
        out.replaceChildren(
          RO.notice(RO.fmt(T.done, { removed: removed, left: keep.length, size: RO.size(blob.size) }), null),
          h('div', { class: 'tool__actions' }, h('button', { type: 'button', class: 'btn btn--primary', onclick: function () { RO.download(blob, name); } }, T.download + ' ' + name)),
        );
      }).catch(function () {
        out.replaceChildren(RO.notice(T.broken, 'error'));
      }).then(function () { go.disabled = false; });
    });

    panel.replaceChildren(
      h('p', null, h('strong', null, state.file.name), ' · ', RO.fmt(T.pages, { n: state.count }), ' · ', RO.size(state.file.size)),
      h('p', { class: 'muted' }, metaLine(state.doc)),
      h('label', { class: 'tool__label', for: 'pp-range' }, T.rangeLabel),
      range,
      h('p', { class: 'muted' }, T.rangeHint),
      h('label', { class: 'check', for: 'pp-meta' }, meta, h('span', null, T.stripMeta)),
      h('div', { class: 'tool__actions' }, go),
      out,
    );
    panel.hidden = false;
    range.focus();
  }

  RO.root.replaceChildren(
    RO.dropzone({ accept: '.pdf,application/pdf', multiple: false, title: T.drop, hint: T.hint, onFiles: function (f) { load(f[0]); } }),
    message,
    panel,
  );
})();
