# Қыз ұзату Invitation Landing

Одностраничный mobile-first invitation website в премиальной light editorial эстетике. Сайт сделан на чистых `HTML + CSS + vanilla JavaScript`, поэтому его удобно открывать локально через Live Server в VS Code и потом деплоить как обычный статический сайт, в том числе на Vercel.

## Файлы

- `index.html` — структура лендинга
- `styles.css` — визуальный стиль, адаптив и анимации
- `script.js` — весь редактируемый контент, countdown, lazy map, reveal-анимации и RSVP-логика
- `assets/` — локальные SVG-ассеты и placeholder-графика

## Как запустить через Live Server в VS Code

1. Откройте папку проекта в VS Code.
2. Откройте файл `index.html`.
3. Нажмите `Open with Live Server`.

## Где менять контент

Весь основной контент вынесен в объект `invitationContent` в начале файла `script.js`.

Там можно быстро поменять:

- название события
- имя невесты
- имя жениха
- семью / hosts
- дату и время
- тексты приглашения
- локацию и карту
- программу вечера
- dress code
- важные детали
- контакты
- настройки RSVP
- фото невесты в `media.heroImage`

## RSVP

Если `endpoint` в `script.js` пустой, форма сохраняет ответы в `localStorage`.

Если указать `endpoint`, форма начнёт отправлять данные через `fetch`. В коде оставлен TODO-комментарий, куда подключить Google Apps Script, Formspree или свой backend.
