# ThePrettyPlug 💅

> Premium personal brand & booking platform for a Lagos-based lash, nail, and pedicure technician. A professional digital presence that replaces Instagram DM bookings with a fully automated, AI-enhanced experience.

---

## Overview

ThePrettyPlug is a full-stack web application built for a solo beauty technician based in Abeokuta, Nigeria. It transforms a scattered Instagram presence into a polished, conversion-optimised booking platform — complete with an AI chat assistant, style quiz, automated reminders, and a private admin dashboard.

---

## Features

### Client-Facing Website
- **Editorial landing page** — High-fashion, melanin-centered design inspired by luxury beauty magazines
- **Portfolio gallery** — Filterable masonry grid with lightbox and before/after slider
- **Services & pricing** — Full service catalogue with lash comparison table and add-ons
- **4-step booking wizard** — Service → Date/Time → Client Details → Paystack deposit
- **Slot locking** — 10-minute atomic slot reservation to prevent double bookings
- **Testimonials page** — Video + written reviews + Google Reviews integration
- **FAQ page** — AI-powered search bar + accordion FAQ bank
- **Style quiz** — 5-question quiz across 3 variants (lash, nail, pedicure) with AI-generated results
- **AI chat assistant** — 24/7 Claude-powered chat widget on every page

### Admin Dashboard
- **Calendar view** — Day/week schedule with full booking details
- **Bookings management** — Filterable table with CSV export
- **Client profiles** — Full history, spend, and manual rebook triggers
- **FAQ manager** — Add, edit, reorder FAQ entries without code
- **Unanswered questions** — Flags AI chat queries it couldn't answer
- **Settings** — Working hours, deposit %, cancellation policy, API keys

### Automation & AI
- **Booking confirmation** — Instant email + WhatsApp on payment
- **48h & 2h reminders** — Automated cron-based reminders
- **Post-appointment review request** — Sent 2 hours after appointment completion
- **Smart rebooking nudges** — AI-generated personalised messages at the optimal rebook window per service
- **AI caption generator** — Generates Instagram captions, hashtags, alt text, and site captions on portfolio upload

---

## Tech Stack

### Frontend (Client)
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| Zustand | latest | Global state management |
| Lucide React | latest | Icons |
| React Icons | 5 | Extended icon set |

### Backend (Server)
| Technology | Purpose |
|---|---|
| Express.js | REST API server |
| PostgreSQL | Primary database |
| Prisma | ORM |
| JWT | Authentication (admin) |
| bcrypt | Password hashing |

### External APIs
| Service | Purpose |
|---|---|
| Anthropic Claude | AI chat, quiz results, rebooking messages, captions |
| Paystack | NGN deposit payments |
| Termii | SMS delivery (Nigerian carriers) |
| WhatsApp Business API | Primary messaging channel |
| Resend | Transactional emails |
| Cloudinary | Image hosting & optimisation |
| Mailchimp / Brevo | Email marketing list |
| Instagram Basic Display API | Auto-pull portfolio posts |
| Google Places API | Pull Google Reviews |

---

## Project Structure

```
pretty-plug/
├── pretty-plug/          # React frontend (public website)
│   ├── public/
│   │   └── images/       # Static images (hero, gallery, services)
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/     # Landing page sections
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── ServiceChapter.jsx
│   │   │   │   ├── StyleQuiz.jsx
│   │   │   │   ├── SecuringGlow.jsx
│   │   │   │   └── InstagramGrid.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MobileBottomNav.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── store/        # Zustand stores (coming soon)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css     # Tailwind v4 theme + design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/               # Express.js backend (coming soon)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── index.js
│   └── package.json
│
├── admin/                # React admin dashboard (coming soon)
│   └── ...
│
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
- PostgreSQL 15+
- npm or yarn

### Frontend Setup

```bash
# Navigate to the client folder
cd pretty-plug

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the `server/` directory (never commit this):

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/prettyplug

# Auth
JWT_SECRET=your_jwt_secret_here

# Anthropic
ANTHROPIC_API_KEY=sk-ant-xxx

# Paystack
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_WEBHOOK_SECRET=xxx

# Termii (SMS)
TERMII_API_KEY=xxx
TERMII_SENDER_ID=BEAUTYPLUG

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