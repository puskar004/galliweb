# GalliWeb 🪧→🌐

**Turn any local shop into a live website in minutes.**

GalliWeb is a two-in-one platform:

1. A **public marketing site** — your agency page, showing your work and pricing to prospective clients.
2. A **private admin tool** — where *you* enter a shop's name, category, photos, and contact details, and it instantly generates a professional live website at `yourdomain.com/site/shop-name`. Clients get the link to their finished site — they never see or touch the admin tool.

Built with a 100%-free-tier stack, so you can run this for real clients without paying for hosting or a database.

---

## Features

- 🤖 **AI-assisted shop creation** — describe a shop in a sentence or two, and AI drafts the name, category, tagline, and description for you; edit anything (including phone, address, and photos) before or after saving
- 🎨 **Distinctive marketing site** — custom "before → after" hero animation showing a shop's signboard turning into a live website
- 🔒 **Private generator, public storefronts** — `/admin` is fully locked behind login; each generated shop site is a normal public page
- 🖼️ **Photo uploads** — drag in shop photos, they're optimized and hosted on Cloudinary automatically
- 🏪 **Three starter templates** — Retail, Restaurant, and Boutique, each with its own accent color (easy to extend with more)
- 📱 **Fully responsive** — every page, from the marketing site to a generated shop page, works on mobile
- ✅ **Validated everywhere** — every form and API request is checked with Zod before touching the database
- 🆓 **Entirely free to run** — Vercel (hosting), Neon (Postgres database), and Cloudinary (image storage) all have generous free tiers

---

## Tech stack

| Piece | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | PostgreSQL (via [Neon](https://neon.tech), free tier) |
| ORM | Prisma |
| Image hosting | [Cloudinary](https://cloudinary.com) (free tier) |
| Auth | Custom JWT in an httpOnly cookie + bcrypt (single admin, no user table needed) |
| Validation | Zod |

---

## Project architecture

```
Browser
  │
  ├─ GET /                     → marketing site (static, no DB calls)
  ├─ GET /site/[slug]          → generated shop website (reads Shop + Photo from DB)
  │
  └─ /admin/*  (blocked by middleware unless logged in)
       ├─ /admin/login
       ├─ /admin/dashboard             → list all shops
       ├─ /admin/dashboard/new         → create a shop
       └─ /admin/dashboard/edit/[id]   → edit details + manage photos
            │
            ▼
       /api/shops, /api/shops/[id], /api/upload   → backend logic
            │
            ▼
       Prisma ──▶ Neon Postgres        Cloudinary (photo storage)
```

**Request flow for creating a shop website:**
`ShopForm` (admin/dashboard/new) → `POST /api/shops` → Zod validates input → unique slug generated → row saved in Postgres → admin redirected to the edit page → `PhotoUploader` sends each photo to `POST /api/upload` → Cloudinary stores the image → a `Photo` row is linked to the shop → the finished site is live at `/site/[slug]`.

---

## File guide — what each file is for

```
galliweb/
├── prisma/schema.prisma          Database tables: Shop, Photo, and the TemplateType enum
├── scripts/hash-password.js      Generates the bcrypt hash you put in .env (no seed DB needed)
├── .env.example                  Template for all required secrets — copy to .env
│
├── src/middleware.ts             Blocks every /admin/* route unless logged in (Edge-safe JWT check)
│
├── src/lib/
│   ├── prisma.ts                 One shared database connection (avoids connection-limit issues)
│   ├── auth.ts                   Password hashing + JWT sign/verify + session helper
│   ├── cloudinary.ts             Uploads/deletes shop photos
│   ├── validations.ts            Zod schemas — the single source of truth for valid input
│   └── slugify.ts                Turns "Sharma General Store" into a unique URL slug
│
├── src/app/
│   ├── layout.tsx, globals.css   Fonts (Fraunces/Inter/JetBrains Mono) and the hero's CSS animation
│   ├── page.tsx                  Public marketing homepage
│   │
│   ├── admin/
│   │   ├── login/page.tsx                Login form (the only public /admin page)
│   │   ├── dashboard/page.tsx             Lists all generated shops
│   │   ├── dashboard/new/page.tsx         "Create a shop" form
│   │   └── dashboard/edit/[id]/page.tsx   Edit details + manage photos for one shop
│   │
│   ├── site/[slug]/page.tsx      Public page — fetches one shop and renders its website
│   │
│   └── api/
│       ├── admin/login/route.ts      Checks credentials, sets the session cookie
│       ├── admin/logout/route.ts     Clears the session cookie
│       ├── shops/route.ts            List all shops (GET) / create a shop (POST)
│       ├── shops/[id]/route.ts       Get, edit, or delete one shop
│       └── upload/route.ts           Upload or delete one shop photo
│
└── src/components/
    ├── marketing/     Nav, Hero, HowItWorks, Portfolio, Pricing, CtaBand, Footer — the public site
    ├── admin/         ShopForm, PhotoUploader, ShopList, LogoutButton — the generator tool's UI
    ├── templates/     ShopTemplate.tsx — the actual website design shown to a shop's customers
    └── ui/             Button, Field — small reusable pieces used across the admin panel
```

---

## Setup instructions

### 1. Clone and install

```bash
git clone https://github.com/your-username/galliweb.git
cd galliweb
npm install
```

### 2. Create your free database (Neon)

1. Go to [neon.tech](https://neon.tech), sign up free, create a project.
2. Copy the connection string it gives you.

### 3. Create your free image storage (Cloudinary)

1. Go to [cloudinary.com](https://cloudinary.com), sign up free.
2. From the dashboard, copy your **Cloud name**, **API key**, and **API secret**.

### 4. Get a free AI key (Groq) — powers the "Describe the shop" generator

1. Go to [console.groq.com](https://console.groq.com), sign up free (no credit card).
2. Create an API key and copy it.

### 5. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` — from Neon
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from Cloudinary
- `JWT_SECRET` — any long random string (e.g. `openssl rand -base64 32`)
- `ADMIN_EMAIL` — the email you'll log into `/admin` with
- `ADMIN_PASSWORD_HASH` — run `npm run hash-password`, enter your chosen password, paste the printed hash here

### 6. Push the database schema

```bash
npm run db:push
```

### 7. (Optional) Seed 3 demo shops for the portfolio section

```bash
npm run db:seed
```

### 8. Run it

```bash
npm run dev
```

- Marketing site: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Deployment (free hosting)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), sign up, click **Add New → Project**, import the repo.
3. In Vercel's project settings, add all the same environment variables from your `.env`.
4. Deploy. Vercel builds and hosts both the frontend and the API routes.
5. Your Neon database and Cloudinary account work as-is — no separate backend hosting needed.

Every push to your main branch auto-deploys. For a custom domain, add it under Vercel's **Domains** tab.

---

## Future improvements

These are natural next features to add, roughly in order of impact:

- **More templates** — add a `Cafe`, `Salon`, or `Gym` layout in `src/components/templates/` and select it from the `templateType` dropdown
- **AI-written copy** — call an LLM API from the admin form to auto-draft a shop's "About" paragraph from a few keywords, so you type even less per client
- **Custom domains per shop** — let a shop use their own domain instead of `yoursite.com/site/their-shop`
- **Analytics** — show each shop owner how many people visited their page
- **Multiple photo reordering** — drag-and-drop to reorder the gallery (currently photos display in upload order)
- **Client-facing edit access** — an optional read-only or limited-edit view a shop owner could log into themselves
- **Automated tests** — Vitest + Testing Library for components, Supertest-style tests for API routes
- **CI pipeline** — GitHub Actions workflow to run lint/build on every pull request

---

## License

MIT — do whatever you'd like with this.
