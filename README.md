# Homie Waitlist

A cinematic waitlist website for the **Homie** desktop copilot — a free, open-source,
local-first AI that sees your screen and answers in place.

**Design:** Chelsea-inspired black-box cinema — pure black canvas, one blue accent
(`#4490ff`), pill buttons, full-bleed media, tight credit-roll typography. The hero
plays the real Homie launch film.

## Features

- Full-bleed video hero (the actual Homie launch film, looped and muted)
- Cinematic sections: statement, capabilities, film, how-it-works, providers, trust, waitlist
- Waitlist signup form (name + email) with validation, duplicate handling, success state
- Live waitlist counter (baseline 3078 + real signups)
- Multi-backend storage: SQLite (local) / MySQL (your laptop) / Postgres (cloud, 24/7)
- Optional welcome email on signup (Resend or SMTP)
- Responsive, mobile-friendly, accessible (reduced-motion respected)
- SEO + Open Graph metadata

## Quick Start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Database (24/7 setup)

The storage layer auto-selects based on environment variables:

| Priority | Backend | Trigger | Best for |
|---|---|---|---|
| 1 | Postgres | `POSTGRES_URL` or `DATABASE_URL` set | **24/7 public site** (free tier) |
| 2 | MySQL | `MYSQL_HOST` / `MYSQL_*` set | Your laptop DB (only while laptop is on) |
| 3 | SQLite | none set | Local dev only (`./data/waitlist.db`) |

### Make it 24/7 (free, ~2 minutes) — recommended

Your laptop MySQL cannot be reached from Vercel 24/7 (laptop sleeps, not public).
Use a free always-on Postgres instead:

1. Go to **https://neon.tech** (or https://supabase.com) → create a free project.
2. Copy the connection string (looks like `postgres://user:pass@host/db?sslmode=require`).
3. In Vercel → Project → Settings → Environment Variables, add:
   - `POSTGRES_URL` = the connection string above
4. Redeploy. Done — registrations now persist 24/7.

### Local development (SQLite)

Zero setup. The DB file is created automatically at `data/waitlist.db` on first request.

### Your laptop MySQL (optional, local/preview only)

1. Run `schema.sql` on your MySQL server.
2. Set `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` (or `MYSQL_URL`).
3. Note: only reachable while your laptop is on and port-forwarded.

## Optional welcome email

On signup, a customized HTML welcome email is sent **if** an email provider is configured.
Registration always succeeds regardless of email delivery.

- **Resend (recommended, free 3000/mo):** set `RESEND_API_KEY` (and optionally `RESEND_FROM`).
- **SMTP (e.g. Gmail):** set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
  - For Gmail: enable 2FA → create an App Password → use `smtp.gmail.com` port 587.

If none are set, email is silently skipped.

## Deploy to Vercel

1. Push to GitHub (this repo): `git push origin main`
2. Import the repo in Vercel
3. Set `POSTGRES_URL` (recommended, for 24/7) — or MySQL vars
4. (Optional) Set email env vars
5. Deploy

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- pg (Postgres) / mysql2 (MySQL) / better-sqlite3 (SQLite)
- nodemailer + Resend (optional email)
- Sora · Inter · JetBrains Mono (Google Fonts)
- Homie launch film (H.264) for the hero

## API

- `POST /api/waitlist` — `{ name?, email }` → `{ message, count }` (409 if duplicate, 400 if invalid, 503 if DB not configured)
- `GET /api/waitlist/count` — `{ count }`

## License

MIT — Created by Anas & Sarthak
