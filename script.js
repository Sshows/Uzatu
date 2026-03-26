const invitationContent = {
  seo: {
    title: "Қыз ұзату | Айару",
    description: "Премиальное цифровое приглашение на Қыз ұзату в формате одного длинного лендинга."
  },

  // TODO: поменяйте название события при необходимости.
  eventType: "Қыз ұзату",

  // TODO: поменяйте имя невесты.
  brideName: "Айару",

  // TODO: поменяйте имя жениха. Можно оставить пустым, если не хотите показывать.
  groomName: "Нұрсұлтан",

  // TODO: поменяйте семью / hosts.
  hosts: "Семья Жақсыбековых с любовью приглашает вас разделить этот особенный вечер",

  // TODO: поменяйте дату торжества здесь.
  eventSchedule: {
    year: 2026,
    month: 9,
    day: 18,
    hour: 18,
    minute: 0
  },

  hero: {
    scriptNote: "вечер любви и благословения",
    secondaryText: "",
    lead:
      "Будем счастливы видеть вас рядом в этот трогательный семейный вечер, наполненный теплом, уважением к традиции и светлыми пожеланиями для новой главы жизни нашей дочери."
  },

  invitation: {
    eyebrow: "Приглашение",
    title: "С теплом приглашаем вас на важный и красивый семейный вечер",
    script: "соберёмся рядом с самыми близкими",
    lead: "Дорогие родные и близкие!",
    paragraphs: [
      "С большим уважением и любовью приглашаем вас на Қыз ұзату — особенный семейный вечер, наполненный трепетом, благодарностью и светлыми словами.",
      "Для нашей семьи это очень важный и эмоциональный момент. Нам будет особенно дорого, если вы разделите его рядом с Айару, поддержите её своим присутствием и сохраните этот вечер вместе с нами как тёплую семейную историю.",
      "Пусть эта встреча будет наполнена искренними улыбками, красивыми пожеланиями, добрыми бата и тихой светлой атмосферой близости."
    ],
    signatureLabel: "С уважением и любовью",
    signatureValue: "семья Жақсыбековых"
  },

  countdown: {
    eyebrow: "До встречи",
    title: "До Қыз ұзату осталось",
    script: "совсем немного",
    afterMessage:
      "Этот долгожданный вечер уже начался. Будем рады встретить вас и разделить его вместе."
  },

  timeline: {
    eyebrow: "Программа",
    title: "Красивый ритм вечера",
    script: "мягко, торжественно, с любовью",
    intro:
      "Мы продумали вечер так, чтобы у каждого момента было своё красивое место и спокойное, тёплое настроение.",
    items: [
      {
        time: "17:00",
        title: "Сбор гостей",
        description: "Неспешная встреча гостей, welcome drinks и первые тёплые объятия."
      },
      {
        time: "17:40",
        title: "Приветствие",
        description: "Слова благодарности, знакомство с атмосферой вечера и начало общей семейной встречи."
      },
      {
        time: "18:15",
        title: "Торжественная часть",
        description: "Главные моменты вечера, наполненные уважением к семье, традициям и новому этапу."
      },
      {
        time: "19:00",
        title: "Выход невесты",
        description: "Трогательный момент, который хочется прожить красиво, спокойно и рядом с самыми близкими."
      },
      {
        time: "19:40",
        title: "Фотосессия и ужин",
        description: "Время для совместных фотографий, тёплого общения и праздничного ужина."
      },
      {
        time: "20:40",
        title: "Пожелания и бата",
        description: "Искренние слова от родных и близких, которые останутся в сердце надолго."
      },
      {
        time: "21:20",
        title: "Торт и завершение вечера",
        description: "Мягкий финал торжества, красивые кадры и последние тёплые мгновения вечера."
      }
    ]
  },

  venue: {
    eyebrow: "Локация",
    title: "Место встречи",
    script: "сохраним этот вечер в красивых кадрах",
    overline: "Локация вечера",
    // TODO: поменяйте место проведения и адрес здесь.
    name: "Aru Hall",
    address: "Кызылорда, ул. Тәуелсіздік, 12",
    note:
      "Зал находится в центральной части города. Просим приехать немного заранее, чтобы спокойно занять места к началу торжества.",
    // TODO: поменяйте карту и ссылку на реальную локацию здесь.
    openMapUrl: "https://www.google.com/maps/search/?api=1&query=Kyzylorda",
    mapEmbedUrl: "https://www.google.com/maps?q=Kyzylorda&output=embed",
    mapPlaceholderTitle: "Карта загрузится только при необходимости",
    mapPlaceholderText:
      "Так страница остаётся лёгкой и быстро открывается на телефоне, сохраняя красивую и чистую композицию."
  },

  dressCode: {
    eyebrow: "Образы",
    title: "Dress code",
    script: "мягкая палитра и благородные силуэты",
    description:
      "Будем рады образам в светлой спокойной гамме: мягкие оттенки поддержат нежную атмосферу этого вечера и сделают общую палитру фотографий особенно красивой.",
    finePrint:
      "Можно выбирать лаконичные ткани, деликатный блеск и чистые силуэты без кричащих акцентов. Чем спокойнее и благороднее образ, тем красивее он будет смотреться в атмосфере этого вечера.",
    // TODO: поменяйте палитру dress code и fashion-инфографику здесь.
    colors: [
      { name: "Ivory", hex: "#F6EFE5" },
      { name: "Champagne", hex: "#E8D2B4" },
      { name: "Cream", hex: "#F4E8D7" },
      { name: "Beige", hex: "#D7C0A2" },
      { name: "Taupe", hex: "#B59E88" },
      { name: "Soft Brown", hex: "#8A6E58" }
    ],
    women: {
      label: "Для неё",
      title: "Вечернее платье",
      text:
        "Элегантное платье в спокойной благородной гамме: струящиеся ткани, мягкая длина и деликатный силуэт без чрезмерно ярких деталей.",
      notes: ["midi / maxi", "мягкий блеск", "лаконичный крой"],
      art: "assets/fashion-gown.svg",
      alt: "Элегантная line-art иллюстрация вечернего платья"
    },
    men: {
      label: "Для него",
      title: "Смокинг или костюм",
      text:
        "Классический тёмный костюм или смокинг с аккуратной рубашкой и минималистичными деталями, чтобы образ выглядел сдержанно и торжественно.",
      notes: ["глубокий тёмный тон", "чистый силуэт", "классическая посадка"],
      art: "assets/fashion-suit.svg",
      alt: "Элегантная line-art иллюстрация мужского костюма"
    }
  },

  details: {
    eyebrow: "Важные детали",
    title: "Всё, что пригодится перед вечером",
    script: "коротко и с заботой",
    intro:
      "Собрали всё важное в одном месте, чтобы приглашение было удобным для быстрого просмотра на телефоне.",
    items: [
      {
        title: "От имени семьи",
        text:
          "С любовью и уважением приглашают семья Жақсыбековых. Для нас особенно ценно разделить этот вечер именно в кругу близких сердцу людей."
      },
      {
        title: "Подарки",
        text:
          "Ваше присутствие будет самым тёплым подарком. Если вы захотите выразить внимание дополнительно, нам будет комфортно принять его в конверте."
      },
      {
        title: "Цветы",
        text:
          "Если вам хочется подарить цветы, выберите, пожалуйста, один аккуратный букет или композицию в нежной гамме без лишней упаковки."
      },
      {
        title: "Дети",
        text:
          "Мы будем рады маленьким гостям. Если вы планируете прийти с детьми, пожалуйста, укажите это в RSVP, чтобы мы всё красиво подготовили."
      },
      {
        title: "Парковка",
        text:
          "У площадки предусмотрена парковка для гостей. В день мероприятия вас также сможет сориентировать координатор."
      },
      {
        title: "Контакт организатора",
        text:
          "По любым вопросам, связанным с приездом, рассадкой или уточнениями по вечеру, можно связаться с координатором Асем."
      }
    ]
  },

  contacts: {
    coordinatorName: "Асем",
    phone: "+7 777 123 45 67",
    phoneHref: "tel:+77771234567",
    telegram: "https://t.me/asem_invite"
  },

  rsvp: {
    eyebrow: "RSVP",
    title: "Подтверждение присутствия",
    script: "будем признательны за ваш ответ",
    intro:
      "Пожалуйста, подтвердите своё присутствие заранее, чтобы мы смогли с любовью подготовить вечер для каждого гостя.",
    deadline: "Просим ответить до 10 сентября 2026 года.",
    // TODO: подключите реальную отправку RSVP через Google Apps Script / Formspree / custom backend здесь.
    endpoint: "",
    storageKey: "kyz-uzatu-rsvp-responses",
    successMessage: "Спасибо. Ваш ответ бережно сохранён на этом устройстве.",
    endpointSuccessMessage: "Спасибо. Ваш ответ отправлен организатору.",
    errorMessage:
      "Не удалось отправить форму. Попробуйте ещё раз или свяжитесь с организатором напрямую."
  },

  footer: {
    script: "до скорой встречи",
    text:
      "С нетерпением ждём встречи в этот красивый и очень важный для нашей семьи вечер.",
    signature: "Айару и семья Жақсыбековых"
  },

  media: {
    // TODO: замените фото невесты на реальный файл из папки assets.
    heroImage: "assets/hero-placeholder.svg",
    heroAlt: "Элегантный placeholder для портрета невесты"
  },

  labels: {
    date: "Дата",
    time: "Время",
    venue: "Локация",
    confirmPresence: "Подтвердить присутствие",
    scrollBelow: "Листать ниже",
    openMap: "Открыть карту",
    loadMap: "Показать карту",
    submit: "Отправить ответ",
    countdownUnits: {
      days: "дней",
      hours: "часов",
      minutes: "минут",
      seconds: "секунд"
    }
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const eventDate = buildEventDate(invitationContent.eventSchedule);

const elements = {
  metaDescription: document.getElementById("metaDescription"),
  heroEventType: document.getElementById("heroEventType"),
  heroHosts: document.getElementById("heroHosts"),
  heroBrideName: document.getElementById("heroBrideName"),
  heroScriptNote: document.getElementById("heroScriptNote"),
  heroSecondaryText: document.getElementById("heroSecondaryText"),
  heroDate: document.getElementById("heroDate"),
  heroTime: document.getElementById("heroTime"),
  heroVenue: document.getElementById("heroVenue"),
  heroLead: document.getElementById("heroLead"),
  heroPortrait: document.getElementById("heroPortrait"),
  heroDayNameShort: document.getElementById("heroDayNameShort"),
  heroDateBadge: document.getElementById("heroDateBadge"),
  labelDate: document.getElementById("labelDate"),
  labelTime: document.getElementById("labelTime"),
  labelVenue: document.getElementById("labelVenue"),
  confirmPresenceButton: document.getElementById("confirmPresenceButton"),
  scrollDownButton: document.getElementById("scrollDownButton"),
  scrollCueLabel: document.getElementById("scrollCueLabel"),
  invitationSectionEyebrow: document.getElementById("invitationSectionEyebrow"),
  invitationSectionTitle: document.getElementById("invitationSectionTitle"),
  invitationSectionScript: document.getElementById("invitationSectionScript"),
  invitationLead: document.getElementById("invitationLead"),
  invitationBody: document.getElementById("invitationBody"),
  invitationSignatureLabel: document.getElementById("invitationSignatureLabel"),
  invitationSignatureValue: document.getElementById("invitationSignatureValue"),
  countdownSectionEyebrow: document.getElementById("countdownSectionEyebrow"),
  countdownTitle: document.getElementById("countdownTitle"),
  countdownSectionScript: document.getElementById("countdownSectionScript"),
  countdownDateLine: document.getElementById("countdownDateLine"),
  countdownGrid: document.getElementById("countdownGrid"),
  countdownMessage: document.getElementById("countdownMessage"),
  daysValue: document.getElementById("daysValue"),
  hoursValue: document.getElementById("hoursValue"),
  minutesValue: document.getElementById("minutesValue"),
  secondsValue: document.getElementById("secondsValue"),
  daysLabel: document.getElementById("daysLabel"),
  hoursLabel: document.getElementById("hoursLabel"),
  minutesLabel: document.getElementById("minutesLabel"),
  secondsLabel: document.getElementById("secondsLabel"),
  timelineSectionEyebrow: document.getElementById("timelineSectionEyebrow"),
  timelineTitle: document.getElementById("timelineTitle"),
  timelineSectionScript: document.getElementById("timelineSectionScript"),
  timelineIntro: document.getElementById("timelineIntro"),
  timelineList: document.getElementById("timelineList"),
  venueSectionEyebrow: document.getElementById("venueSectionEyebrow"),
  venueTitle: document.getElementById("venueTitle"),
  venueSectionScript: document.getElementById("venueSectionScript"),
  venueOverline: document.getElementById("venueOverline"),
  venueName: document.getElementById("venueName"),
  venueAddress: document.getElementById("venueAddress"),
  venueNote: document.getElementById("venueNote"),
  openMapLink: document.getElementById("openMapLink"),
  loadMapButton: document.getElementById("loadMapButton"),
  loadMapButtonSecondary: document.getElementById("loadMapButtonSecondary"),
  mapCard: document.getElementById("mapCard"),
  mapCanvas: document.getElementById("mapCanvas"),
  mapPlaceholderTitle: document.getElementById("mapPlaceholderTitle"),
  mapPlaceholderText: document.getElementById("mapPlaceholderText"),
  dressCodeSectionEyebrow: document.getElementById("dressCodeSectionEyebrow"),
  dressCodeTitle: document.getElementById("dressCodeTitle"),
  dressCodeSectionScript: document.getElementById("dressCodeSectionScript"),
  dressCodeDescription: document.getElementById("dressCodeDescription"),
  dressCodeFinePrint: document.getElementById("dressCodeFinePrint"),
  dressCodePalette: document.getElementById("dressCodePalette"),
  dressCodeWomenArt: document.getElementById("dressCodeWomenArt"),
  dressCodeMenArt: document.getElementById("dressCodeMenArt"),
  dressWomenLabel: document.getElementById("dressWomenLabel"),
  dressWomenTitle: document.getElementById("dressWomenTitle"),
  dressWomenText: document.getElementById("dressWomenText"),
  dressWomenNotes: document.getElementById("dressWomenNotes"),
  dressMenLabel: document.getElementById("dressMenLabel"),
  dressMenTitle: document.getElementById("dressMenTitle"),
  dressMenText: document.getElementById("dressMenText"),
  dressMenNotes: document.getElementById("dressMenNotes"),
  detailsSectionEyebrow: document.getElementById("detailsSectionEyebrow"),
  detailsTitle: document.getElementById("detailsTitle"),
  detailsSectionScript: document.getElementById("detailsSectionScript"),
  detailsIntro: document.getElementById("detailsIntro"),
  detailsList: document.getElementById("detailsList"),
  rsvpSectionEyebrow: document.getElementById("rsvpSectionEyebrow"),
  rsvpTitle: document.getElementById("rsvpTitle"),
  rsvpSectionScript: document.getElementById("rsvpSectionScript"),
  rsvpIntro: document.getElementById("rsvpIntro"),
  rsvpDeadline: document.getElementById("rsvpDeadline"),
  rsvpContactHint: document.getElementById("rsvpContactHint"),
  formStatus: document.getElementById("formStatus"),
  rsvpForm: document.getElementById("rsvpForm"),
  submitButton: document.getElementById("submitButton"),
  footerScript: document.getElementById("footerScript"),
  footerText: document.getElementById("footerText"),
  footerSignature: document.getElementById("footerSignature"),
  footerContact: document.getElementById("footerContact"),
  footerYear: document.getElementById("footerYear")
};

const fieldNames = ["fullName", "contact", "attendance", "guestCount", "foodPreferences", "comment"];

function buildEventDate(schedule) {
  return new Date(schedule.year, schedule.month - 1, schedule.day, schedule.hour, schedule.minute);
}

function setText(node, value) {
  if (node) {
    node.textContent = value ?? "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatWeekdayDate(date) {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatDayName(date) {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long"
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatDayMonthShort(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short"
  })
    .format(date)
    .replace(".", "");
}

function formatTime(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function getHeroSecondaryText() {
  if (invitationContent.hero.secondaryText.trim()) {
    return invitationContent.hero.secondaryText;
  }

  if (invitationContent.groomName.trim()) {
    return `Особенный вечер в честь ${invitationContent.brideName} и новой красивой главы её жизни рядом с ${invitationContent.groomName}.`;
  }

  return `Особенный вечер в честь ${invitationContent.brideName} и начала новой прекрасной главы её жизни.`;
}

function renderStaticContent() {
  document.title = invitationContent.seo.title;
  elements.metaDescription.setAttribute("content", invitationContent.seo.description);

  setText(elements.heroEventType, invitationContent.eventType);
  setText(elements.heroHosts, invitationContent.hosts);
  setText(elements.heroBrideName, invitationContent.brideName);
  setText(elements.heroScriptNote, invitationContent.hero.scriptNote);
  setText(elements.heroSecondaryText, getHeroSecondaryText());
  setText(elements.heroDate, formatLongDate(eventDate));
  setText(elements.heroTime, formatTime(eventDate));
  setText(elements.heroVenue, invitationContent.venue.name);
  setText(elements.heroLead, invitationContent.hero.lead);
  setText(elements.heroDayNameShort, formatDayName(eventDate));
  setText(elements.heroDateBadge, formatDayMonthShort(eventDate));
  setText(elements.labelDate, invitationContent.labels.date);
  setText(elements.labelTime, invitationContent.labels.time);
  setText(elements.labelVenue, invitationContent.labels.venue);
  setText(elements.confirmPresenceButton, invitationContent.labels.confirmPresence);
  setText(elements.scrollDownButton, invitationContent.labels.scrollBelow);
  setText(elements.scrollCueLabel, invitationContent.labels.scrollBelow);

  elements.heroPortrait.src = invitationContent.media.heroImage;
  elements.heroPortrait.alt = invitationContent.media.heroAlt;

  setText(elements.invitationSectionEyebrow, invitationContent.invitation.eyebrow);
  setText(elements.invitationSectionTitle, invitationContent.invitation.title);
  setText(elements.invitationSectionScript, invitationContent.invitation.script);
  setText(elements.invitationLead, invitationContent.invitation.lead);
  setText(elements.invitationSignatureLabel, invitationContent.invitation.signatureLabel);
  setText(elements.invitationSignatureValue, invitationContent.invitation.signatureValue);
  elements.invitationBody.innerHTML = invitationContent.invitation.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  setText(elements.countdownSectionEyebrow, invitationContent.countdown.eyebrow);
  setText(elements.countdownTitle, invitationContent.countdown.title);
  setText(elements.countdownSectionScript, invitationContent.countdown.script);
  setText(elements.countdownDateLine, `${formatWeekdayDate(eventDate)} · ${formatTime(eventDate)}`);
  setText(elements.daysLabel, invitationContent.labels.countdownUnits.days);
  setText(elements.hoursLabel, invitationContent.labels.countdownUnits.hours);
  setText(elements.minutesLabel, invitationContent.labels.countdownUnits.minutes);
  setText(elements.secondsLabel, invitationContent.labels.countdownUnits.seconds);

  setText(elements.timelineSectionEyebrow, invitationContent.timeline.eyebrow);
  setText(elements.timelineTitle, invitationContent.timeline.title);
  setText(elements.timelineSectionScript, invitationContent.timeline.script);
  setText(elements.timelineIntro, invitationContent.timeline.intro);

  setText(elements.venueSectionEyebrow, invitationContent.venue.eyebrow);
  setText(elements.venueTitle, invitationContent.venue.title);
  setText(elements.venueSectionScript, invitationContent.venue.script);
  setText(elements.venueOverline, invitationContent.venue.overline);
  setText(elements.venueName, invitationContent.venue.name);
  setText(elements.venueAddress, invitationContent.venue.address);
  setText(elements.venueNote, invitationContent.venue.note);
  setText(elements.openMapLink, invitationContent.labels.openMap);
  setText(elements.loadMapButton, invitationContent.labels.loadMap);
  setText(elements.loadMapButtonSecondary, invitationContent.labels.loadMap);
  elements.openMapLink.href = invitationContent.venue.openMapUrl;
  setText(elements.mapPlaceholderTitle, invitationContent.venue.mapPlaceholderTitle);
  setText(elements.mapPlaceholderText, invitationContent.venue.mapPlaceholderText);

  setText(elements.dressCodeSectionEyebrow, invitationContent.dressCode.eyebrow);
  setText(elements.dressCodeTitle, invitationContent.dressCode.title);
  setText(elements.dressCodeSectionScript, invitationContent.dressCode.script);
  setText(elements.dressCodeDescription, invitationContent.dressCode.description);
  setText(elements.dressCodeFinePrint, invitationContent.dressCode.finePrint);
  elements.dressCodeWomenArt.src = invitationContent.dressCode.women.art;
  elements.dressCodeWomenArt.alt = invitationContent.dressCode.women.alt;
  elements.dressCodeMenArt.src = invitationContent.dressCode.men.art;
  elements.dressCodeMenArt.alt = invitationContent.dressCode.men.alt;
  setText(elements.dressWomenLabel, invitationContent.dressCode.women.label);
  setText(elements.dressWomenTitle, invitationContent.dressCode.women.title);
  setText(elements.dressWomenText, invitationContent.dressCode.women.text);
  setText(elements.dressMenLabel, invitationContent.dressCode.men.label);
  setText(elements.dressMenTitle, invitationContent.dressCode.men.title);
  setText(elements.dressMenText, invitationContent.dressCode.men.text);

  setText(elements.detailsSectionEyebrow, invitationContent.details.eyebrow);
  setText(elements.detailsTitle, invitationContent.details.title);
  setText(elements.detailsSectionScript, invitationContent.details.script);
  setText(elements.detailsIntro, invitationContent.details.intro);

  setText(elements.rsvpSectionEyebrow, invitationContent.rsvp.eyebrow);
  setText(elements.rsvpTitle, invitationContent.rsvp.title);
  setText(elements.rsvpSectionScript, invitationContent.rsvp.script);
  setText(elements.rsvpIntro, invitationContent.rsvp.intro);
  setText(elements.rsvpDeadline, invitationContent.rsvp.deadline);
  setText(elements.submitButton, invitationContent.labels.submit);

  setText(elements.footerScript, invitationContent.footer.script);
  setText(elements.footerText, invitationContent.footer.text);
  setText(elements.footerSignature, invitationContent.footer.signature);
  setText(elements.footerYear, String(new Date().getFullYear()));
}

function renderTimeline() {
  elements.timelineList.innerHTML = invitationContent.timeline.items
    .map(
      (item) => `
        <article class="timeline-item reveal" data-reveal>
          <div class="timeline-item__marker" aria-hidden="true"></div>
          <div class="timeline-item__card">
            <span class="timeline-item__time">${escapeHtml(item.time)}</span>
            <h3 class="timeline-item__title">${escapeHtml(item.title)}</h3>
            <p class="timeline-item__description">${escapeHtml(item.description)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDressCode() {
  elements.dressCodePalette.innerHTML = invitationContent.dressCode.colors
    .map(
      (color) => `
        <article class="palette-chip reveal" data-reveal>
          <span class="palette-chip__swatch" style="background:${escapeHtml(color.hex)};" aria-hidden="true"></span>
          <span class="palette-chip__name">${escapeHtml(color.name)}</span>
          <span class="palette-chip__code">${escapeHtml(color.hex)}</span>
        </article>
      `
    )
    .join("");

  elements.dressWomenNotes.innerHTML = invitationContent.dressCode.women.notes
    .map((note) => `<span class="fashion-note">${escapeHtml(note)}</span>`)
    .join("");

  elements.dressMenNotes.innerHTML = invitationContent.dressCode.men.notes
    .map((note) => `<span class="fashion-note">${escapeHtml(note)}</span>`)
    .join("");
}

function renderDetails() {
  elements.detailsList.innerHTML = invitationContent.details.items
    .map(
      (item, index) => `
        <article class="details-card reveal" data-reveal>
          <span class="details-card__index">${String(index + 1).padStart(2, "0")}</span>
          <h3 class="details-card__title">${escapeHtml(item.title)}</h3>
          <p class="details-card__text">${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function renderContacts() {
  const contactParts = [];

  if (invitationContent.contacts.coordinatorName) {
    contactParts.push(`Координатор: ${escapeHtml(invitationContent.contacts.coordinatorName)}`);
  }

  if (invitationContent.contacts.phone) {
    contactParts.push(
      `<a href="${escapeHtml(invitationContent.contacts.phoneHref)}">${escapeHtml(invitationContent.contacts.phone)}</a>`
    );
  }

  if (invitationContent.contacts.telegram) {
    contactParts.push(
      `<a href="${escapeHtml(invitationContent.contacts.telegram)}" target="_blank" rel="noreferrer">Telegram</a>`
    );
  }

  elements.rsvpContactHint.innerHTML = contactParts.join(" · ");

  if (invitationContent.contacts.telegram) {
    elements.footerContact.href = invitationContent.contacts.telegram;
    elements.footerContact.target = "_blank";
    elements.footerContact.rel = "noreferrer";
    elements.footerContact.textContent = `Организатор: ${invitationContent.contacts.coordinatorName}`;
  } else if (invitationContent.contacts.phoneHref) {
    elements.footerContact.href = invitationContent.contacts.phoneHref;
    elements.footerContact.removeAttribute("target");
    elements.footerContact.removeAttribute("rel");
    elements.footerContact.textContent = invitationContent.contacts.phone;
  } else {
    elements.footerContact.removeAttribute("href");
    elements.footerContact.removeAttribute("target");
    elements.footerContact.removeAttribute("rel");
    elements.footerContact.textContent = "";
  }
}

function updateCountdown() {
  const diff = eventDate.getTime() - Date.now();

  if (diff <= 0) {
    elements.countdownGrid.hidden = true;
    setText(elements.countdownMessage, invitationContent.countdown.afterMessage);
    return;
  }

  elements.countdownGrid.hidden = false;
  setText(elements.countdownMessage, "");

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hour);
  const minutes = Math.floor((diff % hour) / minute);
  const seconds = Math.floor((diff % minute) / second);

  setText(elements.daysValue, String(days).padStart(2, "0"));
  setText(elements.hoursValue, String(hours).padStart(2, "0"));
  setText(elements.minutesValue, String(minutes).padStart(2, "0"));
  setText(elements.secondsValue, String(seconds).padStart(2, "0"));
}

let mapLoaded = false;

function loadMap() {
  if (mapLoaded || !invitationContent.venue.mapEmbedUrl) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = invitationContent.venue.mapEmbedUrl;
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.title = `Карта: ${invitationContent.venue.name}`;

  elements.mapCanvas.replaceChildren(iframe);
  elements.mapCard.classList.add("is-loaded");
  mapLoaded = true;
}

function setupLazyMap() {
  elements.loadMapButton.addEventListener("click", loadMap);
  elements.loadMapButtonSecondary.addEventListener("click", loadMap);

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const mapObserver = new IntersectionObserver(
    (entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMap();
        observer.disconnect();
      }
    },
    {
      rootMargin: "220px 0px"
    }
  );

  mapObserver.observe(elements.mapCard);
}

function setStatus(type, message) {
  elements.formStatus.className = `form-status form-status--${type} is-visible`;
  elements.formStatus.textContent = message;
}

function clearStatus() {
  elements.formStatus.className = "form-status";
  elements.formStatus.textContent = "";
}

function clearFieldErrors() {
  fieldNames.forEach((name) => {
    const field = elements.rsvpForm.querySelector(`[data-field="${name}"]`);
    const error = elements.rsvpForm.querySelector(`[data-error-for="${name}"]`);
    const control = elements.rsvpForm.elements[name];

    field.classList.remove("has-error");
    error.textContent = "";
    control.removeAttribute("aria-invalid");
  });
}

function clearFieldError(name) {
  const field = elements.rsvpForm.querySelector(`[data-field="${name}"]`);
  const error = elements.rsvpForm.querySelector(`[data-error-for="${name}"]`);
  const control = elements.rsvpForm.elements[name];

  if (!field || !error || !control) {
    return;
  }

  field.classList.remove("has-error");
  error.textContent = "";
  control.removeAttribute("aria-invalid");
}

function setFieldError(name, message) {
  const field = elements.rsvpForm.querySelector(`[data-field="${name}"]`);
  const error = elements.rsvpForm.querySelector(`[data-error-for="${name}"]`);
  const control = elements.rsvpForm.elements[name];

  field.classList.add("has-error");
  error.textContent = message;
  control.setAttribute("aria-invalid", "true");
}

function getFormValues() {
  const formData = new FormData(elements.rsvpForm);

  return {
    fullName: String(formData.get("fullName")).trim(),
    contact: String(formData.get("contact")).trim(),
    attendance: String(formData.get("attendance")).trim(),
    guestCount: Number(formData.get("guestCount")),
    foodPreferences: String(formData.get("foodPreferences")).trim(),
    comment: String(formData.get("comment")).trim()
  };
}

function validateForm(values) {
  const errors = {};

  if (values.fullName.length < 2) {
    errors.fullName = "Пожалуйста, укажите имя и фамилию.";
  }

  if (values.contact.length < 3) {
    errors.contact = "Нужен способ связи: телефон или Telegram.";
  }

  if (!values.attendance) {
    errors.attendance = "Выберите, пожалуйста, вариант ответа.";
  }

  if (Number.isNaN(values.guestCount)) {
    errors.guestCount = "Укажите количество гостей.";
  } else if (values.attendance === "no" && values.guestCount !== 0) {
    errors.guestCount = "Если вы не сможете присутствовать, поставьте 0.";
  } else if (values.attendance !== "no" && (values.guestCount < 1 || values.guestCount > 6)) {
    errors.guestCount = "Введите число гостей от 1 до 6.";
  }

  return errors;
}

function updateGuestCountState() {
  const attendance = elements.rsvpForm.elements.attendance.value;
  const guestCountField = elements.rsvpForm.elements.guestCount;

  if (attendance === "no") {
    guestCountField.value = "0";
    guestCountField.disabled = true;
  } else {
    guestCountField.disabled = false;
    if (Number(guestCountField.value) < 1) {
      guestCountField.value = "1";
    }
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  clearStatus();
  clearFieldErrors();

  const values = getFormValues();
  const errors = validateForm(values);

  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([name, message]) => {
      setFieldError(name, message);
    });

    const firstErrorField = elements.rsvpForm.querySelector(".field.has-error .field__control");
    if (firstErrorField) {
      firstErrorField.focus();
    }
    return;
  }

  elements.submitButton.disabled = true;
  elements.submitButton.textContent = "Отправляем...";

  const payload = {
    ...values,
    eventType: invitationContent.eventType,
    brideName: invitationContent.brideName,
    submittedAt: new Date().toISOString()
  };

  try {
    if (invitationContent.rsvp.endpoint) {
      // TODO: сюда можно подключить Google Apps Script / Formspree / собственный backend.
      const response = await fetch(invitationContent.rsvp.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("RSVP request failed");
      }

      setStatus("success", invitationContent.rsvp.endpointSuccessMessage);
    } else {
      const existingResponses = JSON.parse(localStorage.getItem(invitationContent.rsvp.storageKey) || "[]");
      existingResponses.push(payload);
      localStorage.setItem(invitationContent.rsvp.storageKey, JSON.stringify(existingResponses));
      setStatus("success", invitationContent.rsvp.successMessage);
    }

    elements.rsvpForm.reset();
    elements.rsvpForm.elements.guestCount.value = "1";
    updateGuestCountState();
  } catch (error) {
    console.error(error);
    setStatus("error", invitationContent.rsvp.errorMessage);
  } finally {
    elements.submitButton.disabled = false;
    elements.submitButton.textContent = invitationContent.labels.submit;
  }
}

function setupForm() {
  updateGuestCountState();

  elements.rsvpForm.addEventListener("submit", handleFormSubmit);
  elements.rsvpForm.addEventListener("input", (event) => {
    clearStatus();
    if (event.target && event.target.name) {
      clearFieldError(event.target.name);
    }
  });
  elements.rsvpForm.addEventListener("change", (event) => {
    if (event.target && event.target.name) {
      clearFieldError(event.target.name);
    }
  });
  elements.rsvpForm.elements.attendance.addEventListener("change", updateGuestCountState);
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function setupHeroParallax() {
  if (prefersReducedMotion) {
    return;
  }

  const hero = document.querySelector(".hero");
  const root = document.documentElement;
  let ticking = false;

  function updateProgress() {
    const progress = Math.max(0, Math.min(1, window.scrollY / Math.max(hero.offsetHeight * 0.9, 1)));
    root.style.setProperty("--scroll-progress", progress.toFixed(3));
    ticking = false;
  }

  updateProgress();

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true }
  );
}

function init() {
  renderStaticContent();
  renderTimeline();
  renderDressCode();
  renderDetails();
  renderContacts();
  updateCountdown();
  setupLazyMap();
  setupForm();
  setupScrollButtons();
  setupRevealAnimations();
  setupHeroParallax();
  window.setInterval(updateCountdown, 1000);
}

init();
