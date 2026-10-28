// Table cleaner: remove duplicate rows (by all or chosen columns), empty rows and columns, trim cells.
// Works on pasted cells (from Excel/Sheets: tab separated) or a CSV/TSV file. Pure local string processing.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  function detect(text) {
    var line = text.split(/\r?\n/).find(function (l) { return l.trim() !== ''; }) || '';
    var best = ',', bestN = 0;
    ['\t', ';', ',', '|'].forEach(function (d) {
      var n = 0, q = false;
      for (var i = 0; i < line.length; i++) {
        if (line[i] === '"') q = !q;
        else if (!q && line[i] === d) n++;
      }
      if (n > bestN) { best = d; bestN = n; }
    });
    return best;
  }

  function parse(text, delim) {
    var rows = [], row = [], cell = '', q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; } else q = false;
        } else cell += c;
      } else if (c === '"' && cell === '') q = true;
      else if (c === delim) { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += c;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  function serialize(rows, delim) {
    return rows.map(function (r) {
      return r.map(function (v) {
        return v.indexOf(delim) > -1 || /["\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(delim);
    }).join('\n');
  }

  function clean(rows, o) {
    var removedDup = 0, removedEmpty = 0, removedCols = 0;
    var width = rows.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
    rows = rows.map(function (r) { var c = r.slice(); while (c.length < width) c.push(''); return c; });
    if (o.trim) rows = rows.map(function (r) { return r.map(function (v) { return v.trim(); }); });
    var header = o.header && rows.length ? [rows.shift()] : [];
    if (o.emptyRows) {
      var before = rows.length;
      rows = rows.filter(function (r) { return r.some(function (v) { return v.trim() !== ''; }); });
      removedEmpty = before - rows.length;
    }
    if (o.dupes) {
      var cols = o.cols.length ? o.cols : null, seen = Object.create(null), before2 = rows.length;
      rows = rows.filter(function (r) {
        var parts = (cols ? cols.map(function (i) { return r[i] == null ? '' : r[i]; }) : r);
        var key = JSON.stringify(parts);
        if (o.ignoreCase) key = key.toLowerCase();
        if (seen[key]) return false;
        seen[key] = 1;
        return true;
      });
      removedDup = before2 - rows.length;
    }
    var all = header.concat(rows);
    if (o.emptyCols && all.length) {
      var keep = [];
      for (var c = 0; c < width; c++) if (all.some(function (r) { return r[c].trim() !== ''; })) keep.push(c);
      removedCols = width - keep.length;
      all = all.map(function (r) { return keep.map(function (c) { return r[c]; }); });
    }
    return { rows: all, removedDup: removedDup, removedEmpty: removedEmpty, removedCols: removedCols };
  }

  var input = h('textarea', { id: 'tb-in', class: 'tool__text', rows: 12, spellcheck: 'false', wrap: 'off', placeholder: T.placeholder });
  var output = h('textarea', { id: 'tb-out', class: 'tool__text', rows: 12, spellcheck: 'false', wrap: 'off', readonly: true });
  var stats = h('p', { class: 'tool__stats', 'aria-live': 'polite' });
  var boxes = {};
  var grid = h('div', { class: 'tool__options' });
  [['header', false], ['dupes', true], ['ignoreCase', false], ['emptyRows', true], ['emptyCols', false], ['trim', true]].forEach(function (o) {
    var cb = h('input', { type: 'checkbox', id: 'tb-' + o[0], checked: o[1] });
    boxes[o[0]] = cb;
    cb.addEventListener('change', run);
    grid.append(h('label', { class: 'check', for: 'tb-' + o[0] }, cb, h('span', null, T[o[0]])));
  });
  var colsInput = h('input', { type: 'text', id: 'tb-cols', class: 'tool__input', placeholder: T.colsPlaceholder, autocomplete: 'off' });
  colsInput.addEventListener('input', run);
  var delimInfo = h('span', { class: 'muted' });
  var fileName = 'table.csv';

  function parseCols() {
    var out = [];
    colsInput.value.split(/[,;\s]+/).filter(Boolean).forEach(function (p) {
      var m = /^(\d+)(?:-(\d+))?$/.exec(p);
      if (!m) return;
      var a = +m[1], b = m[2] ? +m[2] : a;
      for (var i = a; i <= b && i < a + 500; i++) if (i >= 1) out.push(i - 1);
    });
    return out;
  }

  function run() {
    var text = input.value;
    if (!text.trim()) { output.value = ''; stats.textContent = ''; delimInfo.textContent = ''; return; }
    var delim = detect(text);
    delimInfo.textContent = T.delimiter + ': ' + (delim === '\t' ? 'Tab' : delim);
    var rows = parse(text, delim);
    var res = clean(rows, { header: boxes.header.checked, dupes: boxes.dupes.checked, ignoreCase: boxes.ignoreCase.checked, emptyRows: boxes.emptyRows.checked, emptyCols: boxes.emptyCols.checked, trim: boxes.trim.checked, cols: parseCols() });
    output.value = serialize(res.rows, delim);
    stats.textContent = RO.fmt(T.stats, { a: rows.length, b: res.rows.length, dup: res.removedDup, empty: res.removedEmpty, cols: res.removedCols });
  }
  input.addEventListener('input', run);

  var file = RO.dropzone({
    accept: '.csv,.tsv,.txt,text/csv,text/plain,text/tab-separated-values', multiple: false, title: T.drop, hint: T.hint,
    onFiles: function (f) {
      fileName = f[0].name;
      f[0].text().then(function (t) { input.value = t.replace(/^﻿/, ''); run(); });
    },
  });

  var copyBtn = h('button', { type: 'button', class: 'btn btn--primary' }, T.copy);
  copyBtn.addEventListener('click', function () {
    RO.copy(output.value).then(function () {
      copyBtn.textContent = T.copied;
      setTimeout(function () { copyBtn.textContent = T.copy; }, 1500);
    });
  });

  RO.root.replaceChildren(
    file,
    h('p', { class: 'muted' }, T.or),
    grid,
    h('div', { class: 'tool__field' }, h('label', { class: 'tool__label', for: 'tb-cols' }, T.cols), colsInput, h('p', { class: 'muted' }, T.colsHint)),
    h('div', { class: 'tool__cols' },
      h('div', null, h('label', { class: 'tool__label', for: 'tb-in' }, T.input), input),
      h('div', null, h('label', { class: 'tool__label', for: 'tb-out' }, T.output), output)),
    h('p', { class: 'tool__stats' }, delimInfo),
    stats,
    h('div', { class: 'tool__actions' }, copyBtn,
      h('button', { type: 'button', class: 'btn', onclick: function () { RO.download(new Blob([output.value], { type: 'text/csv;charset=utf-8' }), RO.stripExt(fileName) + '-cleaned.' + (RO.ext(fileName) === 'tsv' ? 'tsv' : 'csv')); } }, T.download)),
  );
})();
