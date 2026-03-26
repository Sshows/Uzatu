const invitationContent = {
  seo: {
    title: "Қыз ұзату | Айару",
    description: "Премиальное цифровое приглашение на Қыз ұзату в формате одного длинного лендинга."
  },

  // TODO: поменяйте название события при необходимости.
  eventType: "Қыз ұзату",

  // TODO: поменяйте имя невесты.
  brideName: "Айару",

  // TODO: поменяйте имя жениха. Можно оставить пустым, если не нужно выводить.
  groomName: "Нұрсұлтан",

  // TODO: поменяйте семью / hosts.
  hosts: "Семья Жақсыбековых с теплом приглашает вас",

  // TODO: поменяйте дату и время торжества.
  eventDateTime: "2026-09-18T18:00:00+05:00",
  timezoneLabel: "Кызылорда, GMT+5",

  heroSecondaryText: "",
  heroLead:
    "Будем счастливы разделить с вами тёплый и торжественный вечер, посвящённый проводам нашей дочери в новую красивую главу её жизни.",

  invitationLead: "Дорогие родные и близкие!",
  invitationParagraphs: [
    "С большим уважением и любовью приглашаем вас на Қыз ұзату — особенный семейный вечер, наполненный трепетом, благодарностью и светлыми пожеланиями.",
    "Для нашей семьи это очень важный и трогательный момент. Нам будет особенно дорого, если вы разделите его рядом с Айару, поддержите её своим присутствием и сохраните этот вечер вместе с нами в памяти как тёплую семейную историю.",
    "Пусть эта встреча будет наполнена искренними улыбками, красивыми словами, добрыми бата и спокойной, светлой атмосферой близости."
  ],

  countdownAfterMessage:
    "Этот долгожданный вечер уже начался. Будем рады встретить вас и разделить его вместе.",

  timelineIntro:
    "Мы продумали вечер мягко и камерно, чтобы у каждого момента было своё красивое место.",
  timeline: [
    {
      time: "17:00",
      title: "Сбор гостей",
      description: "Неспешная встреча гостей, welcome drinks и первые тёплые объятия."
    },
    {
      time: "17:40",
      title: "Приветствие гостей",
      description: "Слова благодарности, знакомство с атмосферой вечера и начало общей семейной встречи."
    },
    {
      time: "18:15",
      title: "Торжественная часть",
      description: "Главные моменты вечера, наполненные уважением к семье, традициям и новому этапу."
    },
    {
      time: "19:00",
      title: "Особый выход невесты",
      description: "Трогательный момент, который хочется прожить спокойно, красиво и вместе с самыми близкими."
    },
    {
      time: "19:40",
      title: "Ужин и фотосессия",
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
  ],

  venue: {
    title: "Место встречи",
    overline: "Локация вечера",
    // TODO: поменяйте площадку и адрес.
    name: "Aru Hall",
    address: "Кызылорда, ул. Тәуелсіздік, 12",
    note:
      "Зал находится в центральной части города. Просим приехать немного заранее, чтобы спокойно занять места к началу торжества.",
    // TODO: поменяйте карту и ссылку на реальную локацию.
    openMapUrl: "https://www.google.com/maps/search/?api=1&query=Kyzylorda",
    mapEmbedUrl: "https://www.google.com/maps?q=Kyzylorda&output=embed",
    mapPlaceholderTitle: "Карта загрузится только при необходимости",
    mapPlaceholderText:
      "Так страница остаётся лёгкой и быстро открывается на телефоне даже при слабом интернете."
  },

  dressCode: {
    title: "Dress code",
    description:
      "Будем рады образам в мягкой светлой палитре: спокойные благородные оттенки поддержат нежную атмосферу этого вечера.",
    colors: [
      { name: "Ivory", hex: "#F4EDE2" },
      { name: "Champagne", hex: "#EAD8BE" },
      { name: "Beige", hex: "#D9C3A7" },
      { name: "Taupe", hex: "#B69F8C" },
      { name: "Soft Brown", hex: "#8F7763" },
      { name: "Warm White", hex: "#F9F6F1" }
    ]
  },

  detailsIntro:
    "Собрали всё важное в одном месте, чтобы приглашение было лёгким и удобным для быстрого просмотра на телефоне.",
  details: [
    {
      title: "От имени семьи",
      content:
        "С любовью и уважением приглашают семья Жақсыбековых. Для нас особенно ценно разделить этот вечер именно в кругу близких сердцу людей."
    },
    {
      title: "Подарки",
      content:
        "Ваше присутствие будет самым тёплым подарком. Если вы захотите выразить внимание дополнительно, нам будет комфортно принять его в конверте."
    },
    {
      title: "Цветы",
      content:
        "Если вам хочется подарить цветы, выберите, пожалуйста, один аккуратный букет или композицию в нежной гамме без лишней упаковки."
    },
    {
      title: "Дети",
      content:
        "Мы будем рады маленьким гостям. Если вы планируете прийти с детьми, пожалуйста, укажите это в RSVP, чтобы мы всё красиво подготовили."
    },
    {
      title: "Парковка",
      content:
        "У площадки предусмотрена парковка для гостей. В день мероприятия вас также сможет сориентировать координатор."
    },
    {
      title: "Контакт организатора",
      content:
        "По любым вопросам, связанным с рассадкой, приездом или уточнениями по вечеру, можно связаться с координатором Асем."
    }
  ],

  contacts: {
    coordinatorName: "Асем",
    phone: "+7 777 123 45 67",
    phoneHref: "tel:+77771234567",
    telegram: "https://t.me/asem_invite"
  },

  rsvp: {
    title: "Подтверждение присутствия",
    intro:
      "Пожалуйста, подтвердите своё присутствие заранее, чтобы мы смогли с любовью подготовить вечер для каждого гостя.",
    deadline: "Просим ответить до 10 сентября 2026 года.",
    // TODO: подключите реальную отправку RSVP через Google Apps Script / Formspree / любой backend.
    endpoint: "",
    storageKey: "kyz-uzatu-rsvp-responses",
    successMessage: "Спасибо. Ваш ответ бережно сохранён на этом устройстве.",
    endpointSuccessMessage: "Спасибо. Ваш ответ отправлен организатору.",
    errorMessage:
      "Не удалось отправить форму. Попробуйте ещё раз или свяжитесь с организатором напрямую."
  },

  footerText:
    "С нетерпением ждём встречи в этот красивый и очень важный для нашей семьи вечер.",
  footerSignature: "Айару и семья Жақсыбековых",

  media: {
    // TODO: замените фото невесты на реальный файл из папки assets.
    heroImage: "assets/hero-placeholder.svg",
    heroAlt: "Элегантный placeholder для портрета невесты"
  },

  labels: {
    date: "Дата",
    time: "Время",
    confirmPresence: "Подтвердить присутствие",
    scrollBelow: "Листать ниже",
    invitationEyebrow: "Приглашение",
    invitationTitle: "С теплом приглашаем вас разделить этот особенный вечер",
    countdownEyebrow: "До встречи",
    countdownTitle: "До Қыз ұзату осталось",
    timelineEyebrow: "Программа",
    timelineTitle: "Красивый ритм вечера",
    venueEyebrow: "Локация",
    dressCodeEyebrow: "Образы",
    detailsEyebrow: "Важные детали",
    detailsTitle: "Всё, что пригодится перед вечером",
    rsvpEyebrow: "RSVP",
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
const countdownTarget = new Date(invitationContent.eventDateTime);

const elements = {
  metaDescription: document.getElementById("metaDescription"),
  heroEventType: document.getElementById("heroEventType"),
  heroHosts: document.getElementById("heroHosts"),
  heroBrideName: document.getElementById("heroBrideName"),
  heroSecondaryText: document.getElementById("heroSecondaryText"),
  heroDate: document.getElementById("heroDate"),
  heroTime: document.getElementById("heroTime"),
  heroLead: document.getElementById("heroLead"),
  heroPortrait: document.getElementById("heroPortrait"),
  labelDate: document.getElementById("labelDate"),
  labelTime: document.getElementById("labelTime"),
  confirmPresenceButton: document.getElementById("confirmPresenceButton"),
  scrollDownButton: document.getElementById("scrollDownButton"),
  scrollCueLabel: document.getElementById("scrollCueLabel"),
  invitationSectionEyebrow: document.getElementById("invitationSectionEyebrow"),
  invitationSectionTitle: document.getElementById("invitationSectionTitle"),
  invitationLead: document.getElementById("invitationLead"),
  invitationBody: document.getElementById("invitationBody"),
  countdownSectionEyebrow: document.getElementById("countdownSectionEyebrow"),
  countdownTitle: document.getElementById("countdownTitle"),
  countdownDateLine: document.getElementById("countdownDateLine"),
  countdownMessage: document.getElementById("countdownMessage"),
  countdownGrid: document.getElementById("countdownGrid"),
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
  timelineIntro: document.getElementById("timelineIntro"),
  timelineList: document.getElementById("timelineList"),
  venueSectionEyebrow: document.getElementById("venueSectionEyebrow"),
  venueTitle: document.getElementById("venueTitle"),
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
  dressCodeDescription: document.getElementById("dressCodeDescription"),
  dressCodePalette: document.getElementById("dressCodePalette"),
  detailsSectionEyebrow: document.getElementById("detailsSectionEyebrow"),
  detailsTitle: document.getElementById("detailsTitle"),
  detailsIntro: document.getElementById("detailsIntro"),
  detailsList: document.getElementById("detailsList"),
  rsvpSectionEyebrow: document.getElementById("rsvpSectionEyebrow"),
  rsvpTitle: document.getElementById("rsvpTitle"),
  rsvpIntro: document.getElementById("rsvpIntro"),
  rsvpDeadline: document.getElementById("rsvpDeadline"),
  rsvpContactHint: document.getElementById("rsvpContactHint"),
  formStatus: document.getElementById("formStatus"),
  rsvpForm: document.getElementById("rsvpForm"),
  footerText: document.getElementById("footerText"),
  footerSignature: document.getElementById("footerSignature"),
  footerContact: document.getElementById("footerContact"),
  footerYear: document.getElementById("footerYear"),
  submitButton: document.getElementById("submitButton")
};

const fieldNames = ["fullName", "contact", "attendance", "guestCount", "foodPreferences", "comment"];

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

function formatDateWithWeekday(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function getHeroSecondaryText() {
  if (invitationContent.heroSecondaryText.trim()) {
    return invitationContent.heroSecondaryText;
  }

  if (invitationContent.groomName.trim()) {
    return `Особенный вечер в честь ${invitationContent.brideName} и новой главы её жизни рядом с ${invitationContent.groomName}.`;
  }

  return `Особенный вечер в честь ${invitationContent.brideName} и начала новой прекрасной главы.`;
}

function renderStaticContent() {
  const eventDate = formatLongDate(countdownTarget);
  const eventTime = formatTime(countdownTarget);

  document.title = invitationContent.seo.title;
  if (elements.metaDescription) {
    elements.metaDescription.setAttribute("content", invitationContent.seo.description);
  }

  setText(elements.heroEventType, invitationContent.eventType);
  setText(elements.heroHosts, invitationContent.hosts);
  setText(elements.heroBrideName, invitationContent.brideName);
  setText(elements.heroSecondaryText, getHeroSecondaryText());
  setText(elements.heroDate, eventDate);
  setText(elements.heroTime, `${eventTime} · ${invitationContent.timezoneLabel}`);
  setText(elements.heroLead, invitationContent.heroLead);
  setText(elements.labelDate, invitationContent.labels.date);
  setText(elements.labelTime, invitationContent.labels.time);
  setText(elements.confirmPresenceButton, invitationContent.labels.confirmPresence);
  setText(elements.scrollDownButton, invitationContent.labels.scrollBelow);
  setText(elements.scrollCueLabel, invitationContent.labels.scrollBelow);

  elements.heroPortrait.src = invitationContent.media.heroImage;
  elements.heroPortrait.alt = invitationContent.media.heroAlt;

  setText(elements.invitationSectionEyebrow, invitationContent.labels.invitationEyebrow);
  setText(elements.invitationSectionTitle, invitationContent.labels.invitationTitle);
  setText(elements.invitationLead, invitationContent.invitationLead);
  elements.invitationBody.innerHTML = invitationContent.invitationParagraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  setText(elements.countdownSectionEyebrow, invitationContent.labels.countdownEyebrow);
  setText(elements.countdownTitle, invitationContent.labels.countdownTitle);
  setText(
    elements.countdownDateLine,
    `${formatDateWithWeekday(countdownTarget)} · ${eventTime} · ${invitationContent.timezoneLabel}`
  );
  setText(elements.daysLabel, invitationContent.labels.countdownUnits.days);
  setText(elements.hoursLabel, invitationContent.labels.countdownUnits.hours);
  setText(elements.minutesLabel, invitationContent.labels.countdownUnits.minutes);
  setText(elements.secondsLabel, invitationContent.labels.countdownUnits.seconds);

  setText(elements.timelineSectionEyebrow, invitationContent.labels.timelineEyebrow);
  setText(elements.timelineTitle, invitationContent.labels.timelineTitle);
  setText(elements.timelineIntro, invitationContent.timelineIntro);

  setText(elements.venueSectionEyebrow, invitationContent.labels.venueEyebrow);
  setText(elements.venueTitle, invitationContent.venue.title);
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

  setText(elements.dressCodeSectionEyebrow, invitationContent.labels.dressCodeEyebrow);
  setText(elements.dressCodeTitle, invitationContent.dressCode.title);
  setText(elements.dressCodeDescription, invitationContent.dressCode.description);

  setText(elements.detailsSectionEyebrow, invitationContent.labels.detailsEyebrow);
  setText(elements.detailsTitle, invitationContent.labels.detailsTitle);
  setText(elements.detailsIntro, invitationContent.detailsIntro);

  setText(elements.rsvpSectionEyebrow, invitationContent.labels.rsvpEyebrow);
  setText(elements.rsvpTitle, invitationContent.rsvp.title);
  setText(elements.rsvpIntro, invitationContent.rsvp.intro);
  setText(elements.rsvpDeadline, invitationContent.rsvp.deadline);
  setText(elements.submitButton, invitationContent.labels.submit);

  setText(elements.footerText, invitationContent.footerText);
  setText(elements.footerSignature, invitationContent.footerSignature);
  setText(elements.footerYear, new Date().getFullYear());
}

function renderTimeline() {
  elements.timelineList.innerHTML = invitationContent.timeline
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
}

function renderDetails() {
  elements.detailsList.innerHTML = invitationContent.details
    .map(
      (detail, index) => `
        <details class="details-item reveal" data-reveal ${index === 0 ? "open" : ""}>
          <summary>${escapeHtml(detail.title)}</summary>
          <div class="details-item__body">
            <p>${escapeHtml(detail.content)}</p>
          </div>
        </details>
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
  const diff = countdownTarget.getTime() - Date.now();

  if (diff <= 0) {
    elements.countdownGrid.hidden = true;
    setText(elements.countdownMessage, invitationContent.countdownAfterMessage);
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
      const shouldLoad = entries.some((entry) => entry.isIntersecting);
      if (shouldLoad) {
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
    fullName: formData.get("fullName").trim(),
    contact: formData.get("contact").trim(),
    attendance: formData.get("attendance").trim(),
    guestCount: Number(formData.get("guestCount")),
    foodPreferences: formData.get("foodPreferences").trim(),
    comment: formData.get("comment").trim()
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
  window.setInterval(updateCountdown, 1000);
}

init();
