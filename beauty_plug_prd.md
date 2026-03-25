# Beauty Plug — Personal Brand Website
## Product Requirements Document (PRD) v1.0
### For AI-Assisted Implementation

---

> **How to use this document:** This PRD is written for an AI implementation partner. Every section contains enough detail to generate code, copy, database schemas, API integrations, and design decisions without ambiguity. Work through sections in order. Ask the AI to implement one section at a time. Reference section numbers when giving instructions (e.g. "implement Section 4.2 — Booking Flow").

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Scope & Boundaries](#2-scope--boundaries)
3. [Site Architecture](#3-site-architecture)
4. [Page Specifications](#4-page-specifications)
   - 4.1 Home
   - 4.2 Portfolio / Gallery
   - 4.3 Services & Pricing
   - 4.4 Booking
   - 4.5 Testimonials
   - 4.6 FAQs
   - 4.7 About
5. [Booking System — Full Specification](#5-booking-system--full-specification)
6. [AI Features — Full Specification](#6-ai-features--full-specification)
   - 6.1 AI Chat Assistant
   - 6.2 Style Quiz
   - 6.3 Smart Rebooking Nudges
   - 6.4 AI Caption Generator
7. [Automated Messaging Sequences](#7-automated-messaging-sequences)
8. [Admin Dashboard](#8-admin-dashboard)
9. [Content Plan](#9-content-plan)
10. [Design Specification](#10-design-specification)
11. [Database Schema](#11-database-schema)
12. [API Integrations](#12-api-integrations)
13. [Build Roadmap](#13-build-roadmap)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Launch Checklist](#15-launch-checklist)
16. [Phase 2 Features](#16-phase-2-features)
17. [Glossary](#17-glossary)

---

## 1. Project Overview

### 1.1 What This Is

A personal brand website for a single beauty technician offering **lash extensions**, **nail services**, and **pedicure treatments** based in **Lagos, Nigeria**.

This is NOT a marketplace. It is a one-person, portfolio-first, booking-enabled website that replaces Instagram DM bookings with a professional, automated, AI-enhanced digital presence.

### 1.2 The Problem Being Solved

| Problem | Impact |
|---|---|
| Clients discover her on Instagram but have no dedicated place to learn, trust, and book | Lost conversions — interested clients ghost because the path to booking is unclear |
| Pricing and services communicated via DM | Repetitive admin work, inconsistent information, slow response times |
| No deposit system | No-shows cost her direct revenue |
| No automated reminders | She manually chases clients; appointments are forgotten |
| Portfolio scattered across IG posts | No searchable, filterable showcase of her work |
| Same FAQ questions hit her DMs daily | "How long do lashes last?", "Do you do infills?", "What's your cancellation policy?" |

### 1.3 Success Definition

The site is successful when:

- A visitor from Instagram can **book and pay a deposit in under 3 minutes on mobile** without messaging her
- She **wakes up to confirmed bookings**, not unread DMs asking for prices
- **No-show rate drops below 5%** due to deposit requirement + automated reminders
- The **AI chat handles 70%+ of FAQ-type queries** without her involvement
- Her portfolio is the **first thing every visitor sees and the last thing they forget**

### 1.4 Primary Users

**User A — The Client**
- Discovers her on Instagram
- Aged 22–40, Lagos-based, mobile-first
- Wants to browse work, verify prices, and book without friction
- May be a first-time or returning client

**User B — The Technician (Site Owner)**
- Manages her own bookings and schedule
- Non-technical — must be able to update content from her phone
- Needs to see her calendar, earnings, and client info in a simple dashboard

---

## 2. Scope & Boundaries

### 2.1 In Scope (v1)

- 7-page responsive website (mobile-first)
- Real-time booking system with deposit payment
- Portfolio gallery with filtering and lightbox
- 4 AI-powered features (chat, quiz, rebooking, captions)
- Automated SMS/WhatsApp/email messaging sequences
- Admin calendar dashboard
- CMS for content updates (no developer required post-launch)
- SEO foundations

### 2.2 Out of Scope (v1 — deferred to Phase 2)

- Native mobile app (iOS/Android)
- Multi-staff scheduling
- Point-of-sale (POS) system
- Physical product e-commerce
- Multi-language support
- Marketplace listing (other technicians)
- Inventory management

### 2.3 Constraints

- Payment gateway must support **Nigerian Naira (NGN)** and mobile money — use **Paystack**
- SMS must be delivered via a Nigerian-compatible gateway — use **Termii** or **Sendchamp**
- All prices displayed in **NGN (₦)**
- Site must be fully functional on **2G/3G connections** (progressive loading)
- CMS must be operable from a **smartphone browser** without a laptop

---

## 3. Site Architecture

### 3.1 Page Map

```
beautyplug.com/
├── / (Home)
├── /portfolio
├── /services
├── /book
│   ├── /book/confirm (post-payment confirmation)
│   └── /book/reschedule/:token
├── /testimonials
├── /faq
├── /about
├── /quiz (Style Quiz — standalone shareable page)
└── /admin (password-protected dashboard)
    ├── /admin/calendar
    ├── /admin/bookings
    ├── /admin/clients
    ├── /admin/faq-manager
    └── /admin/settings
```

### 3.2 Navigation Structure

**Primary nav (all pages):**
Portfolio · Services · Book Now (CTA) · Testimonials · About

**Mobile nav:**
Hamburger menu. Sticky bottom bar with "Book Now" button always visible.

**Footer (all pages):**
Instagram link · WhatsApp link · Email · Location · © Year

### 3.3 URL Conventions

- All URLs lowercase, hyphen-separated
- No trailing slashes
- Booking confirmation: `/book/confirm?ref={booking_ref}`
- Reschedule: `/book/reschedule/{token}` (token expires 48h after reminder sent)

---

## 4. Page Specifications

### 4.1 Home Page (`/`)

**Primary job:** Make an unforgettable first impression and drive the visitor toward booking.

#### Sections (top to bottom):

**Section 1 — Hero**
- Full-width or large-image hero using her best portfolio photo (not stock)
- Overlay with her name in display serif font (large, ~64px desktop / ~40px mobile)
- Tagline below name: 1 line describing her specialty (e.g. "Lagos' most-booked lash & nail technician")
- Two CTAs:
  - Primary button: "Book your appointment" → `/book`
  - Secondary link: "See my work" → `/portfolio`
- Hero image: her actual work, not her face (portfolio photo chosen by her in CMS)

**Section 2 — Trust Bar**
- Horizontal strip with 3–4 stat items:
  - `500+ happy clients`
  - `3 years experience`
  - `5-star rated`
  - `Lagos-based & certified`
- Subtle animation: numbers count up on scroll into view

**Section 3 — Services Preview**
- 3 cards side by side (Lash · Nail · Pedicure)
- Each card: category photo, category name, 1-sentence description, "View services →" link
- On mobile: horizontal scroll

**Section 4 — Portfolio Teaser**
- 6 photos in a grid (2×3 desktop / 3×2 mobile)
- Filter pills above: All · Lash · Nail · Pedicure
- "View full portfolio →" button below

**Section 5 — Testimonials Strip**
- Auto-scrolling horizontal carousel of 5–8 short written reviews
- Each review: star rating, client name, service received, 1–2 sentence quote
- "Read all reviews →" link

**Section 6 — Email Capture**
- Background: warm-toned section (dark or cream)
- Headline: "Be the first to know about openings & offers"
- Subtext: "Join the list and get 10% off your first appointment"
- Input: email field + "Join" button
- Connects to Mailchimp/Brevo list tagged `website-signup`
- On submit: success message + discount code shown inline (no page reload)

**Section 7 — Instagram Feed**
- Latest 6–9 Instagram posts in a grid
- Pulls via Instagram Basic Display API or third-party embed (Behold, SnapWidget)
- "Follow on Instagram →" CTA below

**Floating Element (mobile only):**
- Sticky bottom bar: "Book Now →" button, full width, always visible

---

### 4.2 Portfolio / Gallery (`/portfolio`)

**Primary job:** Prove her skill so compellingly that visitors feel they'd be foolish not to book.

#### Layout

- Masonry grid (desktop) / uniform 2-column grid (mobile)
- Filter tabs at top: `All` · `Lash` · `Nail` · `Pedicure`
- Filtering is client-side (no page reload) — CSS class toggle on cards
- Images lazy-loaded below the fold

#### Photo Card Behaviour

Each photo card:
- Thumbnail image (square or portrait crop, aspect ratio consistent per category)
- On hover (desktop): overlay appears with service name + "Book this look →" button
- On tap (mobile): same overlay, single tap
- On click/tap of image: opens lightbox

#### Lightbox

Lightbox contains:
- Full-size image
- Service name (e.g. "Wispy Hybrid Lash Set")
- Technique used (e.g. "Hybrid — Mix of Classic and Russian Volume")
- Duration (e.g. "2.5 hours")
- Products used (optional, e.g. "Stacy Lash, J Curl")
- "Book this look" button → pre-fills service selection on `/book`
- Left/right navigation arrows
- Close button (X) or click outside

#### Before/After Feature

Select photos (tagged `before_after: true` in CMS) display a horizontal drag slider:
- Left side: before photo
- Right side: after photo
- Draggable divider with a circular handle
- Label: "Before" (left) / "After" (right)

#### Instagram Auto-Sync

- Instagram posts tagged with `#beautyplugportfolio` (or equivalent custom tag) automatically pull into the gallery
- She can also upload directly via CMS with manual tagging
- CMS field per photo: Category (Lash/Nail/Pedicure) · Service Name · Technique · Duration · Products · Featured (yes/no) · Before/After (yes/no)

---

### 4.3 Services & Pricing (`/services`)

**Primary job:** Answer "what do you offer and how much?" without a single DM.

#### Structure

Three tabbed sections (or anchored scroll sections):
1. Lash Services
2. Nail Services
3. Pedicure Services

#### Service Card (each service)

```
┌─────────────────────────────────┐
│ [Category Icon]                 │
│ Service Name              ₦X,XXX│
│ 1-line description              │
│ ⏱ Duration: X hours             │
│ [Add-ons available]             │
│              [Book Now →]       │
└─────────────────────────────────┘
```

Fields per service (managed in CMS):
- `name` (string)
- `category` (enum: lash | nail | pedicure)
- `description` (string, max 80 chars)
- `price` (number in NGN)
- `price_display` (string, e.g. "from ₦25,000" or "₦30,000")
- `duration_minutes` (number)
- `add_ons` (array of add-on IDs)
- `active` (boolean — hides from public if false)
- `booking_id` (slug used to pre-fill booking form)

#### Add-Ons Section

Listed below each service category as checkboxes:
- Name · Price · Compatible services

#### Lash Comparison Table

A dedicated comparison table for lash types:

| | Classic | Hybrid | Volume | Mega Volume |
|---|---|---|---|---|
| **Look** | Natural, subtle | Natural + fuller | Dramatic, full | Very dramatic |
| **Duration** | 1.5–2 hrs | 2–2.5 hrs | 2.5–3 hrs | 3–4 hrs |
| **Fill cycle** | Every 2–3 wks | Every 2–3 wks | Every 2–3 wks | Every 2–3 wks |
| **Best for** | First-timers, minimal look | Everyday glam | Special occasions | Editorial, photoshoots |
| **Price from** | ₦XX,XXX | ₦XX,XXX | ₦XX,XXX | ₦XX,XXX |

#### Pricing Notes Section

Displayed below all services:
> "All services include a complimentary consultation. Removal of a previous set by another technician is charged separately. Prices may vary based on lash condition and length desired."

---

### 4.4 Booking (`/book`)

Full specification in [Section 5](#5-booking-system--full-specification).

---

### 4.5 Testimonials (`/testimonials`)

**Primary job:** Let happy clients sell for her.

#### Layout

**Above fold — Video testimonials**
- 2–3 embedded video testimonials (from Instagram Reels or direct upload)
- Max 60 seconds each
- Grid layout: 2 across desktop / stacked mobile
- Videos have autoplay disabled, muted by default, with play button overlay

**Social proof counter bar**
- `500+ five-star reviews` · `Google Rating: 4.9 ⭐` · `Verified clients only`

**Written reviews section**
- Card grid layout
- Each review card:
  - Star rating (1–5, displayed as filled stars)
  - Client first name + initial (e.g. "Amaka O.")
  - Service received (e.g. "Hybrid Lash Set")
  - Date of appointment (month + year only, e.g. "March 2025")
  - Review text (full text, no truncation)
  - Optional: client photo (circular, with consent)
- Sort options: Most recent · Highest rated · By service (Lash / Nail / Pedicure)
- Pagination: load 12 at a time, "Load more" button

**Google Reviews integration**
- Pull via Google Places API (Place ID configured in admin settings)
- Reviews displayed in the same card format
- Badge: "via Google" on Google-sourced reviews

**Featured review**
- Single full-width quote card at top of written reviews section
- Large serif quote text
- Client photo as background (blurred/low opacity) if available
- She pins one review as "featured" via admin dashboard

#### Review Collection Flow

- 2 hours after appointment is marked "Complete" in admin:
  - Email sent with review request link
  - WhatsApp message sent with same link
- Review form (hosted on site at `/review/{booking_ref}`):
  - Star rating selector (required)
  - Written review (optional, max 500 chars)
  - Photo upload (optional)
  - Consent checkbox for name/photo display
- Reviews go live immediately (no moderation queue for 4–5 star reviews)
- 1–3 star reviews held for her to review first, AI drafts a response for her approval

---

### 4.6 FAQs (`/faq`)

**Primary job:** Answer every question before it becomes a DM.

#### Layout

**AI search bar (top of page)**
- Prominent search input: "Ask me anything about bookings, services, or aftercare..."
- On submit: calls Claude API, returns conversational answer inline below the search bar
- If AI is confident: answer displayed with a "Was this helpful? Yes / No" prompt
- If AI is not confident: answer displayed + "Still not sure? Chat with us →" WhatsApp link
- All queries logged to `faq_queries` table in database (answered: true/false)
- Unanswered queries flagged in admin dashboard for her to review weekly

**Accordion FAQ bank**

Grouped sections with collapsible accordion items:

**Group 1 — Booking & Deposits (10 questions)**
Example questions:
- How do I book an appointment?
- What payment methods do you accept for the deposit?
- How much is the deposit?
- Can I cancel or reschedule my appointment?
- What happens if I'm late to my appointment?
- Do I need an account to book?
- Can I book same-day?
- How far in advance should I book?
- What if I need to book for a special event?
- Do you offer group bookings?

**Group 2 — Aftercare (8 questions)**
Example questions:
- How do I care for my lash extensions?
- Can I swim or shower with lash extensions?
- How often should I get a lash fill?
- What nail care routine do you recommend?
- How long does a pedicure last?
- Can I use regular nail polish over gel?
- What products should I avoid with lash extensions?
- When can I wear eye makeup after lash application?

**Group 3 — Pricing (5 questions)**
Example questions:
- Do you offer student or loyalty discounts?
- Are prices the same for all lash lengths?
- What's included in the service price?
- Do you charge for consultations?
- Do you have payment plans?

**Group 4 — Studio Policies (4 questions)**
Example questions:
- What is your cancellation policy?
- What happens if I no-show?
- Do you accept walk-ins?
- What are your working hours?

**Group 5 — First Visit (3 questions)**
Example questions:
- What should I do to prepare for my first lash appointment?
- What should I wear to my appointment?
- How long will my first appointment take?

**"Still have questions?" CTA**
- At bottom of page
- WhatsApp chat link button

#### FAQ CMS Management

- She can add/edit/delete FAQ entries from admin dashboard
- Fields: `question`, `answer`, `group`, `active`, `order`
- Changes propagate to the AI chat assistant's knowledge base automatically (see Section 6.1)

---

### 4.7 About (`/about`)

**Primary job:** Make her feel like a person, not just a service provider.

#### Sections

**Hero — Her photo + headline**
- Professional portrait photo (not a selfie)
- Headline: "Hi, I'm [Name]" in display serif
- Subheadline: her specialty in one line

**Her story**
- 3–5 paragraphs in first person
- Content: why she started, training journey, certifications, her philosophy
- Keep conversational, warm, and real — no corporate language

**Credentials**
- Training and certification badges/logos (inline or grid)
- Brands she uses and trusts (logo strip with small product photos)
- Years of experience stat

**"What to expect at your first visit"**
A warm, step-by-step guide for new clients:

```
1. Book online and pay your deposit → You'll get a confirmation immediately
2. Arrive 5 minutes early → Come with clean, makeup-free eyes (for lashes)
3. We start with a consultation → Tell me your lifestyle, preferences, and any concerns
4. Sit back and relax → Most appointments are 1.5–3 hours depending on service
5. Review your results together → We check everything before you leave
6. Aftercare guide sent to you → Check your email for care instructions
```

**Behind-the-scenes content (optional)**
- Short embedded video of her working (from IG Reels)
- 2–3 photos of her studio/workspace

**Instagram feed**
- Latest 6 posts
- "Follow for daily inspiration →" CTA

**Contact details**
- WhatsApp button (click-to-chat with pre-filled message: "Hi [Name], I'd like to enquire about booking")
- Instagram handle
- Email address
- Studio area/location (neighbourhood, not full address unless she chooses)

---

## 5. Booking System — Full Specification

### 5.1 Booking Flow (4 Steps)

The booking flow is a linear, single-page step wizard. No page navigations between steps — state managed client-side. Progress indicator shown at top (Step 1 of 4).

#### Step 1 — Service Selection

UI:
- Category tabs: Lash · Nail · Pedicure
- Service cards (from CMS) shown per selected category
- Each card: service name, description, duration, price
- Single selection (radio behaviour)
- Add-ons shown as checkboxes below service list after selection
- Running total shown at bottom: "Total: ₦X,XXX (₦X,XXX deposit due now)"
- "Book this look" from portfolio pre-populates service selection and skips to step 2

#### Step 2 — Date & Time Selection

UI:
- Month calendar view (desktop) / day scroll (mobile)
- Only future dates shown (today + 1 day minimum)
- Unavailable dates: greyed out, not clickable
  - Her off-days (configured in admin)
  - Days at max booking capacity (configured in admin)
  - Past dates
- On date selection: available time slots appear as pill buttons
- Time slots generated from:
  - Her working hours (per day of week, configured in admin)
  - Service duration
  - Buffer time between appointments (configured in admin)
  - Existing confirmed bookings (slots occupied)
- On slot selection: 10-minute lock applied (see Section 5.3)
- Time displayed in WAT (West Africa Time, UTC+1)

#### Step 3 — Client Details

UI:
- Fields: First name (required) · Last name (required) · Phone number (required, Nigerian format validation) · Email address (required)
- "Is this your first visit?" toggle
  - If YES: intake form appears:
    - Any allergies? (skin, adhesive, product — text field)
    - Previous lash extensions? (Yes/No toggle)
    - If yes: when were they last removed? (date picker)
    - Current nail condition (Normal / Bitten / Damaged / Acrylic/Gel on nails currently)
    - Anything else we should know? (text area, optional)
  - If NO: skip intake form
- Returning client: phone number lookup — if number exists in database, pre-fills name and email

#### Step 4 — Deposit & Confirm

UI:
- Booking summary (read-only): service, date, time, add-ons
- Deposit amount shown clearly: e.g. "₦7,500 deposit due now · ₦22,500 balance at appointment"
- Cancellation policy displayed (must be acknowledged): checkbox "I understand the cancellation policy"
- Paystack payment embed (inline, not redirect)
- Payment methods: debit card · Visa/Mastercard · bank transfer · USSD
- On payment success:
  - Redirect to `/book/confirm?ref={booking_ref}`
  - Confirmation email sent (see Section 7.1)
  - WhatsApp message sent to client (see Section 7.2)
  - WhatsApp/SMS notification sent to her (see Section 7.3)
  - Booking written to database as `status: confirmed`
- On payment failure:
  - Error message shown inline: "Payment was not completed. Your slot is still held for 8 more minutes. Please try again."
  - Slot lock timer visible
  - "Try again" button to re-attempt Paystack

#### Confirmation Page (`/book/confirm`)

- Animated "You're booked!" heading (confetti animation on load)
- Summary: client name, service, date, time, deposit paid, balance due
- "Add to calendar" links: Google Calendar · Apple Calendar · .ics download
- Aftercare preview: "We'll send you an aftercare guide after your appointment"
- "Share on WhatsApp" button (pre-filled: "Just booked my [service] with [Technician Name]! 🎉")
- Link back to portfolio

---

### 5.2 Deposit & Payment Rules

| Rule | Detail |
|---|---|
| Deposit amount | Configurable per service in admin (default: 40% of service price) |
| Balance due | At appointment, in-person, not collected online |
| Payment methods | Paystack: card, bank transfer, USSD, mobile money |
| Platform fee | None in v1 (direct Paystack payout to her account) |
| Cancellation: 48h+ before | Full deposit refund, processed within 3–5 business days |
| Cancellation: 24–48h before | 50% refund |
| Cancellation: under 24h | No refund |
| No-show | Deposit forfeited. Slot released. Client notified. |
| Rescheduling (24h+ notice) | Free. Deposit carries over to new date. |
| Rescheduling (under 24h) | Treated as cancellation. New deposit required. |

---

### 5.3 Slot Locking

```
Client opens Step 2 (date/time selection) → no lock yet
Client selects a time slot → soft lock applied for 10 minutes
  → slot marked as `status: pending` in database
  → lock expiry timestamp stored
  → if client does not complete payment within 10 minutes:
    → slot released back to `status: available`
    → client shown "Your slot has been released. Please select a new time."
  → if client completes payment:
    → slot marked as `status: confirmed`
    → lock cleared
```

**Concurrent booking prevention:**
- Slot selection is atomic (database transaction with row-level lock)
- If two clients simultaneously select the same slot, only the first succeeds
- Second client: "Sorry, that slot was just taken! Here are the next available times:" (alternatives auto-displayed)

---

### 5.4 Availability Rules

Configured by her in admin dashboard:

| Setting | Default | Description |
|---|---|---|
| Working days | Mon–Sat | Days she accepts bookings |
| Working hours | 9:00 AM – 6:00 PM WAT | Per-day configurable |
| Buffer between appointments | 15 minutes | Cleanup/prep time |
| Max bookings per day | 6 | Hard cap |
| Min advance booking | 24 hours | Earliest bookable slot |
| Max advance booking | 60 days | Latest bookable slot |

**Holiday blocking:**
- She selects specific dates in admin calendar to block
- Blocked dates are greyed out immediately on public booking calendar
- Reason field (private, not shown to clients): e.g. "Family holiday", "Training course"

---

### 5.5 New Client Intake Form (Data Storage)

```sql
intake_forms table:
- id (uuid, primary key)
- booking_id (uuid, foreign key → bookings.id)
- client_id (uuid, foreign key → clients.id)
- allergies (text, nullable)
- previous_lashes (boolean)
- last_lash_removal (date, nullable)
- nail_condition (enum: normal | bitten | damaged | existing_product)
- additional_notes (text, nullable)
- created_at (timestamp)
```

---

## 6. AI Features — Full Specification

All AI features use the **Anthropic Claude API** (`claude-sonnet-4-20250514`). API key stored in server environment variables only — never client-side.

### 6.1 AI Chat Assistant

**What it does:** A chat widget on every page of the site. Clients ask anything — pricing, availability, services, aftercare, policies — and get an instant, warm, on-brand answer, 24/7. If it can't answer, it escalates to WhatsApp.

**Widget placement:** Bottom-right corner, every page. Custom avatar: her logo or a warm illustrated icon (not a generic robot). Opens as a slide-up panel on mobile, floating window on desktop.

**Architecture:**

```
Client types message
→ POST /api/chat
→ Server validates (rate limiting: 20 messages per IP per hour)
→ Server builds messages array (system prompt + conversation history)
→ POST to Anthropic API
→ Stream response back to client (SSE or WebSocket)
→ Log conversation to chat_logs table
→ Flag unanswered queries (confidence < threshold)
```

**System Prompt (full):**

```
You are the virtual assistant for [TECHNICIAN_NAME], a professional lash, nail, and pedicure technician based in Lagos, Nigeria. Your name is "Plug" (Beauty Plug's assistant).

Your job is to help her clients get quick, accurate answers and feel confident about booking. You are warm, knowledgeable, and sound like a helpful friend who knows the studio inside out — not a corporate chatbot.

---

SERVICES AND PRICING:
[SERVICES_AND_PRICING_BLOCK — dynamically injected from CMS at request time]
Format: "Service Name: ₦X,XXX | Duration: X hours | Description: ..."

---

STUDIO POLICIES:
[POLICIES_BLOCK — dynamically injected from admin settings]
Includes: deposit %, cancellation policy, working hours, studio location/area, contact details

---

FAQ KNOWLEDGE BASE:
[FAQ_BLOCK — dynamically injected from FAQ CMS entries marked active: true]

---

BEHAVIOUR RULES:
1. NEVER invent information. If it's not in the knowledge base above, say you don't have that detail and offer WhatsApp.
2. NEVER make up availability. For "are you free Friday?" always say: "I can't check live availability, but you can see all open slots here: [BOOKING_URL]"
3. Sound like her brand — warm, confident, Lagos-based. Use "we" when referring to the studio.
4. Keep responses concise — 2–4 sentences unless the question genuinely requires more.
5. Always end with a clear next step (booking link, WhatsApp link, or another question answered).
6. If a client seems frustrated, acknowledge it warmly before answering.
7. Do not discuss competitors or compare services to other technicians.
8. Do not accept booking requests in the chat — direct all bookings to [BOOKING_URL].
9. If asked about something completely unrelated to beauty services, politely redirect.
10. If asked "Are you a robot / AI?", answer honestly: "I'm an AI assistant for [TECHNICIAN_NAME] — but she's the real magic behind everything. Anything I can't help with, she'll handle personally on WhatsApp."

ESCALATION TRIGGER:
If the question cannot be answered from the knowledge base, end with:
"For anything I'm not sure about, [TECHNICIAN_NAME] is just a message away 👋 [WHATSAPP_LINK]"

BOOKING CTA:
When relevant, include: "Ready to book? Grab your slot here → [BOOKING_URL]"
```

**Dynamic injection:**
At every API call, the server fetches current services, pricing, and FAQ entries from the database and injects them into the system prompt. This ensures the AI is always up to date when she changes prices or adds services.

**Conversation storage:**

```sql
chat_conversations table:
- id (uuid)
- session_id (uuid — anonymous, cookie-based)
- created_at (timestamp)
- last_message_at (timestamp)

chat_messages table:
- id (uuid)
- conversation_id (uuid, FK)
- role (enum: user | assistant)
- content (text)
- flagged_unanswered (boolean, default false)
- created_at (timestamp)
```

**Flagging logic:** If the assistant's response contains "I'm not sure", "I don't have that", or similar uncertainty phrases → set `flagged_unanswered: true` on the message. These appear in admin dashboard under "Unanswered questions."

**Rate limiting:** 20 messages per IP per hour. If exceeded: "You've sent a lot of messages! For quicker help, reach us on WhatsApp: [link]"

---

### 6.2 Style Quiz — "Find Your Perfect Look"

**What it does:** A 5-question interactive quiz that recommends the ideal service for the visitor. Captures their email before showing results. Results include a personalised explanation, a photo example, and a "Book this look" CTA. Available as a standalone shareable page at `/quiz`.

**Three quiz variants:**
- Lash quiz (default entry)
- Nail quiz
- Pedicure quiz

Client selects which quiz to take at the start (or the quiz is pre-selected if linked from a specific page).

#### Quiz Questions — Lash Variant

**Q1 — Lifestyle**
"How would you describe your daily routine?"
- A: Pretty low-key — comfort is everything
- B: Mix of casual and going out
- C: Always on the go, looking polished
- D: Full glam is my default

**Q2 — Occasion**
"What's the main reason you're getting lashes?"
- A: I want a natural everyday look
- B: I want to look put-together without much effort
- C: A special occasion or event
- D: I just love dramatic lashes

**Q3 — Maintenance tolerance**
"How often are you willing to come in for fills?"
- A: Monthly or less
- B: Every 3 weeks is fine
- C: Every 2–3 weeks no problem
- D: I'll come in whenever they need it

**Q4 — Desired look**
"When you picture your ideal lashes, they look..."
- A: Subtle — you can tell but it's not obvious
- B: Natural but fuller than mine
- C: Noticeable and polished
- D: Full, dramatic, unmissable

**Q5 — Budget**
"Your budget for lashes is..."
- A: ₦15,000–₦25,000
- B: ₦25,000–₦35,000
- C: ₦35,000–₦50,000
- D: Whatever it takes for the perfect set

#### Quiz Questions — Nail Variant

**Q1 — Lifestyle**
"How hard are your nails put to work day-to-day?"
- A: Very — typing, cooking, active hands
- B: Moderate
- C: Mostly light work
- D: I'm very careful with them

**Q2 — Desired finish**
"What's your go-to nail vibe?"
- A: Clean, natural, sheer
- B: Solid colour, classic
- C: Textured or patterned
- D: Nail art, designs, maximalist

**Q3 — Length preference**
"How long do you like your nails?"
- A: Short / natural length
- B: Medium
- C: Long
- D: Extra long / coffin / stiletto

**Q4 — Durability**
"How long do you want your nails to last?"
- A: 1–2 weeks
- B: 2–3 weeks
- C: 3–4 weeks
- D: As long as possible

**Q5 — Budget**
"Your nail budget is..."
- A: Under ₦10,000
- B: ₦10,000–₦20,000
- C: ₦20,000–₦35,000
- D: ₦35,000+

#### Quiz Flow

```
1. Quiz variant selection (Lash / Nail / Pedicure)
2. Question 1 → 2 → 3 → 4 → 5 (progress bar shown)
3. Email capture screen:
   - Headline: "Your perfect look is ready!"
   - Subtext: "Enter your email to see your personalised recommendation"
   - Email input + "Show my results" button
   - Small print: "We'll also send you occasional tips and offers. Unsubscribe any time."
4. Results page (generated via Claude API)
5. Email with results + booking link sent to captured address
```

#### Claude API Call for Quiz Results

**Input (POST /api/quiz/results):**

```json
{
  "quiz_type": "lash",
  "answers": {
    "q1": "B",
    "q2": "B",
    "q3": "B",
    "q4": "C",
    "q5": "B"
  },
  "available_services": [/* injected from CMS */]
}
```

**Prompt to Claude:**

```
You are a beauty expert assistant for [TECHNICIAN_NAME], a lash, nail, and pedicure technician.

A client has completed a quiz. Based on their answers, recommend the most suitable service from the list provided.

QUIZ TYPE: {quiz_type}

CLIENT ANSWERS:
Q1 (Lifestyle): {q1_answer_text}
Q2 (Occasion): {q2_answer_text}
Q3 (Maintenance tolerance): {q3_answer_text}
Q4 (Desired look): {q4_answer_text}
Q5 (Budget): {q5_answer_text}

AVAILABLE SERVICES (only recommend from this list):
{services_json}

Respond ONLY in valid JSON — no markdown, no preamble, no explanation outside the JSON:

{
  "recommended_service_id": "service-slug",
  "recommended_service_name": "Service Name",
  "why": "2–3 sentence personalised explanation of why this suits them, written warmly in second person (you/your)",
  "maintenance_note": "One sentence on how often they'll need to come back",
  "price_display": "from ₦XX,XXX",
  "secondary_suggestion_id": "service-slug",
  "secondary_suggestion_name": "Service Name",
  "secondary_why": "One sentence on why they might consider this as an alternative"
}
```

**Expected output:**

```json
{
  "recommended_service_id": "hybrid-lash-set",
  "recommended_service_name": "Hybrid Lash Set",
  "why": "Based on your mix of casual and glam and your preference for a polished, noticeable look, hybrid lashes will give you that gorgeous fullness without feeling over the top. They're perfect for your lifestyle — effortlessly put-together, every day.",
  "maintenance_note": "You'll want to come in for a fill every 3 weeks to keep them looking their best.",
  "price_display": "from ₦28,000",
  "secondary_suggestion_id": "volume-lash-set",
  "secondary_suggestion_name": "Volume Lash Set",
  "secondary_why": "If you ever want to level up for a special occasion, our volume set gives you that extra drama."
}
```

**Results page UI:**

```
YOUR PERFECT MATCH
─────────────────
[Service Name — large heading]

[Portfolio photo of that service type]

[Why text — 2–3 sentences]

Maintenance: [maintenance_note]
Price: [price_display]

[Book this look →] (pre-fills booking form with service)

─────────────────
Also consider: [Secondary suggestion name]
[secondary_why]
[Explore this →]
```

**Email sent to client:**
- Subject: "Your beauty match is here ✨"
- Body: results summary + booking link
- Subscribed to `quiz-leads` tag in email list

---

### 6.3 Smart Rebooking Nudges

**What it does:** After an appointment is marked complete, the system calculates the ideal rebook window per service type and automatically sends a personalised, conversational SMS/WhatsApp message at the right time. Runs entirely on autopilot.

#### Rebook Timing by Service

| Service Category | Nudge Sent After | Message Tone |
|---|---|---|
| Lash fill | 18 days | Friendly reminder |
| Full lash set | 25 days | Soft suggestion |
| Gel nails | 16 days | Casual check-in |
| Acrylic full set | 20 days | Friendly prompt |
| Acrylic fill | 14 days | Quick nudge |
| Pedicure | 28 days | Relaxed suggestion |
| Classic lash set | 20 days | Gentle reminder |
| Volume lash set | 22 days | Enthusiastic |

All timings configurable per service in admin settings.

#### Architecture

```
Appointment marked "Complete" in admin
→ Write to rebook_queue table:
  - client_id, service_id, appointment_date, send_at (= completion_date + rebook_days)
→ Cron job runs every hour
  → Queries rebook_queue WHERE send_at <= NOW() AND sent = false
  → For each due record:
    → Fetch client name, service name, booking URL
    → POST to Claude API to generate message
    → Send via Termii (SMS) or WhatsApp Business API
    → Mark sent = true, sent_at = NOW()
    → Log to rebook_messages table
```

#### Claude Prompt for Rebooking Message

```
Generate a warm, casual WhatsApp or SMS message for a beauty technician to send to a client reminding them to rebook.

Details:
- Client first name: {first_name}
- Service they last had: {service_name}
- Days since their appointment: {days_since}
- Technician name: {technician_name}
- Booking link: {booking_url}

Rules:
- Sound like a text from a friendly person, not a business broadcast
- Reference the specific service naturally
- Include the booking link
- Maximum 3 sentences total
- Do not use more than one emoji (optional, only if it feels natural)
- Do not start with "Hi" — vary the opening
- Return the message text ONLY — no quotes, no labels, no explanation

Example output style:
"Your [service] from a few weeks ago is probably ready for some love, [Name]! Whenever you're ready to book your next appointment: [link] 🌸"
```

**Message variants:** Generate 5 variants per service type and store in `rebook_message_templates`. Rotate through them so returning clients don't receive the same message every time.

**Opt-out handling:**
- Every message ends with: "Reply STOP to opt out of reminders"
- If client replies STOP: set `rebook_opted_out: true` on client record, never send again
- Opt-out flag checked before every rebook message

---

### 6.4 AI Caption Generator

**What it does:** When she uploads a new portfolio photo via CMS, the AI generates a ready-to-post Instagram caption, hashtag set, alt text for accessibility, and a short on-site photo description — all in her brand voice. One-click copy to clipboard per output.

#### Trigger

Triggered on photo upload in CMS. She fills in a brief upload form:

| Field | Type | Required |
|---|---|---|
| Service name | text | yes |
| Technique | text | yes |
| Products used | text | no |
| Special notes | text | no |
| Category | select: Lash / Nail / Pedicure | yes |

On form submit + photo upload → POST to `/api/captions/generate`

#### Claude Prompt

```
You are a social media and content assistant for [TECHNICIAN_NAME], a Lagos-based beauty technician specialising in lash extensions, nails, and pedicures.

Generate four content pieces for a new portfolio photo she's uploading.

PHOTO DETAILS:
Service: {service_name}
Technique: {technique}
Products used: {products}
Additional notes: {notes}
Category: {category}

BRAND VOICE: Warm, confident, proud of her craft, Lagos-based professional. Never generic. Sounds like a real person, not a brand account.

Respond in valid JSON only:

{
  "instagram_caption": "2–3 sentences about the work, ending with a soft booking CTA. Include [BOOKING_LINK] placeholder.",
  "hashtags": "15–20 relevant hashtags as a single string. Mix of broad (#lashextensions), niche (#wispylashes), and location (#lagoslashes #abuja). No # on the first word.",
  "alt_text": "Descriptive accessibility alt text for the image. Describe what is literally visible. 1 sentence.",
  "site_caption": "Short 1-line description for the website lightbox. Service name + technique. Max 60 chars."
}
```

**Expected output:**

```json
{
  "instagram_caption": "Wispy hybrid set on this beauty — the perfect balance of natural and full. These lasted her 3 weeks before her fill 🤍 Book your set: [BOOKING_LINK]",
  "hashtags": "#lashextensions #lagosnails #hybridlashes #wispylashes #lashtech #lagosbeauty #lagosgirl #beautybloggerlagos #lashesofinstagram #lagoslashes #naijagirl #lashgoals #lashartist #lashlove #beautypluglagos",
  "alt_text": "Close-up of wispy hybrid lash extensions on dark eyes, showing a natural fanned curl with medium volume.",
  "site_caption": "Wispy Hybrid Lash Set — Stacy Lash J Curl"
}
```

**UI in CMS:**
After generation, four cards shown side by side with individual "Copy" buttons. She reviews, edits if needed, then saves. Photo is saved to portfolio with all four fields stored in the database.

---

## 7. Automated Messaging Sequences

All messages sent via:
- **Email:** Resend or Nodemailer with custom SMTP
- **WhatsApp:** WhatsApp Business API (Meta) or Twilio WhatsApp
- **SMS fallback:** Termii (Nigerian carrier coverage)

Delivery preference per client: stored in `clients.preferred_contact` (enum: whatsapp | sms | email | all)

---

### 7.1 Booking Confirmation Email

**Trigger:** Immediately on successful deposit payment

**Subject:** "You're booked! 🎉 [Service Name] on [Date]"

**Body:**
```
Hi [First Name],

You're all set! Here's your appointment summary:

📅 Date: [Day, Date Month Year]
⏰ Time: [Time] WAT
💅 Service: [Service Name]
📍 Location: [Studio Area / Address]
💰 Deposit paid: ₦[amount]
💰 Balance due at appointment: ₦[amount]

What to do before you arrive:
[Service-specific prep instructions — e.g. for lashes: "Come with clean, makeup-free eyes. Avoid waterproof mascara the day before."]

Need to reschedule?
You can reschedule for free up to 24 hours before your appointment:
[Reschedule Link]

Cancellation policy:
[Brief policy — e.g. "Full refund if cancelled 48+ hours before. No refund under 24 hours."]

Can't wait to see you!
[Technician Name]
[WhatsApp Link] | [Instagram Link]
```

---

### 7.2 Client Reminder — 48 Hours Before

**Trigger:** Cron job, 48 hours before `appointment_start_time`

**WhatsApp/SMS:**
```
Hey [First Name]! 👋 Just a reminder that your [Service Name] is on [Day] at [Time]. 

Come with [prep instruction — e.g. clean, dry nails / makeup-free eyes].

Need to reschedule? You have until [24h deadline time] to do it for free: [Reschedule Link]

See you soon! — [Technician Name]
```

---

### 7.3 Client Reminder — 2 Hours Before

**Trigger:** Cron job, 2 hours before `appointment_start_time`

**WhatsApp/SMS:**
```
You're up in 2 hours, [First Name]! 🌟

[Service Name] at [Time] — here's how to find me: [Maps Link / Address]

If anything comes up, WhatsApp me directly: [Technician WhatsApp]
```

---

### 7.4 Technician Notification — New Booking

**Trigger:** Immediately on confirmed booking

**WhatsApp to her:**
```
📲 New booking!

Client: [Full Name]
Phone: [Phone Number]
Service: [Service Name]
Date: [Date] at [Time]
Deposit: ₦[amount] received

New client: [Yes/No]
[View in dashboard → DASHBOARD_LINK]
```

---

### 7.5 Post-Appointment Review Request

**Trigger:** 2 hours after `appointment_end_time` (calculated from start time + service duration)

**WhatsApp/SMS:**
```
Hey [First Name]! Hope you're loving your [service]! 💕

It would mean the world to [Technician Name] if you left a quick review — it only takes a minute:
[Review Link]

Thank you so much! ✨
```

---

### 7.6 Rebooking Nudge

See Section 6.3.

---

## 8. Admin Dashboard

### 8.1 Access

- URL: `/admin`
- Authentication: email + password login (bcrypt hashed passwords, JWT sessions)
- Session expiry: 7 days with remember-me
- Password reset via email link

### 8.2 Dashboard Home

Stats summary (current week):
- Appointments confirmed: `N`
- Revenue collected (deposits): `₦X,XXX`
- New clients this week: `N`
- Pending reviews: `N`

Quick actions:
- Block a date
- Add a walk-in booking
- View today's schedule

### 8.3 Calendar View

- Day / Week toggle
- Each booking card shows: client name · service · time · deposit status · phone number
- Click booking card → expand to full details:
  - All client info
  - Intake form responses (if first visit)
  - Notes field (private, only visible to her)
  - Actions: Mark Complete · Reschedule · Cancel · Add note
- "Block time" button: select date range + private reason

### 8.4 Bookings List

Table view: all bookings, filterable by:
- Date range
- Service
- Status (confirmed / completed / cancelled / no-show)
- New client (yes/no)

Export to CSV.

### 8.5 Clients

Client list with:
- Name · Phone · Email · Total visits · Total spend · Last visit · Services received
- Click client → full history
- "Send rebooking message" manual trigger
- "Send birthday message" (if birthday stored)

### 8.6 Unanswered Chat Questions

Table of all chat queries flagged as `flagged_unanswered: true`:
- Question text
- Date asked
- Actions: "Add to FAQ" (pre-fills FAQ create form) · Dismiss

### 8.7 FAQ Manager

List of all FAQ entries. Add / Edit / Delete. Toggle active/inactive. Drag to reorder within group.

### 8.8 Settings

- Working hours (per day of week, start + end time)
- Buffer between appointments
- Max bookings per day
- Deposit percentages per service
- Cancellation policy text (shown on booking page and in confirmation emails)
- Rebook timing per service
- Notification preferences (WhatsApp number for her notifications)
- Paystack API keys (server-side only, never exposed to client)

---

## 9. Content Plan

### 9.1 Content Required Before Launch

| Content Item | Owner | Notes |
|---|---|---|
| All services with names, descriptions, prices, durations | She provides | Input via CMS setup session |
| FAQ bank — 30 questions with answers | She provides answers, AI can draft | See Section 4.6 for question list |
| About page copy — her story, training, certifications | She provides raw notes, copywriter/AI drafts | ~450–600 words |
| Portfolio photos — organised by category | She provides | Already available; sort into Lash / Nail / Pedicure folders and tag each |
| 1–2 professional portrait photos | She provides | Used on About page and hero section |
| Testimonials — 10+ written | She collects from existing clients | Screenshot DMs with permission if needed |
| Studio/location details | She provides | Address or area, Google Maps link, parking note |
| Deposit % and cancellation policy — finalised | She decides | Must be final before booking system goes live |
| Her Instagram handle and WhatsApp number | She provides | Used across site |
| Brands/products she uses and trusts | She provides | For About page credentials section |

### 9.2 Ongoing Content (Post-Launch)

| Task | Frequency | How |
|---|---|---|
| Upload new portfolio photos | After each notable appointment | CMS from phone, AI generates captions |
| Add new FAQ entries | As new questions come in | Admin dashboard → FAQ manager |
| Update prices | As needed | CMS settings page |
| Pin new featured reviews | Monthly | Admin → Testimonials |
| Add seasonal promotions | Per season | Admin → Settings → Active promotions |

### 9.3 SEO Targets

| Target Keyword | Target Page | Priority |
|---|---|---|
| lash technician Lagos | Homepage + About | High |
| lash extensions Lagos | Services page | High |
| gel nails Lagos | Services page | High |
| pedicure Lagos | Services page | Medium |
| nail technician Lagos | Services page | High |
| lash extensions aftercare | Aftercare hub (Phase 2) | Medium |
| [her name] beauty | Homepage | High (branded) |
| best nail technician [area] | Local SEO (Google Business Profile) | High |

**Technical SEO requirements:**
- Meta title and description per page (configurable in CMS)
- Open Graph tags for social sharing (auto-generated from page title + hero image)
- Sitemap.xml auto-generated
- Robots.txt configured
- Google Search Console verified
- Google Business Profile created, verified, and linked to website

---

## 10. Design Specification

### 10.1 Aesthetic Direction

**Warm luxury editorial.** Her photos are the design — everything else supports them without competing. The site should feel like a high-end beauty magazine, not a generic service website template.

Reference mood: Think Nigerian fashion editorial meets high-end salon branding. Warm, confident, feminine, premium.

### 10.2 Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero / Page display | Cormorant Garamond or Playfair Display | 48–80px (scales down) | 500–600 |
| Section headings | Cormorant Garamond | 28–36px | 500 |
| Body text | DM Sans or Satoshi | 15–16px | 400 |
| UI labels, captions | DM Sans or Satoshi | 12–13px | 400–500 |
| Buttons | DM Sans or Satoshi | 14px | 500 |

### 10.3 Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Cream base | `#FAF7F4` | Page background, light sections |
| Near-black | `#1A1614` | Primary text, dark sections background |
| Dusty rose | `#C4788A` | Primary accent, CTA buttons, highlights |
| Muted gold | `#B89A6E` | Secondary accent, credential section |
| Warm grey | `#8A8480` | Secondary text, borders |
| White | `#FFFFFF` | Cards, overlays |

All values configurable to match her existing brand if different.

### 10.4 Layout Principles

- **Mobile-first:** Design for 375px screen first. 80%+ of traffic comes from Instagram on mobile.
- **Generous white space:** Sections breathe. Never cramped.
- **Photography-led:** Every major section anchored by real photos.
- **Single strong CTA per section:** Never two competing primary buttons on the same screen.

### 10.5 Breakpoints

| Breakpoint | Width | Layout behaviour |
|---|---|---|
| Mobile | 375px – 767px | Single column, stacked. Bottom sticky booking bar. |
| Tablet | 768px – 1199px | 2-column grid for cards. Calendar day scroll. |
| Desktop | 1200px+ | Full layout. Hover states active. Lightbox enabled. |

### 10.6 Signature Design Details

These are non-negotiable design decisions that elevate the site from template to brand:

1. **Custom cursor (desktop only):** A small sparkle / diamond shape replaces the default cursor. CSS-only, no performance impact.
2. **Scroll-triggered gallery reveal:** Portfolio images fade in and rise up in a staggered sequence as they scroll into view. CSS `@keyframes` + Intersection Observer.
3. **Services card interaction:** On hover (desktop) / tap (mobile): card expands to reveal price and "Book now" button. No new page or modal — inline expand.
4. **Hero text animation on load:** Her name fades in with a slow, elegant stagger. Each word appears 150ms after the previous.
5. **Before/after slider:** Draggable horizontal divider. Touch-friendly on mobile. Uses CSS clip-path for performance.
6. **Booking confirmation confetti:** On the `/book/confirm` page, a burst of small geometric shapes (in her brand colours) animates for 2 seconds on page load. Library: `canvas-confetti` (2KB).
7. **404 page on-brand:** Custom 404 with copy: "Looks like this page got a bad set. Let's start fresh." + "Back to home" and "Book an appointment" buttons.
8. **Chat widget avatar:** Not a generic robot icon. Uses her logo or a custom illustrated feminine avatar consistent with her brand.

### 10.7 Animation Rules

- All animations: `prefers-reduced-motion` media query respected — disable animations for users who opt out
- Entrance animations: opacity 0 → 1 + translateY 20px → 0, duration 0.4s, ease-out
- Hover transitions: 0.2s ease
- No auto-playing video with sound
- No infinite-loop animations on the main content area (only loading spinners)

### 10.8 Accessibility

- Minimum contrast ratio: 4.5:1 for all text (WCAG AA)
- All images have alt text (AI-generated for portfolio uploads, manual for others)
- All interactive elements keyboard-navigable
- Focus states visible on all inputs and buttons
- Form errors announced to screen readers via `aria-live`

---

## 11. Database Schema

### 11.1 Core Tables

```sql
-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  preferred_contact ENUM('whatsapp', 'sms', 'email', 'all') DEFAULT 'whatsapp',
  rebook_opted_out BOOLEAN DEFAULT false,
  marketing_opted_in BOOLEAN DEFAULT false,
  birthday DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  category ENUM('lash', 'nail', 'pedicure') NOT NULL,
  description VARCHAR(300),
  price INTEGER NOT NULL, -- in kobo (NGN smallest unit)
  price_display VARCHAR(50),
  duration_minutes INTEGER NOT NULL,
  deposit_percentage INTEGER DEFAULT 40,
  rebook_days INTEGER,
  active BOOLEAN DEFAULT true,
  booking_slug VARCHAR(100) UNIQUE,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add-ons
CREATE TABLE addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  price INTEGER NOT NULL,
  compatible_categories VARCHAR[] DEFAULT ARRAY['lash','nail','pedicure'],
  active BOOLEAN DEFAULT true
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref VARCHAR(12) NOT NULL UNIQUE, -- e.g. "BP-2025-001"
  client_id UUID REFERENCES clients(id),
  service_id UUID REFERENCES services(id),
  addon_ids UUID[],
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status ENUM('pending','confirmed','completed','cancelled','no_show') DEFAULT 'pending',
  deposit_amount INTEGER NOT NULL, -- kobo
  balance_amount INTEGER NOT NULL, -- kobo
  paystack_reference VARCHAR(100),
  paystack_status VARCHAR(50),
  reschedule_token VARCHAR(100),
  reschedule_token_expires TIMESTAMP,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP,
  completed_at TIMESTAMP,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Slot locks
CREATE TABLE slot_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id),
  start_time TIMESTAMP NOT NULL,
  locked_by_session VARCHAR(100),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Intake forms
CREATE TABLE intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  client_id UUID REFERENCES clients(id),
  allergies TEXT,
  previous_lashes BOOLEAN,
  last_lash_removal DATE,
  nail_condition ENUM('normal','bitten','damaged','existing_product'),
  additional_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blocked dates
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category ENUM('lash','nail','pedicure') NOT NULL,
  service_name VARCHAR(150),
  technique VARCHAR(150),
  products_used TEXT,
  instagram_caption TEXT,
  hashtags TEXT,
  alt_text TEXT,
  site_caption VARCHAR(100),
  image_url VARCHAR(500) NOT NULL,
  before_image_url VARCHAR(500),
  is_before_after BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  instagram_post_id VARCHAR(100),
  display_order INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  client_id UUID REFERENCES clients(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photo_url VARCHAR(500),
  display_name VARCHAR(100),
  service_received VARCHAR(150),
  consent_given BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  source ENUM('website','google') DEFAULT 'website',
  google_review_id VARCHAR(100),
  technician_response TEXT,
  response_approved BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- FAQ entries
CREATE TABLE faq_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  group_name VARCHAR(100),
  display_order INTEGER,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat logs
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id),
  role ENUM('user','assistant') NOT NULL,
  content TEXT NOT NULL,
  flagged_unanswered BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rebook queue
CREATE TABLE rebook_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  booking_id UUID REFERENCES bookings(id),
  service_id UUID REFERENCES services(id),
  send_at TIMESTAMP NOT NULL,
  sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP,
  message_sent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz leads
CREATE TABLE quiz_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  quiz_type ENUM('lash','nail','pedicure'),
  answers JSONB,
  recommended_service_id UUID REFERENCES services(id),
  result_json JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email subscribers
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  source ENUM('homepage','quiz','booking','referral') DEFAULT 'homepage',
  discount_code_sent VARCHAR(50),
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 12. API Integrations

### 12.1 Paystack

**Purpose:** Deposit payment processing

**Integration points:**
- `POST /api/payments/initialize` → Paystack Initialize Transaction
- Paystack inline embed on booking Step 4 (not redirect)
- `POST /api/webhooks/paystack` → Paystack webhook for `charge.success` event
- Verify webhook signature using `x-paystack-signature` header
- On `charge.success`: update booking status, trigger confirmation messages

**Config (environment variables):**
```
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_WEBHOOK_SECRET=xxx
```

---

### 12.2 Termii (SMS)

**Purpose:** SMS delivery for clients without WhatsApp

**Integration points:**
- `POST https://api.ng.termii.com/api/sms/send`
- Used for: booking confirmation, 48h reminder, 2h reminder, review request, rebooking nudge

**Config:**
```
TERMII_API_KEY=xxx
TERMII_SENDER_ID=BEAUTYPLUG
```

---

### 12.3 WhatsApp Business API

**Purpose:** WhatsApp message delivery (preferred channel)

**Options (in order of preference):**
1. Meta Business API (direct) — requires business verification
2. Twilio WhatsApp — faster setup, slightly higher cost
3. Wati.io — no-code WhatsApp API wrapper for Nigeria

**Template messages** (pre-approved by Meta):
- Booking confirmation template
- Reminder template
- Review request template
- Rebooking nudge template (generic — personalised text injected)

---

### 12.4 Anthropic Claude API

**Purpose:** AI chat assistant, style quiz results, rebooking message generation, caption generation

**Model:** `claude-sonnet-4-20250514`

**Config:**
```
ANTHROPIC_API_KEY=sk-ant-xxx
```

**API endpoints used:**
- `POST https://api.anthropic.com/v1/messages`
- Streaming enabled for chat assistant (`stream: true`)
- Non-streaming for quiz results, rebooking messages, captions

**Rate limiting (application-level):**
- Chat: 20 requests per IP per hour
- Quiz: 10 requests per IP per hour
- Captions: unlimited (admin-only)
- Rebooking: backend cron, no user rate limit needed

---

### 12.5 Cloudinary

**Purpose:** Image hosting, optimisation, and delivery

**Usage:**
- Portfolio photo uploads (from CMS) → stored in Cloudinary
- Auto-format: WebP served to supporting browsers, JPEG fallback
- Auto-quality: Cloudinary `q_auto` for optimal compression
- Responsive images: `w_auto,c_scale` for correct sizes per breakpoint
- Before/after pairs stored as separate assets, linked in database

---

### 12.6 Resend (Email)

**Purpose:** Transactional email delivery

**Emails sent via Resend:**
- Booking confirmation
- 48h reminder (if client preferred_contact = email)
- Review request
- Quiz results email
- Welcome email for new subscribers

**Template engine:** React Email (JSX-based email templates)

---

### 12.7 Mailchimp / Brevo

**Purpose:** Email marketing list management

**Lists/tags:**
- `website-signup` — homepage email capture
- `quiz-leads` — quiz completions
- `clients` — all clients (added post-booking)
- `discount-claimed` — first-appointment discount used

---

### 12.8 Instagram Basic Display API

**Purpose:** Auto-pulling Instagram posts into the site's portfolio and homepage feed

**Scope required:** `user_profile`, `user_media`

**Caching:** Instagram API has rate limits. Cache API responses for 1 hour server-side. Store in Redis or database.

---

### 12.9 Google Places API

**Purpose:** Pull Google Reviews for testimonials page

**Endpoints:**
- `GET https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews,rating`
- Fetch daily, cache results, display on testimonials page

---

## 13. Build Roadmap

### Week 1 — Discovery & Setup

**Goals:** All pre-development decisions made. Environment ready.

**Deliverables:**
- [ ] Brand colours + typography confirmed
- [ ] Domain registered and DNS configured
- [ ] Hosting/deployment environment configured
- [ ] Database provisioned
- [ ] All services, prices, and durations documented (she provides)
- [ ] FAQ bank drafted — 30 questions minimum
- [ ] CMS selected and configured
- [ ] Paystack account activated and test keys obtained
- [ ] Anthropic API key obtained
- [ ] Termii / WhatsApp integration account created
- [ ] Portfolio photos sorted into categories and tagged

---

### Weeks 2–3 — Design

**Goals:** Full visual design in Figma (or equivalent) signed off before any code written.

**Deliverables:**
- [ ] Design system: colours, typography, spacing, component library
- [ ] High-fidelity mockups: Home, Portfolio, Services, Booking (all 4 steps)
- [ ] Mobile and desktop variants for all pages
- [ ] Lightbox, before/after slider, booking confirmation page designed
- [ ] Admin dashboard wireframes
- [ ] Design review + sign-off

---

### Weeks 4–5 — Core Build (Revenue-Critical Pages)

**Goals:** The four pages that generate bookings are live and functional.

**Deliverables:**
- [ ] Project scaffolding, routing, CMS connected
- [ ] Homepage built (all 7 sections)
- [ ] Portfolio page with filtering, lightbox, and before/after slider
- [ ] Services page with all cards, add-ons, comparison table
- [ ] Booking flow — all 4 steps, Paystack integration, slot locking
- [ ] Confirmation page with confetti animation
- [ ] Admin calendar dashboard (basic)
- [ ] Automated confirmation email + WhatsApp sending
- [ ] End-to-end booking test: visit site → book → pay → receive confirmation

---

### Week 6 — Trust Pages

**Goals:** All seven core pages live. Review and FAQ systems active.

**Deliverables:**
- [ ] Testimonials page — video + written reviews + Google Reviews
- [ ] Post-appointment review request automation
- [ ] FAQs page — accordion + groups
- [ ] About page with all sections
- [ ] 48h and 2h reminder automations active
- [ ] Admin bookings list and client management
- [ ] Full mobile responsiveness check on all pages

---

### Weeks 7–8 — AI Layer

**Goals:** All 4 AI features integrated and tested.

**Deliverables:**
- [ ] AI chat widget built and deployed on all pages
- [ ] Chat system prompt configured with live services, prices, FAQ data
- [ ] 10 edge-case query tests passing (see Section 6.1)
- [ ] Style quiz — all 3 variants (lash, nail, pedicure) built
- [ ] Quiz email capture + email send working
- [ ] Smart rebooking cron job built and tested
- [ ] Rebook message generation tested for 5 service types
- [ ] AI caption generator in CMS upload flow
- [ ] Unanswered chat questions appearing in admin dashboard

---

### Weeks 9–10 — QA, SEO & Launch

**Goals:** Site is production-ready. Launched.

**Deliverables:**
- [ ] Full QA: every user flow tested on 3 devices (iPhone, Android, desktop)
- [ ] Accessibility audit (WCAG AA)
- [ ] Page speed audit — LCP under 2.5s on mobile
- [ ] SEO: meta tags, sitemap.xml, robots.txt, Open Graph
- [ ] Google Search Console verified
- [ ] Google Business Profile created and linked
- [ ] SSL certificate active
- [ ] All environment variables in production (never in code)
- [ ] Error logging (Sentry or equivalent) configured
- [ ] Soft launch to 10–15 existing clients for feedback
- [ ] Any feedback-driven fixes applied
- [ ] Public launch — Instagram story announcement

---

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Content bottleneck** — services list, FAQ, About copy not ready before build begins | High | High | Content collection starts Week 1 in parallel with design. Shared Google Doc template provided. AI can draft FAQ answers from a 30-minute recorded voice note from her. Hard deadline: all content submitted before Week 4 build starts. |
| **AI chat gives wrong price or policy** | Medium | High | System prompt is rebuilt from live CMS data on every API call — price changes propagate instantly. Weekly manual test of 10 common queries. Chat states clearly it's an assistant and offers WhatsApp for anything uncertain. |
| **Double booking on same slot** | Low | High | Atomic database transaction with row-level lock on slot write. Slot lock expires after 10 minutes. If two requests arrive simultaneously, only first succeeds. Second client shown alternatives immediately. |
| **Paystack webhook failures** | Low | High | Webhook endpoint has idempotency key check (Paystack reference) — duplicate events do not double-confirm bookings. Webhook failures logged to error monitoring. Retry logic on Paystack side handles transient failures. |
| **SMS/WhatsApp delivery failures** | Medium | Medium | Email as mandatory fallback for every WhatsApp/SMS message. Delivery status logged. She receives daily summary of any failed sends in admin dashboard. |
| **She stops updating the site** | Medium | Medium | CMS designed for phone-first use in under 2 minutes per update. AI caption generator removes friction from photo uploads. Monthly automated email to her: "Here's your site summary — add new photos or update prices." |
| **Instagram API changes or revocation** | Low | Low | Instagram feed uses hourly cache — temporary API issues don't break the site. Fallback: static recent photos if API fails. |
| **Client disputes deposit via bank** | Low | Medium | Cancellation policy shown and checkbox-acknowledged at booking. Policy included in confirmation email. Paystack dispute process documentation provided to her. |

---

## 15. Launch Checklist

The site is ready to go live when ALL of the following are true:

- [ ] A client can visit the site on an iPhone and complete a full booking (service → date → details → deposit) in under 3 minutes
- [ ] She receives a WhatsApp notification within 30 seconds of a test booking being confirmed
- [ ] The AI chat correctly answers all 30 FAQ bank questions without hallucinating prices or policies
- [ ] The style quiz completes for all 3 variants (lash, nail, pedicure), captures email, and sends a results email
- [ ] Automated reminders fire correctly at 48h and 2h before a test appointment
- [ ] Post-appointment review request sends 2h after marking a test appointment "Complete"
- [ ] Portfolio filter works on mobile (Lash / Nail / Pedicure / All)
- [ ] Lightbox opens, displays service info, and "Book this look" pre-fills the booking form
- [ ] Google PageSpeed Insights: LCP ≤ 2.5s on mobile
- [ ] SSL certificate active — all pages load on HTTPS, HTTP redirects to HTTPS
- [ ] All pages have unique meta titles and descriptions
- [ ] Google Business Profile live and website URL linked
- [ ] Admin dashboard shows bookings, clients, and unanswered chat questions correctly
- [ ] No broken images on portfolio page across all 3 filter categories
- [ ] 404 page displays correctly with redirect CTAs

---

## 16. Phase 2 Features

To be scoped and built after launch, informed by real user behaviour and feedback.

### 16.1 Aftercare Hub (`/aftercare`)

A dedicated page with care instructions per service:
- Lash extension aftercare (do's and don'ts, product recommendations)
- Gel nail aftercare
- Acrylic nail aftercare
- Pedicure maintenance tips

Shareable link per service sent automatically in post-appointment confirmation email. High SEO value for "lash aftercare" search queries.

### 16.2 Digital Gift Cards

- Purchase page: select amount (₦5,000 · ₦10,000 · ₦20,000 · ₦50,000 · custom)
- Recipient name and email entered at purchase
- Branded PDF voucher generated and emailed to recipient
- Unique code redeemable at booking checkout (applied to balance, not deposit)
- Expiry: configurable (default 12 months)
- Redeemed status tracked in database

### 16.3 Referral System

- Every client gets a unique referral link (e.g. `beautyplug.com/book?ref=amaka123`)
- New client books via referral link → both referrer and new client get a discount code
- Referral tracking: `referral_source` field on bookings table
- Dashboard: referral count and discount codes issued per client
- Configurable discount amount per referral

### 16.4 Birthday Discount Automation

- Birthday stored optionally during booking (client intake form or profile)
- 3 days before birthday: she receives a WhatsApp notification listing clients with upcoming birthdays
- Optional: automated birthday message to client with a discount code
- "Birthday clients" tag in client list

### 16.5 AI Review Response Drafts

- When a new review is submitted (1–3 stars specifically):
  - Claude API called with review text
  - Draft response generated in her brand voice
  - Stored as `technician_response` with `response_approved: false`
  - She sees draft in admin dashboard with "Approve & Publish" / "Edit" / "Discard" actions
- For 4–5 star reviews: optional — she can request a draft with one click

### 16.6 Analytics Dashboard

A simple analytics view in admin (no third-party required):
- Bookings by month (bar chart)
- Revenue by month (bar chart, deposits only)
- Most popular services (pie chart)
- New vs returning client ratio
- No-show rate
- Review score trend
- Top referral sources (Instagram / direct / Google / referral link)

---

## 17. Glossary

| Term | Definition |
|---|---|
| **WAT** | West Africa Time — UTC+1. All times on the site displayed in WAT. |
| **Deposit** | Partial upfront payment (% of service price) collected at booking to secure the slot. |
| **Balance** | Remaining service cost collected in-person at appointment. |
| **Slot lock** | 10-minute temporary reservation of a booking slot when a client enters checkout. |
| **Rebook nudge** | Automated SMS/WhatsApp message sent after a calculated interval post-appointment encouraging the client to rebook. |
| **Intake form** | First-visit questionnaire collecting health/preference details relevant to safe service delivery. |
| **CMS** | Content Management System — the admin interface she uses to update services, portfolio, and FAQ content without coding. |
| **FAB** | Floating Action Button — the sticky "Book Now" button fixed to the bottom of the screen on mobile. |
| **LCP** | Largest Contentful Paint — a Core Web Vitals metric measuring perceived load speed. Target: ≤ 2.5s. |
| **WCAG AA** | Web Content Accessibility Guidelines Level AA — the accessibility standard this site targets. |
| **NGN / ₦** | Nigerian Naira — all prices displayed and processed in NGN. |
| **Kobo** | Smallest unit of NGN (1/100 of a naira). All prices stored in the database in kobo to avoid floating point issues. |

---

*End of PRD — Beauty Plug Personal Brand Website v1.0*

*This document contains everything a developer, designer, and AI implementation partner needs to build this site from scratch. Reference section numbers when giving implementation instructions.*
