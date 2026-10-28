// Vocal remover: classic centre-channel cancellation (L - R). Works when the voice is mixed to the centre.
// Optionally keeps the bass (low-passed mid signal) so the result is not thin. Decodes with the browser, writes a mono WAV.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;
  var buffer = null, fileName = 'audio';
  var result = null;

  function wav(samples, rate) {
    var n = samples.length, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    var w = function (o, s) { for (var i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    w(36, 'data'); v.setUint32(40, n * 2, true);
    for (var i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, samples[i])) * 32767, true);
    return new Blob([buf], { type: 'audio/wav' });
  }

  function process(keepBass, strength) {
    var L = buffer.getChannelData(0), R = buffer.getChannelData(1), n = L.length, rate = buffer.sampleRate;
    var out = new Float32Array(n);
    var a = 1 - Math.exp((-2 * Math.PI * 150) / rate), low = 0, peak = 0, i;
    for (i = 0; i < n; i++) {
      var side = (L[i] - R[i]) * 0.5;
      var mid = (L[i] + R[i]) * 0.5;
      low += a * (mid - low);
      // strength < 1 blends some of the original mid back in (less aggressive, keeps more of the music body)
      var s = side + (1 - strength) * (mid - low);
      out[i] = s + (keepBass ? low : 0);
      var abs = Math.abs(out[i]);
      if (abs > peak) peak = abs;
    }
    var gain = peak > 0 ? 0.95 / peak : 1;
    for (i = 0; i < n; i++) out[i] *= gain;
    return wav(out, rate);
  }

  var status = h('div', { 'aria-live': 'polite' });
  var panel = h('div', { class: 'tool__panel', hidden: true });
  var player = h('audio', { controls: true, class: 'audio__player', hidden: true });

  function load(file) {
    status.replaceChildren(RO.notice(T.loading));
    panel.hidden = true;
    player.hidden = true;
    fileName = RO.stripExt(file.name);
    file.arrayBuffer().then(function (buf) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx();
      return ctx.decodeAudioData(buf).then(function (b) { ctx.close(); return b; });
    }).then(function (b) {
      if (b.numberOfChannels < 2) { status.replaceChildren(RO.notice(T.mono, 'warning')); return; }
      buffer = b;
      status.replaceChildren();
      var mins = Math.floor(b.duration / 60), secs = Math.round(b.duration % 60);
      show(file.name + ' · ' + mins + ':' + ('0' + secs).slice(-2));
    }).catch(function () {
      status.replaceChildren(RO.notice(T.broken, 'error'));
    });
  }

  function show(title) {
    var bass = h('input', { type: 'checkbox', id: 'vr-bass', checked: true });
    var strength = h('input', { type: 'range', id: 'vr-str', min: 30, max: 100, value: 100 });
    var go = h('button', { type: 'button', class: 'btn btn--primary' }, T.remove);
    var dl = h('button', { type: 'button', class: 'btn', hidden: true }, T.download);
    go.addEventListener('click', function () {
      go.disabled = true;
      status.replaceChildren(RO.notice(T.working));
      setTimeout(function () {
        try {
          result = process(bass.checked, strength.value / 100);
          if (player.src) URL.revokeObjectURL(player.src);
          player.src = URL.createObjectURL(result);
          player.hidden = false;
          dl.hidden = false;
          status.replaceChildren();
        } catch (e) {
          status.replaceChildren(RO.notice(T.failed, 'error'));
        }
        go.disabled = false;
      }, 30);
    });
    dl.addEventListener('click', function () { if (result) RO.download(result, fileName + '-no-vocals.wav'); });
    panel.replaceChildren(
      h('p', null, h('strong', null, title)),
      h('label', { class: 'check', for: 'vr-bass' }, bass, h('span', null, T.keepBass)),
      h('label', { class: 'tool__label', for: 'vr-str' }, T.strength), strength,
      h('div', { class: 'tool__actions' }, go, dl),
    );
    panel.hidden = false;
  }

  RO.root.replaceChildren(
    RO.dropzone({ accept: 'audio/*,.mp3,.wav,.m4a,.flac,.ogg', multiple: false, title: T.drop, hint: T.hint, onFiles: function (f) { load(f[0]); } }),
    status,
    panel,
    player,
  );
})();
