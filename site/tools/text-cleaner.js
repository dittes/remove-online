// Text cleaner: line breaks, empty lines, duplicates, spaces, invisible characters. Pure local string processing.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  var OPTIONS = ['joinLines', 'emptyLines', 'dupes', 'ignoreCase', 'trim', 'spaces', 'invisible'];
  var PRESETS = {
    lines: { joinLines: 1, spaces: 1 },
    duplicates: { dupes: 1 },
    empty: { emptyLines: 1 },
    spaces: { trim: 1, spaces: 1 },
    invisible: { invisible: 1 },
  };
  // Zero-width characters, BOM, soft hyphen, directional marks, other control characters (not tab/newline), NBSP -> space.
  var INVISIBLE = /[​-‏‪-‮⁠-⁤⁦-⁩﻿­᠎]/g;
  var CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

  function clean(text, o) {
    var removedDupes = 0;
    var s = text.replace(/\r\n?/g, '\n');
    if (o.invisible) s = s.replace(INVISIBLE, '').replace(CONTROL, '').replace(/[   ]/g, ' ');
    var lines = s.split('\n');
    if (o.trim) lines = lines.map(function (l) { return l.trim(); });
    if (o.spaces) lines = lines.map(function (l) { return l.replace(/[ \t]{2,}/g, ' '); });
    if (o.emptyLines) lines = lines.filter(function (l) { return l.trim() !== ''; });
    if (o.dupes) {
      var seen = Object.create(null);
      lines = lines.filter(function (l) {
        if (l.trim() === '') return true; // blank lines are handled by "remove empty lines"
        var k = o.ignoreCase ? l.toLowerCase() : l;
        if (seen[k]) {
          removedDupes++;
          return false;
        }
        seen[k] = 1;
        return true;
      });
    }
    if (o.joinLines) {
      // Merge consecutive text lines with a space; blank lines stay as paragraph breaks.
      var out = [], cur = [];
      lines.forEach(function (l) {
        if (l.trim() === '') {
          if (cur.length) out.push(cur.join(' '));
          cur = [];
          out.push('');
        } else cur.push(l.trim());
      });
      if (cur.length) out.push(cur.join(' '));
      lines = out;
    }
    return { text: lines.join('\n'), removedDupes: removedDupes };
  }

  var input = h('textarea', { id: 'tc-in', class: 'tool__text', rows: 12, spellcheck: 'false', placeholder: T.placeholder });
  var output = h('textarea', { id: 'tc-out', class: 'tool__text', rows: 12, spellcheck: 'false', readonly: true });
  var stats = h('p', { class: 'tool__stats', 'aria-live': 'polite' });
  var boxes = {};
  var grid = h('div', { class: 'tool__options' });
  OPTIONS.forEach(function (k) {
    var cb = h('input', { type: 'checkbox', id: 'tc-' + k });
    boxes[k] = cb;
    cb.addEventListener('change', run);
    grid.append(h('label', { class: 'check', for: 'tc-' + k }, cb, h('span', null, T[k])));
  });
  boxes.joinLines.checked = true;
  boxes.spaces.checked = true;

  function setPreset(name) {
    var p = PRESETS[name];
    if (!p) return;
    OPTIONS.forEach(function (k) { boxes[k].checked = !!p[k]; });
    run();
  }

  var presets = h('div', { class: 'tool__presets' }, h('span', { class: 'muted' }, T.presets));
  Object.keys(PRESETS).forEach(function (name) {
    presets.append(
      h('button', { type: 'button', class: 'chip', onclick: function () { setPreset(name); } }, T['p_' + name]),
    );
  });

  function run() {
    var o = {};
    OPTIONS.forEach(function (k) { o[k] = boxes[k].checked; });
    var res = clean(input.value, o);
    output.value = res.text;
    var count = function (s) { return s === '' ? 0 : s.split('\n').length; };
    var msg = RO.fmt(T.stats, { a: input.value.length, la: count(input.value), b: res.text.length, lb: count(res.text) });
    if (res.removedDupes) msg += ' · ' + RO.fmt(T.dupesRemoved, { n: res.removedDupes });
    stats.textContent = input.value ? msg : '';
  }
  input.addEventListener('input', run);

  var copyBtn = h('button', { type: 'button', class: 'btn btn--primary' }, T.copy);
  copyBtn.addEventListener('click', function () {
    RO.copy(output.value).then(function () {
      copyBtn.textContent = T.copied;
      setTimeout(function () { copyBtn.textContent = T.copy; }, 1500);
    });
  });
  var dlBtn = h('button', { type: 'button', class: 'btn', onclick: function () { RO.download(new Blob([output.value], { type: 'text/plain;charset=utf-8' }), 'cleaned.txt'); } }, T.download);
  var clearBtn = h('button', { type: 'button', class: 'btn', onclick: function () { input.value = ''; run(); input.focus(); } }, T.clear);

  RO.root.replaceChildren(
    presets,
    grid,
    h(
      'div',
      { class: 'tool__cols' },
      h('div', null, h('label', { class: 'tool__label', for: 'tc-in' }, T.input), input),
      h('div', null, h('label', { class: 'tool__label', for: 'tc-out' }, T.output), output),
    ),
    stats,
    h('div', { class: 'tool__actions' }, copyBtn, dlBtn, clearBtn),
  );

  // Deep links from the guides: #lines, #duplicates, #empty, #spaces, #invisible
  var hash = location.hash.slice(1);
  if (PRESETS[hash]) setPreset(hash);
})();
