# CBRS Nepal — Official Website

The official website for **Community Based Rehabilitation Service (CBRS) Nepal**, a
non-government organization in Pokhara working with and for people with disabilities
and marginalized communities.

Built as a mission-driven, accessible, international-NGO-standard platform —
human-centered, trustworthy and premium.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Framer Motion** for tasteful, reduced-motion-aware animation
- **React Hook Form + Zod** for accessible, validated forms
- **lucide-react** icons; ShadCN-style hand-rolled UI primitives
- Ready for **MongoDB** + **Cloudinary** (admin-managed content) — see below

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Brand & design system

| Token       | Value     | Usage                          |
| ----------- | --------- | ------------------------------ |
| Primary     | `#005DAA` | Brand blue, hero overlay, CTAs |
| Secondary   | `#1976D2` | Accents, focus ring            |
| Accent      | `#00A99D` | Teal — donate, highlights      |
| Background  | `#FAFBFC` | Page background                |
| Foreground  | `#1E293B` | Primary text                   |

Fonts: **Plus Jakarta Sans** (display) + **Inter** (body), via `next/font`.

## Project structure

```
app/                     # Routes (App Router)
  page.tsx               # Home
  about/cbrs-nepal/      # About → CBRS Nepal (story, vision, mission, themes)
  about/our-team/        # Board, advisors, searchable members table
  programs/              # Programs list + [slug] detail (SSG)
  gallery/               # Masonry gallery + lightbox
  news/                  # News & notices list + [slug] detail (SSG)
  contact/               # Info + RHF/Zod form + map
  donate/                # QR, eSewa, Khalti, bank, transparency
components/
  layout/                # Header (with About dropdown), Footer, DonateBand
  home/                  # Home sections (Hero, AboutStrip, Themes, Impact…)
  shared/                # Container, SectionHeading, Reveal, Media, Counter…
  ui/                    # Button, Card, Badge, Input, Textarea, Select, Label
  programs|news|gallery|team|contact|donation/   # Page-specific pieces
lib/
  data/                  # Seed content (acts as the data layer)
  types.ts               # Content models == future MongoDB collections
  utils.ts               # cn(), date/slug helpers
public/
  cbrs_logo.jpeg         # Brand logo (used in header/footer/favicon)
  cbrs_hero_background.png  # Home hero photograph
```

## Accessibility

WCAG AA was a first-class requirement (the organization serves people with
disabilities):

- Semantic landmarks, skip-link, single `<h1>` per page, ordered headings
- Visible high-contrast focus rings; full keyboard nav (menus, dropdown,
  lightbox, carousels, pagination)
- `aria-*` on disclosures, dialogs, tabs, breadcrumbs and forms; inline
  `role="alert"` validation messages
- `prefers-reduced-motion` honored throughout; descriptive `alt` text

## Backend and admin login setup

The admin panel is available at `/admin/login`. Content is stored in MongoDB,
with initial content seeded from `lib/data/*`.

1. Copy `.env.example` to `.env.local` for local development.
2. Set `MONGODB_URI` to your MongoDB connection string, including the application
   database name. The database user needs read and write access, and the database
   must accept connections from the machine running the website.
3. Set `ADMIN_ID` and `ADMIN_PASSWORD` before the first login. When the `admins`
   collection is empty, the application creates this account with a hashed
   password. These values do not replace or reset an existing account: use the
   credentials originally configured for that database. Passwords are exact,
   including any leading or trailing spaces.
4. Restart `npm run dev`, then open `/admin/login` and sign in.

For a hosted website, set the same variables in the hosting provider's runtime
environment and redeploy. A local `.env.local` file is not uploaded by Git.
Production must use HTTPS for the secure session cookie.

If the login form reports that sign-in is not configured, check `MONGODB_URI`
and, for a new database, `ADMIN_ID` and `ADMIN_PASSWORD`. If it reports that
sign-in is temporarily unavailable, check the server's `[admin/auth]` logs,
database availability, network access rules, credentials, and permissions. A
failed initial database connection can be retried without restarting the server.

Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to
enable image uploads. `next.config.ts` already allows `res.cloudinary.com` for
`next/image`.
