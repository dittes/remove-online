// Background remover. Two modes, both local:
//  - "AI": U²-Net-small segmentation model (Apache-2.0) run by onnxruntime-web (WASM). Model and runtime are served from this site.
//  - "Colour": removes a chosen background colour (white, green screen, …) with a tolerance, flood-filling from the edges.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;
  var MAX = 3000; // longest side processed, to keep memory sane on phones
  var MODEL_SIZE = 320;

  var source = null; // canvas with the original pixels
  var result = null; // canvas with the cut-out
  var fileName = 'image';
  var session = null;
  var pick = [255, 255, 255];

  var preview = h('canvas', { class: 'bg__canvas', 'aria-label': T.previewLabel });
  var stage = h('div', { class: 'bg__stage checker', hidden: true }, preview);
  var status = h('div', { 'aria-live': 'polite' });
  var panel = h('div', { class: 'tool__panel', hidden: true });

  function setStatus(text, kind) {
    status.replaceChildren(text ? RO.notice(text, kind) : '');
  }

  // ---- loading the image ----------------------------------------------------------------
  function load(file) {
    setStatus(T.loading);
    fileName = RO.stripExt(file.name);
    createImageBitmap(file).then(function (bmp) {
      var scale = Math.min(1, MAX / Math.max(bmp.width, bmp.height));
      source = document.createElement('canvas');
      source.width = Math.max(1, Math.round(bmp.width * scale));
      source.height = Math.max(1, Math.round(bmp.height * scale));
      source.getContext('2d', { willReadFrequently: true }).drawImage(bmp, 0, 0, source.width, source.height);
      result = null;
      setStatus('');
      showPanel();
      draw(source);
    }).catch(function () {
      setStatus(T.badImage, 'error');
    });
  }

  function draw(canvas) {
    preview.width = canvas.width;
    preview.height = canvas.height;
    preview.getContext('2d').drawImage(canvas, 0, 0);
    stage.hidden = false;
  }

  // ---- AI mode --------------------------------------------------------------------------
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = h('script', { src: src });
      s.onload = resolve;
      s.onerror = reject;
      document.head.append(s);
    });
  }

  function getSession() {
    if (session) return Promise.resolve(session);
    setStatus(T.loadingModel);
    return (window.ort ? Promise.resolve() : loadScript('/assets/vendor/ort/ort.wasm.min.js'))
      .then(function () {
        ort.env.wasm.wasmPaths = '/assets/vendor/ort/';
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.proxy = false;
        return fetch('/assets/models/u2netp.onnx');
      })
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (buf) { return ort.InferenceSession.create(new Uint8Array(buf), { executionProviders: ['wasm'] }); })
      .then(function (s) { session = s; return s; });
  }

  function runAi() {
    return getSession().then(function (s) {
      setStatus(T.working);
      var small = document.createElement('canvas');
      small.width = small.height = MODEL_SIZE;
      var sctx = small.getContext('2d');
      sctx.drawImage(source, 0, 0, MODEL_SIZE, MODEL_SIZE);
      var px = sctx.getImageData(0, 0, MODEL_SIZE, MODEL_SIZE).data;
      var n = MODEL_SIZE * MODEL_SIZE, data = new Float32Array(3 * n), max = 1, i;
      for (i = 0; i < px.length; i += 4) max = Math.max(max, px[i], px[i + 1], px[i + 2]);
      var mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225];
      for (i = 0; i < n; i++) for (var c = 0; c < 3; c++) data[c * n + i] = (px[i * 4 + c] / max - mean[c]) / std[c];
      var feeds = {};
      feeds[s.inputNames[0]] = new ort.Tensor('float32', data, [1, 3, MODEL_SIZE, MODEL_SIZE]);
      return s.run(feeds).then(function (out) {
        var m = out[s.outputNames[0]].data, lo = Infinity, hi = -Infinity;
        for (i = 0; i < n; i++) { if (m[i] < lo) lo = m[i]; if (m[i] > hi) hi = m[i]; }
        var maskCanvas = document.createElement('canvas');
        maskCanvas.width = maskCanvas.height = MODEL_SIZE;
        var mctx = maskCanvas.getContext('2d');
        var img = mctx.createImageData(MODEL_SIZE, MODEL_SIZE);
        for (i = 0; i < n; i++) {
          var v = (m[i] - lo) / (hi - lo || 1);
          v = Math.min(1, Math.max(0, (v - 0.12) / 0.76)); // slightly harden the edge
          img.data[i * 4 + 3] = Math.round(v * 255);
        }
        mctx.putImageData(img, 0, 0);
        // scale the mask up to the photo size (smooth) and use it as alpha
        var big = document.createElement('canvas');
        big.width = source.width;
        big.height = source.height;
        var bctx = big.getContext('2d');
        bctx.imageSmoothingQuality = 'high';
        bctx.drawImage(maskCanvas, 0, 0, big.width, big.height);
        var alpha = bctx.getImageData(0, 0, big.width, big.height).data;
        var out2 = document.createElement('canvas');
        out2.width = big.width;
        out2.height = big.height;
        var octx = out2.getContext('2d');
        octx.drawImage(source, 0, 0);
        var pix = octx.getImageData(0, 0, out2.width, out2.height);
        for (var j = 3; j < pix.data.length; j += 4) pix.data[j] = alpha[j];
        octx.putImageData(pix, 0, 0);
        return out2;
      });
    });
  }

  // ---- colour mode ----------------------------------------------------------------------
  function runColour(tolerance, contiguous) {
    var w = source.width, hgt = source.height;
    var ctx = source.getContext('2d');
    var img = ctx.getImageData(0, 0, w, hgt);
    var d = img.data;
    var tol2 = Math.pow(tolerance * 4.42, 2); // 0..100 -> 0..~442 (max RGB distance)
    var match = function (i) {
      var dr = d[i] - pick[0], dg = d[i + 1] - pick[1], db = d[i + 2] - pick[2];
      return dr * dr + dg * dg + db * db <= tol2;
    };
    var clear = new Uint8Array(w * hgt);
    if (!contiguous) {
      for (var p = 0; p < w * hgt; p++) if (match(p * 4)) clear[p] = 1;
    } else {
      var queue = new Int32Array(w * hgt), head = 0, tail = 0;
      var push = function (p) {
        if (!clear[p] && match(p * 4)) { clear[p] = 1; queue[tail++] = p; }
      };
      for (var x = 0; x < w; x++) { push(x); push((hgt - 1) * w + x); }
      for (var y = 0; y < hgt; y++) { push(y * w); push(y * w + w - 1); }
      while (head < tail) {
        var q = queue[head++], qx = q % w;
        if (qx > 0) push(q - 1);
        if (qx < w - 1) push(q + 1);
        if (q >= w) push(q - w);
        if (q < w * (hgt - 1)) push(q + w);
      }
    }
    // soften the cut: pixels next to removed ones get half alpha
    var alpha = new Uint8Array(w * hgt).fill(255);
    for (var k = 0; k < w * hgt; k++) if (clear[k]) alpha[k] = 0;
    for (var yy = 1; yy < hgt - 1; yy++) {
      for (var xx = 1; xx < w - 1; xx++) {
        var idx = yy * w + xx;
        if (!clear[idx] && (clear[idx - 1] || clear[idx + 1] || clear[idx - w] || clear[idx + w])) alpha[idx] = 150;
      }
    }
    for (var m = 0; m < w * hgt; m++) d[m * 4 + 3] = alpha[m];
    var out = document.createElement('canvas');
    out.width = w;
    out.height = hgt;
    out.getContext('2d').putImageData(img, 0, 0);
    return Promise.resolve(out);
  }

  // ---- UI -------------------------------------------------------------------------------
  function hex(c) {
    return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
  }

  function sample(x, y) {
    var px = source.getContext('2d').getImageData(Math.max(0, Math.min(source.width - 1, x)), Math.max(0, Math.min(source.height - 1, y)), 1, 1).data;
    return [px[0], px[1], px[2]];
  }

  function showPanel() {
    var mode = 'ai';
    var modeAi = h('input', { type: 'radio', name: 'bg-mode', id: 'bg-ai', checked: true });
    var modeCol = h('input', { type: 'radio', name: 'bg-mode', id: 'bg-col' });
    var colorInput = h('input', { type: 'color', id: 'bg-color', value: '#ffffff', class: 'tool__color', 'aria-label': T.colour });
    var tolerance = h('input', { type: 'range', id: 'bg-tol', min: 1, max: 60, value: 18 });
    var contiguous = h('input', { type: 'checkbox', id: 'bg-cont', checked: true });
    var fillSel = h('select', { id: 'bg-fill', class: 'tool__input' },
      h('option', { value: 'none' }, T.fillNone), h('option', { value: '#ffffff' }, T.fillWhite), h('option', { value: '#000000' }, T.fillBlack));
    var colourBox = h('div', { class: 'tool__sub', hidden: true },
      h('p', { class: 'muted' }, T.colourHint),
      h('div', { class: 'tool__row' },
        h('label', { for: 'bg-color' }, T.colour), colorInput,
        h('button', { type: 'button', class: 'btn btn--sm', onclick: function () { pick = sample(0, 0); colorInput.value = hex(pick); } }, T.pickCorner)),
      h('label', { class: 'tool__label', for: 'bg-tol' }, T.tolerance), tolerance,
      h('label', { class: 'check', for: 'bg-cont' }, contiguous, h('span', null, T.contiguous)));
    var go = h('button', { type: 'button', class: 'btn btn--primary' }, T.remove);
    var dl = h('button', { type: 'button', class: 'btn', hidden: true }, T.download);
    pick = sample(0, 0);
    colorInput.value = hex(pick);

    function setMode(m) {
      mode = m;
      colourBox.hidden = m !== 'col';
    }
    modeAi.addEventListener('change', function () { setMode('ai'); });
    modeCol.addEventListener('change', function () { setMode('col'); });
    colorInput.addEventListener('input', function () {
      var v = colorInput.value;
      pick = [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)];
    });
    // Variant pages (white background / green screen) start in colour mode with sensible defaults.
    var preset = RO.root.getAttribute('data-preset');
    if (preset === 'white' || preset === 'green') {
      modeCol.checked = true;
      setMode('col');
      pick = preset === 'white' ? [255, 255, 255] : [0, 177, 64];
      tolerance.value = preset === 'white' ? 15 : 35;
      contiguous.checked = preset === 'white';
      colorInput.value = hex(pick);
    }
    preview.onclick = function (e) {
      if (mode !== 'col' || result) return;
      var r = preview.getBoundingClientRect();
      pick = sample(Math.floor((e.clientX - r.left) * (preview.width / r.width)), Math.floor((e.clientY - r.top) * (preview.height / r.height)));
      colorInput.value = hex(pick);
    };

    go.addEventListener('click', function () {
      go.disabled = true;
      dl.hidden = true;
      var job = mode === 'ai' ? runAi() : runColour(+tolerance.value, contiguous.checked);
      job.then(function (res) {
        result = res;
        draw(res);
        stage.classList.add('is-result');
        setStatus('');
        dl.hidden = false;
      }).catch(function (e) {
        console.error(e);
        setStatus(T.failed, 'error');
      }).then(function () { go.disabled = false; });
    });
    dl.addEventListener('click', function () {
      var canvas = result;
      if (fillSel.value !== 'none') {
        canvas = document.createElement('canvas');
        canvas.width = result.width;
        canvas.height = result.height;
        var c = canvas.getContext('2d');
        c.fillStyle = fillSel.value;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.drawImage(result, 0, 0);
      }
      canvas.toBlob(function (blob) { RO.download(blob, fileName + '-no-bg.png'); }, 'image/png');
    });
    var again = h('button', { type: 'button', class: 'btn btn--sm', onclick: function () {
      result = null;
      stage.classList.remove('is-result');
      dl.hidden = true;
      draw(source);
    } }, T.reset);

    panel.replaceChildren(
      h('div', { class: 'tool__modes', role: 'radiogroup', 'aria-label': T.mode },
        h('label', { class: 'check', for: 'bg-ai' }, modeAi, h('span', null, T.modeAi)),
        h('label', { class: 'check', for: 'bg-col' }, modeCol, h('span', null, T.modeColour))),
      colourBox,
      h('div', { class: 'tool__row' }, h('label', { for: 'bg-fill' }, T.fill), fillSel),
      h('div', { class: 'tool__actions' }, go, dl, again),
    );
    panel.hidden = false;
  }

  RO.root.replaceChildren(
    RO.dropzone({ accept: 'image/*', multiple: false, title: T.drop, hint: T.hint, onFiles: function (f) { load(f[0]); } }),
    status,
    panel,
    stage,
  );
})();
