# TraininGenie — Company Website

A clean, Awwwards-quality B2B SaaS marketing website for **TraininGenie Pvt Ltd**, an India-focused tech training company delivering hands-on software engineering programmes (microservices, DevOps, cloud) to enterprise teams.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) |
| Language | TypeScript |
| Routing | [Wouter](https://github.com/molefrog/wouter) — lightweight client-side router |
| Animations | [Framer Motion](https://www.framer.com/motion/) — page transitions, scroll animations |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS |
| UI Primitives | [shadcn/ui](https://ui.shadcn.com/) — accessible headless components |
| Font | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts — weights 400–900 |
| Icons | [Lucide React](https://lucide.dev/) |
| Package Manager | [pnpm](https://pnpm.io/) (monorepo workspace) |
| Build Tool | Vite |

---

## Project Structure

```
artifacts/trainingenie/
├── public/                    # Static assets served at root
│   └── logo.png               # ← DROP YOUR LOGO FILE HERE (see Logo section below)
├── src/
│   ├── assets/
│   │   └── images/            # Hero and service images
│   ├── components/
│   │   ├── navbar.tsx         # Top navigation bar — logo lives here
│   │   ├── layout.tsx         # Page wrapper (Navbar + Footer + ScrollProgress)
│   │   ├── footer.tsx         # Site footer
│   │   ├── cta-link.tsx       # Animated underline text link component
│   │   └── scroll-progress.tsx# Amber progress bar at top of page
│   ├── pages/
│   │   ├── home.tsx           # Landing page — hero, stats, programmes, testimonials
│   │   ├── services.tsx       # Training programmes listing
│   │   ├── about.tsx          # Company story, team, values
│   │   ├── case-studies.tsx   # Client impact stories
│   │   └── contact.tsx        # Contact form
│   ├── data/
│   │   └── index.ts           # ← ALL SITE CONTENT LIVES HERE (text, stats, services)
│   ├── lib/
│   │   └── utils.ts           # Tailwind merge utility
│   ├── App.tsx                # Router + page transitions (AnimatePresence)
│   └── index.css              # Global styles, CSS variables, font import
└── package.json
```

---

## Customising Content

**All text, stats, service names, testimonials and contact details are in one file:**

```
src/data/index.ts
```

Edit that file to update anything visible on the site — no need to touch individual page components.

---

## Adding Your Logo

See the [Logo](#logo) section below.

---

## Logo

The navbar supports both a custom image logo and a text/lettermark fallback.

### Step 1 — Add your logo file

Place your logo image inside:

```
artifacts/trainingenie/public/logo.png
```

Supported formats: `.png`, `.svg`, `.webp`, `.jpg`

> SVG is recommended for crispness at all screen sizes.

### Step 2 — Enable it in the navbar

Open `src/components/navbar.tsx` and follow the instructions in the `LOGO CONFIGURATION` comment block near the top of the file.

---

## Running Locally

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start the dev server
pnpm --filter @workspace/trainingenie run dev
```

The site runs on the port defined by the `PORT` environment variable.

---

## Page Transitions

Pages use a **focus-pull** transition via Framer Motion's `AnimatePresence`:
- **Enter:** scale 0.96 → 1 + blur 10px → 0px
- **Exit:** scale 1 → 1.03 + blur 0px → 10px

Configured in `src/App.tsx`.

---

## Animations

- **Scroll progress bar** — amber spring-animated bar pinned to the top of every page (`scroll-progress.tsx`)
- **Staggered fade-up** — section headings and cards fade up on scroll using `whileInView` + `viewport={{ once: true }}`
- **Navbar** — transparent on load, frosted glass (`backdrop-blur`) after 50px scroll
- **CTA underline** — wipe-out / redraw double underline on hover (`cta-link.tsx`)
- **Primary CTA button** — dark fill slides up from bottom on hover

---

## Deployment

The project is part of a pnpm monorepo. Deploy via **Replit Deployments** — the build command is:

```bash
pnpm --filter @workspace/trainingenie run build
```

Output goes to `dist/` and is served as a static site.
