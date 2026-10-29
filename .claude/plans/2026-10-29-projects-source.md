# Source de vérité des projets

## Pourquoi

Les mêmes projets sont décrits à trois endroits, chacun maintenu à la main :

- `monorepo-tomo-farm/apps/home/public/index.html` : la page needacoffee.fr, 22 projets en HTML écrit à la main ;
- `site-needacoffee/locales/{fr,en}.json` : la section « Projets » du CV, 5 projets en retard depuis le printemps 2025 ;
- les fiches Obsidian `_Infra` : l'inventaire technique (repo, hébergement, URL), sans description publique.

Le CV de needacoffee.fr dit encore « Senior Frontend React Developer with over 8 years » alors que le CV dit maintenant 10 ans et full stack : c'est le symptôme.

## Ce qui change

Un fichier `projects.json` devient la seule liste à modifier. Il vit dans `apps/home` et il est servi publiquement sur `https://needacoffee.fr/projects.json`.

```
monorepo-tomo-farm/apps/home/
├── projects.json              # source de vérité, éditée à la main
├── scripts/
│   └── build.mjs              # lit projects.json + index.template.html, écrit public/index.html
├── index.template.html        # l'actuel index.html, la liste des sections remplacée par un marqueur
└── public/
    ├── index.html             # généré, ne plus éditer
    └── projects.json          # copie servie, écrite par build.mjs

site-needacoffee/
├── lib/projects.ts            # télécharge et valide needacoffee.fr/projects.json au build
└── components/sections/Projects.tsx   # affiche les projets marqués cv: true
```

## Format

```json
{
  "categories": [
    { "id": "wikis", "title": { "fr": "Wikis", "en": "Wikis" }, "layout": "tiles" },
    { "id": "apps", "title": { "fr": "Apps du quotidien", "en": "Everyday apps" }, "layout": "cards" }
  ],
  "projects": [
    {
      "id": "orguin",
      "category": "apps",
      "name": "Orguin",
      "url": "https://www.orguin.com/",
      "description": {
        "fr": "Assignez vos rôles, gérez vos inscriptions, finalisez la sélection en un clic. Pour les troupes de théâtre, équipes sportives et associations.",
        "en": "…"
      },
      "tags": ["React", "Supabase"],
      "cv": true
    }
  ]
}
```

- L'ordre du tableau est l'ordre d'affichage, sur les deux sites.
- `description.en` est obligatoire seulement pour les projets `cv: true` (le CV a une page anglaise, needacoffee.fr non).
- `lang` optionnel sur un projet dont le texte est dans une autre langue que la page (Dungeons & Kittens, en anglais sur la page française).
- La carte « CV » de needacoffee.fr devient un projet comme les autres : sa description se met à jour au même endroit.
- Les sections fixes de la page d'accueil (en-tête, « L'IA dans mes projets », pied de page) restent dans le gabarit HTML.

## Qui lit quoi

- **needacoffee.fr** : `node scripts/build.mjs` génère `public/index.html` et copie le JSON dans `public/`. La page reste du HTML statique, sans JavaScript ajouté, donc la CSP actuelle (`script-src 'self'`) ne change pas.
- **CV** : `lib/projects.ts` fait un `fetch` de `https://needacoffee.fr/projects.json` pendant `next build` (export statique, donc une seule fois par déploiement). Le build échoue avec un message qui nomme l'URL si la réponse n'est pas 200 ou si un projet `cv: true` n'a pas de description anglaise.
- Le CV ne se met à jour qu'au prochain déploiement du CV : modifier le JSON puis déployer needacoffee.fr ne suffit pas, il faut aussi relancer le build du CV (un push sur `main`, ou « Retry deployment » dans Cloudflare).

## Sélection proposée pour le CV (`cv: true`)

Orguin, Brew, Nota Diné, Who Speaks?, WikiMasters Local, le wiki Donjons & Chatons. Les autres restent sur needacoffee.fr seulement. À ajuster ici avant de coder.

## Points ouverts

- **Déploiement de `apps/home`** : rien dans le monorepo ne dit comment le Worker est publié (Workers Builds branché sur le repo, ou `wrangler deploy` à la main). Si c'est Workers Builds, sa commande de build devient `node scripts/build.mjs`. Si c'est à la main, la commande à lancer devient `node scripts/build.mjs && npx wrangler deploy`. À vérifier dans le tableau de bord Cloudflare avant de coder.
- **Traductions anglaises** des 6 descriptions du CV : je les écris à partir du français, tu relis.
- **Dépendance réseau du build du CV** : si needacoffee.fr est en panne, le CV ne se déploie plus. Une alternative est de garder en secours la dernière copie commitée ; non retenue pour garder une seule source.

## Ordre de travail

1. monorepo-tomo-farm : `projects.json` rempli à partir de la page actuelle, gabarit, `build.mjs`, puis vérifier que le `index.html` généré est identique à l'actuel, à l'exception de la ligne du CV.
2. Déployer needacoffee.fr et vérifier `curl -s https://needacoffee.fr/projects.json`.
3. site-needacoffee : `lib/projects.ts`, `Projects.tsx`, retrait des projets des locales, build.
