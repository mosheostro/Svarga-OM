# Svarga Codex Site

Frontend prototype for Svarga International, rebuilt as a small Vite project with local assets, bilingual RU/HE content, responsive layouts, placeholder program pages, generated blog content, and legal placeholder pages.

## Commands

```bash
npm install --include=dev
npm run dev
npm run build
```

Dev server defaults to `http://127.0.0.1:4173`.

## Structure

- `public/assets` - local image and logo assets
- `src/data/content.js` - bilingual content, routes, contacts, footer links
- `src/components/layout.js` - header, drawer navigation, footer
- `src/components/pages.js` - page templates
- `src/styles/main.css` - responsive UI styles
