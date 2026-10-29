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

### Projects

The "Projects" section is not in this repo: `next build` downloads `https://needacoffee.fr/projects.json` (source: `monorepo-tomo-farm/apps/home/projects.json`) and shows the entries marked `cv: true`. The build fails if that URL is unreachable or a CV project has no English description. After changing the list, deploy needacoffee.fr first, then redeploy this site.

To build against a local copy: `PROJECTS_URL=http://localhost:<port>/projects.json npm run build`.

### Deployment

Deployed on Vercel. No CI in-repo; checks run on Vercel.

### License

MIT — see `LICENSE`.

### Lighthouse

<img src="public/readme/lighthouse-100.png" alt="Scores Lighthouse 100/100 sur toutes les catégories" width="680" />

### Learning / Roadmap
- Skill profile on roadmap.sh (Frontend, Full Stack, Backend, AI Engineer, Software Architect, Claude Code): [View my skills](https://roadmap.sh/u/thomasalberola)
