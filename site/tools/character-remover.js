// Character remover: emoji, digits, letters, punctuation, accents, chosen characters, first/last N characters per line.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  var RULES = {
    emoji: function (s) { return s.replace(/(?![©®™])\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}️‍⃣]/gu, ''); },
    digits: function (s) { return s.replace(/\p{Nd}/gu, ''); },
    letters: function (s) { return s.replace(/\p{L}/gu, ''); },
    punct: function (s) { return s.replace(/\p{P}/gu, ''); },
    accents: function (s) { return s.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC'); },
    nonAscii: function (s) { return s.replace(/[^\x00-\x7F]/g, ''); },
  };
  var KEYS = ['emoji', 'digits', 'letters', 'punct', 'accents', 'nonAscii'];

  var input = h('textarea', { id: 'cr-in', class: 'tool__text', rows: 10, spellcheck: 'false', placeholder: T.placeholder });
  var output = h('textarea', { id: 'cr-out', class: 'tool__text', rows: 10, spellcheck: 'false', readonly: true });
  var stats = h('p', { class: 'tool__stats', 'aria-live': 'polite' });
  var boxes = {}, grid = h('div', { class: 'tool__options' });
  KEYS.forEach(function (k) {
    var cb = h('input', { type: 'checkbox', id: 'cr-' + k });
    boxes[k] = cb;
    cb.addEventListener('change', run);
    grid.append(h('label', { class: 'check', for: 'cr-' + k }, cb, h('span', null, T[k])));
  });
  var custom = h('input', { type: 'text', id: 'cr-custom', class: 'tool__input', placeholder: T.customPlaceholder, autocomplete: 'off', spellcheck: 'false' });
  var firstN = h('input', { type: 'number', id: 'cr-first', class: 'tool__input tool__num', min: 0, value: 0 });
  var lastN = h('input', { type: 'number', id: 'cr-last', class: 'tool__input tool__num', min: 0, value: 0 });
  [custom, firstN, lastN].forEach(function (el) { el.addEventListener('input', run); });

  function run() {
    var text = input.value;
    var lines = text.replace(/\r\n?/g, '\n').split('\n');
    var f = Math.max(0, parseInt(firstN.value, 10) || 0), l = Math.max(0, parseInt(lastN.value, 10) || 0);
    var chars = Array.from(custom.value);
    lines = lines.map(function (line) {
      var chs = Array.from(line);
      if (f || l) chs = chs.slice(f, l ? Math.max(f, chs.length - l) : undefined);
      var s = chs.join('');
      KEYS.forEach(function (k) { if (boxes[k].checked) s = RULES[k](s); });
      if (chars.length) { var set = {}; chars.forEach(function (c) { set[c] = 1; }); s = Array.from(s).filter(function (c) { return !set[c]; }).join(''); }
      return s;
    });
    output.value = lines.join('\n');
    stats.textContent = text ? RO.fmt(T.stats, { a: Array.from(text).length, b: Array.from(output.value).length }) : '';
  }
  input.addEventListener('input', run);

  var copyBtn = h('button', { type: 'button', class: 'btn btn--primary' }, T.copy);
  copyBtn.addEventListener('click', function () {
    RO.copy(output.value).then(function () {
      copyBtn.textContent = T.copied;
      setTimeout(function () { copyBtn.textContent = T.copy; }, 1500);
    });
  });

  RO.root.replaceChildren(
    grid,
    h('div', { class: 'tool__field' }, h('label', { class: 'tool__label', for: 'cr-custom' }, T.custom), custom),
    h('div', { class: 'tool__row' },
      h('label', { for: 'cr-first' }, T.first), firstN,
      h('label', { for: 'cr-last' }, T.last), lastN),
    h('p', { class: 'muted' }, T.nHint),
    h('div', { class: 'tool__cols' },
      h('div', null, h('label', { class: 'tool__label', for: 'cr-in' }, T.input), input),
      h('div', null, h('label', { class: 'tool__label', for: 'cr-out' }, T.output), output)),
    stats,
    h('div', { class: 'tool__actions' }, copyBtn,
      h('button', { type: 'button', class: 'btn', onclick: function () { input.value = ''; run(); input.focus(); } }, T.clear)),
  );
})();
