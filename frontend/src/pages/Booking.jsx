import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Lock,
  X,
} from "lucide-react";
import { getServices } from "../lib/content";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TIMES = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "07:30 PM",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatPrice(price) {
  return `NGN ${(price ?? 0).toLocaleString()}`;
}

function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function isSunday(year, month, day) {
  return new Date(year, month, day).getDay() === 0;
}

function isPast(year, month, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

function isToday(year, month, day) {
  const t = new Date();
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function BookingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-20">
        <Link
          to="/"
          className="font-headline text-3xl font-semibold tracking-tight text-primary-container"
        >
          ThePrettyPlug
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:text-primary-container"
        >
          <X size={16} />
          Cancel
        </Link>
      </nav>
    </header>
  );
}

function Progress({ step }) {
  const labels = ["Service", "Date & Time", "Details", "Payment"];
  return (
    <div className="mb-12 flex items-center justify-center gap-3 md:gap-5">
      {labels.map((label, index) => {
        const number = index + 1;
        const isComplete = step > number;
        const isActive = step === number;
        return (
          <div key={label} className="flex items-center gap-3 md:gap-5">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center border font-bold transition-colors ${
                  isActive || isComplete
                    ? "border-primary-container bg-primary-container text-on-primary"
                    : "border-outline-variant text-on-surface-variant opacity-50"
                }`}
              >
                {isComplete ? <Check size={18} /> : number}
              </div>
              <span
                className={`font-label text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  isActive || isComplete
                    ? "text-primary-container"
                    : "text-on-surface-variant opacity-50"
                }`}
              >
                {label}
              </span>
            </div>
            {index < labels.length - 1 ? (
              <div
                className={`h-px w-8 md:w-24 ${
                  step > number ? "bg-primary-container" : "bg-outline-variant"
                }`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Summary({ selectedService, selectedDateKey, selectedTime }) {
  const service = selectedService ?? { name: "Select a service", price: 0, duration: "—" };
  const dateDisplay = selectedDateKey
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(selectedDateKey + "T00:00:00"))
    : null;

  return (
    <aside className="border border-outline-variant/50 bg-surface p-6 shadow-2xl md:sticky md:top-28">
      <h2 className="mb-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        Your Booking
      </h2>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <span className="font-headline text-xl font-medium text-on-surface">
            {service.name}
          </span>
          <span className="shrink-0 font-bold text-primary-container">
            {formatPrice(service.price)}
          </span>
        </div>
        <div className="flex items-center gap-2 font-body text-sm text-on-surface-variant">
          <Clock size={16} />
          {service.duration_minutes ? `${service.duration_minutes} mins` : service.duration ?? "—"}
        </div>
        {dateDisplay && selectedTime ? (
          <div className="border-t border-outline-variant/30 pt-5">
            <div className="flex items-center gap-2 font-body text-sm font-bold text-secondary">
              <CalendarDays size={16} />
              {dateDisplay} at {selectedTime}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Calendar Component
// ---------------------------------------------------------------------------
function Calendar({ selectedDateKey, onSelect }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  // Prevent going back before current month
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const canGoPrev = viewYear > todayYear || (viewYear === todayYear && viewMonth > todayMonth);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Build grid: leading empty cells + day cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="border border-outline-variant/30 bg-surface-container-lowest p-6 md:p-8">
      {/* Month navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-headline text-xl font-medium text-on-surface">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-container"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {DAY_LABELS.map((d) => (
          <span
            key={d}
            className={`font-label text-[10px] font-bold uppercase tracking-[0.10em] py-1 ${
              d === "Sun" ? "text-red-400" : "text-on-surface-variant/60"
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const dateKey = toDateKey(viewYear, viewMonth, day);
          const disabled = isPast(viewYear, viewMonth, day) || isSunday(viewYear, viewMonth, day);
          const selected = dateKey === selectedDateKey;
          const todayMark = isToday(viewYear, viewMonth, day);

          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(dateKey)}
              className={`relative flex h-10 w-full items-center justify-center rounded font-body text-sm transition-colors
                ${disabled
                  ? "cursor-not-allowed text-on-surface-variant/25"
                  : selected
                    ? "bg-primary-container text-on-primary font-bold"
                    : "hover:bg-surface-container hover:text-primary-container"
                }
                ${todayMark && !selected ? "ring-1 ring-primary-container/40" : ""}
              `}
            >
              {day}
              {todayMark && !selected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-container" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-outline-variant/20 pt-4">
        <span className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
          <span className="h-2 w-2 rounded-full bg-primary-container" /> Selected
        </span>
        <span className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
          <span className="h-2 w-2 rounded-full ring-1 ring-primary-container/40" /> Today
        </span>
        <span className="flex items-center gap-2 font-label text-[10px] text-red-400">
          <span className="font-bold">S</span> Sundays closed
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Booking Page
// ---------------------------------------------------------------------------
export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [client, setClient] = useState({ name: "", email: "", phone: "", notes: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiServices, setApiServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data) setApiServices(data.filter((s) => s.is_active));
      })
      .finally(() => setServicesLoading(false));
  }, []);

  const deposit = useMemo(
    () => Math.ceil((selectedService?.price ?? 0) * 0.2),
    [selectedService]
  );

  function selectService(service) {
    setSelectedService(service);
    setTimeout(() => setStep(2), 250);
  }

  function updateClient(field, value) {
    setClient((c) => ({ ...c, [field]: value }));
  }

  const selectedDateDisplay = selectedDateKey
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      }).format(new Date(selectedDateKey + "T00:00:00"))
    : null;

  function completePayment() {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/book/confirm", {
        state: { service: selectedService, selectedDate: selectedDateDisplay, selectedTime, client, deposit },
      });
    }, 900);
  }

  return (
    <>
      <BookingHeader />
      <main className="mx-auto min-h-screen max-w-[1280px] px-5 pb-28 pt-12 md:px-20">
        <Progress step={step} />

        {/* ── Step 1: Service Selection ─────────────────────────────────── */}
        {step === 1 && (
          <section>
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Select Your Treatment
              </h1>
              <p className="mx-auto max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
                Luxury is in the details. Choose from our curated selection of premium beauty services.
              </p>
            </div>

            {servicesLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 animate-pulse rounded bg-surface-container-highest" />
                ))}
              </div>
            ) : apiServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <CalendarDays size={48} className="text-outline-variant/40" />
                <p className="mt-6 font-headline text-2xl text-on-surface">No services available</p>
                <p className="mt-2 font-body text-on-surface-variant">Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {apiServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => selectService(service)}
                    className={`flex min-h-[220px] flex-col justify-between border p-8 text-left transition-all hover:border-primary-container hover:shadow-md ${
                      service.is_featured
                        ? "border-primary-container bg-primary-container text-on-primary"
                        : "border-outline-variant/50 bg-surface-container-lowest"
                    }`}
                  >
                    <div>
                      <span className={`mb-3 block font-label text-[10px] font-bold uppercase tracking-[0.14em] ${
                        service.is_featured ? "text-on-primary/70" : "text-secondary"
                      }`}>
                        {service.category}
                        {service.is_featured ? " · Featured" : ""}
                      </span>
                      <h2 className="mb-2 font-headline text-2xl font-medium">{service.name}</h2>
                      <p className={`font-body text-sm leading-6 ${
                        service.is_featured ? "text-on-primary/80" : "text-on-surface-variant"
                      }`}>
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="font-bold">{formatPrice(service.price)}</span>
                        {service.duration_minutes && (
                          <span className={`ml-3 font-label text-xs ${
                            service.is_featured ? "text-on-primary/60" : "text-on-surface-variant"
                          }`}>
                            {service.duration_minutes} mins
                          </span>
                        )}
                      </div>
                      <ArrowRight size={18} className="shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Step 2: Date & Time ───────────────────────────────────────── */}
        {step === 2 && (
          <section>
            <div className="mb-12 text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-6 inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary-container"
              >
                <ArrowLeft size={16} />
                Back to Services
              </button>
              <h1 className="mb-2 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Find Your Time
              </h1>
              <p className="font-body text-lg italic text-on-surface-variant">
                Select a date and time for your {selectedService?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              {/* Calendar */}
              <div className="lg:col-span-7">
                <Calendar selectedDateKey={selectedDateKey} onSelect={setSelectedDateKey} />
              </div>

              {/* Time slots */}
              <div className="lg:col-span-5">
                <h2 className="mb-2 font-headline text-2xl font-medium">Available Times</h2>
                {selectedDateKey ? (
                  <p className="mb-6 font-body text-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{selectedDateDisplay}</span>
                  </p>
                ) : (
                  <p className="mb-6 font-body text-sm text-on-surface-variant">
                    ← Select a date first
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {TIMES.map((time) => {
                    const active = time === selectedTime;
                    const disabled = !selectedDateKey;
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedTime(time)}
                        className={`border py-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                          disabled
                            ? "cursor-not-allowed border-outline-variant/20 text-on-surface-variant/30"
                            : active
                              ? "border-primary-container bg-primary-container text-on-primary"
                              : "border-outline-variant hover:border-primary-container hover:text-primary-container"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!selectedDateKey || !selectedTime}
                  onClick={() => setStep(3)}
                  className="mt-10 h-14 w-full bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.18em] text-on-primary transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue to Details
                </button>
                {(!selectedDateKey || !selectedTime) && (
                  <p className="mt-3 text-center font-label text-[10px] text-on-surface-variant">
                    {!selectedDateKey ? "Please select a date" : "Please select a time"}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Step 3: Client Details ────────────────────────────────────── */}
        {step === 3 && (
          <section>
            <div className="mb-10 text-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mb-6 inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary-container"
              >
                <ArrowLeft size={16} />
                Back to Date & Time
              </button>
              <h1 className="mb-2 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Final Touches
              </h1>
              <p className="font-body text-lg text-on-surface-variant">
                Please provide your contact information to finalize your appointment.
              </p>
            </div>

            <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-8 lg:grid-cols-3">
              <form className="space-y-6 border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm lg:col-span-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Full Name</span>
                    <input
                      value={client.name}
                      onChange={(e) => updateClient("name", e.target.value)}
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Email Address</span>
                    <input
                      type="email"
                      value={client.email}
                      onChange={(e) => updateClient("email", e.target.value)}
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Phone Number</span>
                  <input
                    type="tel"
                    value={client.phone}
                    onChange={(e) => updateClient("phone", e.target.value)}
                    className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                    placeholder="+234 800 000 0000"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Special Notes (Optional)</span>
                  <textarea
                    value={client.notes}
                    onChange={(e) => updateClient("notes", e.target.value)}
                    className="resize-none border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                    placeholder="Allergies, preferences, or special requests..."
                    rows={4}
                  />
                </label>
                <button
                  type="button"
                  disabled={!client.name || !client.phone}
                  onClick={() => setStep(4)}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Proceed to Payment
                  <ArrowRight size={18} />
                </button>
              </form>
              <div className="space-y-6">
                <Summary
                  selectedService={selectedService}
                  selectedDateKey={selectedDateKey}
                  selectedTime={selectedTime}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Step 4: Payment ───────────────────────────────────────────── */}
        {step === 4 && (
          <section>
            <div className="mb-10 text-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="mb-6 inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary-container"
              >
                <ArrowLeft size={16} />
                Back to Details
              </button>
              <h1 className="mb-2 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Deposit Payment
              </h1>
              <p className="font-body text-lg text-on-surface-variant">
                A 20% deposit is required to secure your slot.
              </p>
            </div>

            <div className="mx-auto max-w-[520px] border border-outline-variant/20 bg-surface-container-lowest p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="mb-1 font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                  Deposit Amount
                </div>
                <div className="font-display text-5xl font-semibold text-primary-container">
                  {formatPrice(deposit)}
                </div>
                <p className="mt-2 font-body text-sm text-on-surface-variant">
                  Full service: {formatPrice(selectedService?.price)}
                </p>
              </div>
              <div className="space-y-6">
                {["Cardholder Name", "Card Number"].map((label) => (
                  <label key={label} className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      {label}
                    </span>
                    <input
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder={label === "Card Number" ? "0000 0000 0000 0000" : "YOUR NAME"}
                    />
                  </label>
                ))}
                <div className="grid grid-cols-2 gap-8">
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Expiry</span>
                    <input
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="MM/YY"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">CVV</span>
                    <input
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="123"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={completePayment}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary disabled:opacity-70"
                >
                  <CreditCard size={18} />
                  {isProcessing ? "Processing..." : `Securely Pay ${formatPrice(deposit)}`}
                </button>
                <p className="flex items-center justify-center gap-2 text-center font-body text-xs text-outline">
                  <Lock size={14} />
                  UI prototype. Paystack integration pending.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Mobile sticky summary */}
      {step < 3 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant/40 bg-surface p-5 md:hidden">
          <Summary
            selectedService={selectedService}
            selectedDateKey={selectedDateKey}
            selectedTime={selectedTime}
          />
        </div>
      )}
    </>
  );
}
