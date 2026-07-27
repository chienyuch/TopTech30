# TopTech30 – Vercel deployment

This edition replaces the old Express `server.ts` with four Vercel Functions. The React client continues to call the same URLs:

- `GET /api/news`
- `POST /api/refresh-news`
- `POST /api/ai-summarize`
- `GET /api/tech-insights`

The non-AI routes deliberately do not load the Gemini SDK. If a Gemini key
or SDK problem occurs, `/api/news` and `/api/tech-insights` remain available.

## One-time Vercel configuration

1. In Vercel, select **TopTech30** and open **Settings → Environments → Production → Environment Variables**.
2. Add `GEMINI_API_KEY` with the Google AI Studio key. Apply it to Production, Preview, and Development.
3. Deploy after pushing this conversion to GitHub.

Never commit `.env`. Keep `.env.example` as a key-free sample only.

## Local verification (Windows)

```powershell
npm install
npm run build
npx vercel dev
```

Then open the local URL printed by Vercel. `npx vercel dev` runs both the Vite app and `/api` Functions.

## Publish the conversion

```powershell
git add .
git commit -m "Convert Express API to Vercel Functions"
git push
```

Vercel will rebuild automatically. Verify these URLs after deployment:

- `https://top-tech30.vercel.app/api/news`
- `https://top-tech30.vercel.app/api/tech-insights`

## Data persistence note

Vercel Functions do not provide a durable shared in-memory database. A refreshed Gemini result is returned to the current browser session, while a later request starts again from `src/data/initialNews.ts`. Add Vercel Postgres, KV, or another database if refresh results must persist across requests and deployments.
