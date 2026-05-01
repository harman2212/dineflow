# Changelog

All notable changes to the DineFlow project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-05-01

### Added

#### Customer Features
- **Landing Page** — Full-width hero section with restaurant branding, search bar, and call-to-action buttons
- **Menu Grid** — Interactive grid display of 17 pre-seeded dishes with category filtering (All, Appetizers, Mains, Pasta, Desserts, Drinks)
- **Menu Item Cards** — Rich dish cards with images, ratings, popularity badges, price, and add-to-cart functionality
- **Smart Cart** — Slide-out cart drawer powered by Zustand with quantity controls, item removal, and real-time total calculation
- **Order Placement** — Complete checkout flow with customer name, phone, table number, and order confirmation
- **Order Tracking** — Real-time order status popup with animated progress (Pending → Preparing → Ready → Served)
- **Table Reservation** — Reservation form with date/time picker, guest count, special notes, and confirmation
- **About Section** — Restaurant story, ambiance description, and featured image gallery
- **Contact Section** — Location information with embedded map and contact details
- **Responsive Navigation** — Navbar with active section highlighting, scroll-based transparency, and mobile menu
- **Footer** — Site-wide footer with branding, quick links, and social media placeholders

#### Admin Dashboard
- **Admin Layout** — Tabbed dashboard interface with sidebar navigation for Menu, Orders, and Reservations
- **Menu Item Manager** — Full CRUD operations for menu items with availability toggle and popularity marking
- **Add/Edit Item Dialog** — Modal dialog for creating and editing menu items with image URL input
- **Drag & Drop Reordering** — Reorder menu items via drag-and-drop using @dnd-kit
- **Order Management** — View all orders with status update capabilities (Pending, Preparing, Ready, Served, Completed)
- **Reservation Management** — View, confirm, or cancel table reservations with full customer details
- **Statistics Overview** — Dashboard cards showing total items, active orders, pending reservations, and revenue

#### AI Features
- **AI Description Optimizer** — One-click AI rewrite of menu item descriptions using z-ai-web-dev-sdk for more appetizing, professional copy
- **API Endpoint** — `/api/improve-description` POST endpoint for AI-powered text enhancement

#### Backend & API
- **RESTful API** — 9 API endpoints for menu, orders, reservations, AI descriptions, and database seeding
- **Prisma ORM** — PostgreSQL database with 3 models: MenuItem, Order, Reservation
- **Database Seeding** — Seed script (`prisma/seed.ts`) with 17 diverse menu items across 6 categories
- **CORS Headers** — Configured in `vercel.json` for cross-origin API access

#### Design & UX
- **Dark Luxury Theme** — Premium dark UI with gold/amber accents, elegant typography, and smooth animations
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop breakpoints
- **shadcn/ui Components** — Consistent design system using Radix UI primitives
- **Lucide Icons** — Modern icon set throughout the application
- **Smooth Scrolling** — Section-based scroll navigation with active state indicators

#### Infrastructure
- **Vercel Deployment** — Zero-config deployment with `vercel.json`, postinstall Prisma generation, and auto schema push
- **Environment Configuration** — `.env.example` template with DATABASE_URL and DIRECT_URL placeholders
- **Git Configuration** — `.gitignore` for Node.js, Next.js, and Prisma generated files
- **Build Optimization** — Production build with Prisma client pre-generation

### Database Schema
- **MenuItem** — id, name, description, price, category, image, available, isPopular, rating, timestamps
- **Order** — id, items (JSON), total, status, customerName, customerPhone, tableNumber, createdAt
- **Reservation** — id, name, phone, date, time, guests, notes, status, createdAt

---

## [Unreleased]

_No upcoming changes planned._
