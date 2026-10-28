// Erasure request generator (GDPR Article 17). Builds the letter locally from the form; nothing is sent anywhere.
(function () {
  var RO = window.RO, h = RO.h, T = RO.t;

  var GROUNDS = ['unnecessary', 'consent', 'object', 'unlawful'];

  var L = {
    en: {
      name: 'English',
      subject: 'Request for erasure of personal data (Article 17 GDPR)',
      greeting: 'Dear Sir or Madam,',
      intro: 'I am writing to request that you erase, without undue delay, the personal data concerning me that you process, as described below.',
      data: 'Data concerned and where it appears:',
      ground: 'Ground for erasure:',
      grounds: {
        unnecessary: 'The personal data is no longer necessary for the purposes for which it was collected or processed (Article 17(1)(a) GDPR).',
        consent: 'I withdraw my consent, and there is no other legal ground for the processing (Article 17(1)(b) GDPR).',
        object: 'I object to the processing under Article 21 GDPR, and there are no overriding legitimate grounds for it (Article 17(1)(c) GDPR).',
        unlawful: 'The personal data has been processed unlawfully (Article 17(1)(d) GDPR).',
      },
      p1: 'If you have made this data public, please take reasonable steps to inform other controllers that process it that I have requested the erasure of any links to, copies or replications of it (Article 17(2) GDPR). Please also notify any recipients to whom you disclosed the data (Article 19 GDPR).',
      p2: 'Please confirm in writing that the data has been erased within one month of receiving this request (Article 12(3) GDPR). If you cannot comply fully or at all, please tell me why, and inform me of my right to lodge a complaint with a supervisory authority and to seek a judicial remedy.',
      p3: 'If you need to verify my identity, please tell me which information you need. I will provide only what is necessary.',
      close: 'Yours faithfully,',
    },
    de: {
      name: 'Deutsch',
      subject: 'Antrag auf Löschung personenbezogener Daten (Art. 17 DSGVO)',
      greeting: 'Sehr geehrte Damen und Herren,',
      intro: 'hiermit bitte ich Sie, die von Ihnen verarbeiteten personenbezogenen Daten, die mich betreffen, unverzüglich zu löschen. Die Einzelheiten finden Sie unten.',
      data: 'Betroffene Daten und Fundstelle:',
      ground: 'Löschungsgrund:',
      grounds: {
        unnecessary: 'Die personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder verarbeitet wurden, nicht mehr notwendig (Art. 17 Abs. 1 lit. a DSGVO).',
        consent: 'Ich widerrufe meine Einwilligung, und es gibt keine andere Rechtsgrundlage für die Verarbeitung (Art. 17 Abs. 1 lit. b DSGVO).',
        object: 'Ich widerspreche der Verarbeitung nach Art. 21 DSGVO, und es liegen keine vorrangigen berechtigten Gründe für sie vor (Art. 17 Abs. 1 lit. c DSGVO).',
        unlawful: 'Die personenbezogenen Daten wurden unrechtmäßig verarbeitet (Art. 17 Abs. 1 lit. d DSGVO).',
      },
      p1: 'Falls Sie die Daten öffentlich gemacht haben, bitte ich Sie, angemessene Maßnahmen zu treffen, um andere Verantwortliche, die sie verarbeiten, darüber zu informieren, dass ich die Löschung aller Links zu diesen Daten sowie von Kopien oder Replikationen verlangt habe (Art. 17 Abs. 2 DSGVO). Bitte unterrichten Sie auch alle Empfänger, denen Sie die Daten offengelegt haben (Art. 19 DSGVO).',
      p2: 'Bitte bestätigen Sie mir innerhalb eines Monats nach Eingang dieses Schreibens schriftlich, dass die Daten gelöscht wurden (Art. 12 Abs. 3 DSGVO). Können Sie dem Antrag ganz oder teilweise nicht nachkommen, teilen Sie mir bitte die Gründe mit und weisen Sie mich auf mein Recht hin, bei einer Aufsichtsbehörde Beschwerde einzulegen und gerichtlichen Rechtsschutz in Anspruch zu nehmen.',
      p3: 'Falls Sie meine Identität prüfen müssen, teilen Sie mir bitte mit, welche Angaben Sie benötigen. Ich übermittle nur das Erforderliche.',
      close: 'Mit freundlichen Grüßen',
    },
    cs: {
      name: 'Čeština',
      subject: 'Žádost o výmaz osobních údajů (čl. 17 GDPR)',
      greeting: 'Dobrý den,',
      intro: 'žádám Vás, abyste bez zbytečného odkladu vymazali osobní údaje, které se mě týkají a které zpracováváte, jak je popsáno níže.',
      data: 'Dotčené údaje a kde se nacházejí:',
      ground: 'Důvod výmazu:',
      grounds: {
        unnecessary: 'Osobní údaje již nejsou potřebné pro účely, pro které byly shromážděny nebo jinak zpracovány (čl. 17 odst. 1 písm. a) GDPR).',
        consent: 'Odvolávám svůj souhlas a neexistuje žádný jiný právní důvod pro zpracování (čl. 17 odst. 1 písm. b) GDPR).',
        object: 'Vznáším námitku proti zpracování podle čl. 21 GDPR a neexistují žádné převažující oprávněné důvody pro zpracování (čl. 17 odst. 1 písm. c) GDPR).',
        unlawful: 'Osobní údaje byly zpracovány protiprávně (čl. 17 odst. 1 písm. d) GDPR).',
      },
      p1: 'Pokud jste tyto údaje zveřejnili, žádám Vás, abyste přijali přiměřená opatření a informovali další správce, kteří je zpracovávají, že žádám o výmaz všech odkazů na tyto údaje a jejich kopií či replikací (čl. 17 odst. 2 GDPR). Informujte prosím také všechny příjemce, kterým jste údaje zpřístupnili (čl. 19 GDPR).',
      p2: 'Potvrďte mi prosím písemně do jednoho měsíce od doručení této žádosti, že byly údaje vymazány (čl. 12 odst. 3 GDPR). Pokud žádosti nemůžete vyhovět zcela nebo vůbec, sdělte mi důvody a poučte mě o právu podat stížnost u dozorového úřadu a právu na soudní ochranu.',
      p3: 'Pokud potřebujete ověřit moji totožnost, sdělte mi, jaké údaje požadujete. Poskytnu jen to, co je nezbytné.',
      close: 'S pozdravem',
    },
    pl: {
      name: 'Polski',
      subject: 'Wniosek o usunięcie danych osobowych (art. 17 RODO)',
      greeting: 'Szanowni Państwo,',
      intro: 'zwracam się z wnioskiem o niezwłoczne usunięcie dotyczących mnie danych osobowych, które Państwo przetwarzają, zgodnie z poniższym opisem.',
      data: 'Dane, których dotyczy wniosek, i miejsce ich publikacji:',
      ground: 'Podstawa usunięcia:',
      grounds: {
        unnecessary: 'Dane osobowe nie są już niezbędne do celów, w których zostały zebrane lub w inny sposób przetwarzane (art. 17 ust. 1 lit. a RODO).',
        consent: 'Cofam zgodę i nie istnieje inna podstawa prawna przetwarzania (art. 17 ust. 1 lit. b RODO).',
        object: 'Wnoszę sprzeciw wobec przetwarzania na podstawie art. 21 RODO i nie występują nadrzędne prawnie uzasadnione podstawy przetwarzania (art. 17 ust. 1 lit. c RODO).',
        unlawful: 'Dane osobowe były przetwarzane niezgodnie z prawem (art. 17 ust. 1 lit. d RODO).',
      },
      p1: 'Jeżeli upublicznili Państwo te dane, proszę o podjęcie rozsądnych kroków w celu poinformowania innych administratorów, którzy je przetwarzają, że wnoszę o usunięcie wszelkich linków do tych danych oraz ich kopii i replikacji (art. 17 ust. 2 RODO). Proszę również o powiadomienie wszystkich odbiorców, którym ujawnili Państwo te dane (art. 19 RODO).',
      p2: 'Proszę o pisemne potwierdzenie usunięcia danych w ciągu miesiąca od otrzymania wniosku (art. 12 ust. 3 RODO). Jeśli nie mogą Państwo uwzględnić wniosku w całości lub w części, proszę o podanie powodów oraz o pouczenie o prawie wniesienia skargi do organu nadzorczego i skorzystania ze środków ochrony prawnej przed sądem.',
      p3: 'Jeżeli muszą Państwo zweryfikować moją tożsamość, proszę o wskazanie, jakich informacji potrzebują. Przekażę tylko to, co niezbędne.',
      close: 'Z poważaniem',
    },
  };

  var field = function (id, label, el) {
    el.id = id;
    return h('div', { class: 'tool__field' }, h('label', { class: 'tool__label', for: id }, label), el);
  };
  var inName = h('input', { type: 'text', class: 'tool__input', autocomplete: 'name' });
  var inContact = h('textarea', { class: 'tool__text', rows: 2, autocomplete: 'street-address', placeholder: T.contactPlaceholder });
  var inTo = h('input', { type: 'text', class: 'tool__input', placeholder: T.toPlaceholder });
  var inData = h('textarea', { class: 'tool__text', rows: 5, placeholder: T.dataPlaceholder });
  var inGround = h('select', { class: 'tool__input' });
  GROUNDS.forEach(function (g) { inGround.append(h('option', { value: g }, T['g_' + g])); });
  var inLang = h('select', { class: 'tool__input' });
  Object.keys(L).forEach(function (code) { inLang.append(h('option', { value: code }, L[code].name)); });
  inLang.value = RO.root.getAttribute('data-lang') || 'en';

  var out = h('textarea', { id: 'lt-out', class: 'tool__text tool__text--letter', rows: 22, readonly: true });

  function build() {
    var t = L[inLang.value];
    var date = new Intl.DateTimeFormat(inLang.value, { dateStyle: 'long' }).format(new Date());
    var blank = function (v, fallback) { return v.trim() || fallback; };
    var lines = [
      blank(inTo.value, '[' + T.toPlaceholder + ']'),
      '',
      date,
      '',
      t.subject,
      '',
      t.greeting,
      '',
      t.intro,
      '',
      t.data,
      blank(inData.value, '[' + T.dataPlaceholder + ']'),
      '',
      t.ground,
      t.grounds[inGround.value],
      '',
      t.p1,
      '',
      t.p2,
      '',
      t.p3,
      '',
      t.close,
      blank(inName.value, '[' + T.name + ']'),
      inContact.value.trim(),
    ];
    out.value = lines.join('\n').replace(/\n+$/, '\n');
  }
  [inName, inContact, inTo, inData, inGround, inLang].forEach(function (el) {
    el.addEventListener('input', build);
    el.addEventListener('change', build);
  });
  build();

  var copyBtn = h('button', { type: 'button', class: 'btn btn--primary' }, T.copy);
  copyBtn.addEventListener('click', function () {
    RO.copy(out.value).then(function () {
      copyBtn.textContent = T.copied;
      setTimeout(function () { copyBtn.textContent = T.copy; }, 1500);
    });
  });

  RO.root.replaceChildren(
    h('div', { class: 'tool__cols' },
      h('div', null,
        field('lt-name', T.name, inName),
        field('lt-contact', T.contact, inContact),
        field('lt-to', T.to, inTo),
        field('lt-data', T.data, inData),
        field('lt-ground', T.ground, inGround),
        field('lt-lang', T.letterLang, inLang)),
      h('div', null, h('label', { class: 'tool__label', for: 'lt-out' }, T.letter), out,
        h('div', { class: 'tool__actions' }, copyBtn,
          h('button', { type: 'button', class: 'btn', onclick: function () { RO.download(new Blob([out.value], { type: 'text/plain;charset=utf-8' }), 'erasure-request.txt'); } }, T.download))),
    ),
  );
})();
