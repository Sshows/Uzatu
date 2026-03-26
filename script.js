const siteContent = {
  seo: {
    title: "Қыз ұзату | Айару",
    description: "Премиальное цифровое приглашение на Қыз ұзату."
  },

  // TODO: поменяйте название события.
  eventType: "Қыз ұзату",

  // TODO: поменяйте имя невесты.
  brideName: "Айару",

  // TODO: поменяйте имя жениха.
  groomName: "Нұрсұлтан",

  // TODO: поменяйте семью / hosts.
  hosts: "Семья Жақсыбековых с теплом приглашает вас",

  // TODO: поменяйте дату и время.
  eventDate: {
    year: 2026,
    month: 9,
    day: 18,
    hour: 18,
    minute: 0
  },

  heroLead:
    "Будем счастливы разделить с вами этот трогательный и очень важный для нашей семьи вечер, наполненный теплом, уважением к традициям и светлыми пожеланиями.",

  invitation: {
    kicker: "Приглашение",
    title: "Соберёмся рядом с самыми близкими в красивый семейный вечер",
    lead: "Дорогие родные и близкие!",
    paragraphs: [
      "С большим уважением и любовью приглашаем вас на Қыз ұзату — особенный семейный вечер, наполненный трепетом, благодарностью и искренними словами.",
      "Для нашей семьи это очень важный и эмоциональный момент. Нам будет особенно дорого, если вы разделите его рядом с Айару и сохраните этот вечер вместе с нами как тёплую семейную историю.",
      "Пусть эта встреча будет наполнена красивой атмосферой, добрыми бата и спокойным ощущением близости."
    ],
    signature: "С уважением и любовью, семья Жақсыбековых"
  },

  countdown: {
    kicker: "До встречи",
    title: "До Қыз ұзату осталось",
    afterMessage: "Этот долгожданный вечер уже начался. Будем рады видеть вас рядом."
  },

  timeline: {
    kicker: "Программа",
    title: "Ритм вечера",
    intro: "Лёгкий тайминг, чтобы весь вечер ощущался спокойно, красиво и без суеты.",
    items: [
      { time: "17:00", title: "Сбор гостей", description: "Неспешная встреча гостей и первые тёплые объятия." },
      { time: "17:40", title: "Приветствие", description: "Слова благодарности и начало общей семейной встречи." },
      { time: "18:15", title: "Торжественная часть", description: "Главные моменты вечера, наполненные уважением к семье и традиции." },
      { time: "19:00", title: "Выход невесты", description: "Особенный и очень трогательный момент вечера." },
      { time: "19:40", title: "Фотосессия и ужин", description: "Время для красивых кадров, общения и праздничного ужина." },
      { time: "20:40", title: "Пожелания и бата", description: "Искренние слова от родных и близких, которые останутся в сердце." },
      { time: "21:20", title: "Торт и завершение", description: "Мягкий финал торжества и последние тёплые мгновения вечера." }
    ]
  },

  venue: {
    kicker: "Локация",
    title: "Место встречи",
    eyebrow: "Локация вечера",
    // TODO: поменяйте площадку и адрес.
    name: "Aru Hall",
    address: "Кызылорда, ул. Тәуелсіздік, 12",
    note: "Просим приехать немного заранее, чтобы спокойно занять места к началу торжества.",
    // TODO: поменяйте карту и ссылку на реальную локацию.
    openMapUrl: "https://www.google.com/maps/search/?api=1&query=Kyzylorda",
    mapEmbedUrl: "https://www.google.com/maps?q=Kyzylorda&output=embed",
    mapPlaceholderTitle: "Карта загрузится по запросу",
    mapPlaceholderText: "Так страница остаётся легче и быстрее открывается на телефоне."
  },

  dressCode: {
    kicker: "Dress code",
    title: "Образы",
    description: "Будем рады образам в спокойной благородной гамме: мягкие оттенки и чистые силуэты поддержат атмосферу вечера.",
    // TODO: поменяйте палитру dress code и карточки образов.
    palette: [
      { name: "Ivory", hex: "#F6EFE5" },
      { name: "Champagne", hex: "#E4D0B5" },
      { name: "Cream", hex: "#F1E6D8" },
      { name: "Taupe", hex: "#B79F8A" },
      { name: "Mocha", hex: "#8A6E58" },
      { name: "Warm White", hex: "#FBF8F3" }
    ],
    looks: [
      {
        label: "Для неё",
        title: "Вечернее платье",
        text: "Элегантное платье в спокойной светлой гамме: струящиеся ткани, мягкий силуэт и лаконичные детали.",
        tags: ["midi / maxi", "чистый силуэт", "деликатный блеск"],
        art: "assets/look-woman.svg",
        alt: "Минималистичная иллюстрация женского образа"
      },
      {
        label: "Для него",
        title: "Смокинг или костюм",
        text: "Классический тёмный костюм или смокинг с аккуратной рубашкой и минималистичными акцентами.",
        tags: ["глубокий тёмный тон", "классическая посадка", "сдержанный образ"],
        art: "assets/look-man.svg",
        alt: "Минималистичная иллюстрация мужского образа"
      }
    ],
    note: "Чем спокойнее и чище образ, тем красивее он будет смотреться в общей атмосфере этого вечера."
  },

  details: {
    kicker: "Важные детали",
    title: "Всё, что пригодится перед вечером",
    intro: "Собрали всё важное в одном месте, чтобы приглашение было удобным и быстрым для просмотра на телефоне.",
    items: [
      { title: "От имени семьи", text: "С любовью и уважением приглашают семья Жақсыбековых." },
      { title: "Подарки", text: "Ваше присутствие будет самым тёплым подарком. Если захотите выразить внимание дополнительно, нам будет комфортно принять его в конверте." },
      { title: "Цветы", text: "Если вам хочется подарить цветы, выберите, пожалуйста, один аккуратный букет или композицию в нежной гамме." },
      { title: "Дети", text: "Мы будем рады маленьким гостям. Если планируете прийти с детьми, пожалуйста, укажите это в RSVP." },
      { title: "Парковка", text: "У площадки предусмотрена парковка для гостей." },
      { title: "Контакт организатора", text: "По всем вопросам можно связаться с координатором Асем." }
    ]
  },

  contacts: {
    coordinatorName: "Асем",
    phone: "+7 777 123 45 67",
    phoneHref: "tel:+77771234567",
    telegram: "https://t.me/asem_invite"
  },

  rsvp: {
    kicker: "RSVP",
    title: "Подтверждение присутствия",
    intro: "Пожалуйста, подтвердите своё присутствие заранее, чтобы мы смогли подготовить вечер с заботой о каждом госте.",
    deadline: "Просим ответить до 10 сентября 2026 года.",
    // TODO: подключите Google Apps Script / Formspree / любой backend.
    endpoint: "",
    storageKey: "kyz-uzatu-rsvp-responses",
    successMessage: "Спасибо. Ваш ответ сохранён.",
    endpointSuccessMessage: "Спасибо. Ваш ответ отправлен.",
    errorMessage: "Не удалось отправить форму. Попробуйте ещё раз или свяжитесь с организатором напрямую."
  },

  footer: {
    text: "С нетерпением ждём встречи в этот красивый и очень важный для нашей семьи вечер.",
    signature: "Айару и семья Жақсыбековых"
  },

  media: {
    // TODO: замените фото невесты.
    heroImage: "assets/hero-placeholder.svg",
    heroAlt: "Портрет-заглушка для невесты"
  },

  labels: {
    date: "Дата",
    time: "Время",
    place: "Локация",
    confirm: "Подтвердить присутствие",
    scroll: "Листать ниже",
    openMap: "Открыть карту",
    loadMap: "Показать карту",
    submit: "Отправить ответ",
    countdown: {
      days: "дней",
      hours: "часов",
      minutes: "минут",
      seconds: "секунд"
    }
  }
};

const eventDate = new Date(
  siteContent.eventDate.year,
  siteContent.eventDate.month - 1,
  siteContent.eventDate.day,
  siteContent.eventDate.hour,
  siteContent.eventDate.minute
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const elements = {
  metaDescription: document.getElementById("metaDescription"),
  heroEventType: document.getElementById("heroEventType"),
  heroBrideName: document.getElementById("heroBrideName"),
  heroSubtitle: document.getElementById("heroSubtitle"),
  heroDate: document.getElementById("heroDate"),
  heroTime: document.getElementById("heroTime"),
  heroVenue: document.getElementById("heroVenue"),
  heroLead: document.getElementById("heroLead"),
  heroPortrait: document.getElementById("heroPortrait"),
  labelDate: document.getElementById("labelDate"),
  labelTime: document.getElementById("labelTime"),
  labelPlace: document.getElementById("labelPlace"),
  confirmPresenceButton: document.getElementById("confirmPresenceButton"),
  scrollDownButton: document.getElementById("scrollDownButton"),
  scrollCueLabel: document.getElementById("scrollCueLabel"),
  invitationKicker: document.getElementById("invitationKicker"),
  invitationTitle: document.getElementById("invitationTitle"),
  invitationLead: document.getElementById("invitationLead"),
  invitationBody: document.getElementById("invitationBody"),
  invitationSignature: document.getElementById("invitationSignature"),
  countdownKicker: document.getElementById("countdownKicker"),
  countdownTitle: document.getElementById("countdownTitle"),
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
  timelineKicker: document.getElementById("timelineKicker"),
  timelineTitle: document.getElementById("timelineTitle"),
  timelineIntro: document.getElementById("timelineIntro"),
  timelineList: document.getElementById("timelineList"),
  venueKicker: document.getElementById("venueKicker"),
  venueTitle: document.getElementById("venueTitle"),
  venueEyebrow: document.getElementById("venueEyebrow"),
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
  dressCodeKicker: document.getElementById("dressCodeKicker"),
  dressCodeTitle: document.getElementById("dressCodeTitle"),
  dressCodeDescription: document.getElementById("dressCodeDescription"),
  dressCodePalette: document.getElementById("dressCodePalette"),
  looksGrid: document.getElementById("looksGrid"),
  dressCodeNote: document.getElementById("dressCodeNote"),
  detailsKicker: document.getElementById("detailsKicker"),
  detailsTitle: document.getElementById("detailsTitle"),
  detailsIntro: document.getElementById("detailsIntro"),
  detailsList: document.getElementById("detailsList"),
  rsvpKicker: document.getElementById("rsvpKicker"),
  rsvpTitle: document.getElementById("rsvpTitle"),
  rsvpIntro: document.getElementById("rsvpIntro"),
  rsvpDeadline: document.getElementById("rsvpDeadline"),
  rsvpContactHint: document.getElementById("rsvpContactHint"),
  rsvpForm: document.getElementById("rsvpForm"),
  formStatus: document.getElementById("formStatus"),
  submitButton: document.getElementById("submitButton"),
  footerText: document.getElementById("footerText"),
  footerSignature: document.getElementById("footerSignature"),
  footerContact: document.getElementById("footerContact"),
  footerYear: document.getElementById("footerYear")
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

function formatWeekdayDate(date) {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function renderContent() {
  document.title = siteContent.seo.title;
  elements.metaDescription.setAttribute("content", siteContent.seo.description);

  setText(elements.heroEventType, siteContent.eventType);
  setText(elements.heroBrideName, siteContent.brideName);
  setText(
    elements.heroSubtitle,
    `Особенный вечер в честь ${siteContent.brideName}${siteContent.groomName ? ` и новой главы рядом с ${siteContent.groomName}` : ""}.`
  );
  setText(elements.heroDate, formatLongDate(eventDate));
  setText(elements.heroTime, formatTime(eventDate));
  setText(elements.heroVenue, siteContent.venue.name);
  setText(elements.heroLead, siteContent.heroLead);
  setText(elements.labelDate, siteContent.labels.date);
  setText(elements.labelTime, siteContent.labels.time);
  setText(elements.labelPlace, siteContent.labels.place);
  setText(elements.confirmPresenceButton, siteContent.labels.confirm);
  setText(elements.scrollDownButton, siteContent.labels.scroll);
  setText(elements.scrollCueLabel, siteContent.labels.scroll);
  elements.heroPortrait.src = siteContent.media.heroImage;
  elements.heroPortrait.alt = siteContent.media.heroAlt;

  setText(elements.invitationKicker, siteContent.invitation.kicker);
  setText(elements.invitationTitle, siteContent.invitation.title);
  setText(elements.invitationLead, siteContent.invitation.lead);
  elements.invitationBody.innerHTML = siteContent.invitation.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  setText(elements.invitationSignature, siteContent.invitation.signature);

  setText(elements.countdownKicker, siteContent.countdown.kicker);
  setText(elements.countdownTitle, siteContent.countdown.title);
  setText(elements.countdownDateLine, `${formatWeekdayDate(eventDate)} · ${formatTime(eventDate)}`);
  setText(elements.daysLabel, siteContent.labels.countdown.days);
  setText(elements.hoursLabel, siteContent.labels.countdown.hours);
  setText(elements.minutesLabel, siteContent.labels.countdown.minutes);
  setText(elements.secondsLabel, siteContent.labels.countdown.seconds);

  setText(elements.timelineKicker, siteContent.timeline.kicker);
  setText(elements.timelineTitle, siteContent.timeline.title);
  setText(elements.timelineIntro, siteContent.timeline.intro);
  elements.timelineList.innerHTML = siteContent.timeline.items
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

  setText(elements.venueKicker, siteContent.venue.kicker);
  setText(elements.venueTitle, siteContent.venue.title);
  setText(elements.venueEyebrow, siteContent.venue.eyebrow);
  setText(elements.venueName, siteContent.venue.name);
  setText(elements.venueAddress, siteContent.venue.address);
  setText(elements.venueNote, siteContent.venue.note);
  setText(elements.openMapLink, siteContent.labels.openMap);
  setText(elements.loadMapButton, siteContent.labels.loadMap);
  setText(elements.loadMapButtonSecondary, siteContent.labels.loadMap);
  elements.openMapLink.href = siteContent.venue.openMapUrl;
  setText(elements.mapPlaceholderTitle, siteContent.venue.mapPlaceholderTitle);
  setText(elements.mapPlaceholderText, siteContent.venue.mapPlaceholderText);

  setText(elements.dressCodeKicker, siteContent.dressCode.kicker);
  setText(elements.dressCodeTitle, siteContent.dressCode.title);
  setText(elements.dressCodeDescription, siteContent.dressCode.description);
  setText(elements.dressCodeNote, siteContent.dressCode.note);
  elements.dressCodePalette.innerHTML = siteContent.dressCode.palette
    .map(
      (color) => `
        <article class="swatch">
          <span class="swatch__dot" style="background:${escapeHtml(color.hex)};" aria-hidden="true"></span>
          <span class="swatch__name">${escapeHtml(color.name)}</span>
        </article>
      `
    )
    .join("");
  elements.looksGrid.innerHTML = siteContent.dressCode.looks
    .map(
      (look) => `
        <article class="look-card reveal" data-reveal>
          <div class="look-card__art">
            <img src="${escapeHtml(look.art)}" alt="${escapeHtml(look.alt)}" width="280" height="360" loading="lazy" decoding="async">
          </div>
          <div class="look-card__body">
            <p class="look-card__label">${escapeHtml(look.label)}</p>
            <h3 class="look-card__title">${escapeHtml(look.title)}</h3>
            <p class="look-card__text">${escapeHtml(look.text)}</p>
            <div class="look-card__tags">
              ${look.tags.map((tag) => `<span class="look-tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");

  setText(elements.detailsKicker, siteContent.details.kicker);
  setText(elements.detailsTitle, siteContent.details.title);
  setText(elements.detailsIntro, siteContent.details.intro);
  elements.detailsList.innerHTML = siteContent.details.items
    .map(
      (item) => `
        <article class="details-card reveal" data-reveal>
          <h3 class="details-card__title">${escapeHtml(item.title)}</h3>
          <p class="details-card__text">${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");

  setText(elements.rsvpKicker, siteContent.rsvp.kicker);
  setText(elements.rsvpTitle, siteContent.rsvp.title);
  setText(elements.rsvpIntro, siteContent.rsvp.intro);
  setText(elements.rsvpDeadline, siteContent.rsvp.deadline);
  setText(elements.submitButton, siteContent.labels.submit);

  const contacts = [];
  if (siteContent.contacts.coordinatorName) {
    contacts.push(`Координатор: ${escapeHtml(siteContent.contacts.coordinatorName)}`);
  }
  if (siteContent.contacts.phone) {
    contacts.push(`<a href="${escapeHtml(siteContent.contacts.phoneHref)}">${escapeHtml(siteContent.contacts.phone)}</a>`);
  }
  if (siteContent.contacts.telegram) {
    contacts.push(`<a href="${escapeHtml(siteContent.contacts.telegram)}" target="_blank" rel="noreferrer">Telegram</a>`);
  }
  elements.rsvpContactHint.innerHTML = contacts.join(" · ");

  if (siteContent.contacts.telegram) {
    elements.footerContact.href = siteContent.contacts.telegram;
    elements.footerContact.textContent = `Организатор: ${siteContent.contacts.coordinatorName}`;
  } else if (siteContent.contacts.phoneHref) {
    elements.footerContact.href = siteContent.contacts.phoneHref;
    elements.footerContact.textContent = siteContent.contacts.phone;
    elements.footerContact.removeAttribute("target");
    elements.footerContact.removeAttribute("rel");
  } else {
    elements.footerContact.removeAttribute("href");
    elements.footerContact.textContent = "";
  }

  setText(elements.footerText, siteContent.footer.text);
  setText(elements.footerSignature, siteContent.footer.signature);
  setText(elements.footerYear, String(new Date().getFullYear()));
}

function updateCountdown() {
  const diff = eventDate.getTime() - Date.now();

  if (diff <= 0) {
    elements.countdownGrid.hidden = true;
    setText(elements.countdownMessage, siteContent.countdown.afterMessage);
    return;
  }

  elements.countdownGrid.hidden = false;
  setText(elements.countdownMessage, "");

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  setText(elements.daysValue, String(Math.floor(diff / day)).padStart(2, "0"));
  setText(elements.hoursValue, String(Math.floor((diff % day) / hour)).padStart(2, "0"));
  setText(elements.minutesValue, String(Math.floor((diff % hour) / minute)).padStart(2, "0"));
  setText(elements.secondsValue, String(Math.floor((diff % minute) / second)).padStart(2, "0"));
}

let mapLoaded = false;

function loadMap() {
  if (mapLoaded || !siteContent.venue.mapEmbedUrl) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = siteContent.venue.mapEmbedUrl;
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.title = `Карта: ${siteContent.venue.name}`;

  elements.mapCanvas.replaceChildren(iframe);
  elements.mapCard.classList.add("is-loaded");
  mapLoaded = true;
}

function setupMap() {
  elements.loadMapButton.addEventListener("click", loadMap);
  elements.loadMapButtonSecondary.addEventListener("click", loadMap);

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMap();
        instance.disconnect();
      }
    },
    { rootMargin: "220px 0px" }
  );

  observer.observe(elements.mapCard);
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
    errors.contact = "Нужен телефон или Telegram.";
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
    Object.entries(errors).forEach(([name, message]) => setFieldError(name, message));
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
    eventType: siteContent.eventType,
    brideName: siteContent.brideName,
    submittedAt: new Date().toISOString()
  };

  try {
    if (siteContent.rsvp.endpoint) {
      // TODO: сюда можно подключить Google Apps Script / Formspree / собственный backend.
      const response = await fetch(siteContent.rsvp.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("RSVP request failed");
      }

      setStatus("success", siteContent.rsvp.endpointSuccessMessage);
    } else {
      const existing = JSON.parse(localStorage.getItem(siteContent.rsvp.storageKey) || "[]");
      existing.push(payload);
      localStorage.setItem(siteContent.rsvp.storageKey, JSON.stringify(existing));
      setStatus("success", siteContent.rsvp.successMessage);
    }

    elements.rsvpForm.reset();
    elements.rsvpForm.elements.guestCount.value = "1";
    updateGuestCountState();
  } catch (error) {
    console.error(error);
    setStatus("error", siteContent.rsvp.errorMessage);
  } finally {
    elements.submitButton.disabled = false;
    elements.submitButton.textContent = siteContent.labels.submit;
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

function setupReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function init() {
  renderContent();
  updateCountdown();
  setupMap();
  setupForm();
  setupScrollButtons();
  setupReveal();
  window.setInterval(updateCountdown, 1000);
}

init();
