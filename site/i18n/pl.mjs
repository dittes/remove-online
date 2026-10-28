// Polski. Znaczniki w tekście: `kod`, **pogrubienie**, {Klawisz}, [tekst](/ścieżka-lub-url). Kolejność bloków jak w en.mjs.
export default {
  ui: {
    home: 'Remove Online – strona główna',
    mainNav: 'Nawigacja główna',
    language: 'Język',
    menu: 'Menu',
    skip: 'Przejdź do treści',
    tagline: 'Darmowe narzędzia i poradniki, jak usuwać rzeczy z internetu.',
    footerNav: 'Stopka',
    privacy: 'Prywatność',
    imprint: 'Nota prawna',
    homeCrumb: 'Start',
    h1: 'Usuń wszystko w sieci.',
    sub: 'Darmowe narzędzia i czytelne poradniki.',
    lead: 'Usuń tło, strony z PDF lub ukryte dane ze zdjęć prosto w przeglądarce albo skorzystaj z poradnika dotyczącego kont, plików i kodu.',
    trust: 'Bez plików cookie, bez śledzenia.',
    popular: 'Popularne poradniki',
    topics: 'Tematy',
    whyTitle: 'Jak działają te poradniki',
    features: [
      { title: 'Najpierw wbudowane narzędzia', text: 'Zaczynamy od tego, co już jest na Twoim telefonie lub komputerze – Podglądu, Zdjęć, Worda czy przeglądarki – zanim wskażemy cokolwiek innego.' },
      { title: 'Twoje pliki zostają Twoje', text: 'Żaden poradnik nie każe wysyłać prywatnego dokumentu na przypadkową stronę. A ta strona nie ma plików cookie ani śledzenia.' },
      { title: 'Proste, uczciwe kroki', text: 'Krótkie numerowane kroki, ostrzeżenie, którego potrzebujesz przed kliknięciem, i wyraźna informacja, gdy czegoś nie da się cofnąć.' },
    ],
    homeTitle: 'Remove Online – darmowe narzędzia i poradniki, jak usuwać rzeczy z internetu',
    homeDescription: 'Darmowe narzędzia w przeglądarce i poradniki: usuwanie tła, stron z PDF, metadanych zdjęć, zduplikowanych wierszy i więcej. Bez przesyłania, plików cookie i śledzenia.',
    guideCount: (n) => {
      if (n === 1) return '1 poradnik';
      const last = n % 10;
      const teen = n % 100 >= 12 && n % 100 <= 14;
      return last >= 2 && last <= 4 && !teen ? `${n} poradniki` : `${n} poradników`;
    },
    warning: 'Uwaga',
    tip: 'Wskazówka',
    faq: 'Pytania',
    related: 'Powiązane poradniki',
    goodToKnow: 'Warto wiedzieć',
    disclaimer: 'Informacje ogólne, nie porada prawna ani specjalistyczna. Aplikacje często zmieniają menu, więc przycisk w Twojej wersji może nazywać się nieco inaczej.',
    notFound: 'Nie znaleziono strony – przejdź do polskiej wersji',
  },

  hubs: {
    accounts: { name: 'Konta i urządzenia', blurb: 'Wylogować, usunąć i skasować', lead: 'Usuń konto z telefonu albo skasuj je na stałe, nie blokując sobie dostępu.' },
    privacy: { name: 'Prywatność i dane osobowe', blurb: 'Ukryj to, co nigdy nie miało być publiczne', lead: 'Usuń ukryte dane ze zdjęć i plików oraz zadbaj, by dane osobowe zniknęły z wyników wyszukiwania.' },
    documents: { name: 'Dokumenty i arkusze', blurb: 'PDF, Word, Excel i tekst', lead: 'Usuwaj strony, hasła, duplikaty i zbędne łamania wierszy z plików, których używasz na co dzień.' },
    media: { name: 'Zdjęcia, wideo i dźwięk', blurb: 'Tła, obiekty, znaki wodne, dźwięk', lead: 'Wycinaj tła, usuwaj obiekty i odbieraj dźwięk z filmów – najczęściej narzędziami, które już masz.' },
    developer: { name: 'Programowanie i wiersz poleceń', blurb: 'Git, Docker i Linux', lead: 'Polecenia do cofania commita, sprzątania kontenerów i usuwania folderów – najpierw bezpieczny wariant.' },
  },

  guides: {
    'remove-google-account-from-phone': {
      title: 'Jak usunąć konto Google z telefonu',
      short: 'Usuń konto Google z telefonu',
      lead: 'Usunięcie wylogowuje konto z Gmaila, Sklepu Play, Kontaktów i Kalendarza na tym urządzeniu. **Nie** kasuje samego konta.',
      sections: [
        {
          h: 'Na Androidzie',
          steps: [
            'Otwórz **Ustawienia**.',
            'Kliknij **Hasła i konta**. W niektórych telefonach pozycja nazywa się **Konta** albo **Użytkownicy i konta**.',
            'Kliknij konto Google, które chcesz usunąć.',
            'Kliknij **Usuń konto** i potwierdź.',
            'Jeśli zostaniesz poproszony, podaj PIN, wzór lub hasło blokady ekranu.',
          ],
        },
        {
          h: 'Na iPhonie lub iPadzie',
          p: ['Jeśli konto dodano w ustawieniach iOS (Poczta, Kontakty, Kalendarz):'],
          steps: ['Otwórz **Ustawienia**, potem **Poczta** i **Konta**. W starszych wersjach iOS to **Hasła i konta**.', 'Kliknij konto Google.', 'Kliknij **Usuń konto** i potwierdź.'],
          after: ['Jeśli używasz tylko aplikacji Gmail lub Google, kliknij w niej zdjęcie profilowe, wybierz **Zarządzaj kontami na tym urządzeniu** i usuń konto. Nazwa różni się nieco w zależności od aplikacji.'],
        },
      ],
      callout: { type: 'warning', text: 'Sprzedajesz lub oddajesz telefon z Androidem? Usuń konto Google **przed** przywróceniem ustawień fabrycznych. W przeciwnym razie zabezpieczenie przed zresetowaniem (Factory Reset Protection) może zażądać Twoich danych logowania od następnego właściciela.' },
      faq: [
        ['Czy to usuwa moje konto Google?', 'Nie. Konto i jego dane zostają u Google. Tylko ten telefon traci do niego dostęp.'],
        ['Dlaczego nie ma przycisku „Usuń konto”?', 'Konto służbowe lub szkolne może być zarządzane przez Twoją organizację i tylko administrator może je usunąć. W niektórych telefonach konto jest też powiązane z profilem służbowym.'],
        ['Czy stracę zdjęcia i kontakty?', 'Dane zapisane na koncie zostają na koncie. Elementy zapisane tylko w telefonie, na przykład kontakty lokalne, nie są naruszone. Jeśli nie masz pewności, sprawdź kopię zapasową.'],
      ],
    },

    'delete-instagram-account': {
      title: 'Jak usunąć konto na Instagramie',
      short: 'Usuń konto na Instagramie',
      lead: 'Instagram oferuje dwie opcje: **dezaktywację** konta (ukryte, może wrócić) albo **trwałe usunięcie**. Usunięcie uruchamia odliczanie, w trakcie którego możesz jeszcze zmienić zdanie.',
      sections: [
        {
          h: 'Usuwanie konta w aplikacji',
          steps: [
            'Otwórz Instagram, przejdź do swojego profilu i kliknij menu (☰).',
            'Kliknij **Centrum kont**, a potem **Dane osobowe**.',
            'Kliknij **Własność konta i kontrola nad nim**, a potem **Dezaktywacja lub usunięcie**.',
            'Wybierz konto, opcję **Usuń konto** i kliknij **Kontynuuj**.',
            'Wybierz powód, wpisz hasło i potwierdź.',
          ],
        },
        { h: 'Najpierw pobierz swoje dane', p: ['W **Centrum kont** otwórz **Twoje informacje i uprawnienia** i wybierz **Pobierz swoje informacje**. Po usunięciu zdjęć ani wiadomości nie da się odzyskać.'] },
        { h: 'Co dzieje się potem', p: ['Instagram planuje usunięcie konta i przechowuje je przez okres karencji (obecnie około 30 dni). Jeśli w tym czasie się zalogujesz, usunięcie zostanie anulowane. Kopie w backupach mogą zniknąć później.'] },
      ],
      callout: { type: 'tip', text: 'Nie masz pewności? Wybierz zamiast tego **Dezaktywuj**. Profil, zdjęcia i polubienia pozostają ukryte, dopóki się nie zalogujesz.' },
      faq: [
        ['Czy mogę cofnąć usunięcie konta?', 'Tylko w okresie karencji, logując się ponownie. Potem konto i jego treści znikają.'],
        ['Czy moja nazwa użytkownika się zwolni?', 'Po całkowitym usunięciu nazwę może zająć ktoś inny. Przy dezaktywacji pozostaje zarezerwowana.'],
      ],
    },

    'remove-metadata-from-photos': {
      title: 'Jak usunąć metadane (EXIF) ze zdjęć i dokumentów',
      short: 'Usuń metadane ze zdjęć',
      lead: 'Zdjęcia mogą zawierać ukryte dane: gdzie, kiedy i czym zostały zrobione. Tak je usuniesz, zanim udostępnisz plik.',
      sections: [
        {
          h: 'Windows',
          steps: ['Kliknij zdjęcie prawym przyciskiem i wybierz **Właściwości**.', 'Otwórz kartę **Szczegóły** i kliknij **Usuń właściwości i informacje osobiste**.', 'Wybierz **Utwórz kopię ze wszystkimi możliwymi do usunięcia właściwościami usuniętymi** i kliknij **OK**.'],
        },
        {
          h: 'Mac',
          steps: ['Otwórz zdjęcie w **Podglądzie**.', 'Wybierz **Narzędzia**, potem **Pokaż inspektora** i otwórz kartę **GPS**.', 'Kliknij **Usuń informacje o lokalizacji**. Usuwa to tylko miejsce, nie dane aparatu.'],
          after: ['W aplikacji Zdjęcia możesz też wybrać **Plik**, **Eksportuj** i przed zapisem odznaczyć **Informacje o lokalizacji**.'],
        },
        {
          h: 'iPhone',
          steps: ['Otwórz zdjęcie w aplikacji **Zdjęcia** i kliknij udostępnianie.', 'U góry menu udostępniania kliknij **Opcje**.', 'Wyłącz **Lokalizacja** (lub **Wszystkie dane zdjęcia**) i udostępnij jak zwykle.'],
        },
        {
          h: 'Android',
          steps: ['Otwórz zdjęcie w Zdjęciach Google i przesuń palcem w górę, by zobaczyć szczegóły.', 'Kliknij **Lokalizacja** i wybierz **Usuń lokalizację**.'],
        },
        { h: 'Dokumenty Office', p: ['W Wordzie, Excelu lub PowerPoincie wybierz **Plik**, **Informacje**, **Sprawdź, czy występują problemy**, **Przejrzyj dokument**, a następnie przy pozycji Właściwości dokumentu i informacje osobiste kliknij **Usuń wszystko**.'] },
      ],
      callout: { type: 'tip', text: 'Wiele sieci społecznościowych usuwa dane o lokalizacji przy przesyłaniu, ale załączniki e-mail i linki do chmury zwykle zachowują wszystko. Usuń dane przed wysłaniem.' },
      faq: [
        ['Co dokładnie zawierają metadane zdjęcia?', 'Zwykle datę i godzinę, model aparatu lub telefonu, ustawienia i często współrzędne GPS. Swoją nazwę może dopisać także program do edycji.'],
        ['Czy zrzut ekranu usuwa metadane?', 'Zrzut ekranu dostaje własne metadane i nie niesie oryginalnej lokalizacji. To szybkie obejście, ale jakość obrazu jest niższa.'],
      ],
    },

    'remove-personal-info-from-google': {
      title: 'Jak usunąć dane osobowe z wyników wyszukiwania Google',
      short: 'Usuń dane osobowe z Google',
      lead: 'Możesz poprosić Google, by przestało pokazywać wyniki z Twoim adresem, numerem telefonu lub podobnymi danymi. Sama strona zostaje w sieci, jeśli nie skontaktujesz się też z jej właścicielem.',
      sections: [
        {
          h: 'Kroki',
          steps: [
            'Wyszukaj swoje imię i nazwisko, adres i numer telefonu, by zobaczyć, co jest dziś widoczne.',
            'Otwórz narzędzie Google **Wyniki dotyczące Ciebie**: [support.google.com/websearch/answer/12719076](https://support.google.com/websearch/answer/12719076). W aplikacji Google znajdziesz je pod zdjęciem profilowym.',
            'Dodaj dane kontaktowe, które mają być monitorowane, i przejrzyj znalezione wyniki.',
            'Przy wyniku otwórz menu (⋮), wybierz **Usuń wynik** i odpowiedz na pytania.',
            'Jeśli wynik nie jest tam objęty, skorzystaj z formularza pomocy Google „Usuń informacje z Google” i opisz stronę.',
          ],
        },
        { h: 'Usuń to u źródła', p: ['Google tylko ukrywa wynik. Aby treść zniknęła z internetu, poproś właściciela lub hosting strony o jej usunięcie. Gdy strona zniknie, zniknie też wynik wyszukiwania.'] },
        { h: 'Jeśli mieszkasz w UE', p: ['Możesz też powołać się na prawo do usunięcia danych (art. 17 RODO, „prawo do bycia zapomnianym”) i skorzystać z prawnego formularza Google dla Europy. Google waży Twoją prywatność względem interesu publicznego i może odmówić.'] },
      ],
      callout: { type: 'warning', text: 'Zachowaj e-maile z potwierdzeniem i linki do zgłoszonych stron. Przydadzą się, jeśli będziesz musiał odwołać się od decyzji.' },
      faq: [
        ['Jak długo to trwa?', 'Google rozpatruje każdy wniosek osobno, a czas bywa różny. Gdy zapadnie decyzja, dostajesz e-mail.'],
        ['A Bing i inne wyszukiwarki?', 'Każda wyszukiwarka ma własny formularz usuwania. Usunięcie z Google nie działa w innych.'],
      ],
    },

    'remove-pages-from-pdf': {
      title: 'Jak usunąć strony z PDF',
      short: 'Usuń strony z PDF',
      lead: 'Nie musisz niczego instalować ani wysyłać dokumentu. Strony z PDF usuniesz bezpośrednio w Macu, przeglądarce lub w Adobe Acrobat.',
      sections: [
        {
          h: 'Na Macu w Podglądzie',
          steps: ['Otwórz PDF w **Podglądzie**.', 'Wybierz **Widok**, potem **Miniatury**.', 'Kliknij stronę, którą chcesz usunąć (z klawiszem {⌘} zaznaczysz kilka).', 'Naciśnij {Delete} i zapisz przez {⌘} + {S}.'],
        },
        {
          h: 'W Windows, na Macu lub w Linuksie w Chrome albo Edge',
          steps: ['Otwórz PDF w przeglądarce i naciśnij {Ctrl} + {P} (na Macu {⌘} + {P}).', 'Jako miejsce docelowe wybierz **Zapisz jako PDF**.', 'W polu **Strony** wybierz **Niestandardowe** i wpisz strony, które chcesz **zachować**, na przykład `1-3, 5-8`.', 'Kliknij **Zapisz**. Powstanie nowy plik, oryginał pozostaje bez zmian.'],
        },
        {
          h: 'W Adobe Acrobat',
          steps: ['Wybierz **Narzędzia**, potem **Organizuj strony**.', 'Zaznacz niechciane miniatury i kliknij ikonę kosza.', 'Zapisz plik.'],
        },
      ],
      callout: { type: 'tip', text: 'Zapis przez okno drukowania jest najszybszy, ale może zgubić linki, zakładki i pola formularzy. W takim przypadku użyj Podglądu lub Acrobata.' },
      faq: [
        ['Czy bezpiecznie jest użyć do tego strony internetowej?', 'Darmowe narzędzia online wysyłają Twój plik na swój serwer. W przypadku umów, dokumentów tożsamości i wszystkiego prywatnego lepiej użyć jednej z metod offline powyżej.'],
        ['Czy mogę usunąć stronę z chronionego PDF?', 'Dopiero po odblokowaniu. Zobacz [jak usunąć hasło z PDF](/documents/remove-password-from-pdf/).'],
      ],
    },

    'remove-password-from-pdf': {
      title: 'Jak usunąć hasło z PDF',
      short: 'Usuń hasło z PDF',
      lead: 'Jeśli znasz hasło i wolno Ci otworzyć plik, możesz zapisać odblokowaną kopię, by nie wpisywać hasła za każdym razem.',
      sections: [
        {
          h: 'W Chrome lub Edge',
          steps: ['Otwórz PDF w przeglądarce i wpisz hasło.', 'Naciśnij {Ctrl} + {P} (na Macu {⌘} + {P}).', 'Jako miejsce docelowe wybierz **Zapisz jako PDF** i kliknij **Zapisz**.', 'Nowy plik otwiera się bez hasła.'],
        },
        {
          h: 'W Podglądzie na Macu',
          steps: ['Otwórz PDF i wpisz hasło.', 'Wybierz **Plik**, potem **Eksportuj jako PDF…** i zapisz kopię.'],
        },
        {
          h: 'W Adobe Acrobat',
          steps: ['Otwórz PDF i wpisz hasło.', 'Wybierz **Plik**, potem **Właściwości** i otwórz kartę **Zabezpieczenia**.', 'Ustaw **Metoda zabezpieczeń** na **Brak zabezpieczeń**, kliknij **OK** i zapisz.'],
        },
      ],
      callout: { type: 'warning', text: 'To działa tylko wtedy, gdy znasz hasło. Zapomnianego hasła nie da się odzyskać; zapytaj autora lub nadawcę pliku. Nie usuwaj ograniczeń z dokumentów, do których nie masz prawa.' },
      faq: [
        ['Jaka jest różnica między dwoma rodzajami haseł PDF?', '**Hasło otwarcia dokumentu** jest potrzebne, by zobaczyć plik. **Hasło uprawnień** ogranicza tylko drukowanie lub kopiowanie. Powyższe kroki zakładają plik, który już potrafisz otworzyć.'],
        ['Czy nowa kopia wygląda tak samo?', 'Drukowanie do PDF może zgubić zakładki i pola formularzy. Podgląd i Acrobat je zachowują.'],
      ],
    },

    'remove-page-from-word': {
      title: 'Jak usunąć stronę w Wordzie',
      short: 'Usuń stronę w Wordzie',
      lead: 'Zaznacz wszystko na stronie i usuń. Jeśli pusta strona się nie chce usunąć, zwykle winny jest ukryty znak akapitu lub podział strony.',
      sections: [
        {
          h: 'Usuwanie strony z treścią',
          steps: ['Kliknij w dowolnym miejscu strony, którą chcesz usunąć.', 'Naciśnij {Ctrl} + {G} (Mac: {⌥} + {⌘} + {G}), aby otworzyć **Przejdź do**.', 'Wpisz `\\page`, naciśnij {Enter}, a potem **Zamknij**. Cała strona jest zaznaczona.', 'Naciśnij {Delete}.'],
        },
        {
          h: 'Usuwanie pustej strony na końcu',
          steps: ['Naciśnij {Ctrl} + {Shift} + {8} (Mac: {⌘} + {8}), aby pokazać znaki akapitu (¶).', 'Zaznacz zbędne znaki akapitu lub wiersz **Podział strony** na pustej stronie.', 'Naciskaj {Delete}, aż strona zniknie.'],
          after: ['Jeśli pusta strona następuje po tabeli, ostatniego znaku akapitu nie da się usunąć. Zaznacz go i ustaw rozmiar czcionki na 1 pkt albo ukryj go przez {Ctrl} + {D}, **Ukryty**.'],
        },
        { h: 'W Dokumentach Google', p: ['Zaznacz tekst na stronie i naciśnij {Delete}. Jeśli pusta strona zostaje, sprawdź w **Wstaw**, **Podział** niechciany podział strony albo zmniejsz odstęp przed ostatnim akapitem.'] },
      ],
      callout: { type: 'tip', text: 'Przed usunięciem zapisz kopię. Stronę przywróci też Cofnij ({Ctrl} + {Z}).' },
      faq: [
        ['Dlaczego za tabelą pojawia się pusta strona?', 'Word wymaga akapitu po tabeli. Jeśli tabela kończy się dokładnie na dole strony, ten akapit przechodzi na następną stronę.'],
        ['Czy usunięcie strony zmieni numery stron?', 'Tak. Kolejne strony przesuwają się, a numeracja aktualizuje się automatycznie.'],
      ],
    },

    'remove-duplicates-in-excel': {
      title: 'Jak usunąć duplikaty w Excelu',
      short: 'Usuń duplikaty w Excelu',
      lead: 'Excel usunie zduplikowane wiersze dwoma kliknięciami albo zostawi oryginalną listę nietkniętą i pokaże oczyszczoną kopię.',
      sections: [
        {
          h: 'Usuwanie zduplikowanych wierszy',
          steps: ['Kliknij komórkę w obrębie danych (lub zaznacz zakres).', 'Otwórz kartę **Dane** i kliknij **Usuń duplikaty**.', 'Zaznacz kolumny, które muszą się zgadzać, by wiersz uznać za duplikat.', 'Kliknij **OK**. Excel poda, ile duplikatów usunięto.'],
        },
        {
          h: 'Zachowanie oryginału (Microsoft 365)',
          p: ['Funkcja UNIKATOWE (po angielsku UNIQUE) zwraca listę bez duplikatów, nie zmieniając Twoich danych:'],
          code: '=UNIKATOWE(A2:A100)',
        },
        {
          h: 'Znajdowanie duplikatów przed usunięciem',
          steps: ['Zaznacz kolumnę.', 'Wybierz **Narzędzia główne**, **Formatowanie warunkowe**, **Reguły wyróżniania komórek**, **Duplikaty wartości**.', 'Przejrzyj wyróżnione komórki.'],
        },
        { h: 'W Arkuszach Google', p: ['Zaznacz zakres i wybierz **Dane**, **Czyszczenie danych**, **Usuń duplikaty**.'] },
      ],
      callout: { type: 'warning', text: '„Usuń duplikaty” kasuje wiersze natychmiast. Pracuj na kopii arkusza albo od razu naciśnij {Ctrl} + {Z}, jeśli wynik jest zły.' },
      faq: [
        ['Dlaczego „identyczne” komórki nie są traktowane jako duplikaty?', 'Spacje na końcu i różna wielkość liter mogą je odróżniać. Wyczyść je wcześniej za pomocą `=USUŃ.ZBĘDNE.ODSTĘPY(A2)`.'],
        ['Czy zostaje pierwszy, czy ostatni wpis?', 'Excel zachowuje pierwsze wystąpienie i usuwa późniejsze.'],
      ],
    },

    'remove-line-breaks': {
      title: 'Jak usunąć łamania wierszy z tekstu, Worda i Excela',
      short: 'Usuń łamania wierszy',
      lead: 'Skopiowałeś tekst, w którym każdy wiersz kończy się twardym enterem? Zamień łamania na spację w kilka sekund.',
      sections: [
        {
          h: 'W Wordzie',
          steps: ['Naciśnij {Ctrl} + {H}, aby otworzyć **Znajdź i zamień**.', 'Kliknij **Więcej >>**, potem **Specjalne** i **Znak akapitu**. Wstawi to `^p`.', 'W polu **Zamień na** zostaw pojedynczą spację.', 'Kliknij **Zamień wszystko**.'],
        },
        {
          h: 'W Excelu',
          steps: ['Zaznacz komórki i naciśnij {Ctrl} + {H}.', 'Kliknij w polu **Znajdź** i naciśnij {Ctrl} + {J}. Pojawi się maleńka kropka.', 'W polu **Zamień na** wpisz spację i kliknij **Zamień wszystko**.'],
          p: ['Albo użyj formuły w kolumnie pomocniczej:'],
          code: '=PODSTAW(A1;ZNAK(10);" ")',
        },
        {
          h: 'W dowolnym edytorze z wyrażeniami regularnymi',
          p: ['Włącz „regex” w Znajdź i zamień, wyszukaj poniższy wzorzec i zamień go na spację:'],
          code: '\\r?\\n',
        },
      ],
      callout: { type: 'tip', text: 'Aby zachować akapity, zamieniaj tylko pojedyncze łamania, a puste wiersze zostaw. Najpierw wyszukaj dwa łamania, zamień je na znacznik zastępczy, a potem przywróć.' },
      faq: [
        ['Jaka jest różnica między łamaniem wiersza a znakiem akapitu?', 'W Wordzie {Shift} + {Enter} wstawia łamanie wiersza (`^l`), a {Enter} znak akapitu (`^p`). Szukaj tego, co faktycznie masz w tekście.'],
        ['Czy mogę usunąć też puste wiersze?', 'Tak. Zamień dwa znaki akapitu (`^p^p`) na jeden (`^p`) i powtarzaj, aż nic nie zostanie znalezione.'],
      ],
    },

    'remove-background-from-image': {
      title: 'Jak usunąć tło z obrazu',
      short: 'Usuń tło z obrazu',
      lead: 'Większość telefonów i programów biurowych potrafi już sama wyciąć obiekt. Zapisz wynik jako PNG, aby tło pozostało przezroczyste.',
      sections: [
        {
          h: 'iPhone i iPad',
          steps: ['Otwórz zdjęcie w aplikacji **Zdjęcia**.', 'Przytrzymaj obiekt, aż zacznie świecić.', 'Kliknij **Kopiuj** lub **Udostępnij** i wklej do Notatek, Wiadomości lub edytora. Wymaga iOS 16 lub nowszego.'],
        },
        {
          h: 'Mac',
          steps: ['Otwórz obraz w **Podglądzie** i wybierz **Narzędzia**, potem **Usuń tło**. W nowszych wersjach macOS możesz też kliknąć plik w Finderze prawym przyciskiem i wybrać **Szybkie akcje**, **Usuń tło**.'],
        },
        {
          h: 'Windows',
          steps: ['Otwórz obraz w **Paint**.', 'W grupie Obraz kliknij **Usuń tło**.', 'Zapisz jako PNG.'],
        },
        {
          h: 'Word, PowerPoint i Excel',
          steps: ['Kliknij obraz, potem **Format obrazu** i **Usuń tło**.', 'Zaznacz obszary do zachowania lub usunięcia i wybierz **Zachowaj zmiany**.'],
        },
      ],
      callout: { type: 'tip', text: 'Najlepiej działają zdjęcia z wyraźnym kontrastem między obiektem a tłem. Drobne szczegóły, na przykład włosy, mogą wymagać ręcznej poprawki.' },
      faq: [
        ['Który format zachowuje przezroczystość?', 'PNG (lub WebP). JPG nie przechowuje przezroczystości i wypełnia obszar bielą.'],
        ['Czy bezpiecznie jest używać internetowego narzędzia do usuwania tła?', 'Większość wysyła Twój obraz na swoje serwery. W przypadku prywatnych zdjęć lub zdjęć klientów lepiej użyć wbudowanych narzędzi powyżej.'],
      ],
    },

    'remove-object-from-photo': {
      title: 'Jak usunąć obiekt lub osobę ze zdjęcia',
      short: 'Usuń obiekt ze zdjęcia',
      lead: 'Galerie w telefonach mają dziś gumkę, która automatycznie wypełnia lukę. Oto gdzie ją znaleźć i jak uzyskać czysty efekt.',
      sections: [
        {
          h: 'Gdzie znaleźć gumkę',
          p: ['Nazwa i dostępność zależą od telefonu, wersji systemu i regionu.'],
          steps: [
            '**Zdjęcia Google:** otwórz zdjęcie, kliknij **Edytuj**, **Narzędzia**, a potem **Magiczna gumka** (Magic Eraser).',
            '**Samsung Galaxy:** otwórz zdjęcie w Galerii, kliknij ołówek i wybierz opcję **Gumka obiektów** (Object eraser).',
            '**iPhone:** na modelach z Apple Intelligence kliknij w Zdjęciach **Edytuj** i wybierz **Wyczyść** (Clean Up).',
            '**Windows:** na obsługiwanych komputerach aplikacja Zdjęcia oferuje **Generatywne usuwanie** (Generative erase).',
            '**Photoshop:** użyj narzędzia **Usuń** lub **Wypełnienie generatywne**.',
          ],
        },
        { h: 'Jak uzyskać czysty efekt', steps: ['Przybliż i zamaluj lub otocz obiekt razem z jego cieniem.', 'Najpierw usuwaj drobiazgi. Duże obiekty na tle pełnym detali trudno przekonująco wypełnić.', 'Zastosuj, sprawdź krawędzie i cofnij, jeśli wypełnienie wygląda na rozmazane.'] },
        { h: 'Darmowa opcja na komputerze', p: ['GIMP jest darmowy i ma narzędzie **Lecz** oraz wtyczkę Resynthesizer do wypełniania luk. Wymaga więcej ręcznej pracy niż gumka w telefonie.'] },
      ],
      callout: { type: 'warning', text: 'Edytuj tylko własne zdjęcia lub takie, które wolno Ci zmieniać. Usuwanie osób lub obiektów, by wprowadzić innych w błąd, na przykład na zdjęciach dowodowych lub prasowych, jest niedopuszczalne.' },
      faq: [
        ['Czy oryginalne zdjęcie zostaje?', 'Większość aplikacji zapisuje edycję jako kopię lub pozwala wrócić do oryginału. Sprawdź to, zanim nadpiszesz.'],
        ['Dlaczego wynik wygląda na rozmazany?', 'Narzędzie musi wymyślić brakujące piksele. Najlepiej działają proste tła, takie jak niebo, trawa lub ściana.'],
      ],
    },

    'remove-audio-from-video': {
      title: 'Jak usunąć dźwięk z filmu',
      short: 'Usuń dźwięk z filmu',
      lead: 'Wycisz film na stałe, tak by wyeksportowany plik nie miał ścieżki dźwiękowej – telefonem lub darmowym narzędziem.',
      sections: [
        {
          h: 'iPhone',
          steps: ['Otwórz film w aplikacji **Zdjęcia** i kliknij **Edytuj**.', 'W lewym górnym rogu kliknij żółtą ikonę głośnika, tak aby była przekreślona.', 'Kliknij **Gotowe**.'],
        },
        {
          h: 'Android (Zdjęcia Google)',
          steps: ['Otwórz film i kliknij **Edytuj**.', 'Kliknij ikonę głośnika, aby wyciszyć dźwięk.', 'Kliknij **Zapisz kopię**.'],
        },
        {
          h: 'Mac (iMovie)',
          steps: ['Przeciągnij klip na oś czasu.', 'Wybierz **Zmodyfikuj**, potem **Odłącz dźwięk**.', 'Zaznacz zielony pasek dźwięku, naciśnij {Delete} i wyeksportuj.'],
        },
        {
          h: 'Wiersz poleceń (FFmpeg)',
          p: ['To polecenie kopiuje obraz bez ponownego kodowania i pomija dźwięk:'],
          code: 'ffmpeg -i input.mp4 -c copy -an output.mp4',
        },
      ],
      callout: { type: 'tip', text: 'Wyciszenie w odtwarzaczu tłumi tylko odtwarzanie. Aby udostępnić film zupełnie bez dźwięku, wyeksportuj nowy plik, jak opisano powyżej.' },
      faq: [
        ['Czy zmieni się jakość filmu?', 'Przy poleceniu FFmpeg powyżej nie. Edytory w telefonach mogą nieco ponownie zakodować film.'],
        ['Czy mogę zamiast tego zastąpić dźwięk?', 'Tak. Najpierw usuń oryginalną ścieżkę, a potem dodaj muzykę lub lektora w tym samym edytorze.'],
      ],
    },

    'remove-watermark': {
      title: 'Jak usunąć znak wodny (zgodnie z prawem)',
      short: 'Usuń znak wodny',
      lead: 'Usunięcie znaku wodnego z **własnego** dokumentu lub z próbnego eksportu jest w porządku. Usunięcie cudzego z obrazu lub filmu zwykle nie. Oto co działa i co zrobić zamiast tego.',
      sections: [
        {
          h: 'Znak wodny we własnym dokumencie Word',
          steps: ['Otwórz kartę **Projektowanie**.', 'Kliknij **Znak wodny**.', 'Wybierz **Usuń znak wodny**.'],
        },
        {
          h: 'Znak wodny we własnym PDF',
          steps: ['Otwórz PDF w Adobe Acrobat.', 'Wybierz **Edytuj PDF**, potem **Znak wodny** i **Usuń**.'],
        },
        {
          h: 'Znak wodny dodany przez aplikację lub wersję próbną',
          p: ['Edytory wideo, aplikacje graficzne i konwertery często dodają logo w darmowym planie. Czysto pozbędziesz się go przez przejście na płatny plan, płatny eksport albo ponowny eksport z oryginalnego projektu w aplikacji, która nie dodaje znaku.'],
        },
        {
          h: 'Zdjęcie lub film, który należy do kogoś innego',
          p: ['Znak wodny wskazuje właściciela. Nie przycinaj go i nie zamalowuj. Zamiast tego:'],
          steps: ['Poproś właściciela o czystą kopię lub zgodę.', 'Kup licencję na wersję bez znaku wodnego w serwisie ze zdjęciami.', 'Używaj obrazów, które można swobodnie wykorzystywać, na przykład z Wikimedia Commons lub innych źródeł domeny publicznej i Creative Commons, i podaj źródło zgodnie z wymogami.'],
        },
      ],
      callout: { type: 'warning', text: 'W wielu krajach usunięcie informacji o prawach autorskich, takich jak znak wodny, może być niezgodne z prawem, na przykład na podstawie § 95c niemieckiej ustawy o prawie autorskim, § 1202 amerykańskiego DMCA lub art. 7 dyrektywy 2001/29/WE. To informacja ogólna, nie porada prawna.' },
      faq: [
        ['Czy mogę usunąć znak wodny lub oznaczenie AI?', 'Oznaczenia, że treść wygenerowała sztuczna inteligencja, istnieją po to, by nie wprowadzać innych w błąd. Nie opisujemy, jak je ukryć.'],
        ['Co, jeśli zgubiłem oryginał bez znaku wodnego?', 'Sprawdź kopię w chmurze, wysłane e-maile lub historię eksportów w aplikacji. Jeśli masz własną pracę tylko ze znakiem wodnym, skontaktuj się z pomocą techniczną narzędzia.'],
      ],
    },

    'remove-last-git-commit': {
      title: 'Jak usunąć ostatni commit w Gicie',
      short: 'Usuń ostatni commit w Gicie',
      lead: 'Właściwe polecenie zależy od jednego pytania: czy commit został już wypchnięty (push)? Zacznij od bezpiecznych wariantów.',
      sections: [
        {
          h: 'Jeszcze niewypchnięty: cofnij commit, zachowaj zmiany',
          code: 'git reset --soft HEAD~1',
          after: ['Commit znika, a jego zmiany są znów przygotowane do zatwierdzenia (staged). Poleceniem `git reset HEAD~1` wyjmiesz je także z poczekalni.'],
        },
        {
          h: 'Jeszcze niewypchnięty: cofnij commit i odrzuć zmiany',
          code: 'git reset --hard HEAD~1',
        },
        {
          h: 'Już wypchnięty do wspólnej gałęzi',
          p: ['Utwórz nowy commit, który odwraca stary. Historia zostaje nienaruszona dla wszystkich:'],
          code: 'git revert HEAD\ngit push',
        },
        {
          h: 'Błędny jest tylko opis',
          code: 'git commit --amend',
        },
        {
          h: 'Przepisanie wypchniętej gałęzi, która jest Twoja',
          p: ['Tylko jeśli nikt inny z niej nie korzysta:'],
          code: 'git reset --hard HEAD~1\ngit push --force-with-lease',
        },
      ],
      callout: { type: 'warning', text: '`--hard` kasuje niezatwierdzoną pracę. Jeśli przez pomyłkę usuniesz commit, `git reflog` pokaże ostatnie stany, a `git reset --hard <hash>` cofnie Cię z powrotem.' },
      faq: [
        ['Co oznacza HEAD~1?', 'Wskazuje commit przed bieżącym. `HEAD~3` cofa się o trzy commity.'],
        ['Dlaczego force push jest ryzykowny?', 'Nadpisuje historię na zdalnym serwerze. Koledzy, którzy już pobrali stary commit, napotkają konflikty.'],
      ],
    },

    'remove-docker-images-and-containers': {
      title: 'Jak usunąć obrazy i kontenery Dockera',
      short: 'Usuń obrazy i kontenery Dockera',
      lead: 'Najpierw zatrzymaj i usuń kontenery, potem obrazy. Polecenia prune sprzątają hurtowo, więc sprawdź, co usuną.',
      sections: [
        {
          h: 'Usuwanie kontenera',
          code: 'docker ps -a\ndocker stop <container>\ndocker rm <container>',
          after: ['Poleceniem `docker rm -f <container>` zatrzymasz i usuniesz działający kontener jednym krokiem.'],
        },
        {
          h: 'Usuwanie obrazu',
          code: 'docker images\ndocker rmi <image>',
          after: ['Docker odmówi usunięcia obrazu, którego nadal używa kontener, więc najpierw usuń ten kontener.'],
        },
        {
          h: 'Sprzątanie hurtowe',
          code: 'docker container prune\ndocker image prune\ndocker system prune',
          after: ['`docker system prune` usuwa zatrzymane kontenery, nieużywane sieci, obrazy „dangling” i pamięć podręczną buildów. Dodaj `-a`, aby usunąć wszystkie nieużywane obrazy, oraz `--volumes`, aby objąć też woluminy.'],
        },
      ],
      callout: { type: 'warning', text: 'Woluminy zawierają dane, na przykład bazy danych. Są usuwane tylko z `--volumes` i nie da się tego cofnąć.' },
      faq: [
        ['Czym jest obraz „dangling”?', 'Obraz bez tagu, zwykle pozostały po ponownym zbudowaniu obrazu pod tą samą nazwą.'],
        ['Jak usunąć absolutnie wszystko?', 'Poleceniem `docker rm -f $(docker ps -aq)` wszystkie kontenery, a potem `docker rmi $(docker images -q)` wszystkie obrazy. Najpierw sprawdź listy.'],
      ],
    },

    'remove-directory-linux': {
      title: 'Jak usunąć katalog w Linuksie',
      short: 'Usuń katalog w Linuksie',
      lead: 'W wierszu poleceń nie ma kosza. Wiedz, którego polecenia potrzebujesz, i sprawdź ścieżkę, zanim naciśniesz Enter.',
      sections: [
        { h: 'Pusty katalog', code: 'rmdir mojfolder' },
        { h: 'Katalog z plikami', code: 'rm -r mojfolder', after: ['Z `-i` zostaniesz zapytany przed każdym usunięciem: `rm -ri mojfolder`.'] },
        { h: 'Bez pytań', code: 'rm -rf mojfolder', after: ['`-f` pomija pytania i ignoruje brakujące pliki. Używaj tylko, gdy masz pewność.'] },
        { h: 'Usuwanie pasujących folderów wszędzie', p: ['Na przykład każdy folder `node_modules` poniżej bieżącego katalogu (najpierw sprawdź przez `-print`):'], code: 'find . -name node_modules -type d -prune -print\nfind . -name node_modules -type d -prune -exec rm -rf {} +' },
      ],
      callout: { type: 'warning', text: 'Nigdy nie uruchamiaj `rm -rf /` ani nie wklejaj poleceń, których nie rozumiesz. Zabłąkana spacja, jak w `rm -rf / home`, całkowicie zmienia znaczenie. Najpierw sprawdź ścieżkę poleceniem `ls`.' },
      faq: [
        ['Dlaczego dostaję „Permission denied”?', 'Katalog nie należy do Ciebie. Sprawdź go przez `ls -ld mojfolder`. `sudo` używaj tylko wtedy, gdy masz pewność, że ścieżka jest właściwa.'],
        ['Czy odzyskam pliki?', 'Zazwyczaj nie. Usunięte pliki nie trafiają do kosza. Przywróć je z kopii zapasowej.'],
      ],
    },
  },

  privacy: {
    title: 'Prywatność',
    lead: 'W skrócie: ta strona składa się ze statycznych podstron. Nie ma kont użytkowników, plików cookie ani analityki.',
    sections: [
      {
        h: '1. Odwiedzanie strony',
        p: [
          'Strona składa się ze statycznych plików hostowanych w GitHub Pages, usłudze firmy GitHub, Inc. (USA). Przy wczytywaniu strony przeglądarka wysyła żądanie do serwerów GitHuba. Jak każdy serwer WWW, GitHub przetwarza przy tym dane techniczne, aby dostarczyć stronę i zabezpieczyć usługę – w szczególności Twój adres IP, żądany adres, datę i godzinę oraz identyfikator przeglądarki (user agent). GitHub może przechowywać te dane w dziennikach serwera. Nie mamy dostępu do tych dzienników i z nich nie korzystamy.',
          'To przetwarzanie jest niezbędne do udostępniania strony i opiera się na naszym prawnie uzasadnionym interesie w zapewnieniu działającej i bezpiecznej strony (art. 6 ust. 1 lit. f RODO). GitHub może przetwarzać dane w USA. Więcej informacji znajdziesz w dokumencie [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).',
        ],
      },
      {
        h: '2. Bez plików cookie i analityki',
        p: ['Remove Online nie ustawia plików cookie, nie używa narzędzi analitycznych ani śledzących i nie ma kont użytkowników. Czcionki i cały kod są dostarczane z tej strony; nie łączymy się z sieciami CDN ani usługami stron trzecich. Strona nie zawiera formularzy i nie prosi o dane osobowe.'],
      },
      {
        h: '3. Linki do innych stron',
        p: ['Poradniki zawierają linki do innych stron, na przykład do pomocy Google. Gdy klikniesz taki link, obowiązuje polityka prywatności danej strony. Nie mamy wpływu na przetwarzanie przez nie danych.'],
      },
      {
        h: '4. Kontakt i Twoje prawa',
        p: [
          'Podmiot odpowiedzialny za tę stronę jest podany w [nocie prawnej](/imprint/). Możesz skontaktować się z nami pod adresem {EMAIL}.',
          'Zgodnie z RODO masz prawo dostępu do swoich danych osobowych, ich sprostowania, usunięcia i ograniczenia przetwarzania, prawo do przenoszenia danych oraz prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie. Masz też prawo wnieść skargę do organu nadzorczego ds. ochrony danych. Ponieważ Remove Online sam nie zbiera danych osobowych, żądania dotyczące dzienników hostingu może być konieczne skierować do GitHuba.',
        ],
      },
    ],
    updated: 'Ostatnia aktualizacja: 28 października 2026',
    note: 'To jest tłumaczenie. W razie rozbieżności obowiązuje wersja angielska.',
  },

  imprint: {
    title: 'Nota prawna',
    lead: 'Informacje o operatorze tej strony zgodnie z prawem niemieckim.',
    country: 'Niemcy',
    contact: 'Kontakt',
    emailLabel: 'E-mail',
    guidesTitle: 'O poradnikach',
    guides: 'Poradniki podają informacje ogólne i nie stanowią porady prawnej ani specjalistycznej. Aplikacje i strony osób trzecich często zmieniają menu; jeśli krok wygląda inaczej, sprawdź pomoc danego dostawcy.',
    note: 'Prawnie wiążące są dane zgodnie z § 5 DDG w brzmieniu niemieckim.',
  },
};
