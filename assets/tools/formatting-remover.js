// Formatting remover: rich text -> plain text. Pasting into a text box already drops fonts, colours and styles;
// the options also strip HTML tags (parsed inertly with DOMParser) and straighten typographic characters.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  function stripHtml(s) {
    if (!/<[a-z!\/][^>]*>/i.test(s)) return s;
    var doc = new DOMParser().parseFromString(s, 'text/html');
    doc.querySelectorAll('script,style,head,template').forEach(function (n) { n.remove(); });
    doc.querySelectorAll('br').forEach(function (n) { n.replaceWith('\n'); });
    doc.querySelectorAll('p,div,li,tr,h1,h2,h3,h4,h5,h6,blockquote').forEach(function (n) { n.append('\n'); });
    return (doc.body.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  var input = h('textarea', { id: 'fr-in', class: 'tool__text', rows: 10, spellcheck: 'false', placeholder: T.placeholder });
  var output = h('textarea', { id: 'fr-out', class: 'tool__text', rows: 10, spellcheck: 'false', readonly: true });
  var stats = h('p', { class: 'tool__stats', 'aria-live': 'polite' });
  var boxes = {}, grid = h('div', { class: 'tool__options' });
  [['html', true], ['quotes', false], ['dashes', false], ['bullets', false], ['spaces', true], ['nbsp', true]].forEach(function (o) {
    var cb = h('input', { type: 'checkbox', id: 'fr-' + o[0], checked: o[1] });
    boxes[o[0]] = cb;
    cb.addEventListener('change', run);
    grid.append(h('label', { class: 'check', for: 'fr-' + o[0] }, cb, h('span', null, T[o[0]])));
  });

  function run() {
    var s = input.value.replace(/\r\n?/g, '\n');
    if (boxes.html.checked) s = stripHtml(s);
    if (boxes.nbsp.checked) s = s.replace(/[   ]/g, ' ').replace(/[​-‍﻿]/g, '');
    if (boxes.quotes.checked) s = s.replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"');
    if (boxes.dashes.checked) s = s.replace(/[–—−]/g, '-').replace(/…/g, '...');
    if (boxes.bullets.checked) s = s.replace(/^[ \t]*[•●◦▪▫‣⁃·][ \t]*/gm, '- ');
    if (boxes.spaces.checked) s = s.replace(/[ \t]+$/gm, '').replace(/[ \t]{2,}/g, ' ');
    output.value = s;
    stats.textContent = input.value ? RO.fmt(T.stats, { a: input.value.length, b: s.length }) : '';
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
    h('div', { class: 'tool__cols' },
      h('div', null, h('label', { class: 'tool__label', for: 'fr-in' }, T.input), input),
      h('div', null, h('label', { class: 'tool__label', for: 'fr-out' }, T.output), output)),
    stats,
    h('div', { class: 'tool__actions' }, copyBtn,
      h('button', { type: 'button', class: 'btn', onclick: function () { RO.download(new Blob([output.value], { type: 'text/plain;charset=utf-8' }), 'plain-text.txt'); } }, T.download)),
  );
})();
