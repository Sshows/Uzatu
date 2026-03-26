# Қыз ұзату сайты

Бұл жоба `Next.js` негізінде жасалған бір беттік цифрлық шақыру сайты. Интерфейс толықтай қазақ тілінде дайындалған және `Vercel + Supabase` сценарийіне бейімделген.

## Не бар

- `app/` — негізгі бет пен API маршруттары
- `components/` — countdown, карта, reveal және RSVP формасы
- `lib/site-content.js` — барлық өзгертілетін мәтін мен дерек бір жерде
- `lib/rsvp-validation.js` — форма валидациясы
- `lib/rsvp-storage.js` — Supabase немесе local dev сақтау логикасы
- `public/assets/` — графикалық файлдар
- `supabase/schema.sql` — RSVP кестесін құруға арналған SQL

## Жергілікті іске қосу

Алдымен тәуелділіктерді орнатыңыз:

```bash
npm install
```

Сосын development режимін іске қосыңыз:

```bash
npm run dev
```

Браузерде ашыңыз:

```text
http://localhost:3000
```

## Supabase қосу

1. Supabase жобасын ашыңыз.
2. `supabase/schema.sql` файлын орындаңыз.
3. Жобаға мына env айнымалыларын қосыңыз:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_RSVP_TABLE=rsvp_submissions
```

## Vercel

Vercel ішінде:

1. `Framework Preset` ретінде `Next.js` таңдаңыз.
2. `Root Directory` бос қалсын немесе `.` болсын.
3. `Output Directory` бос болуы керек.
4. `Environment Variables` бөліміне Supabase айнымалыларын енгізіңіз.
5. Deploy жасаңыз.

Егер сайт `404` көрсетсе, әдетте мәселе Vercel-дегі ескі `Output Directory` баптауында болады. Жобадағы `vercel.json` бұл мәнді override етеді.

## Қай жерден өзгерту керек

- Қалыңдықтың аты: `lib/site-content.js`
- Күйеу жігіттің аты: `lib/site-content.js`
- Күн мен уақыт: `lib/site-content.js`
- Өтетін орын мен карта: `lib/site-content.js`
- Фото: `lib/site-content.js` ішіндегі `media.heroImage`
- RSVP мәтіндері: `lib/site-content.js`
- Сақтау кестесі: `.env` немесе Vercel env ішіндегі `SUPABASE_RSVP_TABLE`
