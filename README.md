# ApartmentGuideHub

A full-stack apartment listing platform for renters and landlords across **Texas** and **Oklahoma**. Browse 60+ verified listings, filter by city/price/bedrooms, save favorites, and contact property managers directly.

**Live:** [https://apartmentguidehub.com](https://apartmentguidehub.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS) |
| Maps | React-Leaflet + Leaflet |
| Email | Web3Forms |
| SEO | react-helmet-async |
| Deploy | Vercel |

---

## Features

- Browse and filter 60+ apartment listings (Texas & Oklahoma)
- Interactive Leaflet map with price markers
- User auth (sign up / log in / sign out) via Supabase
- Save and manage favorite listings
- Three contact forms (listing card, listing detail, help modal) — saved to Supabase + emailed via Web3Forms
- SEO-optimised with per-page titles, meta descriptions, Open Graph, Twitter Card, and JSON-LD structured data
- Fully responsive — mobile, tablet, and desktop layouts

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/devola11/apartment-platform.git
cd apartment-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

- **Supabase** — create a project at [supabase.com](https://supabase.com). Copy the Project URL and `anon` public key from *Settings → API*.
- **Web3Forms** — get a free access key at [web3forms.com](https://web3forms.com).

### 4. Set up the database

Run the SQL files in the Supabase SQL Editor (*Dashboard → SQL Editor → New query*):

1. `seed.sql` — creates the `listings` and `favorites` tables and seeds 50 listings
2. `supabase/migrations/001_rls_and_inquiries.sql` — enables RLS on listings and favorites
3. `supabase/migrations/create_inquiries_table.sql` — creates the `inquiries` table with the current schema

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
├── components/
│   ├── auth/          AuthForm
│   ├── common/        Navbar, Footer, SEO, modals, toast
│   ├── filters/       FilterBar
│   ├── listings/      ListingCard, ListingRow, ListingGrid
│   └── maps/          ListingsMap (React-Leaflet)
├── context/           AuthContext, FavoritesContext, ToastContext
├── hooks/             useListings, useListing
├── lib/               supabase.js, submitInquiry.js
└── pages/             Home, Listings, ListingDetail, Login, Register, Profile, Favorites, NotFound
```

---

## Deployment

The app is configured for **Vercel**. The `vercel.json` at the project root rewrites all routes to `index.html` so React Router handles client-side navigation correctly.

```bash
# Deploy via Vercel CLI
vercel --prod
```

Or connect the GitHub repo to a Vercel project for automatic deploys on push to `master`.

Set the three environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_WEB3FORMS_KEY`) in *Vercel → Project → Settings → Environment Variables*.
