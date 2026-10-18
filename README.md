## Tech stack

- React 19 and React DOM
- Tailwind CSS 4 with `@tailwindcss/vite`
- Vite 6 with `@vitejs/plugin-react`
- Lucide React for icons
- localStorage for categories, links, the selected category, and the theme

I built this as a frontend-only app, so there’s no backend or database to set up. Everything is saved in the browser using localStorage.

Data doesn’t sync between devices or browsers. Clearing the site’s browser data will also remove the saved links. Deleting a category removes all its links without a confirmation prompt.

## Getting started

You’ll need Node.js 22 LTS or a newer supported LTS version, along with npm.

Open a terminal in the project folder, where `package.json` is located, and run:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal, usually:

```text
http://localhost:5173
```

Opening `index.html` directly won’t work. The source files need to be processed by Vite.

## Production build

To build the app:

```bash
npm run build
```

The output goes into `dist/`. That’s the folder to deploy to a static hosting service.

To check the build locally:

```bash
npm run preview
```

The preview server is only for testing the production build locally, not for hosting the live site.

## Project structure

```text
linkspace/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useLocalStorage.jsx
    ├── utils/
    │   └── normalizeUrl.jsx
    └── components/
        ├── Sidebar.jsx
        ├── CategoryItem.jsx
        ├── Header.jsx
        ├── SiteIcon.jsx
        ├── LinkCard.jsx
        ├── EmptyState.jsx
        ├── Modal.jsx
        ├── AddCategoryModal.jsx
        └── AddLinkModal.jsx
```

I split the interface into smaller components instead of keeping everything in `App.jsx`.

- `main.jsx` mounts the app and imports the stylesheet.
- `App.jsx` manages the state and handles adding, editing, and deleting links and categories.
- `useLocalStorage.jsx` handles saving data between visits.
- `Modal.jsx` uses the native HTML dialog element to keep keyboard focus inside the modal and support closing it with Escape.
- `normalizeUrl.jsx` adds `https://` when a protocol is missing and only allows HTTP and HTTPS addresses.
- `SiteIcon.jsx` loads the icon for each website.

`index.css` includes Tailwind and the color variables for both themes. The layout, hover states, and focus styles use Tailwind utility classes. This Tailwind 4 setup doesn’t need a `tailwind.config.js` or `postcss.config.js`.

I keep `node_modules/` and `dist/` out of Git. `package-lock.json` is included so dependency versions stay consistent. With the lockfile in place, you can use `npm ci` for a clean install.

## Editing links

Click the pencil button next to a link to change its name or URL, then click **Save changes**.

**Cancel** or Escape closes the dialog without saving. Editing keeps the link’s existing ID and position in the list, and the changes are saved to localStorage.

## Website icons

Each link shows an icon based on its domain. For example, a YouTube link gets the YouTube favicon. These are website icons, not screenshots of the pages.

Changing a link’s domain updates its icon automatically.

I use Google’s S2 favicon service to load the icons, so this part needs an internet connection. The request includes the website’s domain, but not the full URL, its query parameters, or the name given to the link. Google also receives the usual network request information.

For private or internal domains, the favicon service should be disabled or replaced with a self-hosted option.

If an image fails to load, the app falls back to a regular link icon. If the service returns a generic favicon, that’s what gets displayed. Images use lazy loading so they don’t all load upfront.
