# Homie Waitlist

A beautiful, minimal waitlist website for the Homie desktop copilot.

**Design:** Inspired by Chelsea — dark canvas, single blue accent (#4490ff), pill buttons, full-bleed layout, tight typography.

## Features

- Dark, cinematic design with subtle noise texture
- Waitlist signup form (name + email)
- SQLite database (local dev) with MySQL adapter for production
- Responsive, mobile-friendly
- Animated entrance effects
- Live waitlist counter

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Database

### Local Development (SQLite)
SQLite database is created automatically at `data/waitlist.db`. No setup required.

### Production (MySQL)
1. Run `schema.sql` on your MySQL server
2. Set environment variables:
   - `MYSQL_HOST` (default: localhost)
   - `MYSQL_USER` (default: root)
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE` (default: homie_waitlist)
3. Install mysql2: `npm install mysql2`
4. Switch the API routes to use `@/lib/mysql` instead of `@/lib/db`

## Deploy to Vercel

1. Push to GitHub: `git push origin main`
2. Import the repo in Vercel
3. Set environment variables for your database
4. Deploy

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- better-sqlite3 (local) / mysql2 (production)
- Inter font (Google Fonts)

## License

MIT
