// Office document cleaner: blanks author, last-modified-by, title, company, manager and similar properties
// in .docx / .xlsx / .pptx (zip files with XML parts). Uses fflate (vendored). Runs locally.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;
  var dec = new TextDecoder('utf-8'), enc = new TextEncoder();

  // [part, tag, label key]
  var FIELDS = [
    ['docProps/core.xml', 'dc:creator', 'author'],
    ['docProps/core.xml', 'cp:lastModifiedBy', 'lastBy'],
    ['docProps/core.xml', 'dc:title', 'title'],
    ['docProps/core.xml', 'dc:subject', 'subject'],
    ['docProps/core.xml', 'cp:keywords', 'keywords'],
    ['docProps/core.xml', 'dc:description', 'comments'],
    ['docProps/core.xml', 'cp:category', 'category'],
    ['docProps/app.xml', 'Company', 'company'],
    ['docProps/app.xml', 'Manager', 'manager'],
    ['docProps/app.xml', 'HyperlinkBase', 'hyperlinkBase'],
  ];

  function read(xml, tag) {
    var m = new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + tag + '>').exec(xml);
    return m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
  }
  function blank(xml, tag) {
    return xml.replace(new RegExp('(<' + tag + '(?:\\s[^>]*)?>)[\\s\\S]*?(</' + tag + '>)', 'g'), '$1$2');
  }

  var list = h('ul', { class: 'tool__results' });
  var dates = h('input', { type: 'checkbox', id: 'of-dates' });
  var thumb = h('input', { type: 'checkbox', id: 'of-thumb', checked: true });

  function process(file) {
    var li = h('li', { class: 'tool__result' });
    list.prepend(li);
    if (!/\.(docx|xlsx|pptx)$/i.test(file.name)) {
      li.append(h('strong', null, file.name), RO.notice(T.unsupported, 'warning'));
      return;
    }
    file.arrayBuffer().then(function (buf) {
      var files;
      try { files = fflate.unzipSync(new Uint8Array(buf)); } catch (e) { throw new Error('zip'); }
      var found = [], parts = {};
      FIELDS.forEach(function (f) {
        if (!files[f[0]]) return;
        parts[f[0]] = parts[f[0]] || dec.decode(files[f[0]]);
        var v = read(parts[f[0]], f[1]);
        if (v) found.push([T[f[2]], v]);
        parts[f[0]] = blank(parts[f[0]], f[1]);
      });
      if (dates.checked && parts['docProps/core.xml']) {
        parts['docProps/core.xml'] = parts['docProps/core.xml'].replace(/(<dcterms:(?:created|modified)[^>]*>)[^<]*(<\/dcterms:(?:created|modified)>)/g, '$12000-01-01T00:00:00Z$2');
      }
      var out = {}, removedThumb = false;
      Object.keys(files).forEach(function (name) {
        if (thumb.checked && /^docProps\/thumbnail\./i.test(name)) { removedThumb = true; return; }
        out[name] = parts[name] ? enc.encode(parts[name]) : files[name];
      });
      // the thumbnail is referenced from _rels/.rels; drop that relationship too
      if (removedThumb && out['_rels/.rels']) {
        out['_rels/.rels'] = enc.encode(dec.decode(out['_rels/.rels']).replace(/<Relationship\s[^>]*thumbnail[^>]*\/>/gi, ''));
      }
      var bytes = fflate.zipSync(out, { level: 6 });
      var ext = RO.ext(file.name);
      var mime = { docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }[ext];
      var blob = new Blob([bytes], { type: mime });
      var name = RO.stripExt(file.name) + '-clean.' + ext;
      var tags = h('div', { class: 'tool__chips' });
      found.forEach(function (f) { tags.append(h('span', { class: 'tag' }, f[0] + ': ' + f[1])); });
      if (removedThumb) tags.append(h('span', { class: 'tag' }, T.thumbnail));
      if (!found.length && !removedThumb) tags.append(h('span', { class: 'muted' }, T.nothing));
      li.append.apply(li, [
        h('div', { class: 'tool__result-head' }, h('strong', null, file.name), h('span', { class: 'muted' }, RO.size(file.size) + ' → ' + RO.size(blob.size))),
        h('p', { class: 'tool__label' }, T.found),
        tags,
        h('p', { class: 'muted' }, T.limits),
        h('div', { class: 'tool__actions' }, h('button', { type: 'button', class: 'btn btn--primary', onclick: function () { RO.download(blob, name); } }, T.download + ' ' + name)),
      ]);
    }).catch(function () {
      li.append(h('strong', null, file.name), RO.notice(T.broken, 'error'));
    });
  }

  RO.root.replaceChildren(
    RO.dropzone({ accept: '.docx,.xlsx,.pptx', multiple: true, title: T.drop, hint: T.hint, onFiles: function (fs) { fs.forEach(process); } }),
    h('div', { class: 'tool__options' },
      h('label', { class: 'check', for: 'of-thumb' }, thumb, h('span', null, T.optThumb)),
      h('label', { class: 'check', for: 'of-dates' }, dates, h('span', null, T.optDates))),
    list,
  );
})();
