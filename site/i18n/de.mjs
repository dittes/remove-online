// Deutsch. Inline-Markup: `code`, **fett**, {Taste}, [Text](/pfad-oder-url). Blockreihenfolge wie in en.mjs.
export default {
  ui: {
    home: 'Remove Online – Startseite',
    mainNav: 'Hauptnavigation',
    language: 'Sprache',
    menu: 'Menü',
    skip: 'Zum Inhalt springen',
    tagline: 'Kostenlose Tools und Anleitungen zum Entfernen im Netz.',
    footerNav: 'Fußbereich',
    privacy: 'Datenschutz',
    imprint: 'Impressum',
    homeCrumb: 'Start',
    h1: 'Alles online entfernen.',
    sub: 'Kostenlose Tools und klare Anleitungen.',
    lead: 'Hintergrund, PDF-Seiten oder versteckte Fotodaten direkt im Browser entfernen – oder einer Anleitung für Konten, Dateien und Code folgen.',
    trust: 'Keine Cookies, kein Tracking.',
    popular: 'Beliebte Anleitungen',
    topics: 'Themen',
    whyTitle: 'So arbeiten diese Anleitungen',
    features: [
      { title: 'Erst die Bordmittel', text: 'Wir beginnen mit dem, was auf Ihrem Handy oder Computer schon vorhanden ist – Vorschau, Fotos, Word oder Ihr Browser –, bevor wir auf etwas anderes verweisen.' },
      { title: 'Ihre Dateien bleiben bei Ihnen', text: 'Keine Anleitung verlangt, dass Sie private Dokumente auf eine beliebige Website hochladen. Diese Seite selbst hat keine Cookies und kein Tracking.' },
      { title: 'Klare, ehrliche Schritte', text: 'Kurze nummerierte Schritte, die Warnung, die Sie vor dem Klick brauchen, und ein deutlicher Hinweis, wenn sich etwas nicht rückgängig machen lässt.' },
    ],
    homeTitle: 'Remove Online – kostenlose Tools und Anleitungen zum Entfernen im Netz',
    homeDescription: 'Kostenlose Browser-Tools und Anleitungen: Hintergründe, PDF-Seiten, Foto-Metadaten, doppelte Zeilen und mehr entfernen. Ohne Upload, Cookies und Tracking.',
    guideCount: (n) => (n === 1 ? '1 Anleitung' : `${n} Anleitungen`),
    warning: 'Achtung',
    tip: 'Tipp',
    faq: 'Fragen',
    related: 'Verwandte Anleitungen',
    goodToKnow: 'Gut zu wissen',
    disclaimer: 'Allgemeine Informationen, keine Rechts- oder Fachberatung. Apps ändern ihre Menüs oft; eine Schaltfläche kann in Ihrer Version etwas anders heißen.',
    notFound: 'Seite nicht gefunden – zur deutschen Website',
  },

  hubs: {
    accounts: { name: 'Konten & Geräte', blurb: 'Abmelden, entfernen und löschen', lead: 'Ein Konto vom Handy entfernen oder dauerhaft löschen, ohne sich selbst auszusperren.' },
    privacy: { name: 'Datenschutz & persönliche Daten', blurb: 'Verbergen, was nie öffentlich sein sollte', lead: 'Versteckte Daten aus Fotos und Dateien entfernen und persönliche Angaben aus Suchergebnissen löschen lassen.' },
    documents: { name: 'Dokumente & Tabellen', blurb: 'PDF, Word, Excel und Text', lead: 'Seiten, Passwörter, Duplikate und störende Zeilenumbrüche aus Dateien entfernen, die Sie täglich nutzen.' },
    media: { name: 'Fotos, Video & Audio', blurb: 'Hintergründe, Objekte, Wasserzeichen, Ton', lead: 'Hintergründe freistellen, Objekte entfernen und den Ton aus einem Video nehmen – meist mit Werkzeugen, die Sie schon haben.' },
    developer: { name: 'Entwicklung & Kommandozeile', blurb: 'Git, Docker und Linux', lead: 'Die Befehle zum Rückgängigmachen eines Commits, Aufräumen von Containern und Löschen von Ordnern – zuerst die sichere Variante.' },
  },

  guides: {
    'remove-google-account-from-phone': {
      title: 'Google-Konto vom Handy entfernen',
      short: 'Google-Konto vom Handy entfernen',
      lead: 'Durch das Entfernen wird das Konto auf diesem Gerät von Gmail, Play Store, Kontakten und Kalender abgemeldet. Das Konto selbst wird dabei **nicht** gelöscht.',
      sections: [
        {
          h: 'Auf Android',
          steps: [
            'Öffnen Sie die **Einstellungen**.',
            'Tippen Sie auf **Passwörter & Konten**. Bei manchen Handys heißt der Punkt **Konten** oder **Nutzer & Konten**.',
            'Tippen Sie auf das Google-Konto, das Sie entfernen möchten.',
            'Tippen Sie auf **Konto entfernen** und bestätigen Sie.',
            'Geben Sie bei Aufforderung Ihre Bildschirmsperre (PIN, Muster oder Passwort) ein.',
          ],
        },
        {
          h: 'Auf iPhone oder iPad',
          p: ['Wenn Sie das Konto in den iOS-Einstellungen hinzugefügt haben (Apple Mail, Kontakte, Kalender):'],
          steps: ['Öffnen Sie die **Einstellungen**, dann **Mail** und **Accounts**. Bei älteren iOS-Versionen heißt der Punkt **Passwörter & Accounts**.', 'Tippen Sie auf das Google-Konto.', 'Tippen Sie auf **Account löschen** und bestätigen Sie.'],
          after: ['Wenn Sie nur die Gmail- oder Google-App nutzen, tippen Sie dort auf Ihr Profilbild und wählen **Konten auf diesem Gerät verwalten**; entfernen Sie dort das Konto. Die Bezeichnungen unterscheiden sich je nach App leicht.'],
        },
      ],
      callout: { type: 'warning', text: 'Sie verkaufen oder verschenken ein Android-Handy? Entfernen Sie Ihr Google-Konto **vor** dem Zurücksetzen. Sonst kann der Zurücksetzungsschutz (Factory Reset Protection) den nächsten Besitzer nach Ihren Zugangsdaten fragen.' },
      faq: [
        ['Wird dadurch mein Google-Konto gelöscht?', 'Nein. Das Konto und seine Daten bleiben bei Google. Nur dieses Handy verliert den Zugriff.'],
        ['Warum gibt es keine Schaltfläche „Konto entfernen“?', 'Ein Arbeits- oder Schulkonto wird möglicherweise von Ihrer Organisation verwaltet, und nur der Administrator kann es entfernen. Bei manchen Handys hängt das Konto auch an einem Arbeitsprofil.'],
        ['Verliere ich Fotos und Kontakte?', 'Im Konto gespeicherte Daten bleiben im Konto. Nur auf dem Handy gespeicherte Einträge, etwa lokal gesicherte Kontakte, sind nicht betroffen. Prüfen Sie im Zweifel Ihr Backup.'],
      ],
    },

    'delete-instagram-account': {
      title: 'Instagram-Konto löschen',
      short: 'Instagram-Konto löschen',
      lead: 'Instagram bietet zwei Möglichkeiten: Das Konto **deaktivieren** (ausgeblendet, kann zurückkommen) oder **dauerhaft löschen**. Beim Löschen läuft zunächst eine Frist, in der Sie es sich noch anders überlegen können.',
      sections: [
        {
          h: 'Konto in der App löschen',
          steps: [
            'Öffnen Sie Instagram, gehen Sie zu Ihrem Profil und tippen Sie auf das Menü (☰).',
            'Tippen Sie auf **Kontenübersicht** und dann auf **Persönliche Daten**.',
            'Tippen Sie auf **Kontoinhaberschaft und -kontrolle** und dann auf **Deaktivierung oder Löschung**.',
            'Wählen Sie das Konto, dann **Konto löschen** und tippen Sie auf **Weiter**.',
            'Wählen Sie einen Grund, geben Sie Ihr Passwort ein und bestätigen Sie.',
          ],
        },
        { h: 'Vorher Ihre Daten herunterladen', p: ['Öffnen Sie in der **Kontenübersicht** den Punkt **Deine Informationen und Berechtigungen** und wählen Sie **Deine Informationen herunterladen**. Nach der Löschung lassen sich Fotos und Nachrichten nicht wiederherstellen.'] },
        { h: 'Was danach passiert', p: ['Instagram plant das Konto zur Löschung ein und hält es für eine Frist vor (derzeit etwa 30 Tage). Wenn Sie sich in dieser Zeit anmelden, wird die Löschung abgebrochen. Kopien in Backups können länger bestehen bleiben.'] },
      ],
      callout: { type: 'tip', text: 'Unsicher? Wählen Sie stattdessen **Deaktivieren**. Profil, Fotos und Likes bleiben ausgeblendet, bis Sie sich wieder anmelden.' },
      faq: [
        ['Kann ich die Löschung rückgängig machen?', 'Nur während der Frist, indem Sie sich erneut anmelden. Danach sind Konto und Inhalte weg.'],
        ['Wird mein Nutzername wieder frei?', 'Nach vollständiger Löschung kann der Nutzername von anderen vergeben werden. Beim Deaktivieren bleibt er reserviert.'],
      ],
    },

    'remove-metadata-from-photos': {
      title: 'Metadaten (EXIF) aus Fotos und Dokumenten entfernen',
      short: 'Metadaten aus Fotos entfernen',
      lead: 'Fotos können versteckte Daten enthalten: wo, wann und mit welchem Gerät sie aufgenommen wurden. So entfernen Sie diese Angaben, bevor Sie eine Datei weitergeben.',
      sections: [
        {
          h: 'Windows',
          steps: ['Klicken Sie mit der rechten Maustaste auf das Foto und wählen Sie **Eigenschaften**.', 'Öffnen Sie die Registerkarte **Details** und klicken Sie auf **Eigenschaften und persönliche Informationen entfernen**.', 'Wählen Sie **Kopie mit allen möglichen entfernten Eigenschaften erstellen** und klicken Sie auf **OK**.'],
        },
        {
          h: 'Mac',
          steps: ['Öffnen Sie das Foto in der **Vorschau**.', 'Wählen Sie **Werkzeuge**, dann **Informationen einblenden**, und öffnen Sie den Reiter **GPS**.', 'Klicken Sie auf **Standortinformationen entfernen**. Das entfernt nur den Ort, nicht die Kameradaten.'],
          after: ['In der Fotos-App können Sie auch **Ablage**, **Exportieren** wählen und vor dem Sichern **Standortinformationen** abwählen.'],
        },
        {
          h: 'iPhone',
          steps: ['Öffnen Sie das Foto in **Fotos** und tippen Sie auf „Teilen“.', 'Tippen Sie oben im Teilen-Menü auf **Optionen**.', 'Schalten Sie **Standort** (oder **Alle Fotodaten**) aus und teilen Sie wie gewohnt.'],
        },
        {
          h: 'Android',
          steps: ['Öffnen Sie das Foto in Google Fotos und wischen Sie nach oben, um die Details zu sehen.', 'Tippen Sie auf **Standort** und wählen Sie **Standort entfernen**.'],
        },
        { h: 'Office-Dokumente', p: ['Wählen Sie in Word, Excel oder PowerPoint **Datei**, **Informationen**, **Auf Probleme überprüfen**, **Dokument prüfen** und klicken Sie dann neben „Dokumenteigenschaften und persönliche Informationen“ auf **Alle entfernen**.'] },
      ],
      callout: { type: 'tip', text: 'Viele soziale Netzwerke entfernen Standortdaten beim Hochladen, E-Mail-Anhänge und Cloud-Links behalten meist alles. Entfernen Sie die Daten, bevor Sie senden.' },
      faq: [
        ['Was steckt genau in den Metadaten eines Fotos?', 'Meist Datum und Uhrzeit, Kamera- oder Handymodell, Aufnahmeeinstellungen und oft GPS-Koordinaten. Auch Bearbeitungsprogramme können ihren Namen eintragen.'],
        ['Entfernt ein Screenshot die Metadaten?', 'Ein Screenshot erhält eigene Metadaten und enthält nicht den ursprünglichen Standort. Das ist ein schneller Notbehelf, die Bildqualität ist aber geringer.'],
      ],
    },

    'remove-personal-info-from-google': {
      title: 'Persönliche Daten aus den Google-Suchergebnissen entfernen',
      short: 'Persönliche Daten aus Google entfernen',
      lead: 'Sie können Google bitten, Ergebnisse mit Ihrer Adresse, Telefonnummer oder ähnlichen Angaben nicht mehr anzuzeigen. Die Seite selbst bleibt online, solange Sie nicht auch deren Betreiber kontaktieren.',
      sections: [
        {
          h: 'Vorgehen',
          steps: [
            'Suchen Sie nach Ihrem Namen, Ihrer Adresse und Telefonnummer, um zu sehen, was derzeit sichtbar ist.',
            'Öffnen Sie das Google-Tool **Ergebnisse über Sie**: [support.google.com/websearch/answer/12719076](https://support.google.com/websearch/answer/12719076). In der Google-App finden Sie es unter Ihrem Profilbild.',
            'Tragen Sie die Kontaktdaten ein, die überwacht werden sollen, und prüfen Sie die gefundenen Ergebnisse.',
            'Öffnen Sie neben einem Ergebnis das Menü (⋮), wählen Sie **Ergebnis entfernen** und beantworten Sie die Fragen.',
            'Wenn ein Ergebnis dort nicht abgedeckt ist, nutzen Sie Googles Hilfeformular „Informationen aus Google entfernen“ und beschreiben Sie die Seite.',
          ],
        },
        { h: 'An der Quelle entfernen', p: ['Google blendet das Ergebnis nur aus. Damit der Inhalt aus dem Internet verschwindet, bitten Sie den Betreiber oder Host der Website, die Seite zu löschen. Ist sie weg, verschwindet auch das Suchergebnis.'] },
        { h: 'Wenn Sie in der EU leben', p: ['Sie können sich außerdem auf Ihr Recht auf Löschung berufen (Art. 17 DSGVO, „Recht auf Vergessenwerden“) und das rechtliche Löschformular von Google für Europa nutzen. Google wägt Ihre Privatsphäre gegen das öffentliche Interesse ab und kann ablehnen.'] },
      ],
      callout: { type: 'warning', text: 'Bewahren Sie die Bestätigungs-Mails und die Links zu den gemeldeten Seiten auf. Sie brauchen sie, falls Sie gegen eine Entscheidung Einspruch einlegen müssen.' },
      faq: [
        ['Wie lange dauert das?', 'Google prüft jede Anfrage einzeln, die Dauer schwankt. Sie erhalten eine E-Mail, sobald entschieden wurde.'],
        ['Und Bing und andere Suchmaschinen?', 'Jede Suchmaschine hat ein eigenes Formular zum Entfernen. Das Entfernen bei Google gilt dort nicht.'],
      ],
    },

    'remove-pages-from-pdf': {
      title: 'Seiten aus einem PDF entfernen',
      short: 'Seiten aus einem PDF entfernen',
      lead: 'Sie müssen nichts installieren und kein Dokument hochladen. Ihr Mac, Ihr Browser oder Adobe Acrobat können Seiten direkt aus einem PDF löschen.',
      sections: [
        {
          h: 'Auf dem Mac mit der Vorschau',
          steps: ['Öffnen Sie das PDF in der **Vorschau**.', 'Wählen Sie **Darstellung**, dann **Miniaturen**.', 'Klicken Sie die Seite an, die Sie löschen möchten (mit {⌘} wählen Sie mehrere aus).', 'Drücken Sie {Entf} und sichern Sie mit {⌘} + {S}.'],
        },
        {
          h: 'Unter Windows, Mac oder Linux mit Chrome oder Edge',
          steps: ['Öffnen Sie das PDF im Browser und drücken Sie {Strg} + {P} (am Mac {⌘} + {P}).', 'Wählen Sie als Ziel **Als PDF speichern**.', 'Wählen Sie unter **Seiten** die Option **Benutzerdefiniert** und geben Sie die Seiten ein, die Sie **behalten** möchten, zum Beispiel `1-3, 5-8`.', 'Klicken Sie auf **Speichern**. Es entsteht eine neue Datei, das Original bleibt unverändert.'],
        },
        {
          h: 'In Adobe Acrobat',
          steps: ['Wählen Sie **Tools**, dann **Seiten organisieren**.', 'Markieren Sie die unerwünschten Miniaturen und klicken Sie auf das Papierkorb-Symbol.', 'Speichern Sie die Datei.'],
        },
      ],
      callout: { type: 'tip', text: 'Über den Druckdialog geht es am schnellsten, dabei können aber Links, Lesezeichen und Formularfelder verloren gehen. Nutzen Sie dafür die Vorschau oder Acrobat.' },
      faq: [
        ['Ist es sicher, dafür eine Website zu nutzen?', 'Kostenlose Web-Tools laden Ihre Datei auf ihren Server hoch. Bei Verträgen, Ausweisen oder allem Privaten nutzen Sie besser eine der Offline-Methoden oben.'],
        ['Kann ich Seiten aus einem geschützten PDF entfernen?', 'Erst nach dem Entsperren. Siehe [Passwort aus einem PDF entfernen](/documents/remove-password-from-pdf/).'],
      ],
    },

    'remove-password-from-pdf': {
      title: 'Passwort aus einem PDF entfernen',
      short: 'Passwort aus einem PDF entfernen',
      lead: 'Wenn Sie das Passwort kennen und die Datei öffnen dürfen, können Sie eine entsperrte Kopie speichern, damit Sie es nicht mehr eingeben müssen.',
      sections: [
        {
          h: 'Mit Chrome oder Edge',
          steps: ['Öffnen Sie das PDF im Browser und geben Sie das Passwort ein.', 'Drücken Sie {Strg} + {P} (am Mac {⌘} + {P}).', 'Wählen Sie als Ziel **Als PDF speichern** und klicken Sie auf **Speichern**.', 'Die neue Datei lässt sich ohne Passwort öffnen.'],
        },
        {
          h: 'Mit der Vorschau am Mac',
          steps: ['Öffnen Sie das PDF und geben Sie das Passwort ein.', 'Wählen Sie **Ablage**, dann **Als PDF exportieren …** und sichern Sie eine Kopie.'],
        },
        {
          h: 'Mit Adobe Acrobat',
          steps: ['Öffnen Sie das PDF und geben Sie das Passwort ein.', 'Wählen Sie **Datei**, dann **Eigenschaften**, und öffnen Sie die Registerkarte **Sicherheit**.', 'Stellen Sie **Sicherheitsmethode** auf **Kein Schutz**, klicken Sie auf **OK** und speichern Sie.'],
        },
      ],
      callout: { type: 'warning', text: 'Das funktioniert nur, wenn Sie das Passwort kennen. Ein vergessenes Passwort lässt sich nicht wiederherstellen; fragen Sie den Ersteller oder Absender. Entfernen Sie keine Beschränkungen von Dokumenten, die Sie nicht nutzen dürfen.' },
      faq: [
        ['Was ist der Unterschied zwischen den zwei PDF-Passwörtern?', 'Ein **Öffnen-Passwort** brauchen Sie, um die Datei anzusehen. Ein **Berechtigungs-Passwort** beschränkt nur Drucken oder Kopieren. Die Schritte oben gehen von einer Datei aus, die Sie bereits öffnen können.'],
        ['Sieht die neue Kopie genauso aus?', 'Beim Drucken als PDF können Lesezeichen und Formularfelder verloren gehen. Vorschau und Acrobat behalten sie.'],
      ],
    },

    'remove-page-from-word': {
      title: 'Eine Seite in Word löschen',
      short: 'Eine Seite in Word löschen',
      lead: 'Markieren Sie alles auf der Seite und löschen Sie es. Bleibt eine leere Seite hartnäckig bestehen, steckt meist eine versteckte Absatzmarke oder ein Seitenumbruch dahinter.',
      sections: [
        {
          h: 'Eine Seite mit Inhalt löschen',
          steps: ['Klicken Sie irgendwo auf die Seite, die Sie löschen möchten.', 'Drücken Sie {Strg} + {G} (Mac: {⌥} + {⌘} + {G}), um **Gehe zu** zu öffnen.', 'Geben Sie `\\page` ein, drücken Sie {Enter} und dann **Schließen**. Die ganze Seite ist markiert.', 'Drücken Sie {Entf}.'],
        },
        {
          h: 'Leere Seite am Ende löschen',
          steps: ['Drücken Sie {Strg} + {Umschalt} + {8} (Mac: {⌘} + {8}), um Absatzmarken (¶) anzuzeigen.', 'Markieren Sie die überzähligen Absatzmarken oder die Zeile **Seitenumbruch** auf der leeren Seite.', 'Drücken Sie {Entf}, bis die Seite verschwunden ist.'],
          after: ['Folgt die leere Seite auf eine Tabelle, lässt sich die letzte Absatzmarke nicht löschen. Markieren Sie sie und stellen Sie die Schriftgröße auf 1 pt, oder blenden Sie sie mit {Strg} + {D}, **Ausgeblendet** aus.'],
        },
        { h: 'In Google Docs', p: ['Markieren Sie den Text auf der Seite und drücken Sie {Entf}. Bleibt eine leere Seite, prüfen Sie unter **Einfügen**, **Umbruch** auf einen ungewollten Seitenumbruch oder verkleinern Sie den Abstand vor dem letzten Absatz.'] },
      ],
      callout: { type: 'tip', text: 'Speichern Sie vor dem Löschen eine Kopie. Mit „Rückgängig“ ({Strg} + {Z}) kommt die Seite ebenfalls zurück.' },
      faq: [
        ['Warum erscheint eine leere Seite hinter meiner Tabelle?', 'Word braucht nach einer Tabelle einen Absatz. Endet die Tabelle genau am Seitenende, rutscht dieser Absatz auf die nächste Seite.'],
        ['Ändern sich durch das Löschen die Seitenzahlen?', 'Ja. Die folgenden Seiten rücken nach, die Nummerierung wird automatisch aktualisiert.'],
      ],
    },

    'remove-duplicates-in-excel': {
      title: 'Duplikate in Excel entfernen',
      short: 'Duplikate in Excel entfernen',
      lead: 'Excel kann doppelte Zeilen mit zwei Klicks löschen – oder Ihre Liste unangetastet lassen und eine bereinigte Kopie anzeigen.',
      sections: [
        {
          h: 'Doppelte Zeilen löschen',
          steps: ['Klicken Sie in eine Zelle Ihrer Daten (oder markieren Sie den Bereich).', 'Öffnen Sie die Registerkarte **Daten** und klicken Sie auf **Duplikate entfernen**.', 'Wählen Sie die Spalten aus, die übereinstimmen müssen, damit eine Zeile als Duplikat gilt.', 'Klicken Sie auf **OK**. Excel zeigt an, wie viele Duplikate entfernt wurden.'],
        },
        {
          h: 'Original behalten (Microsoft 365)',
          p: ['Die Funktion EINDEUTIG (englisch UNIQUE) liefert eine bereinigte Liste, ohne Ihre Daten zu verändern:'],
          code: '=EINDEUTIG(A2:A100)',
        },
        {
          h: 'Duplikate vor dem Löschen finden',
          steps: ['Markieren Sie die Spalte.', 'Wählen Sie **Start**, **Bedingte Formatierung**, **Regeln zum Hervorheben von Zellen**, **Doppelte Werte**.', 'Prüfen Sie die markierten Zellen.'],
        },
        { h: 'In Google Tabellen', p: ['Markieren Sie den Bereich und wählen Sie **Daten**, **Datenbereinigung**, **Duplikate entfernen**.'] },
      ],
      callout: { type: 'warning', text: '„Duplikate entfernen“ löscht Zeilen sofort. Arbeiten Sie an einer Kopie der Tabelle oder drücken Sie bei falschem Ergebnis gleich {Strg} + {Z}.' },
      faq: [
        ['Warum gelten „gleiche“ Zellen nicht als Duplikate?', 'Leerzeichen am Ende und unterschiedliche Groß-/Kleinschreibung können Zellen unterscheiden. Bereinigen Sie sie vorher mit `=GLÄTTEN(A2)`.'],
        ['Bleibt der erste oder der letzte Eintrag erhalten?', 'Excel behält das erste Vorkommen und entfernt die späteren.'],
      ],
    },

    'remove-line-breaks': {
      title: 'Zeilenumbrüche aus Text, Word und Excel entfernen',
      short: 'Zeilenumbrüche entfernen',
      lead: 'Text kopiert, bei dem jede Zeile mit hartem Umbruch endet? Ersetzen Sie die Umbrüche in wenigen Sekunden durch ein Leerzeichen.',
      sections: [
        {
          h: 'In Word',
          steps: ['Drücken Sie {Strg} + {H}, um **Suchen und Ersetzen** zu öffnen.', 'Klicken Sie auf **Mehr >>**, dann auf **Sonstiges** und **Absatzmarke**. Damit wird `^p` eingetragen.', 'Lassen Sie bei **Ersetzen durch** ein einzelnes Leerzeichen stehen.', 'Klicken Sie auf **Alle ersetzen**.'],
        },
        {
          h: 'In Excel',
          steps: ['Markieren Sie die Zellen und drücken Sie {Strg} + {H}.', 'Klicken Sie in **Suchen nach** und drücken Sie {Strg} + {J}. Ein winziger Punkt erscheint.', 'Geben Sie bei **Ersetzen durch** ein Leerzeichen ein und klicken Sie auf **Alle ersetzen**.'],
          p: ['Oder nutzen Sie eine Formel in einer Hilfsspalte:'],
          code: '=WECHSELN(A1;ZEICHEN(10);" ")',
        },
        {
          h: 'In jedem Editor mit regulären Ausdrücken',
          p: ['Aktivieren Sie bei „Suchen und Ersetzen“ die Option „Regex“, suchen Sie nach dem folgenden Muster und ersetzen Sie es durch ein Leerzeichen:'],
          code: '\\r?\\n',
        },
      ],
      callout: { type: 'tip', text: 'Wenn Absätze erhalten bleiben sollen, ersetzen Sie nur einzelne Umbrüche und lassen Leerzeilen stehen. Suchen Sie zuerst zwei Umbrüche, tauschen Sie sie gegen einen Platzhalter und stellen Sie sie danach wieder her.' },
      faq: [
        ['Was ist der Unterschied zwischen Zeilenumbruch und Absatzmarke?', 'In Word erzeugt {Umschalt} + {Enter} einen Zeilenumbruch (`^l`), {Enter} eine Absatzmarke (`^p`). Suchen Sie nach dem, was tatsächlich im Text steht.'],
        ['Kann ich auch leere Zeilen entfernen?', 'Ja. Ersetzen Sie zwei Absatzmarken (`^p^p`) durch eine (`^p`) und wiederholen Sie das, bis nichts mehr gefunden wird.'],
      ],
    },

    'remove-background-from-image': {
      title: 'Hintergrund aus einem Bild entfernen',
      short: 'Hintergrund aus einem Bild entfernen',
      lead: 'Die meisten Handys und Office-Programme können ein Motiv inzwischen selbst freistellen. Speichern Sie das Ergebnis als PNG, damit der Hintergrund transparent bleibt.',
      sections: [
        {
          h: 'iPhone und iPad',
          steps: ['Öffnen Sie das Foto in **Fotos**.', 'Halten Sie das Motiv gedrückt, bis es aufleuchtet.', 'Tippen Sie auf **Kopieren** oder **Teilen** und fügen Sie es in Notizen, Nachrichten oder einer Bearbeitungs-App ein. Erfordert iOS 16 oder neuer.'],
        },
        {
          h: 'Mac',
          steps: ['Öffnen Sie das Bild in der **Vorschau** und wählen Sie **Werkzeuge**, dann **Hintergrund entfernen**. In neueren macOS-Versionen können Sie die Datei auch im Finder mit der rechten Maustaste anklicken und **Schnellaktionen**, **Hintergrund entfernen** wählen.'],
        },
        {
          h: 'Windows',
          steps: ['Öffnen Sie das Bild in **Paint**.', 'Klicken Sie in der Gruppe „Bild“ auf **Hintergrund entfernen**.', 'Speichern Sie als PNG.'],
        },
        {
          h: 'Word, PowerPoint und Excel',
          steps: ['Klicken Sie auf das Bild, dann auf **Bildformat** und **Hintergrund entfernen**.', 'Markieren Sie Bereiche, die bleiben oder verschwinden sollen, und wählen Sie **Änderungen beibehalten**.'],
        },
      ],
      callout: { type: 'tip', text: 'Fotos mit klarem Kontrast zwischen Motiv und Hintergrund funktionieren am besten. Feine Details wie Haare brauchen eventuell Handarbeit.' },
      faq: [
        ['Welches Dateiformat behält die Transparenz?', 'PNG (oder WebP). JPG kann keine Transparenz speichern und füllt den Bereich weiß.'],
        ['Ist ein Online-Tool zum Freistellen sicher?', 'Die meisten laden Ihr Bild auf ihre Server hoch. Bei privaten Fotos oder Kundenfotos nutzen Sie besser die eingebauten Werkzeuge oben.'],
      ],
    },

    'remove-object-from-photo': {
      title: 'Objekt oder Person aus einem Foto entfernen',
      short: 'Objekt aus einem Foto entfernen',
      lead: 'Galerie-Apps haben heute einen Radierer, der die Lücke automatisch füllt. Hier finden Sie ihn und erfahren, wie das Ergebnis sauber wird.',
      sections: [
        {
          h: 'Wo Sie den Radierer finden',
          p: ['Bezeichnung und Verfügbarkeit hängen von Handy, Systemversion und Region ab.'],
          steps: [
            '**Google Fotos:** Foto öffnen, **Bearbeiten**, **Tools**, dann **Magischer Radierer** (Magic Eraser).',
            '**Samsung Galaxy:** Foto in der Galerie öffnen, auf den Stift tippen und die Option **Objektradierer** wählen.',
            '**iPhone:** Auf Modellen mit Apple Intelligence in Fotos auf **Bearbeiten** tippen und **Bereinigen** (Clean Up) wählen.',
            '**Windows:** Auf unterstützten PCs bietet die Fotos-App **Generatives Löschen** (Generative erase).',
            '**Photoshop:** Nutzen Sie das **Entfernen-Werkzeug** oder **Generative Füllung**.',
          ],
        },
        { h: 'So wird das Ergebnis sauber', steps: ['Zoomen Sie hinein und malen oder umkreisen Sie das Objekt samt Schatten.', 'Entfernen Sie zuerst Kleinigkeiten. Große Objekte vor unruhigem Hintergrund lassen sich schwer überzeugend füllen.', 'Wenden Sie an, prüfen Sie die Ränder und machen Sie es rückgängig, wenn die Füllung verschmiert aussieht.'] },
        { h: 'Kostenlose Option am Computer', p: ['GIMP ist kostenlos und hat ein **Heilen**-Werkzeug sowie das Plug-in Resynthesizer zum Füllen von Lücken. Es erfordert mehr Handarbeit als der Radierer am Handy.'] },
      ],
      callout: { type: 'warning', text: 'Bearbeiten Sie nur Ihre eigenen Bilder oder solche, die Sie ändern dürfen. Personen oder Objekte zu entfernen, um andere zu täuschen – etwa bei Beweis- oder Nachrichtenfotos –, ist nicht in Ordnung.' },
      faq: [
        ['Bleibt das Originalfoto erhalten?', 'Die meisten Apps speichern die Bearbeitung als Kopie oder lassen sich zurücksetzen. Prüfen Sie das, bevor Sie überschreiben.'],
        ['Warum sieht das Ergebnis unscharf aus?', 'Das Werkzeug muss die fehlenden Pixel erfinden. Einfache Hintergründe wie Himmel, Gras oder Wände funktionieren am besten.'],
      ],
    },

    'remove-audio-from-video': {
      title: 'Ton aus einem Video entfernen',
      short: 'Ton aus einem Video entfernen',
      lead: 'Schalten Sie ein Video dauerhaft stumm, sodass die exportierte Datei keine Tonspur mehr hat – mit dem Handy oder einem kostenlosen Programm.',
      sections: [
        {
          h: 'iPhone',
          steps: ['Öffnen Sie das Video in **Fotos** und tippen Sie auf **Bearbeiten**.', 'Tippen Sie oben links auf das gelbe Lautsprecher-Symbol, sodass es durchgestrichen ist.', 'Tippen Sie auf **Fertig**.'],
        },
        {
          h: 'Android (Google Fotos)',
          steps: ['Öffnen Sie das Video und tippen Sie auf **Bearbeiten**.', 'Tippen Sie auf das Lautsprecher-Symbol, um den Ton stummzuschalten.', 'Tippen Sie auf **Kopie speichern**.'],
        },
        {
          h: 'Mac (iMovie)',
          steps: ['Ziehen Sie den Clip auf die Zeitleiste.', 'Wählen Sie **Ändern**, dann **Audio trennen**.', 'Wählen Sie die grüne Audioleiste, drücken Sie {Entf} und exportieren Sie.'],
        },
        {
          h: 'Kommandozeile (FFmpeg)',
          p: ['Das kopiert das Bild ohne Neukodierung und lässt den Ton weg:'],
          code: 'ffmpeg -i input.mp4 -c copy -an output.mp4',
        },
      ],
      callout: { type: 'tip', text: 'Stummschalten im Player dämpft nur die Wiedergabe. Um ein Video ganz ohne Ton weiterzugeben, exportieren Sie wie oben beschrieben eine neue Datei.' },
      faq: [
        ['Ändert sich die Videoqualität?', 'Mit dem FFmpeg-Befehl oben nicht. Handy-Editoren kodieren das Video unter Umständen leicht neu.'],
        ['Kann ich den Ton stattdessen ersetzen?', 'Ja. Entfernen Sie zuerst die Originalspur und fügen Sie im selben Editor Musik oder einen Sprechertext hinzu.'],
      ],
    },

    'remove-watermark': {
      title: 'Wasserzeichen entfernen (rechtmäßig)',
      short: 'Wasserzeichen entfernen',
      lead: 'Ein Wasserzeichen aus Ihrem **eigenen** Dokument oder einem Probe-Export zu entfernen, ist in Ordnung. Das Wasserzeichen eines anderen aus einem Bild oder Video zu entfernen, meist nicht. Das funktioniert und das können Sie stattdessen tun.',
      sections: [
        {
          h: 'Wasserzeichen im eigenen Word-Dokument',
          steps: ['Öffnen Sie die Registerkarte **Entwurf**.', 'Klicken Sie auf **Wasserzeichen**.', 'Wählen Sie **Wasserzeichen entfernen**.'],
        },
        {
          h: 'Wasserzeichen im eigenen PDF',
          steps: ['Öffnen Sie das PDF in Adobe Acrobat.', 'Wählen Sie **PDF bearbeiten**, dann **Wasserzeichen**, dann **Entfernen**.'],
        },
        {
          h: 'Wasserzeichen aus einer App oder Testversion',
          p: ['Videoeditoren, Design-Apps und Konvertierungstools fügen im kostenlosen Tarif oft ein Logo ein. Sauber wird man es durch ein Upgrade, den kostenpflichtigen Export oder einen erneuten Export aus dem Originalprojekt in einer App, die keine Markierung setzt.'],
        },
        {
          h: 'Ein Foto oder Video, das jemand anderem gehört',
          p: ['Ein Wasserzeichen kennzeichnet den Inhaber. Schneiden Sie es nicht ab und übermalen Sie es nicht. Stattdessen:'],
          steps: ['Bitten Sie den Inhaber um eine saubere Kopie oder um Erlaubnis.', 'Kaufen Sie bei der Bildagentur eine Lizenz für die Version ohne Wasserzeichen.', 'Nutzen Sie frei verwendbare Bilder, etwa von Wikimedia Commons oder aus anderen gemeinfreien und Creative-Commons-Quellen, und nennen Sie die Quelle wie verlangt.'],
        },
      ],
      callout: { type: 'warning', text: 'In vielen Ländern kann das Entfernen von Urheberrechtsinformationen wie einem Wasserzeichen rechtswidrig sein, etwa nach § 95c UrhG in Deutschland oder § 1202 des US-amerikanischen DMCA oder Art. 7 der EU-Richtlinie 2001/29/EG. Das ist eine allgemeine Information, keine Rechtsberatung.' },
      faq: [
        ['Kann ich ein KI-Wasserzeichen oder -Label entfernen?', 'Kennzeichnungen, die Inhalte als KI-generiert ausweisen, sollen verhindern, dass andere getäuscht werden. Wie man sie versteckt, beschreiben wir nicht.'],
        ['Was, wenn ich das Original ohne Wasserzeichen verloren habe?', 'Prüfen Sie Ihr Cloud-Backup, gesendete E-Mails oder den Export-Verlauf der App. Haben Sie von Ihrer eigenen Arbeit nur eine Kopie mit Wasserzeichen, wenden Sie sich an den Support des Tools.'],
      ],
    },

    'remove-last-git-commit': {
      title: 'Den letzten Commit in Git entfernen',
      short: 'Letzten Git-Commit entfernen',
      lead: 'Der richtige Befehl hängt von einer Frage ab: Haben Sie den Commit schon gepusht? Beginnen Sie mit den sicheren Varianten.',
      sections: [
        {
          h: 'Noch nicht gepusht: Commit zurücknehmen, Änderungen behalten',
          code: 'git reset --soft HEAD~1',
          after: ['Der Commit ist weg, seine Änderungen sind wieder vorgemerkt (staged). Mit `git reset HEAD~1` nehmen Sie sie auch aus der Vormerkung.'],
        },
        {
          h: 'Noch nicht gepusht: Commit zurücknehmen und Änderungen verwerfen',
          code: 'git reset --hard HEAD~1',
        },
        {
          h: 'Bereits auf einen gemeinsamen Branch gepusht',
          p: ['Erstellen Sie einen neuen Commit, der den alten umkehrt. Die Historie bleibt für alle erhalten:'],
          code: 'git revert HEAD\ngit push',
        },
        {
          h: 'Nur die Nachricht ist falsch',
          code: 'git commit --amend',
        },
        {
          h: 'Einen gepushten Branch umschreiben, der Ihnen gehört',
          p: ['Nur wenn niemand sonst den Branch nutzt:'],
          code: 'git reset --hard HEAD~1\ngit push --force-with-lease',
        },
      ],
      callout: { type: 'warning', text: '`--hard` löscht nicht committete Arbeit. Haben Sie versehentlich einen Commit entfernt, listet `git reflog` die letzten Zustände, und `git reset --hard <hash>` bringt Sie zurück.' },
      faq: [
        ['Was bedeutet HEAD~1?', 'Es zeigt auf den Commit vor dem aktuellen. `HEAD~3` geht drei Commits zurück.'],
        ['Warum ist Force-Push riskant?', 'Er überschreibt die Historie im Remote. Kolleginnen und Kollegen, die den alten Commit schon gezogen haben, bekommen Konflikte.'],
      ],
    },

    'remove-docker-images-and-containers': {
      title: 'Docker-Images und -Container entfernen',
      short: 'Docker-Images und -Container entfernen',
      lead: 'Stoppen und entfernen Sie zuerst Container, dann Images. Prune-Befehle räumen in großen Mengen auf – lesen Sie, was sie löschen werden.',
      sections: [
        {
          h: 'Einen Container entfernen',
          code: 'docker ps -a\ndocker stop <container>\ndocker rm <container>',
          after: ['Mit `docker rm -f <container>` stoppen und entfernen Sie einen laufenden Container in einem Schritt.'],
        },
        {
          h: 'Ein Image entfernen',
          code: 'docker images\ndocker rmi <image>',
          after: ['Docker verweigert das Entfernen eines Images, das noch von einem Container genutzt wird – entfernen Sie zuerst diesen Container.'],
        },
        {
          h: 'Gesammelt aufräumen',
          code: 'docker container prune\ndocker image prune\ndocker system prune',
          after: ['`docker system prune` entfernt gestoppte Container, ungenutzte Netzwerke, „dangling“ Images und den Build-Cache. Mit `-a` entfernen Sie alle ungenutzten Images, mit `--volumes` auch Volumes.'],
        },
      ],
      callout: { type: 'warning', text: 'Volumes enthalten Daten wie Datenbanken. Sie werden nur mit `--volumes` entfernt, und das lässt sich nicht rückgängig machen.' },
      faq: [
        ['Was ist ein „dangling“ Image?', 'Ein Image ohne Tag, meist übrig geblieben, wenn Sie ein Image unter demselben Namen neu gebaut haben.'],
        ['Wie entferne ich alles?', 'Mit `docker rm -f $(docker ps -aq)` alle Container, danach mit `docker rmi $(docker images -q)` alle Images. Prüfen Sie vorher die Listen.'],
      ],
    },

    'remove-directory-linux': {
      title: 'Ein Verzeichnis unter Linux löschen',
      short: 'Ein Verzeichnis unter Linux löschen',
      lead: 'Auf der Kommandozeile gibt es keinen Papierkorb. Wissen Sie, welchen Befehl Sie brauchen, und prüfen Sie den Pfad, bevor Sie Enter drücken.',
      sections: [
        { h: 'Ein leeres Verzeichnis', code: 'rmdir meinordner' },
        { h: 'Ein Verzeichnis mit Dateien', code: 'rm -r meinordner', after: ['Mit `-i` werden Sie vor jedem Löschen gefragt: `rm -ri meinordner`.'] },
        { h: 'Ohne Rückfragen', code: 'rm -rf meinordner', after: ['`-f` überspringt Nachfragen und ignoriert fehlende Dateien. Nutzen Sie es nur, wenn Sie sicher sind.'] },
        { h: 'Passende Ordner überall löschen', p: ['Zum Beispiel jeden `node_modules`-Ordner unterhalb des aktuellen Verzeichnisses (zuerst mit `-print` prüfen):'], code: 'find . -name node_modules -type d -prune -print\nfind . -name node_modules -type d -prune -exec rm -rf {} +' },
      ],
      callout: { type: 'warning', text: 'Führen Sie nie `rm -rf /` aus und fügen Sie keine Befehle ein, die Sie nicht verstehen. Ein verirrtes Leerzeichen wie in `rm -rf / home` ändert die Bedeutung völlig. Prüfen Sie den Pfad vorher mit `ls`.' },
      faq: [
        ['Warum erhalte ich „Permission denied“?', 'Das Verzeichnis gehört Ihnen nicht. Prüfen Sie es mit `ls -ld meinordner`. Nutzen Sie `sudo` nur, wenn Sie sicher sind, dass der Pfad stimmt.'],
        ['Bekomme ich die Dateien zurück?', 'Meist nicht. Gelöschte Dateien landen nicht im Papierkorb. Stellen Sie sie aus einem Backup wieder her.'],
      ],
    },
  },

  privacy: {
    title: 'Datenschutz',
    lead: 'Kurz gesagt: Diese Website besteht aus statischen Seiten. Es gibt keine Benutzerkonten, keine Cookies und keine Analyse-Tools.',
    sections: [
      {
        h: '1. Besuch der Website',
        p: [
          'Die Website besteht aus statischen Dateien, die auf GitHub Pages gehostet werden, einem Dienst der GitHub, Inc. (USA). Beim Laden einer Seite sendet Ihr Browser eine Anfrage an die Server von GitHub. Wie jeder Webserver verarbeitet GitHub dabei technische Daten, um die Seite auszuliefern und den Dienst abzusichern – insbesondere Ihre IP-Adresse, die angefragte Adresse, Datum und Uhrzeit sowie den User-Agent Ihres Browsers. GitHub kann diese Daten in Server-Logs speichern. Wir haben keinen Zugriff auf diese Logs und nutzen sie nicht.',
          'Diese Verarbeitung ist für die Auslieferung der Website erforderlich und beruht auf unserem berechtigten Interesse an einer funktionierenden und sicheren Website (Art. 6 Abs. 1 lit. f DSGVO). GitHub kann Daten in den USA verarbeiten. Weitere Informationen finden Sie im [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).',
        ],
      },
      {
        h: '2. Keine Cookies, keine Analyse',
        p: ['Remove Online setzt keine Cookies, nutzt keine Analyse- oder Tracking-Tools und hat keine Benutzerkonten. Schriften und der gesamte Code werden von der Website selbst ausgeliefert; es werden keine Content-Delivery-Netzwerke oder Drittdienste kontaktiert. Die Website enthält keine Formulare und fragt keine personenbezogenen Daten ab.'],
      },
      {
        h: '3. Links zu anderen Websites',
        p: ['Die Anleitungen verlinken auf andere Websites, zum Beispiel auf Hilfeseiten von Google. Wenn Sie einem solchen Link folgen, gilt die Datenschutzerklärung der jeweiligen Website. Auf deren Datenverarbeitung haben wir keinen Einfluss.'],
      },
      {
        h: '4. Kontakt und Ihre Rechte',
        p: [
          'Wer für diese Website verantwortlich ist, steht im [Impressum](/imprint/). Sie erreichen uns unter {EMAIL}.',
          'Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten, das Recht auf Datenübertragbarkeit und das Recht, einer auf berechtigten Interessen beruhenden Verarbeitung zu widersprechen. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Da Remove Online selbst keine personenbezogenen Daten erhebt, sind Anfragen zu Hosting-Logs gegebenenfalls an GitHub zu richten.',
        ],
      },
    ],
    updated: 'Stand: 28. Oktober 2026',
  },

  imprint: {
    title: 'Impressum',
    lead: 'Angaben zum Anbieter dieser Website nach deutschem Recht.',
    country: 'Deutschland',
    contact: 'Kontakt',
    emailLabel: 'E-Mail',
    guidesTitle: 'Zu den Anleitungen',
    guides: 'Die Anleitungen geben allgemeine Informationen und sind keine Rechts- oder Fachberatung. Apps und Websites Dritter ändern ihre Menüs häufig; sieht ein Schritt anders aus, hilft die Hilfeseite des jeweiligen Anbieters.',
  },
};
