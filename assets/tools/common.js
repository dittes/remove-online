// Shared helpers for the browser tools. Everything runs locally: no uploads, no storage, no network
// (except loading this site's own model/library files). Dynamic text is always set with textContent.
(function () {
  var root = document.querySelector('[data-tool]');
  var RO = (window.RO = { root: root, t: {} });
  try {
    RO.t = JSON.parse(root.getAttribute('data-i18n') || '{}');
  } catch (e) {}

  /** Create an element: h('button', {class:'btn', onclick: fn}, 'text', childNode). */
  RO.h = function (tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs || {}) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return el;
  };

  RO.fmt = function (s, vars) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars && k in vars ? vars[k] : m;
    });
  };

  RO.size = function (n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  };

  RO.download = function (blob, name) {
    var url = URL.createObjectURL(blob);
    var a = RO.h('a', { href: url, download: name });
    document.body.append(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1500);
  };

  RO.copy = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta = RO.h('textarea', { class: 'visually-hidden' });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return Promise.resolve();
  };

  /** Drop zone + file picker. opts: {accept, multiple, title, hint, onFiles}. */
  RO.dropzone = function (opts) {
    var input = RO.h('input', { type: 'file', accept: opts.accept, multiple: opts.multiple, class: 'dropzone__input' });
    var zone = RO.h(
      'label',
      { class: 'dropzone' },
      input,
      RO.h('span', { class: 'dropzone__title' }, opts.title),
      RO.h('span', { class: 'dropzone__hint' }, opts.hint || ''),
    );
    var take = function (list) {
      var files = Array.prototype.slice.call(list || []);
      if (files.length) opts.onFiles(opts.multiple ? files : [files[0]]);
    };
    input.addEventListener('change', function () {
      take(input.files);
      input.value = '';
    });
    ['dragenter', 'dragover'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        zone.classList.add('is-over');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        zone.classList.remove('is-over');
      });
    });
    zone.addEventListener('drop', function (e) {
      take(e.dataTransfer && e.dataTransfer.files);
    });
    return zone;
  };

  RO.stripExt = function (name) {
    return name.replace(/\.[^.\\/]+$/, '');
  };
  RO.ext = function (name) {
    var m = /\.([^.\\/]+)$/.exec(name);
    return m ? m[1].toLowerCase() : '';
  };

  RO.notice = function (text, kind) {
    return RO.h('p', { class: 'notice' + (kind ? ' notice--' + kind : ''), role: 'status' }, text);
  };
})();
