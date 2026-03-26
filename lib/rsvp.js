const fs = require("fs/promises");
const path = require("path");

function normalizeSubmission(payload = {}) {
  return {
    fullName: String(payload.fullName || "").trim(),
    contact: String(payload.contact || "").trim(),
    attendance: String(payload.attendance || "").trim(),
    guestCount: Number(payload.guestCount),
    foodPreferences: String(payload.foodPreferences || "").trim(),
    comment: String(payload.comment || "").trim(),
    eventType: String(payload.eventType || "").trim(),
    brideName: String(payload.brideName || "").trim()
  };
}

function validateSubmission(payload) {
  const errors = {};

  if (payload.fullName.length < 2) {
    errors.fullName = "Укажите имя и фамилию.";
  }

  if (payload.contact.length < 3) {
    errors.contact = "Укажите телефон или Telegram.";
  }

  if (!payload.attendance) {
    errors.attendance = "Выберите вариант присутствия.";
  }

  if (Number.isNaN(payload.guestCount)) {
    errors.guestCount = "Укажите количество гостей.";
  } else if (payload.attendance === "no" && payload.guestCount !== 0) {
    errors.guestCount = "Если вы не сможете присутствовать, укажите 0.";
  } else if (payload.attendance !== "no" && (payload.guestCount < 1 || payload.guestCount > 6)) {
    errors.guestCount = "Количество гостей должно быть от 1 до 6.";
  }

  return errors;
}

function buildRecord(payload) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    ...payload,
    submittedAt: new Date().toISOString()
  };
}

async function appendSubmission(storagePath, record) {
  if (!storagePath) {
    return false;
  }

  await fs.mkdir(path.dirname(storagePath), { recursive: true });

  let current = [];
  try {
    const source = await fs.readFile(storagePath, "utf8");
    current = JSON.parse(source);
    if (!Array.isArray(current)) {
      current = [];
    }
  } catch (error) {
    current = [];
  }

  current.push(record);
  await fs.writeFile(storagePath, JSON.stringify(current, null, 2), "utf8");
  return true;
}

function attendanceLabel(value) {
  if (value === "yes") {
    return "Да, будет";
  }
  if (value === "maybe") {
    return "Сообщит позже";
  }
  return "Не сможет присутствовать";
}

function formatTelegramMessage(record) {
  return [
    `Новый RSVP на ${record.eventType || "приглашение"}`,
    "",
    `Имя: ${record.fullName}`,
    `Контакт: ${record.contact}`,
    `Присутствие: ${attendanceLabel(record.attendance)}`,
    `Количество гостей: ${record.guestCount}`,
    `Еда / аллергии: ${record.foodPreferences || "—"}`,
    `Комментарий: ${record.comment || "—"}`,
    `Невеста: ${record.brideName || "—"}`,
    `Отправлено: ${record.submittedAt}`
  ].join("\n");
}

async function sendTelegramNotification(record, env) {
  const botToken = env.TELEGRAM_BOT_TOKEN || env.RSVP_TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID || env.RSVP_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(record)
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send Telegram notification");
  }

  return true;
}

async function sendWebhook(record, env) {
  const webhookUrl = env.RSVP_WEBHOOK_URL || env.RSVP_FORWARD_URL;

  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  });

  if (!response.ok) {
    throw new Error("Failed to forward RSVP webhook");
  }

  return true;
}

async function processSubmission(body, options = {}) {
  const payload = normalizeSubmission(body);
  const errors = validateSubmission(payload);

  if (Object.keys(errors).length > 0) {
    const validationError = new Error("Validation failed");
    validationError.statusCode = 422;
    validationError.errors = errors;
    throw validationError;
  }

  const record = buildRecord(payload);
  const env = options.env || process.env;
  const result = {
    savedToFile: false,
    sentToTelegram: false,
    sentToWebhook: false
  };

  if (options.storagePath) {
    result.savedToFile = await appendSubmission(options.storagePath, record);
  }

  result.sentToTelegram = await sendTelegramNotification(record, env).catch(() => false);
  result.sentToWebhook = await sendWebhook(record, env).catch(() => false);

  return {
    record,
    result
  };
}

module.exports = {
  processSubmission,
  validateSubmission
};
