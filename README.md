<div align="center">

# 🏡 Horizon Estates

**A modern real estate marketplace web application for the Delhi NCR region.**

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Leaflet**.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Demo Accounts](#-demo-accounts) • [Getting Started](#-getting-started) • [Future Plans](#-future-plans)

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📌 About the Project

**Horizon Estates** is a frontend marketplace application designed to make searching for and listing homes in Delhi, Noida, and Greater Noida cleaner and more transparent. 

I built this project to practice modern web development patterns with Next.js 16 and React 19, focusing on responsive UI design, interactive maps, dynamic client-side filtering, and local calculation tools for homebuyers (such as EMI and Delhi/UP Stamp Duty calculators).

---

## ✨ Features

- **🗺️ Interactive Map & Property Explorer**: Search and filter properties by city, locality, price range, and BHK count with interactive Leaflet map pins.
- **⚖️ Property Comparison**: Shortlist and compare up to 3 properties side-by-side (pricing, carpet area, amenities, RERA registration).
- **🧮 Real Estate Calculators**:
  - **Home Loan EMI Calculator**: Monthly EMI breakdown, total interest payable, and loan amortization.
  - **Stamp Duty Calculator**: Calculates government registration charges and stamp duty based on Delhi vs. Uttar Pradesh rules and gender-based concessions.
- **📝 4-Step Listing Flow**: Guided wizard for property sellers with form validation, amenities selector, and live listing preview.
- **📊 Multi-Role Dashboards**:
  - **Buyer View**: Track saved properties and enquiry submissions.
  - **Seller View**: Manage active listings, leads, and listing plan usage.
  - **Admin View**: Moderation dashboard for inspecting new listings and platform metrics.
- **📍 Locality Guides**: Dedicated hubs for popular neighborhoods across Delhi, Noida, and Greater Noida with price trends and neighborhood stats.
- **💡 Home Valuation Tool**: Interactive estimate calculator based on property type, floor level, age, and location.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Maps**: Leaflet + OpenStreetMap
- **State & Storage**: React Context API with `localStorage` persistence

---

## 📂 Project Structure

```text
horizon-estates/
├── src/
│   ├── app/                     # Next.js App Router pages (99 prerendered routes)
│   │   ├── calculators/         # EMI & Stamp duty calculators
│   │   ├── cities/              # Locality and city guide pages
│   │   ├── compare/             # Property comparison page
│   │   ├── dashboard/           # Buyer, Seller, and Admin dashboards
│   │   ├── home-valuation/      # Property price estimation page
│   │   ├── list-property/       # 4-step listing wizard
│   │   ├── properties/          # Property search explorer & detailed listing pages
│   │   ├── sitemap.ts           # Dynamic SEO sitemap
│   │   └── robots.ts            # Crawler directives
│   ├── components/
│   │   ├── auth/                # Login form & role switcher
│   │   ├── layout/              # Navbar, footer, and navigation
│   │   ├── property/            # Property card, Leaflet map, and filters
│   │   ├── providers/           # Context providers (Saved, Compare, Demo user)
│   │   └── ui/                  # Reusable UI components (buttons, modals, inputs)
│   ├── config/                  # Site details and contact info
│   ├── data/                    # Mock datasets (properties, localities, agents, blogs)
│   ├── lib/                     # Helper functions (EMI math, stamp duty formula, formatters)
│   └── types/                   # TypeScript interfaces and types
```

---

## 🔑 Demo Accounts

You can test all user perspectives right from the `/login` page using the built-in role switcher:

| Persona | Demo Email | What you can explore |
| :--- | :--- | :--- |
| **Buyer** | `aarav.mehta@example.com` | Shortlist homes, submit inquiries, check saved properties |
| **Seller** | `sanya@noidanest.in` | Manage property listings, check incoming leads |
| **Admin** | `ops@horizonestates.in` | View platform overview, verify pending property submissions |

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.18 or newer) installed.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohdrehan-cs/horizon-estate.git
   cd horizon-estate/horizon-estates
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔮 Future Plans / What's Next

This project is currently a frontend demo application. In the future, I plan to:
- Connect a PostgreSQL database using Prisma or Supabase.
- Add real authentication with NextAuth.js or Clerk (supporting Google and Phone OTP).
- Add cloud image uploads (Cloudinary or UploadThing) for real property photos.
- Integrate an email notification service (Resend) when leads are submitted.
