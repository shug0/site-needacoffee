## cv.needacoffee.fr

Personal site and portfolio for Thomas Alberola.

<img src="public/readme/preview.png" alt="Preview of cv.needacoffee.fr" width="980" />

### Tech

- Next.js App Router (React + TypeScript)
- Tailwind CSS v4
- Lucide icons
- Simple i18n via `lib/i18n-app.ts` with JSON dictionaries in `locales/`

### Local development

```bash
npm install
npm run dev
```

### Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npx wrangler deploy`: deploy `out/` to the Cloudflare Worker (Workers Builds runs it on every push to `main`)
- `npm run type-check`: TypeScript check
- `npm run lint`: ESLint
- `npm run format`: Biome format write

### Internationalization

- Default locale: `fr` at `/`
- English: `en` at `/en`
- Keys live in `locales/fr.json` and `locales/en.json`

### Downloads

- CV FR: `public/files/Thomas_Alberola_CV_FR.pdf`
- CV EN: `public/files/Thomas_Alberola_CV _EN.pdf`
- Anonymous skills dossier (FR only): `public/files/Dossier de compétence Anonyme - Senior frontend.pdf`

### Deployment

Deployed on Vercel. No CI in-repo; checks run on Vercel.

### License

MIT — see `LICENSE`.

### Lighthouse

<img src="public/readme/lighthouse-100.png" alt="Scores Lighthouse 100/100 sur toutes les catégories" width="680" />

### Learning / Roadmap
- Frontend Developer progress on roadmap.sh: [View my progress](https://roadmap.sh/frontend?s=6899cdb4614598977eaa6104)
