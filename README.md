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
- Live waitlist counter
- SQLite for local dev, MySQL for production (auto-selected via env vars)
- Responsive, mobile-friendly, accessible (reduced-motion respected)
- SEO + Open Graph metadata

## Quick Start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Database

The storage layer auto-selects based on environment:

| Environment | Backend | Trigger |
|---|---|---|
| Local dev | SQLite (better-sqlite3) | no env vars set → `./data/waitlist.db` |
| Production (Vercel) | MySQL | any of `MYSQL_HOST` / `MYSQL_DATABASE` / `MYSQL_URL` set |

### Local development (SQLite)

Zero setup. The DB file is created automatically at `data/waitlist.db` on first request.

### Production (MySQL — your laptop DB or any hosted MySQL)

1. Run `schema.sql` on your MySQL server:
   ```sql
   SOURCE schema.sql;
   ```
2. Set environment variables on Vercel (or your host):
   - `MYSQL_HOST` (default: localhost)
   - `MYSQL_PORT` (default: 3306)
   - `MYSQL_USER` (default: root)
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE` (default: homie_waitlist)
   - OR a single `MYSQL_URL=mysql://user:pass@host:3306/db`
3. Install mysql2 (already in dependencies): `npm install`
4. Deploy

> Note: a laptop MySQL is only reachable from Vercel if it's publicly exposed.
> For a public site, use a hosted MySQL (PlanetScale, Railway, Neon, etc.) or
> keep the SQLite path for local-only previews.

## Deploy to Vercel

1. Push to GitHub (this repo): `git push origin main`
2. Import the repo in Vercel
3. Set the MySQL env vars (optional — without them it falls back to ephemeral SQLite)
4. Deploy

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- better-sqlite3 (local) / mysql2 (production)
- Sora · Inter · JetBrains Mono (Google Fonts)
- Homie launch film (H.264) for the hero

## API

- `POST /api/waitlist` — `{ name?, email }` → `{ message, count }` (409 if duplicate, 400 if invalid)
- `GET /api/waitlist/count` — `{ count }`

## License

MIT — Created by Anas & Sarthak
