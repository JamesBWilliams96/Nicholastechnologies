import type { Dictionary } from "./types";

/** German. */
export const de: Dictionary = {
  meta: {
    title: "Nicholas Technologies — Webdesign, Shopify & Web-Apps",
    description:
      "Ein-Personen-Studio für Websites, Shopify-Shops und individuelle Web-Apps für kleine Unternehmen und Start-ups. Festpreisprojekte, Support nach dem Launch.",
    ogDescription:
      "Nicholas Technologies ist ein Ein-Personen-Softwarestudio, das hochwertige Websites, Shopify-Shops und kleine individuelle Web-Apps für lokale Unternehmen und junge Start-ups entwickelt. Festpreisprojekte, direkte Kommunikation und Support nach dem Launch.",
    ogAlt: "Nicholas Technologies — Websites, Shopify-Shops und individuelle Web-Apps",
    ogSubtitle:
      "Ein Ein-Personen-Softwarestudio für lokale Unternehmen und junge Start-ups. Festpreisprojekte, direkte Kommunikation und Support nach dem Launch.",
  },
  common: {
    skipToContent: "Zum Inhalt springen",
    startProject: "Projekt starten",
    home: "Startseite",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
    theme: { label: "Darstellung", light: "Zum hellen Modus wechseln", dark: "Zum dunklen Modus wechseln" },
    opensNewTab: "(öffnet in neuem Tab)",
  },
  nav: { work: "Projekte", services: "Leistungen", process: "Ablauf", about: "Über mich", contact: "Kontakt" },
  footer: {
    tagline: "Websites, Web-Apps und technischer Support.",
    rights: "© {site}. Alle Rechte vorbehalten.",
    builtBy: "Gestaltet und entwickelt von {site}.",
  },
  hero: {
    eyebrow: "Unabhängiges Softwarestudio",
    titleA: "Websites, Shops und Software,",
    titleB: "gebaut für Ihr Unternehmen.",
    lead: "Ich gestalte und entwickle Websites, Shopify-Shops und kleine individuelle Web-Apps für lokale Unternehmen und junge Start-ups. Sie haben direkt mit mir zu tun, vom ersten Gespräch bis lange nach dem Launch. Keine Kundenbetreuer, keine Übergaben.",
    primary: "Projekt starten",
    secondary: "Was ich baue",
    proof: ["Festpreisprojekte", "Ein Ansprechpartner", "Support nach dem Launch"],
  },
  positioning: {
    titleA: "Klein genug, um sich zu kümmern.",
    titleB: "Technisch stark genug, um es richtig zu bauen.",
    points: [
      { title: "Direkt", text: "Sie sprechen in jeder Phase mit mir, und ich mache die Arbeit. Niemand dazwischen." },
      { title: "Festpreis", text: "Umfang, Leistungen und Kosten stehen fest, bevor die Arbeit beginnt." },
      { title: "Sauber gebaut", text: "React, Next.js, Shopify oder Webflow, je nachdem, was zur Aufgabe passt." },
      { title: "Weiter da", text: "Ich hoste die Seite, halte sie aktuell und bleibe erreichbar, sobald sie live ist." },
    ],
  },
  services: {
    eyebrow: "Leistungen",
    titleA: "Was ich baue,",
    titleB: "und wie ich es am Laufen halte.",
    description:
      "Webdesign und Webentwicklung für kleine Unternehmen und Start-ups: Websites, Onlineshops, kleine individuelle Apps und der Support, der sie nach dem Launch betreut. Projekte werden vor dem Start abgesteckt und zum Festpreis angeboten.",
    items: [
      {
        title: "Websites",
        description:
          "Individuelles Webdesign und Webentwicklung, von der einzelnen Landingpage bis zur kompletten Website, gestaltet rund um Ihr Unternehmen.",
        tags: ["React + Next.js", "Webflow", "Landingpages", "Redesigns"],
      },
      {
        title: "Shopify",
        description:
          "Shopify-Entwicklung für Shops, die auf dem Smartphone verkaufen: professioneller E-Commerce, individuelle Themes und Verbesserungen an dem, was Sie schon haben.",
        tags: ["Shop-Einrichtung", "Theme-Anpassung", "Integrationen", "Optimierungen"],
      },
      {
        title: "Individuelle Software",
        description: "Kleine Webanwendungen, zugeschnitten darauf, wie Ihr Unternehmen wirklich arbeitet.",
        tags: ["Buchungssysteme", "Kundenportale", "Dashboards", "Interne Tools"],
      },
      {
        title: "Laufender Support",
        description:
          "Hosting, Website-Wartung und technischer Support nach dem Launch.",
        tags: ["Hosting", "Updates", "Wartung", "Technischer Support"],
      },
    ],
    closingText:
      "Nicht sicher, was Sie brauchen? Sagen Sie mir, was Sie erreichen möchten, und ich schlage den einfachsten Weg vor.",
    closingLink: "Sagen Sie mir, was Sie brauchen",
  },
  work: {
    eyebrow: "Ausgewählte Projekte",
    titleSamples: "Was ich gebaut habe.",
    titleReal: "Was ich gebaut habe.",
    descriptionSamples:
      "Ein paar Beispiele für die Art von Projekten, die ich übernehme: eine Website, die Buchungen bringt, ein Shop, der auf dem Handy verkauft, ein Tool, das eine Tabelle ersetzt.",
    descriptionReal: "Ein paar aktuelle Projekte. Jedes davon von mir gestaltet, gebaut und gelauncht.",
    liveSite: "Zur Website",
    caseStudy: "Fallstudie",
    categories: {
      Website: "Website",
      "Landing page": "Landingpage",
      "Shopify store": "Shopify-Shop",
      "Web application": "Webanwendung",
      "Client portal": "Kundenportal",
      "Internal tool": "Internes Tool",
      "Booking system": "Buchungssystem",
    },
    projects: {
      "marlow-lane-coffee": {
        summary:
          "Eine neue Website für ein unabhängiges Café: Speisekarte, Öffnungszeiten und Tischreservierungen auf einer schnellen Seite, bequem vom Handy aus zu pflegen.",
      },
      "hollis-and-oak": {
        summary:
          "Ein Shopify-Shop für eine kleine Wohnaccessoire-Marke: eigenes Theme, Filter für Kollektionen und ein Checkout, der auf den Kauf am Handy abgestimmt ist.",
      },
      fieldbook: {
        summary:
          "Ein internes Tool für einen Handwerksbetrieb: Aufträge, Baustellenbegehungen, Rechnungen und eine Wochenübersicht an einem Ort, statt einer geteilten Tabelle.",
      },
    },
  },
  studio: {
    eyebrow: "Der Ein-Personen-Vorteil",
    titleMuted: "Keine Kundenbetreuer. Keine Übergaben.",
    titleBright: "Nur die Person, die es baut.",
    body: "Ich halte {site} bewusst klein. Jedes Gespräch, jede Entscheidung und jede Zeile Code läuft über mich. So bekommen Fragen klare Antworten, und das Projekt kommt voran.",
    cta: "So läuft ein Projekt ab",
    diagram: {
      agencyLabel: "Eine typische Agentur",
      chain: ["Sie", "Kundenbetreuer", "Projektleiter", "Designer", "Entwickler", "Ihre Website"],
      you: "Sie",
      person: "Die Person, die es gestaltet und baut",
      stagesLabel: "Projektphasen",
      stages: ["Design", "Umsetzung", "Launch", "Support"],
      captionA: "Fünf Übergaben, oder",
      captionB: "ein Gespräch",
    },
    highlights: [
      { title: "Direkt", text: "Sie sprechen mit der Person, die die Arbeit macht, nicht mit jemandem, der sie weitergibt." },
      { title: "Aus einem Guss", text: "Von derselben Person gestaltet und gebaut, so geht bei keiner Übergabe etwas verloren." },
      { title: "Unkompliziert", text: "Umfang und Preis werden vorab vereinbart, in klaren Worten. Keine Überraschungen." },
      { title: "Langfristig", text: "Nach dem Launch bin ich weiter da, für Hosting, Updates und Support." },
    ],
  },
  fixedPrice: {
    eyebrow: "Festpreisprojekte",
    titleA: "Wissen, was Sie bekommen.",
    titleB: "Wissen, was es kostet.",
    description:
      "Die meisten Projekte werden abgesteckt und zum Festpreis angeboten. Sie sehen die Leistungen und die Kosten, bevor die Arbeit beginnt.",
    steps: [
      { title: "Umfang", text: "Was bauen wir eigentlich?" },
      { title: "Angebot", text: "Ein klarer Festpreis für das Projekt." },
      { title: "Umsetzung", text: "Design, Entwicklung und Tests." },
      { title: "Launch", text: "Veröffentlichen und übergeben." },
    ],
    proposal: {
      title: "Projektangebot",
      subtitle: "Website-Redesign",
      subtitleSuffix: "Fester Umfang",
      items: [
        { label: "Umfang", value: "Website mit 6 Seiten" },
        { label: "Leistungen", value: "Design, Umsetzung, Launch, Übergabe" },
        { label: "Zeitplan", value: "Vorab vereinbart" },
        { label: "Support", value: "Optional nach dem Launch" },
      ],
      total: "Gesamt",
      totalValue: "Festpreis",
      totalNote: "vereinbart, bevor die Arbeit beginnt",
      acceptedBy: "Angenommen von",
      approved: "Freigegeben",
    },
    scopeCall: {
      title: "Scoping-Gespräch",
      notes: "Notizen",
      items: ["Ziele und Zielgruppe", "Seiten und Inhalte", "Buchungen und Anfragen", "Launch-Termin"],
      next: "Weiter · Festpreisangebot",
    },
  },
  process: {
    eyebrow: "Ablauf",
    title: "So funktioniert es.",
    description: "Fünf Schritte. Kein Rätselraten. Sie sehen in jeder Phase, wo das Projekt steht.",
    ariaLabel: "Die fünf Schritte eines Projekts",
    steps: [
      { title: "Gespräch", text: "Erzählen Sie mir, was Sie bauen, verbessern oder reparieren möchten." },
      { title: "Umfang", text: "Wir klären, was Sie wirklich brauchen, und vereinbaren Umfang und Preis." },
      { title: "Umsetzung", text: "Ich gestalte und entwickle die Website oder Anwendung." },
      { title: "Launch", text: "Alles wird getestet, veröffentlicht und übergeben." },
      { title: "Support", text: "Optional. Wenn Sie möchten, bleibe ich dran und kümmere mich weiter darum." },
    ],
    closingText: "Schritt eins ist ein Gespräch. Erzählen Sie mir, woran Sie arbeiten, den Rest klären wir gemeinsam.",
    closingCta: "Projekt starten",
  },
  stack: {
    eyebrow: "Technologie",
    titleA: "Das richtige Werkzeug",
    titleB: "für die Aufgabe.",
    description:
      "Ich zwänge nicht jedes Projekt in eine Technologie. Technik soll dem Unternehmen dienen, nicht umgekehrt.",
    tools: [
      { text: "Ideal für klassische Marketing-Websites, die Kunden selbst pflegen möchten." },
      {
        text: "Ideal für individuelle Websites, anspruchsvolle Interaktionen und Webanwendungen.",
        note: "Bei Web-Apps kommen TypeScript und eine Datenbank hinzu.",
      },
      { text: "Ideal für Unternehmen, die eine zuverlässige E-Commerce-Plattform brauchen." },
    ],
    builder: {
      label: "Stellen Sie Ihren Stack zusammen",
      question: "Was möchten Sie bauen?",
      options: [
        {
          label: "Eine Marketing-Website, die Sie selbst pflegen",
          why: "Webflow liefert eine schnelle, gut gestaltete Website mit visuellem Editor. Texte und Bilder ändern Sie selbst, ohne auf mich zu warten.",
        },
        {
          label: "Eine individuelle Website mit anspruchsvollen Interaktionen",
          why: "Eigener Code hebt die Grenzen einer Vorlage auf: maßgeschneiderte Layouts, anspruchsvolle Interaktionen und Performance, abgestimmt auf genau das, was die Website leisten soll.",
        },
        {
          label: "Einen Onlineshop",
          why: "Shopify übernimmt Zahlungen, Lagerbestand und Checkout bereits zuverlässig. So fließt die Arbeit in das Design Ihres Shops und in das, was Ihr Unternehmen einzigartig macht.",
        },
        {
          label: "Eine Web-App, ein Portal oder ein internes Tool",
          why: "Software braucht Logik, Konten und Daten. Next.js mit TypeScript und einer Datenbank gibt ihr ein solides Fundament, das mit dem Unternehmen wachsen kann.",
          extra: "+ TypeScript und eine Datenbank",
        },
      ],
      recommended: "Empfohlen",
      yourProject: "Ihr Projekt",
      footnote: "Nicht jedes Projekt passt sauber in eine Schublade. Den richtigen Stack zu wählen, gehört zur Aufgabe.",
      link: "Erzählen Sie mir von Ihrem Projekt",
    },
  },
  about: {
    eyebrow: "Über mich",
    titleA: "Ein Ein-Personen-Studio,",
    titleB: "mit Absicht.",
    lead: "Ich habe {site} bei einer Person belassen, weil ich so am besten arbeite: nah am Kunden, nah am Code und für alles selbst verantwortlich. Alles, was ich baue, führt auf dieselben fünf Dinge zurück.",
    focusLabel: "Worauf ich achte",
    focus: [
      { title: "Gutes Design", text: "Durchdacht, klar und leicht zu bedienen, auf jedem Bildschirm." },
      { title: "Gute Technik", text: "Die richtigen Werkzeuge für die Aufgabe, sauber gebaut, damit sie dauerhaft funktionieren." },
      { title: "Klare Kommunikation", text: "Klare Antworten, kein Fachjargon, keine Überraschungen." },
      { title: "Praktische Lösungen", text: "Das Einfachste, was das Problem wirklich löst." },
      { title: "Langfristige Beziehungen", text: "Ich betreue Ihre Website lieber über Jahre, als sie zu bauen und zu verschwinden." },
    ],
    photo: "Foto",
  },
  support: {
    eyebrow: "Nach dem Launch noch Hilfe nötig?",
    title: "Der Launch ist nicht die Ziellinie.",
    description:
      "Sobald Ihre Website online ist, müssen Sie nicht überlegen, wie es weitergeht. Ich kann sie weiter hosten, warten und betreuen.",
    included: ["Hosting", "Updates", "Wartung", "Fehlerbehebung", "Technischer Support", "Kleine Verbesserungen"],
    codaA: "Die Person, die es gebaut hat,",
    codaB: "ist weiter da.",
    cta: "Kontakt aufnehmen",
    ticket: {
      label: "Support-Anfrage",
      ago: "vor 2 Std.",
      title: "Checkout funktioniert auf dem Handy nicht",
      open: "Offen",
      resolved: "Gelöst",
      reply: "Behoben und veröffentlicht. Melden Sie sich, falls noch etwas auffällt.",
    },
  },
  contact: {
    eyebrow: "Projekt starten",
    titleA: "Sie haben etwas vor?",
    titleB: "Bauen wir es.",
    lead: "Ob neue Website, Onlineshop, individuelles Tool oder Hilfe bei etwas Bestehendem: Erzählen Sie mir, was Sie vorhaben.",
    expectLabel: "Was Sie erwarten können",
    expectations: [
      { title: "Eine Antwort von der Person, die es baut", text: "Eine kurze Antwort mit ein paar Fragen, damit ich verstehe, was Sie brauchen, bevor ich etwas vorschlage." },
      { title: "Ein klarer Umfang und ein Festpreis", text: "Sie wissen, was gebaut wird und was es kostet, bevor die Arbeit beginnt." },
      { title: "Ehrliche Beratung", text: "Auch wenn die Antwort lautet: „Das brauchen Sie noch nicht.“" },
    ],
    preferEmail: "Lieber per E-Mail?",
    emailSubject: "Projektanfrage",
  },
  form: {
    aboutYou: "Über Sie",
    theProject: "Das Projekt",
    optional: "Optional",
    name: "Name",
    namePlaceholder: "Ihr Name",
    email: "E-Mail",
    emailPlaceholder: "name@beispiel.de",
    company: "Unternehmen",
    companyPlaceholder: "Für wen ist das Projekt?",
    project: "Was möchten Sie bauen lassen?",
    projectPlaceholder:
      "Eine neue Website für mein Unternehmen, ein Shop, ein Buchungssystem, ein Tool fürs Team… Ein paar Sätze in Ihren eigenen Worten genügen.",
    budget: "Ungefähres Budget",
    budgetPlaceholder: "Eine grobe Spanne oder „noch unklar“",
    budgetHint: "Ein Anhaltspunkt, keine Verpflichtung.",
    timeframe: "Gewünschter Zeitrahmen",
    timeframePlaceholder: "Zeitrahmen wählen",
    timeframes: {
      asap: "So bald wie möglich",
      "1-3-months": "In den nächsten 1–3 Monaten",
      "later-this-year": "Später in diesem Jahr",
      "not-sure": "Noch unklar",
    },
    extra: "Noch etwas?",
    extraPlaceholder: "Links zu Ihrer aktuellen Website, Beispiele, die Ihnen gefallen, Termine, Fragen…",
    submit: "Anfrage senden",
    submitting: "Wird gesendet…",
    reassurance: "Kein Verkaufsgespräch, kein Druck. Nur eine klare Antwort.",
    success: {
      title: "Danke — Ihre Anfrage ist unterwegs.",
      lead: "Ich antworte Ihnen persönlich. Bis dahin: So geht es weiter.",
      steps: [
        "Ich lese, was Sie geschickt haben, und antworte mit ehrlichen nächsten Schritten.",
        "Wenn es passt, vereinbaren wir Umfang und Festpreis, bevor etwas gebaut wird.",
        "Wenn nicht, sage ich es Ihnen offen und verweise Sie an eine bessere Adresse.",
      ],
      again: "Weitere Anfrage senden",
    },
    errorGeneric: "Etwas ist schiefgelaufen, Ihre Anfrage wurde nicht gesendet.",
    errorKept: "Ihre Angaben sind noch ausgefüllt.",
    errorRetry: "Bitte versuchen Sie es gleich noch einmal.",
    errorEmail: "Falls es weiterhin nicht klappt, schreiben Sie mir direkt an {email}.",
    checkOne: "Bitte prüfen Sie das markierte Feld.",
    checkMany: "Bitte prüfen Sie die {count} markierten Felder.",
    validation: {
      name: "Bitte nennen Sie mir Ihren Namen.",
      nameLong: "Bitte halten Sie Ihren Namen unter {n} Zeichen.",
      email: "Bitte geben Sie eine E-Mail-Adresse an, damit ich antworten kann.",
      emailInvalid: "Diese E-Mail-Adresse sieht nicht richtig aus. Bitte prüfen Sie sie.",
      tooLong: "Bitte halten Sie diese Angabe unter {n} Zeichen.",
      project: "Erzählen Sie mir kurz, was Sie bauen lassen möchten.",
      timeframe: "Bitte wählen Sie eine der Optionen.",
    },
  },
  notFound: {
    metaTitle: "Seite nicht gefunden",
    eyebrow: "404",
    title: "Diese Seite gibt es nicht.",
    lead: "Der Link ist vielleicht veraltet, oder die Seite ist umgezogen. Gehen Sie zurück zur Startseite, oder sagen Sie mir, wonach Sie gesucht haben.",
    home: "Zurück zur Startseite",
    cta: "Projekt starten",
  },
  caseStudy: {
    back: "Ausgewählte Projekte",
    label: "Fallstudie",
    challenge: "Die Herausforderung",
    solution: "Die Lösung",
    result: "Was sich geändert hat",
    nextEyebrow: "Als Nächstes",
    nextTitle: "Haben Sie etwas Ähnliches im Sinn?",
    nextLead: "Sagen Sie mir, was gebaut werden soll. Ich finde den einfachsten Weg, es umzusetzen.",
    cta: "Projekt starten",
    allWork: "Mehr Projekte ansehen",
  },
};
