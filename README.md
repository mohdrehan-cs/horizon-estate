<div align="center">

# Horizon Estates

**A modern, production-grade real estate marketplace prototype for the Delhi NCR region.**

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, and Leaflet. Designed with strict attention to typography, spatial hierarchy, local real estate regulations (RERA, Delhi/UP stamp duty), and client-side performance.

[Live Demo](#-live-demo--preview) • [Architecture](#-architecture--design-patterns) • [Features](#-core-features) • [Engineering Highlights](#-engineering-highlights) • [Getting Started](#-getting-started) • [Roadmap](#-production-readiness-roadmap)

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/pack)
[![Build Status](https://img.shields.io/badge/Build-Passing_(99_Pages)-10B981?style=for-the-badge&logo=githubactions&logoColor=white)]()

</div>

---

## 🧭 Overview

Horizon Estates is an opinionated, high-fidelity real estate web application prototype tailored to Delhi, Noida, and Greater Noida micro-markets. It addresses common pain points in Indian property portals—such as fragmented documentation, ambiguous pricing, and opaque broker experiences—by offering a considered, editorial interface paired with structured property files, verifiable RERA IDs, and accurate local financial calculation engines.

---

## 🏛️ Architecture & Directory Layout

The repository follows a clean, domain-driven structure leveraging Next.js 16 App Router conventions:

```text
horizon-estates/
├── src/
│   ├── app/                     # Next.js App Router (99 prerendered static routes)
│   │   ├── (marketing)/         # Public discovery (about, blog, services, contact)
│   │   ├── agents/              # Verified agent directory & individual profiles
│   │   ├── calculators/         # EMI & Stamp duty calculation tools
│   │   ├── cities/              # Dynamic [city] & [locality] micro-market hubs
│   │   ├── compare/             # Property comparison matrix
│   │   ├── dashboard/           # Buyer, Seller/Agent & Admin control centers
│   │   ├── home-valuation/      # Algorithmic home value estimation
│   │   ├── list-property/       # 4-step interactive property publishing wizard
│   │   ├── properties/          # Explorer with Leaflet map toggle & property detail files
│   │   ├── sitemap.ts           # Dynamic SEO sitemap generator
│   │   └── robots.ts            # Search engine crawler directive
│   ├── components/
│   │   ├── auth/                # Role-switcher simulation & login forms
│   │   ├── layout/              # Responsive navigation, footer, mobile drawer
│   │   ├── property/            # Property cards, Leaflet map, search & filter bars
│   │   ├── providers/           # AppProviders (DemoProvider, SavedProvider, CompareProvider)
│   │   └── ui/                  # Reusable atomic design system (Buttons, Modals, Fields, Badges)
│   ├── config/                  # Global site metadata, contact details, RERA credentials
│   ├── data/                    # Type-safe seed datasets (Properties, Cities, Blogs, Agents)
│   ├── lib/                     # Domain algorithms (EMI amortization, state stamp duty, formatters)
│   └── types/                   # Centralized TypeScript definitions
├── next.config.ts               # Compiler flags, turbopack loaders, remote Unsplash patterns
└── tsconfig.json                # Strict TypeScript configuration
```

---

## ⚡ Engineering Highlights

### 1. Zero SSR Hydration Mismatch for Leaflet Maps
Leaflet relies heavily on DOM and `window` APIs that fail under standard Next.js Server Components. The map explorer is dynamically rendered on the client with dynamic imports and SSR disabled (`next/dynamic`), ensuring hydration remains clean and fast.

### 2. Domain-Specific Indian Financial Engines
Rather than using generic estimation equations, the project implements localized calculation utilities:
- **`src/lib/stamp-duty.ts`**: Implements differential stamp duty structures across Delhi and Uttar Pradesh, factoring in gender-based rebates (e.g., female sole-buyer concessions in Delhi/UP) and municipal transfer surcharges.
- **`src/lib/emi.ts`**: Standard reducing-balance loan amortization formula providing monthly principal-interest splits and schedule data.

### 3. Context-Driven Mock Persistence (Zero-Backend Prototype)
The application simulates a full-stack SaaS environment entirely in the browser:
- **`SavedProvider` & `CompareProvider`**: Manage state via React Context synchronized with `localStorage`, providing bookmarks and comparison matrix persistency across browser sessions.
- **`DemoProvider`**: Enables instant switching between `Buyer`, `Seller`, and `Admin` roles with customized dashboards without requiring an external identity provider.

### 4. Turbopack & React 19 Optimization
The codebase is configured to build against Next.js 16 Turbopack with Partial Prefetching (`ppr`) and cache components enabled. Passes strict linting (`eslint-config-next`) and TypeScript type-checks with zero warnings.

---

## 🌟 Core Features

| Feature | Description | File Reference |
| :--- | :--- | :--- |
| **Property Explorer** | Multi-facet filtering (BHK, locality, budget range, possession date) with synchronized map markers. | [`PropertyExplorer.tsx`](src/components/property/PropertyExplorer.tsx) |
| **Comparison Matrix** | Side-by-side technical specification sheet for up to 3 shortlisted properties. | [`CompareProvider.tsx`](src/components/providers/CompareProvider.tsx) |
| **Listing Wizard** | 4-step wizard validating property specs, possession details, amenities, and image attachments. | [`ListPropertyWizard.tsx`](src/components/list-property/ListPropertyWizard.tsx) |
| **Home Valuation** | Formulaic estimate based on micro-market square foot averages, property age, floor level, and condition. | [`ValuationForm.tsx`](src/components/valuation/ValuationForm.tsx) |
| **Locality Guides** | Dedicated static landing hubs for 42+ localities across Delhi, Noida, and Greater Noida. | [`[locality]/page.tsx`](src/app/cities/[city]/[locality]/page.tsx) |
| **Role Dashboards** | Custom views: Buyer shortlist tracker, Seller lead analytics, and Admin listing verification. | [`/dashboard`](src/app/dashboard/page.tsx) |

---

## 🔐 Interactive Demo Personas

On the [`/login`](src/app/login/page.tsx) page, users can test all platform roles with one click:

| Role | Pre-configured Email | Capabilities Simulated |
| :--- | :--- | :--- |
| **Buyer** | `aarav.mehta@example.com` | View shortlisted homes, track sent enquiries, schedule site visits |
| **Seller / Agent** | `sanya@noidanest.in` | Review active listings, incoming buyer leads, plan usage limits |
| **Admin** | `ops@horizonestates.in` | Review unverified listings, platform audit metrics, user accounts |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.18.0 or newer
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohdrehan-cs/horizon-estate.git
   cd horizon-estate/horizon-estates
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Verify production build & typecheck:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 🗺️ Production Readiness Roadmap

To transition this high-fidelity prototype into a commercial SaaS product:

- [ ] **Database**: Integrate PostgreSQL using Prisma or Drizzle ORM.
- [ ] **Authentication**: Replace `DemoProvider` with Clerk or NextAuth.js (Auth.js) supporting Phone OTP & Google OAuth.
- [ ] **Object Storage**: Connect AWS S3 / Cloudinary / UploadThing for real estate photo and floor plan uploads.
- [ ] **Transactional Comms**: Integrate Resend for emails and Twilio/WhatsApp Business API for instant lead dispatch.
- [ ] **Billing**: Integrate Razorpay SDK for seller listing packages and subscription management.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
