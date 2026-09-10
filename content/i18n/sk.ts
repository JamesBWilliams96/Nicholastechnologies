import type { Dictionary } from "./types";

/** Slovak. */
export const sk: Dictionary = {
  meta: {
    title: "Nicholas Technologies — Tvorba webov, Shopify a aplikácie",
    description:
      "Jednočlenné štúdio, ktoré stavia weby, Shopify e-shopy a webové aplikácie na mieru pre malé firmy a startupy. Pevná cena, podpora aj po spustení.",
    ogDescription:
      "Nicholas Technologies je jednočlenné softvérové štúdio, ktoré stavia kvalitné weby, Shopify e-shopy a menšie webové aplikácie na mieru pre lokálne firmy a začínajúce startupy. Projekty za pevnú cenu, priama komunikácia a podpora po spustení.",
    ogAlt: "Nicholas Technologies — weby, Shopify e-shopy a webové aplikácie na mieru",
    ogSubtitle:
      "Jednočlenné softvérové štúdio pre lokálne firmy a začínajúce startupy. Projekty za pevnú cenu, priama komunikácia a podpora po spustení.",
  },
  common: {
    skipToContent: "Preskočiť na obsah",
    startProject: "Začať projekt",
    home: "domov",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    language: "Jazyk",
    theme: { label: "Vzhľad", light: "Prepnúť na svetlý režim", dark: "Prepnúť na tmavý režim" },
    opensNewTab: "(otvorí sa na novej karte)",
  },
  nav: { work: "Práce", services: "Služby", process: "Postup", about: "O mne", contact: "Kontakt" },
  footer: {
    tagline: "Weby, webové aplikácie a technická podpora.",
    rights: "© {site}. Všetky práva vyhradené.",
    builtBy: "Návrh a realizácia: {site}.",
  },
  hero: {
    eyebrow: "Nezávislé softvérové štúdio",
    titleA: "Weby, e-shopy a softvér,",
    titleB: "postavené okolo vášho podnikania.",
    lead: "Navrhujem a staviam weby, Shopify e-shopy a menšie webové aplikácie na mieru pre lokálne firmy a začínajúce startupy. Komunikujete priamo so mnou, od prvého rozhovoru až dlho po spustení. Žiadni account manažéri, žiadne odovzdávanie ďalej.",
    primary: "Začať projekt",
    secondary: "Pozrite si, čo staviam",
    proof: ["Projekty za pevnú cenu", "Jedna kontaktná osoba", "Podpora po spustení"],
  },
  positioning: {
    titleA: "Dosť malé, aby mi na tom záležalo.",
    titleB: "Dosť technické, aby to bolo poriadne postavené.",
    points: [
      { title: "Priamo", text: "Hovoríte so mnou v každej fáze a prácu robím ja. Nikto medzi nami." },
      { title: "Pevná cena", text: "Rozsah, výstupy a cena dohodnuté ešte pred začiatkom." },
      { title: "Poriadne postavené", text: "React, Next.js, Shopify alebo Webflow, podľa toho, čo projekt potrebuje." },
      { title: "Stále tu", text: "Web hostujem, udržiavam aktuálny a som poruke, aj keď už beží." },
    ],
  },
  services: {
    eyebrow: "Služby",
    titleA: "Čo staviam",
    titleB: "a ako to udržiavam v chode.",
    description:
      "Tvorba webov a vývoj na mieru pre malé firmy a startupy: weby, e-shopy, menšie aplikácie a podpora, ktorá sa o ne postará po spustení. Rozsah a cena projektu sú jasné ešte pred začiatkom.",
    items: [
      {
        title: "Weby",
        description:
          "Návrh a tvorba webových stránok na mieru, od jednej landing page po celý web, navrhnuté okolo vášho podnikania.",
        tags: ["React + Next.js", "Webflow", "Landing pages", "Redizajny"],
      },
      {
        title: "Shopify",
        description:
          "Vývoj na Shopify pre e-shopy, ktoré predávajú na mobile: profesionálny e-commerce, témy na mieru a vylepšenia toho, čo už máte.",
        tags: ["Nastavenie obchodu", "Úpravy témy", "Integrácie", "Vylepšenia"],
      },
      {
        title: "Softvér na mieru",
        description: "Menšie webové aplikácie prispôsobené tomu, ako vaša firma naozaj funguje.",
        tags: ["Rezervačné systémy", "Klientske portály", "Dashboardy", "Interné nástroje"],
      },
      {
        title: "Priebežná podpora",
        description:
          "Hosting, údržba webu a technická podpora po spustení.",
        tags: ["Hosting", "Aktualizácie", "Údržba", "Technická podpora"],
      },
    ],
    closingText:
      "Neviete, čo z toho potrebujete? Povedzte mi, čo chcete dosiahnuť, a navrhnem najjednoduchšiu cestu.",
    closingLink: "Povedzte mi, čo potrebujete",
  },
  work: {
    eyebrow: "Vybrané práce",
    titleSamples: "Čo som postavil.",
    titleReal: "Čo som postavil.",
    descriptionSamples:
      "Niekoľko typov projektov, ktoré robím: web, ktorý prináša rezervácie, e-shop, ktorý predáva na mobile, nástroj, ktorý nahradí tabuľku.",
    descriptionReal: "Niekoľko nedávnych projektov. Každý z nich som navrhol, postavil a spustil sám.",
    liveSite: "Živý web",
    caseStudy: "Prípadová štúdia",
    categories: {
      Website: "Web",
      "Landing page": "Landing page",
      "Shopify store": "Shopify e-shop",
      "Web application": "Webová aplikácia",
      "Client portal": "Klientsky portál",
      "Internal tool": "Interný nástroj",
      "Booking system": "Rezervačný systém",
    },
    projects: {
      "marlow-lane-coffee": {
        summary:
          "Nový web pre nezávislú kaviareň: menu, otváracie hodiny a rezervácie stolov na jednej rýchlej stránke, ktorú sa dá jednoducho upravovať z mobilu.",
      },
      "hollis-and-oak": {
        summary:
          "Shopify e-shop pre malú značku bytových doplnkov: téma na mieru, filtrovanie kolekcií a pokladňa vyladená pre nákup na mobile.",
      },
      fieldbook: {
        summary:
          "Interný nástroj pre remeselnú firmu: zákazky, obhliadky, faktúry a týždenný prehľad na jednom mieste, namiesto zdieľanej tabuľky.",
      },
    },
  },
  studio: {
    eyebrow: "Výhoda jedného človeka",
    titleMuted: "Žiadni account manažéri. Žiadne odovzdávanie.",
    titleBright: "Len človek, ktorý to stavia.",
    body: "{site} zámerne držím malé. Každý rozhovor, rozhodnutie a riadok kódu prechádza cezo mňa, takže na otázky dostanete priamu odpoveď a projekt sa nezasekne.",
    cta: "Ako prebieha projekt",
    diagram: {
      agencyLabel: "Bežná agentúra",
      chain: ["Vy", "Account manažér", "Projektový manažér", "Dizajnér", "Vývojár", "Váš web"],
      you: "Vy",
      person: "Človek, ktorý to navrhuje a stavia",
      stagesLabel: "Fázy projektu",
      stages: ["Návrh", "Vývoj", "Spustenie", "Podpora"],
      captionA: "Päť odovzdaní, alebo",
      captionB: "jeden rozhovor",
    },
    highlights: [
      { title: "Priamo", text: "Hovoríte s človekom, ktorý prácu robí, nie s niekým, kto ju len tlmočí." },
      { title: "Prepojené", text: "Navrhnuté aj postavené tým istým človekom, takže sa nič nestratí pri odovzdávaní." },
      { title: "Zrozumiteľne", text: "Rozsah a cena dohodnuté vopred, jasnou rečou. Žiadne prekvapenia." },
      { title: "Dlhodobo", text: "Po spustení som tu stále — hosting, aktualizácie aj podpora." },
    ],
  },
  fixedPrice: {
    eyebrow: "Projekty za pevnú cenu",
    titleA: "Viete, čo dostanete.",
    titleB: "Viete, koľko to stojí.",
    description:
      "Väčšina projektov má vopred dohodnutý rozsah a pevnú cenu. Výstupy aj cenu vidíte skôr, než sa začne pracovať.",
    steps: [
      { title: "Rozsah", text: "Čo vlastne staviame?" },
      { title: "Ponuka", text: "Jasná pevná cena projektu." },
      { title: "Vývoj", text: "Návrh, vývoj a testovanie." },
      { title: "Spustenie", text: "Nasadenie a odovzdanie." },
    ],
    proposal: {
      title: "Cenová ponuka",
      subtitle: "Redizajn webu",
      subtitleSuffix: "Pevný rozsah",
      items: [
        { label: "Rozsah", value: "Web so 6 stránkami" },
        { label: "Výstupy", value: "Návrh, vývoj, spustenie, odovzdanie" },
        { label: "Termín", value: "Dohodnutý vopred" },
        { label: "Podpora", value: "Voliteľná po spustení" },
      ],
      total: "Spolu",
      totalValue: "Pevná cena",
      totalNote: "dohodnutá pred začiatkom prác",
      acceptedBy: "Za klienta",
      approved: "Schválené",
    },
    scopeCall: {
      title: "Úvodný hovor",
      notes: "Poznámky",
      items: ["Ciele a publikum", "Stránky a obsah", "Rezervácie a dopyty", "Termín spustenia"],
      next: "Ďalej · Pevná ponuka",
    },
  },
  process: {
    eyebrow: "Postup",
    title: "Ako to funguje.",
    description: "Päť krokov. Žiadne tajomstvá. V každej fáze viete, kde sa projekt nachádza.",
    ariaLabel: "Päť krokov projektu",
    steps: [
      { title: "Rozhovor", text: "Povedzte mi, čo chcete postaviť, zlepšiť alebo opraviť." },
      { title: "Rozsah", text: "Ujasníme si, čo naozaj potrebujete, a dohodneme rozsah a cenu." },
      { title: "Vývoj", text: "Navrhnem a vyviniem web alebo aplikáciu." },
      { title: "Spustenie", text: "Všetko otestujem, nasadím a odovzdám." },
      { title: "Podpora", text: "Voliteľne. Ak chcete, ostanem a budem sa o web starať." },
    ],
    closingText: "Prvý krok je rozhovor. Povedzte mi, na čom pracujete, a pôjdeme ďalej.",
    closingCta: "Začať projekt",
  },
  stack: {
    eyebrow: "Technológie",
    titleA: "Správny nástroj",
    titleB: "na správnu prácu.",
    description:
      "Nenútim každý projekt do jednej technológie. Technológia má slúžiť podnikaniu, nie naopak.",
    tools: [
      { text: "Ideálna voľba pre jednoduché marketingové weby, ktoré si klienti chcú upravovať sami." },
      {
        text: "Ideálna voľba pre weby na mieru, pokročilé interakcie a webové aplikácie.",
        note: "Pri webových aplikáciách k tomu patrí aj TypeScript a databáza.",
      },
      { text: "Ideálna voľba pre firmy, ktoré potrebujú spoľahlivú e-commerce platformu." },
    ],
    builder: {
      label: "Poskladajte si stack",
      question: "Čo staviate?",
      options: [
        {
          label: "Marketingový web, ktorý si upravíte sami",
          why: "Webflow vám dá rýchly, dobre navrhnutý web s vizuálnym editorom, takže texty a obrázky si zmeníte sami, bez čakania na mňa.",
        },
        {
          label: "Web na mieru s pokročilými interakciami",
          why: "Vlastný kód odstraňuje limity šablóny: layouty na mieru, pokročilé interakcie a výkon vyladený presne na to, čo má web robiť.",
        },
        {
          label: "Online obchod",
          why: "Shopify spoľahlivo rieši platby, sklad aj pokladňu, takže energia ide do dizajnu obchodu a do toho, čo je pre vaše podnikanie jedinečné.",
        },
        {
          label: "Webová aplikácia, portál alebo interný nástroj",
          why: "Softvér potrebuje logiku, používateľské účty a dáta. Next.js s TypeScriptom a databázou mu dáva pevný základ, ktorý môže rásť s firmou.",
          extra: "+ TypeScript a databáza",
        },
      ],
      recommended: "Odporúčam",
      yourProject: "Váš projekt",
      footnote: "Nie každý projekt zapadne do jednej škatuľky. Výber správneho stacku je súčasť práce.",
      link: "Povedzte mi o svojom projekte",
    },
  },
  about: {
    eyebrow: "O mne",
    titleA: "Jednočlenné štúdio,",
    titleB: "zámerne.",
    lead: "{site} som nechal ako štúdio jedného človeka, pretože tak odvádzam najlepšiu prácu: blízko ku klientovi, blízko ku kódu a so zodpovednosťou za všetko. Všetko, čo staviam, sa vracia k tým istým piatim veciam.",
    focusLabel: "Na čo sa sústredím",
    focus: [
      { title: "Dobrý dizajn", text: "Premyslený, čistý a jednoduchý na používanie, na každej obrazovke." },
      { title: "Dobré technológie", text: "Správne nástroje na danú prácu, postavené poriadne, aby fungovali dlhodobo." },
      { title: "Jasná komunikácia", text: "Priame odpovede, žiadny žargón, žiadne prekvapenia." },
      { title: "Praktické riešenia", text: "Najjednoduchšia vec, ktorá problém naozaj vyrieši." },
      { title: "Dlhodobé vzťahy", text: "Radšej sa o váš web starám roky, než by som ho postavil a zmizol." },
    ],
    photo: "Fotografia",
  },
  support: {
    eyebrow: "Potrebujete pomoc aj po spustení?",
    title: "Spustením sa to nekončí.",
    description:
      "Keď je váš web živý, nemusíte riešiť, čo ďalej. Postarám sa o hosting, údržbu aj podporu.",
    included: ["Hosting", "Aktualizácie", "Údržba", "Opravy chýb", "Technická podpora", "Drobné vylepšenia"],
    codaA: "Človek, ktorý to postavil,",
    codaB: "je stále tu.",
    cta: "Ozvite sa mi",
    ticket: {
      label: "Požiadavka na podporu",
      ago: "pred 2 h",
      title: "Pokladňa nefunguje na mobile",
      open: "Otvorená",
      resolved: "Vyriešená",
      reply: "Opravené a nasadené. Dajte vedieť, ak sa objaví čokoľvek ďalšie.",
    },
  },
  contact: {
    eyebrow: "Začať projekt",
    titleA: "Máte niečo v hlave?",
    titleB: "Poďme to postaviť.",
    lead: "Či potrebujete nový web, e-shop, nástroj na mieru alebo pomoc s niečím, čo už existuje, napíšte mi, čo máte na mysli.",
    expectLabel: "Čo môžete čakať",
    expectations: [
      { title: "Odpoveď od človeka, ktorý to postaví", text: "Krátka odpoveď s pár otázkami, aby som pochopil, čo potrebujete, skôr než čokoľvek navrhnem." },
      { title: "Jasný rozsah a pevná cena", text: "Skôr než sa začne pracovať, budete vedieť, čo sa stavia a koľko to stojí." },
      { title: "Úprimná rada", text: "Aj keby odpoveď znela „toto zatiaľ nepotrebujete“." },
    ],
    preferEmail: "Radšej e-mail?",
    emailSubject: "Dopyt na projekt",
  },
  form: {
    aboutYou: "O vás",
    theProject: "Projekt",
    optional: "Nepovinné",
    name: "Meno",
    namePlaceholder: "Vaše meno",
    email: "E-mail",
    emailPlaceholder: "meno@example.com",
    company: "Firma alebo podnik",
    companyPlaceholder: "Pre koho to je?",
    project: "Čo chcete postaviť?",
    projectPlaceholder:
      "Nový web pre moju firmu, e-shop, rezervačný systém, nástroj pre tím… Stačí pár viet vlastnými slovami.",
    budget: "Približný rozpočet",
    budgetPlaceholder: "Hrubý rozsah, alebo „ešte neviem“",
    budgetHint: "Orientačne, nie záväzne.",
    timeframe: "Želaný termín",
    timeframePlaceholder: "Vyberte termín",
    timeframes: {
      asap: "Čo najskôr",
      "1-3-months": "V najbližších 1–3 mesiacoch",
      "later-this-year": "Neskôr tento rok",
      "not-sure": "Ešte neviem",
    },
    extra: "Ešte niečo?",
    extraPlaceholder: "Odkazy na váš súčasný web, príklady, ktoré sa vám páčia, termíny, otázky…",
    submit: "Odoslať dopyt",
    submitting: "Odosielam…",
    reassurance: "Žiadny obchodný hovor, žiadny tlak. Len priama odpoveď.",
    success: {
      title: "Ďakujem — váš dopyt je na ceste.",
      lead: "Odpoviem vám osobne. Zatiaľ tu je, čo bude nasledovať.",
      steps: [
        "Prečítam si, čo ste poslali, a odpoviem s úprimným návrhom ďalších krokov.",
        "Ak si sadneme, dohodneme rozsah a pevnú cenu skôr, než sa čokoľvek postaví.",
        "Ak nie, poviem vám to na rovinu a nasmerujem vás tam, kde vám pomôžu lepšie.",
      ],
      again: "Odoslať ďalší dopyt",
    },
    errorGeneric: "Niečo sa pokazilo a váš dopyt sa neodoslal.",
    errorKept: "Vaše údaje zostali vyplnené.",
    errorRetry: "Skúste to prosím o chvíľu znova.",
    errorEmail: "Ak sa to opakuje, napíšte mi priamo na {email}.",
    checkOne: "Skontrolujte prosím zvýraznené pole.",
    checkMany: "Skontrolujte prosím zvýraznené polia ({count}).",
    validation: {
      name: "Napíšte mi prosím svoje meno.",
      nameLong: "Meno by malo mať menej ako {n} znakov.",
      email: "Pridajte prosím e-mailovú adresu, aby som vám mohol odpovedať.",
      emailInvalid: "Táto e-mailová adresa nevyzerá správne. Skontrolujte ju prosím.",
      tooLong: "Text by mal mať menej ako {n} znakov.",
      project: "Napíšte mi aspoň v krátkosti, čo chcete postaviť.",
      timeframe: "Vyberte prosím jednu z možností.",
    },
  },
  notFound: {
    metaTitle: "Stránka sa nenašla",
    eyebrow: "404",
    title: "Táto stránka neexistuje.",
    lead: "Odkaz môže byť zastaraný alebo sa stránka presunula. Vráťte sa na úvodnú stránku, alebo mi napíšte, čo ste hľadali.",
    home: "Späť na úvodnú stránku",
    cta: "Začať projekt",
  },
  caseStudy: {
    back: "Vybrané práce",
    label: "Prípadová štúdia",
    challenge: "Zadanie",
    solution: "Riešenie",
    result: "Čo sa zmenilo",
    nextEyebrow: "Ďalej",
    nextTitle: "Máte na mysli niečo podobné?",
    nextLead: "Povedzte mi, čo treba postaviť. Nájdem najjednoduchší spôsob, ako to urobiť.",
    cta: "Začať projekt",
    allWork: "Ďalšie práce",
  },
};
