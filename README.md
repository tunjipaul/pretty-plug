# ThePrettyPlug 💅

> A full-stack React + FastAPI booking platform for a solo beauty technician based in Abeokuta. The repository includes a React public website and admin UI in `frontend/`, and a FastAPI backend in `backend/` with Supabase persistence.

---

## Overview

ThePrettyPlug is a web-first booking and content management system for a beauty technician. It provides a polished public-facing website for clients and a full admin dashboard for managing the business.

---

## Features

### Public Website
- **Homepage** — Backend-driven hero, trust metrics, service highlights, portfolio preview, testimonials, newsletter, and Instagram grid
- **Services** — Full service catalogue with categories, pricing, and descriptions
- **Portfolio** — Gallery of work with filtering
- **Testimonials** — Client reviews and featured quotes
- **FAQ** — Categorised frequently asked questions
- **Booking** — 4-step booking wizard (service → date/time → details → bank transfer deposit)
- **Booking Confirmation** — Appointment ticket with summary

### Admin Dashboard
- **Dashboard** — Overview and quick stats
- **Content Editor** — Edit homepage hero, trust metrics, and section copy
- **Services Manager** — Create, edit, and manage services
- **Gallery Manager** — Upload and organise portfolio images
- **Testimonials Manager** — Manage client reviews
- **FAQ Manager** — Create and order FAQ entries
- **Bookings** — View and manage customer bookings
- **Clients** — Client directory
- **Settings** — Business profile, opening hours, booking policies, notifications

### Backend API
- FastAPI routes: `/api/content`, `/api/services`, `/api/testimonials`, `/api/faqs`, `/api/gallery`, `/api/media`, `/api/bookings`, `/api/settings`, `/api/auth`, `/health`
- JWT authentication for admin routes (24-hour token expiry)
- Supabase-backed persistence for all data
- Media upload support

---

## Booking Flow

```
Step 1 — Service Selection
  → Browse available services with prices and durations
  → Select a service to proceed

Step 2 — Date & Time
  → Calendar with real-time availability
  → Same-day bookings allowed
  → Mon–Sat: 9:00 AM – 8:00 PM
  → Sundays: 1:00 PM – 7:00 PM

Step 3 — Client Details
  → Name, email, phone, and optional notes

Step 4 — Deposit & Confirm
  → 40% deposit required (non-refundable)
  → Bank transfer to: Kuda — 3003588180 — Lafulu Marvelous Omotayo
  → Upload payment proof screenshot
  → Booking policies displayed (rescheduling, late arrival)
```

### Booking Policies
- **Deposit**: 40% of service price, non-refundable
- **Rescheduling**: Notify at least 1 hour before appointment
- **Late Arrival**: More than 30 minutes late = automatic cancellation

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| Lucide React | ^1.6 | Icons |
| React Icons | ^5 | Extended icon set |

### Backend
| Technology | Purpose |
|---|---|
| Python 3.11+ | Backend language |
| FastAPI | API framework |
| Uvicorn | ASGI server |
| Pydantic | Settings and validation |
| Supabase Python client | Database access |
| JWT (PyJWT + bcrypt) | Authentication |

---

## Project Structure

```
pretty-plug/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   └── routes/
│   │   │       ├── auth.py
│   │   │       ├── bookings.py
│   │   │       ├── content.py
│   │   │       ├── faqs.py
│   │   │       ├── gallery.py
│   │   │       ├── health.py
│   │   │       ├── media.py
│   │   │       ├── services.py
│   │   │       ├── settings.py
│   │   │       └── testimonials.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   └── supabase.py
│   │   ├── schemas/
│   │   └── main.py
│   ├── sql/
│   │   └── schema.sql
│   ├── scripts/
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileBottomNav.jsx
│   │   │   └── Navbar.jsx
│   │   ├── lib/
│   │   │   └── content.js
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
```

---

## Design System

The UI follows the **"Editorial Melanin Intuition"** design language — a high-end fashion editorial aesthetic centred on melanin beauty.

### Colours
| Token | Hex | Usage |
|---|---|---|
| `surface` | `#FBFBE2` | Page background |
| `primary` | `#635979` | Lilac accent, CTAs |
| `primary-container` | `#D1C4E9` | Button backgrounds, hover states |
| `on-surface` | `#1B1D0E` | Primary text |
| `on-surface-variant` | `#49454D` | Secondary text |
| `surface-container-low` | `#F5F5DC` | Section backgrounds |

### Typography
| Role | Font | Usage |
|---|---|---|
| Headlines | Noto Serif | Hero titles, section headings, pull quotes |
| Body & Labels | Manrope | Body copy, buttons, captions, metadata |

### Principles
- No 1px borders — use background colour shifts to define sections
- Glassmorphism for floating nav (`bg-surface/70 + backdrop-blur`)
- Intentional asymmetry — editorial grid layouts, not symmetric boxes
- Generous whitespace — if you think there's enough, add 20% more
- Photography-led — every section anchored by real portfolio photos

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The frontend runs on `http://localhost:5173` and expects the backend API at `http://localhost:8000`.

### Available Frontend Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build production assets |
| `npm run preview` | Serve built assets locally |
| `npm run lint` | Run ESLint |

### Backend Environment Variables

Create `backend/.env` with:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_backend_only_service_role_key
FRONTEND_URL=http://localhost:5173
JWT_SECRET_KEY=replace_with_a_long_random_secret
FIRST_ADMIN_EMAIL=admin@theprettyplug.com
FIRST_ADMIN_PASSWORD=replace_with_a_strong_password
FIRST_ADMIN_NAME=Admin User
```

> ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or commit it to version control.

### Supabase Setup

Run `backend/sql/schema.sql` in the Supabase SQL Editor to create the required tables.

---

## Opening Hours

| Day | Hours |
|---|---|
| Monday – Saturday | 9:00 AM – 8:00 PM |
| Sunday | 1:00 PM – 7:00 PM |

---

## Contributing

This is a private client project. Not open for external contributions.

---

## License

Private — All rights reserved © 2026 ThePrettyPlug.