# Module App

Application React + Vite avec TailwindCSS, Framer Motion et Radix UI.

## Prérequis
- Node.js 18+
- npm 9+

## Démarrage en local
```bash
npm install
npm run dev
```
L’application démarre sur http://localhost:5173

## Build de production
```bash
npm run build
npm run preview
```
Le dossier `dist/` contient les fichiers de production.

## Déploiement sur GitHub
1. Initialiser Git et faire un premier commit:
```bash
git init
git add .
git commit -m "chore: initial commit"
```
2. Créer un dépôt GitHub (via l’UI GitHub) ou avec GitHub CLI:
```bash
# Si vous avez GitHub CLI
gh repo create <votre-utilisateur>/<votre-repo> --public --source=. --remote=origin --push
```
3. Si créé manuellement, lier et pousser:
```bash
git remote add origin git@github.com:<votre-utilisateur>/<votre-repo>.git
git branch -M main
git push -u origin main
```

## Déploiement sur Vercel
Option 1 — via dashboard (recommandé):
1. Aller sur https://vercel.com/new
2. Importer le repo GitHub
3. Framework: "Vite"
4. Build Command: `vite build` (ou `npm run build`)
5. Output Directory: `dist`
6. Déployer

Option 2 — via Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## Configuration
- Alias d’import `@` -> `src/` dans `vite.config.js`
- Point d’entrée: `src/lib/main.jsx` (voir `index.html`)
- Styles globaux: `src/index.css` et `src/components/ui/index.css`

## Scripts npm
- `dev` — démarre Vite en mode développement
- `build` — build production
- `preview` — serveur local pour prévisualiser la build

## Licence
MIT
