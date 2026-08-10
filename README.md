# ThePrettyPlug 💅

> A full-stack React + FastAPI booking platform for a solo beauty technician. The repository includes a React public website and admin UI in `frontend/`, and a FastAPI backend in `backend/` with Supabase persistence.

---

## Overview

ThePrettyPlug is built to transform a beauty technician's online presence into a web-first booking and content management system. The current repository supports:

- A React frontend with public pages and admin screens
- A FastAPI backend for content, services, testimonials, FAQs, gallery, media, settings, and auth
- Supabase integration for persistent storage and backend API operations

---

## Current Implementation

### Public website
- Homepage with backend-driven hero content
- Services page
- Portfolio page
- Testimonials page
- FAQ page
- Booking and booking confirmation pages

### Admin experience
- Content editor page
- Settings page
- Admin pages for services, gallery, testimonials, FAQ, bookings, and clients
- Admin login

### Backend API
- FastAPI routes for `/api/content`, `/api/services`, `/api/testimonials`, `/api/faqs`, `/api/gallery`, `/api/media`, `/api/settings`, `/api/auth`, and `/health`
- Supabase-backed persistence for site content and settings
- `backend/sql/schema.sql` contains the database schema for Supabase

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| Zustand | ^5 | Local state management |
| Lucide React | ^1.6 | Icons |
| React Icons | ^5 | Extended icon set |
| @supabase/supabase-js | ^2 | Supabase client |

### Backend
| Technology | Purpose |
|---|---|
| Python | Backend language |
| FastAPI | API framework |
| Uvicorn | ASGI server |
| Pydantic | Settings and validation |
| Supabase Python client | Supabase database access |
| Supabase Postgres | Hosted database |

---

## Project Structure

```
pretty-plug/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── content.py
│   │   │   │   ├── faqs.py
│   │   │   │   ├── gallery.py
│   │   │   │   ├── health.py
│   │   │   │   ├── media.py
│   │   │   │   ├── services.py
│   │   │   │   └── settings.py
│   │   ├── core/
│   │   │   └── config.py
│   │   └── db/
│   │       └── supabase.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── UI/
│   └── ...
├── backend/sql/schema.sql
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
- Python 3.11+ or 3.12+
- npm or yarn

### Frontend Quick Start

```bash
cd frontend
npm install
npm run dev
```

### Backend Quick Start

```bash
cd backend
pip install -r requirements.txt
Failed to send OTP: OperationalError: (sqlite3.OperationalError) no such column: profiles.otp_code [SQL: SELECT profiles.id AS profiles_id, profiles.phone AS profiles_phone, profiles.full_name AS profiles_full_name, profiles.avatar_url AS profiles_avatar_url, profiles.onboarding_completed AS profiles_onboarding_completed, profiles.fcm_token AS profiles_fcm_token, profiles.otp_code AS profiles_otp_code, profiles.otp_expires_at AS profiles_otp_expires_at FROM profiles WHERE profiles.phone = ? LIMIT ? OFFSET ?] [parameters: ('+2349039645683', 1, 0)] (Background on this error at: https://sqlalche.me/e/20/e3q8)

[HTTP] | Failed to send OTP: OperationalError: (sqlite3.OperationalError) no such column: profiles.otp_code [SQL: SELECT profiles.id AS profiles_id, profiles.phone AS profiles_phone, profiles.full_name AS profiles_full_name, profiles.avatar_url AS profiles_avatar_url, profiles.onboarding_completed AS profiles_onboarding_completed, profiles.fcm_token AS profiles_fcm_token, profiles.otp_code AS profiles_otp_code, profiles.otp_expires_at AS profiles_otp_expires_at FROM profiles WHERE profiles.phone = ? LIMIT ? OFFSET ?] [parameters: ('+2349039645683', 1, 0)] (Background on this error at: https://sqlalche.me/e/20/e3q8) | status=500 | url=http://127.0.0.1:8000/api/auth/send-otp --reload
```

The frontend and backend are separate apps in this repository. The frontend expects the backend API at `http://localhost:8000` by default.

### Available frontend scripts

- `npm run dev` — Starts the Vite dev server
- `npm run build` — Builds production assets
- `npm run preview` — Serves built assets locally
- `npm run lint` — Runs ESLint across the frontend codebase

### Backend environment variables

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

The backend uses Supabase for persistence and requires the service role key for server-side writes. Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or commit it.

### Supabase setup

Run `backend/sql/schema.sql` in Supabase SQL Editor to create the required tables.

---

# Paystack
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_WEBHOOK_SECRET=xxx

# Termii (SMS)
TERMII_API_KEY=xxx
TERMII_SENDER_ID=THEPRETTYPLUG

# WhatsApp
WHATSAPP_TOKEN=xxx
WHATSAPP_PHONE_NUMBER_ID=xxx

# Resend (Email)
RESEND_API_KEY=re_xxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Instagram
INSTAGRAM_ACCESS_TOKEN=xxx

# Google
GOOGLE_PLACES_API_KEY=xxx
GOOGLE_PLACE_ID=xxx
```

---

## Database Schema (Key Tables)

Note: The database is hosted in Supabase (Postgres). You can create tables via the Supabase dashboard, SQL editor, or run migrations from your preferred migration tool.

| Table | Purpose |
|---|---|
| `clients` | Client profiles, contact info, preferences |
| `services` | Service catalogue — name, price, duration, deposit % |
| `bookings` | All bookings with status, payment ref, reschedule token |
| `slot_locks` | 10-minute slot holds during checkout |
| `intake_forms` | First-visit health & preference questionnaires |
| `portfolio_items` | Gallery photos with AI-generated captions |
| `reviews` | Client reviews (website + Google) |
| `faq_entries` | CMS-managed FAQ bank fed into AI chat |
| `chat_messages` | Full chat history with unanswered query flags |
| `rebook_queue` | Scheduled rebooking nudge messages |
| `quiz_leads` | Style quiz completions + email captures |

All prices stored in **kobo** (NGN smallest unit) to avoid floating point issues. All times in **WAT (UTC+1)**.

---

## Booking Flow

```
Step 1 — Service Selection
  → Choose service category (Lash / Nail / Pedicure)
  → Select service + optional add-ons
  → Running total shown

Step 2 — Date & Time
  → Calendar shows only available dates
  → Time slots generated from working hours, duration & buffers
  → 10-minute slot lock applied on selection

Step 3 — Client Details
  → Name, phone, email
  → First visit? → Intake form (allergies, nail condition, etc.)
  → Returning client? → Phone lookup pre-fills details

Step 4 — Deposit & Confirm
  → Paystack inline embed (no redirect)
  → Cancellation policy acknowledgement
  → On success → confirmation page + email + WhatsApp
```

---

## AI Features

| Feature | Trigger | Model |
|---|---|---|
| Chat assistant | Widget on every page | `claude-sonnet-4-20250514` |
| Style quiz results | Quiz completion | `claude-sonnet-4-20250514` |
| Rebooking nudges | Cron job (post-appointment) | `claude-sonnet-4-20250514` |
| Caption generator | Portfolio photo upload | `claude-sonnet-4-20250514` |

All Claude API calls are **server-side only**. The API key is never exposed to the client.

---

## Roadmap

### Phase 1 — Current
- [x] Landing page
- [ ] React Router configuration
- [ ] Portfolio page
- [ ] Services & pricing page
- [ ] Booking wizard (4 steps)
- [ ] Express server setup
- [ ] PostgreSQL schema + Prisma
- [ ] Paystack integration
- [ ] Admin dashboard
- [ ] AI chat widget
- [ ] Automated messaging (email + WhatsApp + SMS)

### Phase 2 — Post Launch
- [ ] Aftercare hub (`/aftercare`)
- [ ] Digital gift cards
- [ ] Referral system
- [ ] Birthday discount automation
- [ ] AI review response drafts
- [ ] Analytics dashboard

---

## Contributing

This is a private client project. Not open for external contributions.

---

## License

Private — All rights reserved © 2026 ThePrettyPlug.

---

*Crafted with intention in Abeokuta. 🌸*