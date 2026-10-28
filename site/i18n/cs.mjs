// Čeština. Inline značky: `kód`, **tučně**, {Klávesa}, [text](/cesta-nebo-url). Pořadí bloků jako v en.mjs.
export default {
  ui: {
    home: 'Remove Online – úvodní stránka',
    mainNav: 'Hlavní navigace',
    language: 'Jazyk',
    menu: 'Menu',
    skip: 'Přejít na obsah',
    tagline: 'Bezplatné nástroje a návody, jak věci odstranit z internetu.',
    footerNav: 'Patička',
    privacy: 'Ochrana soukromí',
    imprint: 'Tiráž',
    homeCrumb: 'Úvod',
    h1: 'Odstraňte online cokoli.',
    sub: 'Bezplatné nástroje a srozumitelné návody.',
    lead: 'Odstraňte pozadí, stránky z PDF nebo skrytá data z fotek přímo v prohlížeči, nebo se řiďte návodem pro účty, soubory a kód.',
    trust: 'Žádné cookies, žádné sledování.',
    popular: 'Oblíbené návody',
    topics: 'Témata',
    whyTitle: 'Jak tyto návody fungují',
    features: [
      { title: 'Nejdřív vestavěné nástroje', text: 'Začínáme tím, co už máte v telefonu nebo počítači – Náhled, Fotky, Word nebo prohlížeč –, a teprve potom odkazujeme jinam.' },
      { title: 'Vaše soubory zůstávají vaše', text: 'Žádný návod po vás nechce, abyste soukromý dokument nahráli na náhodný web. A tento web nemá cookies ani sledování.' },
      { title: 'Stručné a upřímné kroky', text: 'Krátké číslované kroky, varování, které potřebujete před kliknutím, a jasná poznámka, když něco nejde vrátit zpět.' },
    ],
    homeTitle: 'Remove Online – bezplatné nástroje a návody, jak věci odstranit z internetu',
    homeDescription: 'Bezplatné nástroje do prohlížeče a návody: odstranění pozadí, stránek z PDF, metadat fotek, duplicitních řádků a další. Bez nahrávání, cookies a sledování.',
    guideCount: (n) => (n === 1 ? '1 návod' : n < 5 ? `${n} návody` : `${n} návodů`),
    warning: 'Pozor',
    tip: 'Tip',
    faq: 'Otázky',
    related: 'Související návody',
    goodToKnow: 'Dobré vědět',
    disclaimer: 'Obecné informace, nikoli právní ani odborné poradenství. Aplikace často mění nabídky, takže se tlačítko může ve vaší verzi jmenovat trochu jinak.',
    notFound: 'Stránka nenalezena – přejít na český web',
  },

  hubs: {
    accounts: { name: 'Účty a zařízení', blurb: 'Odhlásit, odebrat a smazat', lead: 'Odeberte účet z telefonu nebo ho smažte natrvalo, aniž byste se sami zamkli.' },
    privacy: { name: 'Soukromí a osobní údaje', blurb: 'Skryjte, co nikdy nemělo být veřejné', lead: 'Odstraňte skrytá data z fotek a souborů a nechte osobní údaje zmizet z výsledků vyhledávání.' },
    documents: { name: 'Dokumenty a tabulky', blurb: 'PDF, Word, Excel a text', lead: 'Odeberte stránky, hesla, duplicity a nechtěné zalomení řádků v souborech, které používáte každý den.' },
    media: { name: 'Fotky, video a zvuk', blurb: 'Pozadí, objekty, vodoznaky, zvuk', lead: 'Odstraňte pozadí, vymažte objekty a odeberte zvuk z videa – většinou nástroji, které už máte.' },
    developer: { name: 'Vývoj a příkazová řádka', blurb: 'Git, Docker a Linux', lead: 'Příkazy pro vrácení commitu, úklid kontejnerů a mazání složek – nejdřív ta bezpečná varianta.' },
  },

  guides: {
    'remove-google-account-from-phone': {
      title: 'Jak odebrat účet Google z telefonu',
      short: 'Odebrat účet Google z telefonu',
      lead: 'Odebráním se účet v tomto zařízení odhlásí z Gmailu, Obchodu Play, Kontaktů a Kalendáře. Samotný účet se tím **nesmaže**.',
      sections: [
        {
          h: 'V Androidu',
          steps: [
            'Otevřete **Nastavení**.',
            'Klepněte na **Hesla a účty**. U některých telefonů se položka jmenuje **Účty** nebo **Uživatelé a účty**.',
            'Klepněte na účet Google, který chcete odebrat.',
            'Klepněte na **Odebrat účet** a potvrďte.',
            'Pokud se zobrazí výzva, zadejte PIN, gesto nebo heslo zámku obrazovky.',
          ],
        },
        {
          h: 'V iPhonu nebo iPadu',
          p: ['Pokud jste účet přidali v nastavení iOS (Pošta, Kontakty, Kalendář):'],
          steps: ['Otevřete **Nastavení**, pak **Pošta** a **Účty**. Ve starších verzích iOS je to **Hesla a účty**.', 'Klepněte na účet Google.', 'Klepněte na **Smazat účet** a potvrďte.'],
          after: ['Pokud používáte jen aplikaci Gmail nebo Google, klepněte v ní na profilový obrázek, zvolte **Spravovat účty v tomto zařízení** a účet odeberte. Název se mezi aplikacemi mírně liší.'],
        },
      ],
      callout: { type: 'warning', text: 'Prodáváte nebo darujete telefon s Androidem? Účet Google odeberte **před** obnovením továrního nastavení. Jinak může ochrana proti obnovení (Factory Reset Protection) vyžadovat vaše přihlášení od dalšího majitele.' },
      faq: [
        ['Smaže se tím můj účet Google?', 'Ne. Účet a jeho data zůstávají u Googlu. Jen tento telefon k němu ztratí přístup.'],
        ['Proč tu není tlačítko „Odebrat účet“?', 'Pracovní nebo školní účet může spravovat vaše organizace a odebrat ho může jen administrátor. U některých telefonů je účet také svázaný s pracovním profilem.'],
        ['Přijdu o fotky a kontakty?', 'Data uložená v účtu v něm zůstávají. Položky uložené jen v telefonu, například místní kontakty, to neovlivní. Pokud si nejste jistí, zkontrolujte zálohu.'],
      ],
    },

    'delete-instagram-account': {
      title: 'Jak smazat účet na Instagramu',
      short: 'Smazat účet na Instagramu',
      lead: 'Instagram nabízí dvě možnosti: účet **deaktivovat** (skrytý, může se vrátit), nebo ho **trvale smazat**. Smazání spustí odpočet, během něhož si to ještě můžete rozmyslet.',
      sections: [
        {
          h: 'Smazání účtu v aplikaci',
          steps: [
            'Otevřete Instagram, přejděte na svůj profil a klepněte na menu (☰).',
            'Klepněte na **Centrum účtů** a poté na **Osobní údaje**.',
            'Klepněte na **Vlastnictví a kontrola účtu** a poté na **Deaktivace nebo smazání**.',
            'Vyberte účet, zvolte **Smazat účet** a klepněte na **Pokračovat**.',
            'Vyberte důvod, zadejte heslo a potvrďte.',
          ],
        },
        { h: 'Nejdřív si stáhněte svá data', p: ['V **Centru účtů** otevřete **Vaše informace a oprávnění** a zvolte **Stáhnout vaše informace**. Po smazání nejde obnovit fotky ani zprávy.'] },
        { h: 'Co se stane potom', p: ['Instagram účet naplánuje ke smazání a po dobu ochranné lhůty (v současnosti asi 30 dní) ho uchovává. Pokud se během ní přihlásíte, smazání se zruší. Kopie v zálohách mohou zmizet později.'] },
      ],
      callout: { type: 'tip', text: 'Nejste si jistí? Zvolte raději **Deaktivovat**. Profil, fotky a lajky zůstanou skryté, dokud se znovu nepřihlásíte.' },
      faq: [
        ['Dá se smazání vrátit?', 'Jen během ochranné lhůty, a to opětovným přihlášením. Poté je účet i s obsahem pryč.'],
        ['Uvolní se moje uživatelské jméno?', 'Po dokončeném smazání ho může získat někdo jiný. Při deaktivaci zůstává vyhrazené.'],
      ],
    },

    'remove-metadata-from-photos': {
      title: 'Jak odebrat metadata (EXIF) z fotek a dokumentů',
      short: 'Odebrat metadata z fotek',
      lead: 'Fotky mohou obsahovat skrytá data: kde, kdy a čím byly pořízeny. Takto je odstraníte dřív, než soubor někomu pošlete.',
      sections: [
        {
          h: 'Windows',
          steps: ['Klikněte na fotku pravým tlačítkem a zvolte **Vlastnosti**.', 'Otevřete kartu **Podrobnosti** a klikněte na **Odebrat vlastnosti a osobní údaje**.', 'Zvolte **Vytvořit kopii se všemi možnými odebranými vlastnostmi** a klikněte na **OK**.'],
        },
        {
          h: 'Mac',
          steps: ['Otevřete fotku v **Náhledu**.', 'Zvolte **Nástroje**, poté **Zobrazit inspektora** a otevřete kartu **GPS**.', 'Klikněte na **Odebrat informace o poloze**. Odstraní se jen místo, ne údaje o fotoaparátu.'],
          after: ['V aplikaci Fotky můžete také zvolit **Soubor**, **Exportovat** a před uložením zrušit zaškrtnutí **Informace o poloze**.'],
        },
        {
          h: 'iPhone',
          steps: ['Otevřete fotku v aplikaci **Fotky** a klepněte na sdílení.', 'Nahoře v nabídce sdílení klepněte na **Možnosti**.', 'Vypněte **Poloha** (nebo **Všechna data fotografií**) a sdílejte jako obvykle.'],
        },
        {
          h: 'Android',
          steps: ['Otevřete fotku v Google Fotkách a přejeďte prstem nahoru, abyste viděli podrobnosti.', 'Klepněte na **Poloha** a zvolte **Odstranit polohu**.'],
        },
        { h: 'Dokumenty Office', p: ['Ve Wordu, Excelu nebo PowerPointu zvolte **Soubor**, **Informace**, **Zkontrolovat problémy**, **Zkontrolovat dokument** a u položky Vlastnosti dokumentu a osobní údaje klikněte na **Odebrat vše**.'] },
      ],
      callout: { type: 'tip', text: 'Mnoho sociálních sítí při nahrání polohu odstraní, ale přílohy e-mailů a odkazy na cloud většinou ponechají všechno. Údaje odeberte před odesláním.' },
      faq: [
        ['Co přesně metadata fotky obsahují?', 'Obvykle datum a čas, model fotoaparátu nebo telefonu, nastavení a často souřadnice GPS. Své jméno může doplnit i editační software.'],
        ['Odstraní metadata snímek obrazovky?', 'Snímek obrazovky dostane vlastní metadata a původní polohu nenese. Je to rychlé řešení, ale kvalita obrazu je nižší.'],
      ],
    },

    'remove-personal-info-from-google': {
      title: 'Jak odstranit osobní údaje z výsledků vyhledávání Google',
      short: 'Odstranit osobní údaje z Googlu',
      lead: 'Můžete Google požádat, aby přestal zobrazovat výsledky s vaší adresou, telefonním číslem nebo podobnými údaji. Samotná stránka zůstane online, pokud nekontaktujete i jejího provozovatele.',
      sections: [
        {
          h: 'Postup',
          steps: [
            'Vyhledejte své jméno, adresu a telefonní číslo a zjistěte, co je dnes vidět.',
            'Otevřete nástroj Googlu **Výsledky o vás**: [support.google.com/websearch/answer/12719076](https://support.google.com/websearch/answer/12719076). V aplikaci Google ho najdete pod profilovým obrázkem.',
            'Přidejte kontaktní údaje, které se mají sledovat, a projděte nalezené výsledky.',
            'U výsledku otevřete menu (⋮), zvolte **Odstranit výsledek** a odpovězte na otázky.',
            'Pokud výsledek tento nástroj nepokrývá, použijte formulář nápovědy Googlu „Odebrání informací z Googlu“ a stránku popište.',
          ],
        },
        { h: 'Odstraňte to u zdroje', p: ['Google výsledek jen skryje. Aby obsah zmizel z internetu, požádejte provozovatele nebo hosting webu o smazání stránky. Jakmile je pryč, zmizí i výsledek vyhledávání.'] },
        { h: 'Pokud žijete v EU', p: ['Můžete se také odvolat na právo na výmaz (článek 17 GDPR, „právo být zapomenut“) a využít právní formulář Googlu pro Evropu. Google poměřuje vaše soukromí s veřejným zájmem a může žádost zamítnout.'] },
      ],
      callout: { type: 'warning', text: 'Uschovejte si potvrzovací e-maily a odkazy na nahlášené stránky. Budete je potřebovat, pokud se budete muset proti rozhodnutí odvolat.' },
      faq: [
        ['Jak dlouho to trvá?', 'Google každou žádost posuzuje zvlášť a doba se liší. O rozhodnutí vás informuje e-mailem.'],
        ['A co Bing a další vyhledávače?', 'Každý vyhledávač má vlastní formulář pro odstranění. Odstranění z Googlu se tam neprojeví.'],
      ],
    },

    'remove-pages-from-pdf': {
      title: 'Jak odebrat stránky z PDF',
      short: 'Odebrat stránky z PDF',
      lead: 'Nemusíte nic instalovat ani nahrávat dokument. Stránky z PDF umí smazat váš Mac, prohlížeč nebo Adobe Acrobat.',
      sections: [
        {
          h: 'Na Macu v Náhledu',
          steps: ['Otevřete PDF v **Náhledu**.', 'Zvolte **Zobrazení**, poté **Miniatury**.', 'Klikněte na stránku, kterou chcete smazat (s klávesou {⌘} vyberete víc stránek).', 'Stiskněte {Delete} a uložte pomocí {⌘} + {S}.'],
        },
        {
          h: 'Ve Windows, na Macu nebo v Linuxu v Chromu či Edge',
          steps: ['Otevřete PDF v prohlížeči a stiskněte {Ctrl} + {P} (na Macu {⌘} + {P}).', 'Jako cíl zvolte **Uložit jako PDF**.', 'U položky **Stránky** zvolte **Vlastní** a zadejte stránky, které chcete **ponechat**, například `1-3, 5-8`.', 'Klikněte na **Uložit**. Vznikne nový soubor, původní zůstane nedotčený.'],
        },
        {
          h: 'V Adobe Acrobatu',
          steps: ['Zvolte **Nástroje**, poté **Uspořádat stránky**.', 'Vyberte nechtěné miniatury a klikněte na ikonu koše.', 'Soubor uložte.'],
        },
      ],
      callout: { type: 'tip', text: 'Uložení přes dialog tisku je nejrychlejší, ale mohou se ztratit odkazy, záložky a formulářová pole. Pro ně použijte Náhled nebo Acrobat.' },
      faq: [
        ['Je bezpečné k tomu použít web?', 'Bezplatné webové nástroje nahrají váš soubor na svůj server. U smluv, dokladů a všeho soukromého použijte raději některou z offline metod výše.'],
        ['Můžu odebrat stránku z chráněného PDF?', 'Až po odemknutí. Viz [jak odebrat heslo z PDF](/documents/remove-password-from-pdf/).'],
      ],
    },

    'remove-password-from-pdf': {
      title: 'Jak odebrat heslo z PDF',
      short: 'Odebrat heslo z PDF',
      lead: 'Pokud heslo znáte a soubor smíte otevřít, můžete uložit odemčenou kopii, abyste ho už nemuseli zadávat.',
      sections: [
        {
          h: 'V Chromu nebo Edge',
          steps: ['Otevřete PDF v prohlížeči a zadejte heslo.', 'Stiskněte {Ctrl} + {P} (na Macu {⌘} + {P}).', 'Jako cíl zvolte **Uložit jako PDF** a klikněte na **Uložit**.', 'Nový soubor se otevře bez hesla.'],
        },
        {
          h: 'V Náhledu na Macu',
          steps: ['Otevřete PDF a zadejte heslo.', 'Zvolte **Soubor**, poté **Exportovat jako PDF…** a uložte kopii.'],
        },
        {
          h: 'V Adobe Acrobatu',
          steps: ['Otevřete PDF a zadejte heslo.', 'Zvolte **Soubor**, poté **Vlastnosti** a otevřete kartu **Zabezpečení**.', 'U **Metoda zabezpečení** zvolte **Bez zabezpečení**, klikněte na **OK** a uložte.'],
        },
      ],
      callout: { type: 'warning', text: 'Funguje to jen tehdy, když heslo znáte. Zapomenuté heslo nelze obnovit; zeptejte se autora nebo odesílatele. Neodstraňujte omezení u dokumentů, které nemáte právo používat.' },
      faq: [
        ['Jaký je rozdíl mezi dvěma druhy hesla v PDF?', '**Heslo pro otevření** potřebujete k zobrazení souboru. **Heslo pro oprávnění** jen omezuje tisk nebo kopírování. Postupy výše vycházejí ze souboru, který už otevřít umíte.'],
        ['Vypadá nová kopie stejně?', 'Při tisku do PDF se mohou ztratit záložky a formulářová pole. Náhled a Acrobat je zachovají.'],
      ],
    },

    'remove-page-from-word': {
      title: 'Jak smazat stránku ve Wordu',
      short: 'Smazat stránku ve Wordu',
      lead: 'Označte vše na stránce a smažte to. Pokud prázdná stránka nechce zmizet, bývá příčinou skrytá značka odstavce nebo konec stránky.',
      sections: [
        {
          h: 'Smazání stránky s obsahem',
          steps: ['Klikněte kamkoli na stránku, kterou chcete smazat.', 'Stiskněte {Ctrl} + {G} (Mac: {⌥} + {⌘} + {G}) a otevřete **Přejít na**.', 'Zadejte `\\page`, stiskněte {Enter} a poté **Zavřít**. Celá stránka je označena.', 'Stiskněte {Delete}.'],
        },
        {
          h: 'Smazání prázdné stránky na konci',
          steps: ['Stiskněte {Ctrl} + {Shift} + {8} (Mac: {⌘} + {8}) a zobrazte značky odstavců (¶).', 'Označte nadbytečné značky odstavců nebo řádek **Konec stránky** na prázdné stránce.', 'Mačkejte {Delete}, dokud stránka nezmizí.'],
          after: ['Pokud prázdná stránka následuje za tabulkou, poslední značku odstavce nelze smazat. Označte ji a nastavte velikost písma na 1 b., nebo ji skryjte pomocí {Ctrl} + {D}, **Skrytý**.'],
        },
        { h: 'V Dokumentech Google', p: ['Označte text na stránce a stiskněte {Delete}. Pokud prázdná stránka zůstane, zkontrolujte v **Vložit**, **Zlom** nechtěný konec stránky, nebo zmenšete mezeru před posledním odstavcem.'] },
      ],
      callout: { type: 'tip', text: 'Před smazáním uložte kopii. Stránku vrátí i Zpět ({Ctrl} + {Z}).' },
      faq: [
        ['Proč se za tabulkou objevuje prázdná stránka?', 'Word potřebuje za tabulkou odstavec. Pokud tabulka končí přesně na konci stránky, odstavec se přesune na další stránku.'],
        ['Změní se smazáním stránky čísla stránek?', 'Ano. Následující stránky se posunou a číslování se automaticky aktualizuje.'],
      ],
    },

    'remove-duplicates-in-excel': {
      title: 'Jak odebrat duplicity v Excelu',
      short: 'Odebrat duplicity v Excelu',
      lead: 'Excel umí smazat duplicitní řádky dvěma kliknutími, nebo nechat původní seznam netknutý a zobrazit vyčištěnou kopii.',
      sections: [
        {
          h: 'Smazání duplicitních řádků',
          steps: ['Klikněte do buňky uvnitř dat (nebo označte oblast).', 'Otevřete kartu **Data** a klikněte na **Odebrat duplicity**.', 'Zaškrtněte sloupce, které se musí shodovat, aby byl řádek považován za duplicitní.', 'Klikněte na **OK**. Excel oznámí, kolik duplicit odebral.'],
        },
        {
          h: 'Ponechání originálu (Microsoft 365)',
          p: ['Funkce UNIKÁTNÍ (anglicky UNIQUE) vrátí seznam bez duplicit a vaše data nezmění:'],
          code: '=UNIKÁTNÍ(A2:A100)',
        },
        {
          h: 'Nalezení duplicit před smazáním',
          steps: ['Označte sloupec.', 'Zvolte **Domů**, **Podmíněné formátování**, **Pravidla zvýraznění buněk**, **Duplicitní hodnoty**.', 'Zkontrolujte zvýrazněné buňky.'],
        },
        { h: 'V Tabulkách Google', p: ['Označte oblast a zvolte **Data**, **Vyčištění dat**, **Odebrat duplikáty**.'] },
      ],
      callout: { type: 'warning', text: '„Odebrat duplicity“ maže řádky okamžitě. Pracujte na kopii listu, nebo při špatném výsledku hned stiskněte {Ctrl} + {Z}.' },
      faq: [
        ['Proč se „stejné“ buňky nepovažují za duplicity?', 'Mezery na konci a rozdílná velikost písmen mohou buňky odlišit. Nejdřív je vyčistěte pomocí `=PROČISTIT(A2)`.'],
        ['Ponechá se první, nebo poslední záznam?', 'Excel ponechá první výskyt a pozdější odstraní.'],
      ],
    },

    'remove-line-breaks': {
      title: 'Jak odebrat zalomení řádků v textu, Wordu a Excelu',
      short: 'Odebrat zalomení řádků',
      lead: 'Zkopírovali jste text, kde každý řádek končí pevným zalomením? Nahraďte zalomení mezerou během pár sekund.',
      sections: [
        {
          h: 'Ve Wordu',
          steps: ['Stiskněte {Ctrl} + {H} a otevřete **Najít a nahradit**.', 'Klikněte na **Více >>**, poté na **Speciální** a **Značka odstavce**. Vloží se `^p`.', 'Do pole **Nahradit** zadejte jedinou mezeru.', 'Klikněte na **Nahradit vše**.'],
        },
        {
          h: 'V Excelu',
          steps: ['Označte buňky a stiskněte {Ctrl} + {H}.', 'Klikněte do pole **Najít** a stiskněte {Ctrl} + {J}. Objeví se drobná tečka.', 'Do pole **Nahradit** zadejte mezeru a klikněte na **Nahradit vše**.'],
          p: ['Nebo použijte vzorec v pomocném sloupci:'],
          code: '=DOSADIT(A1;ZNAK(10);" ")',
        },
        {
          h: 'V libovolném editoru s regulárními výrazy',
          p: ['V Najít a nahradit zapněte „regex“, vyhledejte následující vzor a nahraďte ho mezerou:'],
          code: '\\r?\\n',
        },
      ],
      callout: { type: 'tip', text: 'Pokud chcete zachovat odstavce, nahrazujte jen jednotlivá zalomení a prázdné řádky nechte. Nejdřív vyhledejte dvě zalomení, nahraďte je zástupným textem a potom je obnovte.' },
      faq: [
        ['Jaký je rozdíl mezi zalomením řádku a značkou odstavce?', 'Ve Wordu vloží {Shift} + {Enter} zalomení řádku (`^l`), {Enter} značku odstavce (`^p`). Hledejte to, co v textu skutečně je.'],
        ['Dají se odebrat i prázdné řádky?', 'Ano. Nahraďte dvě značky odstavce (`^p^p`) jednou (`^p`) a opakujte, dokud se nic nenajde.'],
      ],
    },

    'remove-background-from-image': {
      title: 'Jak odstranit pozadí z obrázku',
      short: 'Odstranit pozadí z obrázku',
      lead: 'Většina telefonů a kancelářských programů už umí motiv vystřihnout sama. Výsledek uložte jako PNG, aby pozadí zůstalo průhledné.',
      sections: [
        {
          h: 'iPhone a iPad',
          steps: ['Otevřete fotku v aplikaci **Fotky**.', 'Podržte prst na motivu, dokud nezáří.', 'Klepněte na **Kopírovat** nebo **Sdílet** a vložte ho do Poznámek, Zpráv nebo editoru. Vyžaduje iOS 16 nebo novější.'],
        },
        {
          h: 'Mac',
          steps: ['Otevřete obrázek v **Náhledu** a zvolte **Nástroje**, poté **Odstranit pozadí**. V novějších verzích macOS můžete také kliknout pravým tlačítkem na soubor ve Finderu a zvolit **Rychlé akce**, **Odstranit pozadí**.'],
        },
        {
          h: 'Windows',
          steps: ['Otevřete obrázek v **Malování**.', 'Ve skupině Obrázek klikněte na **Odebrat pozadí**.', 'Uložte jako PNG.'],
        },
        {
          h: 'Word, PowerPoint a Excel',
          steps: ['Klikněte na obrázek, poté na **Formát obrázku** a **Odebrat pozadí**.', 'Označte oblasti, které se mají zachovat nebo odebrat, a zvolte **Zachovat změny**.'],
        },
      ],
      callout: { type: 'tip', text: 'Nejlépe fungují fotky s výrazným kontrastem mezi motivem a pozadím. Jemné detaily, například vlasy, může být potřeba doladit ručně.' },
      faq: [
        ['Který formát souboru zachová průhlednost?', 'PNG (nebo WebP). JPG průhlednost neuloží a oblast vyplní bílou.'],
        ['Je bezpečné použít online nástroj na odstranění pozadí?', 'Většina z nich nahraje váš obrázek na své servery. U soukromých nebo zákaznických fotek raději použijte vestavěné nástroje výše.'],
      ],
    },

    'remove-object-from-photo': {
      title: 'Jak odstranit předmět nebo osobu z fotky',
      short: 'Odstranit předmět z fotky',
      lead: 'Galerie v telefonech dnes obsahují gumu, která mezeru vyplní automaticky. Tady zjistíte, kde ji najdete a jak dosáhnout čistého výsledku.',
      sections: [
        {
          h: 'Kde gumu najdete',
          p: ['Název a dostupnost závisí na telefonu, verzi systému a regionu.'],
          steps: [
            '**Google Fotky:** otevřete fotku, klepněte na **Upravit**, **Nástroje** a poté **Kouzelná guma** (Magic Eraser).',
            '**Samsung Galaxy:** otevřete fotku v Galerii, klepněte na tužku a zvolte možnost **Guma objektů** (Object eraser).',
            '**iPhone:** u modelů s Apple Intelligence klepněte ve Fotkách na **Upravit** a zvolte **Vyčistit** (Clean Up).',
            '**Windows:** na podporovaných počítačích nabízí aplikace Fotky **Generativní vymazání** (Generative erase).',
            '**Photoshop:** použijte nástroj **Odstranit** nebo **Generativní výplň**.',
          ],
        },
        { h: 'Jak dosáhnout čistého výsledku', steps: ['Přibližte a předmět i se stínem přetřete štětcem nebo ho obkroužte.', 'Nejdřív odstraňte drobnosti. Velké předměty před rušným pozadím se přesvědčivě vyplňují špatně.', 'Použijte, zkontrolujte okraje a vraťte zpět, pokud výplň vypadá rozmazaně.'] },
        { h: 'Bezplatná možnost na počítači', p: ['GIMP je zdarma a má nástroj **Opravit** i doplněk Resynthesizer pro vyplňování mezer. Vyžaduje víc ruční práce než guma v telefonu.'] },
      ],
      callout: { type: 'warning', text: 'Upravujte jen vlastní fotky nebo ty, které smíte měnit. Odstraňovat osoby nebo předměty proto, abyste někoho uvedli v omyl, například u důkazních nebo zpravodajských fotek, není přijatelné.' },
      faq: [
        ['Zůstane původní fotka zachována?', 'Většina aplikací uloží úpravu jako kopii nebo umožní návrat. Zkontrolujte to, než přepíšete.'],
        ['Proč výsledek vypadá rozmazaně?', 'Nástroj musí chybějící pixely domyslet. Nejlépe fungují jednoduchá pozadí jako obloha, tráva nebo zeď.'],
      ],
    },

    'remove-audio-from-video': {
      title: 'Jak odebrat zvuk z videa',
      short: 'Odebrat zvuk z videa',
      lead: 'Ztište video natrvalo tak, aby exportovaný soubor neměl žádnou zvukovou stopu – telefonem nebo bezplatným nástrojem.',
      sections: [
        {
          h: 'iPhone',
          steps: ['Otevřete video v aplikaci **Fotky** a klepněte na **Upravit**.', 'Vlevo nahoře klepněte na žlutou ikonu reproduktoru, aby byla přeškrtnutá.', 'Klepněte na **Hotovo**.'],
        },
        {
          h: 'Android (Google Fotky)',
          steps: ['Otevřete video a klepněte na **Upravit**.', 'Klepnutím na ikonu reproduktoru zvuk ztišíte.', 'Klepněte na **Uložit kopii**.'],
        },
        {
          h: 'Mac (iMovie)',
          steps: ['Přetáhněte klip na časovou osu.', 'Zvolte **Upravit**, poté **Oddělit zvuk**.', 'Vyberte zelený zvukový pruh, stiskněte {Delete} a exportujte.'],
        },
        {
          h: 'Příkazová řádka (FFmpeg)',
          p: ['Tento příkaz zkopíruje obraz bez překódování a zvuk vynechá:'],
          code: 'ffmpeg -i input.mp4 -c copy -an output.mp4',
        },
      ],
      callout: { type: 'tip', text: 'Ztlumení v přehrávači utlumí jen přehrávání. Chcete-li video sdílet úplně bez zvuku, exportujte nový soubor podle popisu výše.' },
      faq: [
        ['Změní se kvalita videa?', 'S příkazem FFmpeg výše ne. Telefonní editory mohou video mírně překódovat.'],
        ['Můžu zvuk místo toho nahradit?', 'Ano. Nejdřív odeberte původní stopu a ve stejném editoru přidejte hudbu nebo komentář.'],
      ],
    },

    'remove-watermark': {
      title: 'Jak odstranit vodoznak (legálně)',
      short: 'Odstranit vodoznak',
      lead: 'Odstranit vodoznak z **vlastního** dokumentu nebo ze zkušebního exportu je v pořádku. Odstranit cizí vodoznak z obrázku nebo videa obvykle ne. Zde je, co funguje a co dělat místo toho.',
      sections: [
        {
          h: 'Vodoznak ve vlastním dokumentu Word',
          steps: ['Otevřete kartu **Návrh**.', 'Klikněte na **Vodoznak**.', 'Zvolte **Odebrat vodoznak**.'],
        },
        {
          h: 'Vodoznak ve vlastním PDF',
          steps: ['Otevřete PDF v Adobe Acrobatu.', 'Zvolte **Upravit PDF**, poté **Vodoznak** a **Odebrat**.'],
        },
        {
          h: 'Vodoznak přidaný aplikací nebo zkušební verzí',
          p: ['Video editory, návrhářské aplikace a převodníky často v bezplatném tarifu přidávají logo. Čistě se ho zbavíte přechodem na vyšší tarif, placeným exportem nebo opětovným exportem z původního projektu v aplikaci, která značku nepřidává.'],
        },
        {
          h: 'Fotka nebo video, které patří někomu jinému',
          p: ['Vodoznak označuje vlastníka. Neořezávejte ho ani nepřemalovávejte. Místo toho:'],
          steps: ['Požádejte vlastníka o čistou kopii nebo o svolení.', 'Zakupte si licenci na verzi bez vodoznaku od fotobanky.', 'Použijte obrázky, které lze volně použít, například z Wikimedia Commons nebo jiných zdrojů volného díla a Creative Commons, a uveďte zdroj, jak se vyžaduje.'],
        },
      ],
      callout: { type: 'warning', text: 'V mnoha zemích může být odstranění informací o autorských právech, například vodoznaku, protiprávní, třeba podle § 95c německého autorského zákona, § 1202 amerického DMCA nebo čl. 7 směrnice 2001/29/ES. Jde o obecnou informaci, nikoli právní poradenství.' },
      faq: [
        ['Můžu odstranit vodoznak nebo označení AI?', 'Označení, že je obsah vytvořen umělou inteligencí, existuje proto, aby ostatní nebyli uváděni v omyl. Jak je skrýt, nepopisujeme.'],
        ['Co když jsem ztratil originál bez vodoznaku?', 'Zkontrolujte zálohu v cloudu, odeslané e-maily nebo historii exportů v aplikaci. Pokud máte vlastní práci jen s vodoznakem, obraťte se na podporu nástroje.'],
      ],
    },

    'remove-last-git-commit': {
      title: 'Jak odstranit poslední commit v Gitu',
      short: 'Odstranit poslední commit v Gitu',
      lead: 'Správný příkaz závisí na jedné otázce: už jste commit odeslali (push)? Začněte bezpečnými variantami.',
      sections: [
        {
          h: 'Ještě neodesláno: vrátit commit, změny ponechat',
          code: 'git reset --soft HEAD~1',
          after: ['Commit je pryč a jeho změny jsou znovu připravené k commitu (staged). Pomocí `git reset HEAD~1` je z přípravy vyjmete také.'],
        },
        {
          h: 'Ještě neodesláno: vrátit commit a změny zahodit',
          code: 'git reset --hard HEAD~1',
        },
        {
          h: 'Už odesláno do sdílené větve',
          p: ['Vytvořte nový commit, který ten starý zruší. Historie zůstane všem zachována:'],
          code: 'git revert HEAD\ngit push',
        },
        {
          h: 'Jen zpráva je špatně',
          code: 'git commit --amend',
        },
        {
          h: 'Přepsání odeslané větve, která je vaše',
          p: ['Jen pokud ji nikdo jiný nepoužívá:'],
          code: 'git reset --hard HEAD~1\ngit push --force-with-lease',
        },
      ],
      callout: { type: 'warning', text: '`--hard` maže nezapsanou práci. Pokud omylem odstraníte commit, `git reflog` vypíše poslední stavy a `git reset --hard <hash>` vás vrátí zpět.' },
      faq: [
        ['Co znamená HEAD~1?', 'Ukazuje na commit před aktuálním. `HEAD~3` jde o tři commity zpět.'],
        ['Proč je force push riskantní?', 'Přepíše historii na vzdáleném serveru. Kolegové, kteří už starý commit stáhli, narazí na konflikty.'],
      ],
    },

    'remove-docker-images-and-containers': {
      title: 'Jak odstranit obrazy a kontejnery Dockeru',
      short: 'Odstranit obrazy a kontejnery Dockeru',
      lead: 'Nejdřív zastavte a odstraňte kontejnery, potom obrazy. Příkazy prune uklízejí hromadně, takže si přečtěte, co smažou.',
      sections: [
        {
          h: 'Odstranění kontejneru',
          code: 'docker ps -a\ndocker stop <container>\ndocker rm <container>',
          after: ['Příkazem `docker rm -f <container>` zastavíte a odstraníte běžící kontejner jedním krokem.'],
        },
        {
          h: 'Odstranění obrazu',
          code: 'docker images\ndocker rmi <image>',
          after: ['Docker odmítne odstranit obraz, který ještě používá nějaký kontejner, takže nejdřív odstraňte ten kontejner.'],
        },
        {
          h: 'Hromadný úklid',
          code: 'docker container prune\ndocker image prune\ndocker system prune',
          after: ['`docker system prune` odstraní zastavené kontejnery, nepoužívané sítě, „dangling“ obrazy a cache buildů. Přidáním `-a` odstraníte všechny nepoužívané obrazy a pomocí `--volumes` i svazky.'],
        },
      ],
      callout: { type: 'warning', text: 'Svazky (volumes) obsahují data, například databáze. Odstraní se jen s `--volumes` a nelze to vrátit zpět.' },
      faq: [
        ['Co je „dangling“ obraz?', 'Obraz bez značky, obvykle pozůstatek po opětovném sestavení obrazu pod stejným názvem.'],
        ['Jak odstranit úplně všechno?', 'Příkazem `docker rm -f $(docker ps -aq)` všechny kontejnery, poté `docker rmi $(docker images -q)` všechny obrazy. Nejdřív zkontrolujte seznamy.'],
      ],
    },

    'remove-directory-linux': {
      title: 'Jak smazat adresář v Linuxu',
      short: 'Smazat adresář v Linuxu',
      lead: 'V příkazové řádce není koš. Vězte, který příkaz potřebujete, a před stisknutím Enteru zkontrolujte cestu.',
      sections: [
        { h: 'Prázdný adresář', code: 'rmdir mojeslozka' },
        { h: 'Adresář se soubory', code: 'rm -r mojeslozka', after: ['S `-i` se před každým smazáním zeptá: `rm -ri mojeslozka`.'] },
        { h: 'Bez dotazů', code: 'rm -rf mojeslozka', after: ['`-f` přeskočí dotazy a ignoruje chybějící soubory. Používejte jen tehdy, když jste si jistí.'] },
        { h: 'Smazání odpovídajících složek všude', p: ['Například každé složky `node_modules` pod aktuálním adresářem (nejdřív zkontrolujte pomocí `-print`):'], code: 'find . -name node_modules -type d -prune -print\nfind . -name node_modules -type d -prune -exec rm -rf {} +' },
      ],
      callout: { type: 'warning', text: 'Nikdy nespouštějte `rm -rf /` a nevkládejte příkazy, kterým nerozumíte. Zbloudilá mezera, například v `rm -rf / home`, změní význam úplně. Cestu nejdřív zkontrolujte příkazem `ls`.' },
      faq: [
        ['Proč dostávám „Permission denied“?', 'Adresář vám nepatří. Zkontrolujte ho pomocí `ls -ld mojeslozka`. `sudo` použijte jen tehdy, když jste si jistí, že cesta je správná.'],
        ['Dostanu soubory zpět?', 'Obvykle ne. Smazané soubory nejdou do koše. Obnovte je ze zálohy.'],
      ],
    },
  },

  privacy: {
    title: 'Ochrana soukromí',
    lead: 'Stručně: tento web tvoří statické stránky. Nemá uživatelské účty, cookies ani analytiku.',
    sections: [
      {
        h: '1. Návštěva webu',
        p: [
          'Web tvoří statické soubory hostované na GitHub Pages, službě společnosti GitHub, Inc. (USA). Při načtení stránky odešle váš prohlížeč požadavek na servery GitHubu. Jako každý webový server zpracovává GitHub technické údaje, aby stránku doručil a zabezpečil službu, zejména vaši IP adresu, požadovanou adresu, datum a čas a identifikaci prohlížeče (user agent). GitHub může tyto údaje ukládat do serverových protokolů. K těmto protokolům nemáme přístup a nepoužíváme je.',
          'Toto zpracování je nezbytné pro provoz webu a zakládá se na našem oprávněném zájmu na funkčním a bezpečném webu (čl. 6 odst. 1 písm. f GDPR). GitHub může údaje zpracovávat v USA. Více informací najdete v dokumentu [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).',
        ],
      },
      {
        h: '2. Žádné cookies ani analytika',
        p: ['Remove Online nenastavuje cookies, nepoužívá analytické ani sledovací nástroje a nemá uživatelské účty. Písma i veškerý kód se načítají přímo z tohoto webu; nekontaktují se žádné sítě CDN ani služby třetích stran. Web neobsahuje žádné formuláře a neptá se na osobní údaje.'],
      },
      {
        h: '3. Odkazy na jiné weby',
        p: ['Návody odkazují na jiné weby, například na nápovědu Googlu. Když takový odkaz otevřete, platí zásady ochrany soukromí daného webu. Na jejich zpracování údajů nemáme vliv.'],
      },
      {
        h: '4. Kontakt a vaše práva',
        p: [
          'Provozovatel tohoto webu je uveden v [tiráži](/imprint/). Kontaktovat nás můžete na adrese {EMAIL}.',
          'Podle GDPR máte právo na přístup ke svým osobním údajům, jejich opravu, výmaz a omezení zpracování, právo na přenositelnost údajů a právo vznést námitku proti zpracování založenému na oprávněném zájmu. Máte také právo podat stížnost u dozorového úřadu pro ochranu osobních údajů. Protože Remove Online sám osobní údaje neshromažďuje, žádosti týkající se protokolů hostingu může být nutné směřovat na GitHub.',
        ],
      },
    ],
    updated: 'Poslední aktualizace: 28. října 2026',
    note: 'Toto je překlad. V případě rozporu platí anglická verze.',
  },

  imprint: {
    title: 'Tiráž',
    lead: 'Údaje o provozovateli tohoto webu podle německého práva.',
    country: 'Německo',
    contact: 'Kontakt',
    emailLabel: 'E-mail',
    guidesTitle: 'K návodům',
    guides: 'Návody poskytují obecné informace a nejsou právním ani odborným poradenstvím. Aplikace a weby třetích stran často mění své nabídky; pokud krok vypadá jinak, podívejte se do nápovědy příslušného poskytovatele.',
    note: 'Právně závazné jsou údaje podle § 5 DDG v německém znění.',
  },
};
