# Қыз ұзату Invitation Website

Полноценный invitation website с фронтендом и лёгким backend для RSVP.

## Стек

- `HTML`
- `CSS`
- `vanilla JavaScript`
- `Node.js` без внешних зависимостей
- `Vercel API Functions` для деплоя

## Что внутри

- `index.html` — структура лендинга
- `styles.css` — весь визуальный стиль и адаптив
- `script.js` — контент, countdown, reveal, lazy map и работа формы
- `server.js` — локальный сервер для полноценного запуска с backend
- `api/rsvp.js` — Vercel backend endpoint для формы
- `api/health.js` — health endpoint
- `lib/rsvp.js` — серверная логика валидации и сохранения RSVP
- `assets/` — локальная графика

## Как запустить локально

```powershell
node server.js
```

После этого откройте:

```text
http://127.0.0.1:3000
```

## RSVP backend

Форма отправляет данные на:

```text
/api/rsvp
```

Локально ответы сохраняются в:

```text
data/rsvp-submissions.json
```

Этот файл добавлен в `.gitignore`.

## Поддержка Vercel

На Vercel frontend и API работают из одного репозитория.

Для реальной доставки RSVP можно использовать переменные окружения:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `RSVP_WEBHOOK_URL`

Если указать Telegram-переменные, backend будет отправлять новую заявку в Telegram.

Если указать `RSVP_WEBHOOK_URL`, backend дополнительно будет пересылать заявку на ваш внешний endpoint.

## Где менять контент

Весь основной контент вынесен в объект `siteContent` в начале `script.js`.

Там можно быстро поменять:

- название события
- имя невесты
- имя жениха
- семью / hosts
- дату и время
- тексты приглашения
- локацию и карту
- программу вечера
- dress code palette
- карточки образов
- детали
- контакты
- фото невесты

## TODO-точки

В коде оставлены TODO-комментарии:

- где менять шрифты
- где менять имя невесты
- где менять дату
- где менять место
- где настраивать карту
- где менять dress code
- где менять фото
- где подключать реальную доставку RSVP
