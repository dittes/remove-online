// Image metadata remover: lossless removal of EXIF/XMP/IPTC/comments from JPEG, PNG and WebP.
// The pixel data is copied byte for byte (no re-encoding, no quality loss). Runs locally.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  // ---- EXIF reader (just enough to tell the user what was inside) -----------------------------
  function readExif(b, start, end) {
    // b: Uint8Array, TIFF header at `start`
    var info = { gps: false, camera: '', date: '', software: '', orientation: 1 };
    try {
      var le = b[start] === 0x49;
      var dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
      var u16 = function (o) { return dv.getUint16(o, le); };
      var u32 = function (o) { return dv.getUint32(o, le); };
      var str = function (entryOff) {
        var count = u32(entryOff + 4);
        var off = count > 4 ? start + u32(entryOff + 8) : entryOff + 8;
        var s = '';
        for (var i = 0; i < count && off + i < end; i++) {
          var c = b[off + i];
          if (!c) break;
          s += String.fromCharCode(c);
        }
        return s.trim();
      };
      var ifd = start + u32(start + 4);
      var n = u16(ifd);
      var make = '', model = '';
      for (var i = 0; i < n; i++) {
        var e = ifd + 2 + i * 12;
        var tag = u16(e);
        if (tag === 0x8825) info.gps = true;
        else if (tag === 0x010f) make = str(e);
        else if (tag === 0x0110) model = str(e);
        else if (tag === 0x0132) info.date = str(e);
        else if (tag === 0x0131) info.software = str(e);
        else if (tag === 0x0112) info.orientation = u16(e + 8);
      }
      info.camera = (model.indexOf(make) === 0 ? model : (make + ' ' + model)).trim();
    } catch (err) {}
    return info;
  }

  function minimalOrientationExif(orientation) {
    // APP1 payload with only the Orientation tag, so rotated photos still display upright.
    return new Uint8Array([
      0x45, 0x78, 0x69, 0x66, 0, 0, 0x4d, 0x4d, 0, 0x2a, 0, 0, 0, 8,
      0, 1, 0x01, 0x12, 0, 3, 0, 0, 0, 1, 0, orientation, 0, 0, 0, 0, 0, 0,
    ]);
  }

  function concat(parts) {
    var total = 0;
    parts.forEach(function (p) { total += p.length; });
    var out = new Uint8Array(total), o = 0;
    parts.forEach(function (p) { out.set(p, o); o += p.length; });
    return out;
  }

  // ---- JPEG --------------------------------------------------------------------------------------
  function cleanJpeg(b) {
    if (b[0] !== 0xff || b[1] !== 0xd8) throw new Error('not jpeg');
    var found = { gps: false, camera: '', date: '', software: '', xmp: false, iptc: false, comment: false, orientation: 1 };
    var parts = [b.subarray(0, 2)], p = 2, keepOrientation = null;
    while (p + 4 <= b.length) {
      if (b[p] !== 0xff) break;
      var m = b[p + 1];
      if (m === 0xda || m === 0xd9) break; // start of scan: the rest is image data
      if (m === 0xff) { p++; continue; }
      if ((m >= 0xd0 && m <= 0xd7) || m === 0x01) { parts.push(b.subarray(p, p + 2)); p += 2; continue; }
      var len = (b[p + 2] << 8) | b[p + 3];
      var seg = b.subarray(p, p + 2 + len);
      var data = b.subarray(p + 4, p + 2 + len);
      var drop = false;
      if (m === 0xe1) {
        var head = String.fromCharCode.apply(null, data.subarray(0, 6));
        if (head.indexOf('Exif') === 0) {
          var x = readExif(b, p + 4 + 6, p + 2 + len);
          found.gps = found.gps || x.gps;
          found.camera = found.camera || x.camera;
          found.date = found.date || x.date;
          found.software = found.software || x.software;
          if (x.orientation > 1 && x.orientation <= 8) keepOrientation = x.orientation;
          drop = true;
        } else if (String.fromCharCode.apply(null, data.subarray(0, 28)).indexOf('http://ns.adobe.com/xap') === 0) {
          found.xmp = true;
          drop = true;
        }
      } else if (m === 0xed) {
        found.iptc = true;
        drop = true;
      } else if (m === 0xfe) {
        found.comment = true;
        drop = true;
      } else if (m === 0xec || m === 0xe3 || m === 0xe4) drop = true; // Ducky, Samsung/Meta, Picture Info
      if (!drop) parts.push(seg);
      p += 2 + len;
    }
    if (keepOrientation) {
      var payload = minimalOrientationExif(keepOrientation);
      var hdr = new Uint8Array([0xff, 0xe1, (payload.length + 2) >> 8, (payload.length + 2) & 255]);
      parts.splice(parts[1] && parts[1][1] === 0xe0 ? 2 : 1, 0, hdr, payload); // after JFIF (APP0) if present
      found.orientation = keepOrientation;
    }
    parts.push(b.subarray(p));
    return { bytes: concat(parts), found: found };
  }

  // ---- PNG ---------------------------------------------------------------------------------------
  function cleanPng(b) {
    var sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (var i = 0; i < 8; i++) if (b[i] !== sig[i]) throw new Error('not png');
    var found = { gps: false, camera: '', date: '', software: '', xmp: false, iptc: false, comment: false, orientation: 1 };
    var dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
    var parts = [b.subarray(0, 8)], p = 8;
    while (p + 12 <= b.length) {
      var len = dv.getUint32(p);
      var type = String.fromCharCode(b[p + 4], b[p + 5], b[p + 6], b[p + 7]);
      var chunk = b.subarray(p, p + 12 + len);
      if (type === 'eXIf') {
        var x = readExif(b, p + 8, p + 8 + len);
        found.gps = x.gps; found.camera = x.camera; found.date = x.date; found.software = x.software;
      } else if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {
        var key = String.fromCharCode.apply(null, b.subarray(p + 8, p + 8 + Math.min(len, 22)));
        if (key.indexOf('XML:com.adobe.xmp') === 0) found.xmp = true;
        else found.comment = true;
      }
      var drop = type === 'eXIf' || type === 'tEXt' || type === 'zTXt' || type === 'iTXt' || type === 'tIME';
      if (type === 'tIME' && !found.date) found.date = '•';
      if (!drop) parts.push(chunk);
      p += 12 + len;
      if (type === 'IEND') break;
    }
    return { bytes: concat(parts), found: found };
  }

  // ---- WebP --------------------------------------------------------------------------------------
  function cleanWebp(b) {
    var tag = function (o) { return String.fromCharCode(b[o], b[o + 1], b[o + 2], b[o + 3]); };
    if (tag(0) !== 'RIFF' || tag(8) !== 'WEBP') throw new Error('not webp');
    var found = { gps: false, camera: '', date: '', software: '', xmp: false, iptc: false, comment: false, orientation: 1 };
    var dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
    var parts = [b.subarray(0, 12)], p = 12;
    while (p + 8 <= b.length) {
      var type = tag(p), len = dv.getUint32(p + 4, true);
      var padded = len + (len & 1);
      var chunk = b.slice(p, Math.min(p + 8 + padded, b.length));
      if (type === 'EXIF') {
        var off = 8;
        if (tag(p + 8).indexOf('Exif') === 0) off = 14;
        var x = readExif(b, p + off, p + 8 + len);
        found.gps = x.gps; found.camera = x.camera; found.date = x.date; found.software = x.software;
      } else if (type === 'XMP ') found.xmp = true;
      else if (type === 'VP8X') chunk[8] &= ~(0x08 | 0x04); // clear the EXIF and XMP flags
      if (type !== 'EXIF' && type !== 'XMP ') parts.push(chunk);
      p += 8 + padded;
    }
    var out = concat(parts);
    new DataView(out.buffer).setUint32(4, out.length - 8, true);
    return { bytes: out, found: found };
  }

  var TYPES = {
    jpg: { fn: cleanJpeg, mime: 'image/jpeg' },
    jpeg: { fn: cleanJpeg, mime: 'image/jpeg' },
    png: { fn: cleanPng, mime: 'image/png' },
    webp: { fn: cleanWebp, mime: 'image/webp' },
  };

  // ---- UI ----------------------------------------------------------------------------------------
  var list = h('ul', { class: 'tool__results' });

  function chips(f) {
    var out = [];
    if (f.gps) out.push([T.gps, true]);
    if (f.camera) out.push([T.camera + ': ' + f.camera, false]);
    if (f.date) out.push([T.date + (f.date.length > 1 ? ': ' + f.date : ''), false]);
    if (f.software) out.push([T.software + ': ' + f.software, false]);
    if (f.xmp) out.push(['XMP', false]);
    if (f.iptc) out.push(['IPTC', false]);
    if (f.comment) out.push([T.comment, false]);
    return out;
  }

  function addResult(file) {
    var li = h('li', { class: 'tool__result' });
    list.prepend(li);
    var ext = RO.ext(file.name);
    var type = TYPES[ext];
    if (!type) {
      li.append(h('strong', null, file.name), RO.notice(T.unsupported, 'warning'));
      return;
    }
    file.arrayBuffer().then(function (buf) {
      var res;
      try {
        res = type.fn(new Uint8Array(buf));
      } catch (e) {
        li.append(h('strong', null, file.name), RO.notice(T.broken, 'error'));
        return;
      }
      var blob = new Blob([res.bytes], { type: type.mime });
      var name = RO.stripExt(file.name) + '-clean.' + (ext === 'jpeg' ? 'jpg' : ext);
      var found = chips(res.found);
      var tags = h('div', { class: 'tool__chips' });
      found.forEach(function (c) { tags.append(h('span', { class: 'tag' + (c[1] ? ' tag--warn' : '') }, c[0])); });
      if (!found.length) tags.append(h('span', { class: 'muted' }, T.nothing));
      li.append.apply(li, [
        h('div', { class: 'tool__result-head' },
          h('strong', null, file.name),
          h('span', { class: 'muted' }, RO.size(file.size) + ' → ' + RO.size(blob.size)),
        ),
        h('p', { class: 'tool__label' }, T.found),
        tags,
        res.found.orientation > 1 ? h('p', { class: 'muted' }, T.orientationKept) : null,
        h('div', { class: 'tool__actions' }, h('button', { type: 'button', class: 'btn btn--primary', onclick: function () { RO.download(blob, name); } }, T.download + ' ' + name)),
      ].filter(Boolean));
    });
  }

  RO.root.replaceChildren(
    RO.dropzone({ accept: '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp', multiple: true, title: T.drop, hint: T.hint, onFiles: function (files) { files.forEach(addResult); } }),
    list,
  );
})();
