# 🍽️ DineFlow — AI-Powered Smart Restaurant Ordering System

A full-featured restaurant management & ordering platform with AI-powered menu descriptions, real-time order tracking, table reservations, and a complete admin dashboard. Built with a luxurious dark theme using Next.js 16, TypeScript, Tailwind CSS 4, Prisma, and Zustand.

---

## ✨ Features

- **AI Menu Descriptions** — One-click AI rewrite of dish descriptions for appetizing, professional copy
- **Interactive Menu Grid** — Browse, search, and filter dishes across categories with rich image cards and ratings
- **Smart Cart** — Add items, adjust quantities, and place orders with a sleek slide-out cart drawer
- **Order Tracking** — Real-time status tracking (Pending → Preparing → Ready → Served)
- **Table Reservations** — Book a table with date, time, party size, and special notes
- **Admin Dashboard** — Full CRUD for menu items, order management, reservation handling, drag-and-drop reordering
- **Dark Luxury Theme** — Premium dark UI with gold accents, smooth animations, and responsive design
- **Serverless-Ready** — Deploy to Vercel with zero config

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | PostgreSQL (Prisma ORM) |
| State | Zustand |
| Drag & Drop | @dnd-kit |
| AI | z-ai-web-dev-sdk |
| Deployment | Vercel |

## 📁 Project Structure

```
dineflow/
├── prisma/
│   ├── schema.prisma          # MenuItem, Order, Reservation models
│   └── seed.ts                # Seeds 17 menu items
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   └── api/
│   │       ├── menu/          # Menu CRUD endpoints
│   │       ├── orders/        # Order endpoints
│   │       ├── reservations/  # Reservation endpoints
│   │       ├── seed/          # Database seeding
│   │       └── improve-description/ # AI description rewrite
│   ├── components/
│   │   ├── admin/             # Admin dashboard & managers
│   │   ├── customer/          # Hero, Menu, Cart, Reservation, etc.
│   │   ├── shared/            # Navbar, Footer
│   │   └── ui/                # shadcn/ui primitives
│   └── store/
│       └── useCartStore.ts    # Zustand cart state
├── vercel.json
├── next.config.ts
└── package.json
```

## 🚀 Getting Started

1. **Clone & install:**
   ```bash
   git clone <your-repo-url>
   cd dineflow
   npm install
   ```

2. **Set up database:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostgreSQL connection string
   ```

3. **Initialize & seed:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Run:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## ☁️ Deploy to Vercel

1. Push code to GitHub
2. Import repo in Vercel
3. Add PostgreSQL database (Vercel Postgres / Neon / Supabase)
4. Set env vars: `DATABASE_URL`, `DIRECT_URL`
5. Deploy — Prisma auto-generates and pushes schema on every deploy
6. After first deploy, seed via `/api/seed` endpoint

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/menu` | Fetch all menu items |
| POST | `/api/menu` | Create a menu item |
| GET | `/api/orders` | Fetch all orders |
| POST | `/api/orders` | Place a new order |
| PATCH | `/api/orders?id=xxx` | Update order status |
| GET | `/api/reservations` | Fetch all reservations |
| POST | `/api/reservations` | Create a reservation |
| POST | `/api/improve-description` | AI-rewrite dish description |
| POST | `/api/seed` | Seed database with sample data |

## 📄 License

MIT
