# Qyz Uzatu Invitation Website

Одностраничный invitation website с лёгким backend для RSVP.

## Как открыть сайт локально

Есть два рабочих режима.

## 1. Быстрый просмотр без backend

Откройте `index.html` через Live Server в VS Code.

Обычно адрес будет таким:

```text
http://127.0.0.1:5500
```

В этом режиме сайт откроется как обычный лендинг, а форма RSVP при недоступном backend сохранит ответ в `localStorage`.

## 2. Полный запуск с backend

Из корня проекта выполните:

```powershell
node server.js
```

или:

```powershell
.\start-local.ps1
```

или двойным кликом:

```text
start-local.bat
```

После этого откройте именно этот адрес:

```text
http://127.0.0.1:3000
```

Важно:

- `http://127.0.0.1` без порта не подойдёт
- `ERR_CONNECTION_REFUSED` означает, что локальный сервер не запущен
- если вы открыли `127.0.0.1:3000`, но команда `node server.js` не запущена, сайт не откроется

## Что внутри

- `index.html` - структура лендинга
- `styles.css` - визуальный стиль и адаптив
- `script.js` - контент, таймер, reveal-анимации, lazy map и логика формы
- `server.js` - локальный HTTP-сервер
- `api/rsvp.js` - backend endpoint для Vercel
- `api/health.js` - health endpoint
- `lib/rsvp.js` - валидация и обработка RSVP
- `assets/` - графика
- `start-local.ps1` - локальный запуск на Windows
- `start-local.bat` - быстрый запуск двойным кликом

## RSVP

Форма отправляет данные на:

```text
/api/rsvp
```

При локальном запуске через `server.js` ответы сохраняются в:

```text
data/rsvp-submissions.json
```

Если backend недоступен, форма не ломает страницу и сохраняет ответ локально в браузере.

## Vercel

Для Vercel используйте корень репозитория как `Root Directory`.

Проверьте:

- ветка `main`
- root directory = `.`
- не `public`

Короткий путь:

1. Зайдите в [Vercel Dashboard](https://vercel.com/new)
2. Импортируйте репозиторий `Sshows/wedding`
3. Убедитесь, что выбрана ветка `main`
4. Оставьте `Root Directory` пустым или `.` 
5. Нажмите `Deploy`

После деплоя проверьте:

- главная страница открывается по домену Vercel
- `https://ваш-домен/api/health` возвращает `ok: true`
- форма RSVP отправляется без ошибок

В проект уже добавлен `vercel.json`, чтобы деплой был стабильнее:

- статический лендинг отдаётся из корня репозитория
- API-файлы из `api/` работают как Vercel Functions
- не нужен отдельный `server.js` на самом Vercel

## Где менять контент

Весь редактируемый контент вынесен в объект `siteContent` в начале `script.js`.
