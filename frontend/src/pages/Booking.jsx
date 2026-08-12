import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CheckCircle,
  Info,
  Lock,
  Upload,
  X,
} from "lucide-react";
import { getServices, getSetting } from "../lib/content";
import SeoHead from "../components/SeoHead";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const WEEKDAY_TIMES = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM",
];

const SUNDAY_TIMES = [
  "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatPrice(value) {
  return `NGN ${(value || 0).toLocaleString()}`;
}

function parseAddOns(addOns) {
  if (!addOns) return [];
  if (Array.isArray(addOns)) return addOns;
  if (typeof addOns === "string") {
    try {
      const parsed = JSON.parse(addOns);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return [];
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
  const target = new Date(year, month, day);
  target.setHours(0, 0, 0, 0);
  return target < today;
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

function Summary({ selectedServices = [], selectedAddOns = [], totalPrice = 0, selectedDateKey, selectedTime }) {
  const dateDisplay = selectedDateKey
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(selectedDateKey + "T00:00:00"))
    : null;

  const totalDuration = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (Number(s.duration_minutes) || 0), 0),
    [selectedServices]
  );

  return (
    <aside className="border border-outline-variant/50 bg-surface p-6 shadow-2xl md:sticky md:top-28">
      <h2 className="mb-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        Your Booking
      </h2>
      <div className="space-y-5">
        {selectedServices.length === 0 ? (
          <p className="font-body text-sm italic text-on-surface-variant">No service selected</p>
        ) : (
          <div className="space-y-3">
            {selectedServices.map((service) => (
              <div key={service.id} className="flex items-start justify-between gap-4">
                <span className="font-headline text-lg font-medium text-on-surface">
                  {service.name}
                </span>
                <span className="shrink-0 font-bold text-primary-container">
                  {formatPrice(service.price || 0)}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedAddOns.length > 0 && (
          <div className="border-t border-outline-variant/20 pt-3 space-y-2">
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Selected Add-Ons
            </span>
            {selectedAddOns.map((addon, idx) => (
              <div key={idx} className="flex items-center justify-between font-body text-xs text-on-surface">
                <span>+ {addon.name}</span>
                <span className="font-semibold text-primary-container">{formatPrice(addon.price)}</span>
              </div>
            ))}
          </div>
        )}

        {selectedServices.length > 0 && (
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-3 font-bold">
            <span className="font-label text-xs uppercase tracking-[0.12em] text-on-surface">Total Amount</span>
            <span className="text-lg text-primary-container">{formatPrice(totalPrice)}</span>
          </div>
        )}

        {totalDuration > 0 && (
          <div className="flex items-center gap-2 font-body text-sm text-on-surface-variant">
            <Clock size={16} />
            {totalDuration} mins total
          </div>
        )}

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

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const canGoPrev = viewYear > todayYear || (viewYear === todayYear && viewMonth > todayMonth);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

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
          const disabled = isPast(viewYear, viewMonth, day);
          const selected = dateKey === selectedDateKey;
          const todayMark = isToday(viewYear, viewMonth, day);

          const sunday = isSunday(viewYear, viewMonth, day);

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
                    : sunday
                      ? "text-purple-600 hover:bg-purple-50 hover:text-purple-800 font-medium"
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
        <span className="flex items-center gap-2 font-label text-[10px] text-purple-700">
          <span className="font-bold">S</span> Sundays: 1 PM – 7 PM
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
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [client, setClient] = useState({ name: "", email: "", phone: "", notes: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiServices, setApiServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data) setApiServices(data.filter((s) => s.is_active));
      })
      .finally(() => setServicesLoading(false));

    getSetting("global_settings").then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const depositPercent = settings?.bookingPolicy?.depositPercent ?? 40;
  const depositMultiplier = depositPercent / 100;

  const paymentDetails = {
    bank: settings?.payment?.bank || "Kuda",
    accountNumber: settings?.payment?.accountNumber || "3003588180",
    accountName: settings?.payment?.accountName || "Lafulu Marvelous Omotayo",
  };

  const policies = {
    lateArrival: settings?.bookingPolicy?.lateArrival || "Arriving more than 30 minutes late will result in automatic cancellation.",
    rescheduling: settings?.bookingPolicy?.rescheduling || "If you need to reschedule, please notify us early — preferably an hour before your appointment.",
  };

  const totalServicesPrice = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0),
    [selectedServices]
  );

  const totalAddOnsPrice = useMemo(
    () => selectedAddOns.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
    [selectedAddOns]
  );

  const totalPrice = useMemo(
    () => totalServicesPrice + totalAddOnsPrice,
    [totalServicesPrice, totalAddOnsPrice]
  );

  const deposit = useMemo(
    () => Math.ceil(totalPrice * depositMultiplier),
    [totalPrice, depositMultiplier]
  );

  const serviceNameDisplay = useMemo(
    () => (selectedServices.length > 0 ? selectedServices.map((s) => s.name).join(" + ") : ""),
    [selectedServices]
  );

  // Check if selected date is a Sunday
  const isSelectedDateSunday = useMemo(() => {
    if (!selectedDateKey) return false;
    const d = new Date(selectedDateKey + "T00:00:00");
    return d.getDay() === 0;
  }, [selectedDateKey]);

  const availableTimes = isSelectedDateSunday ? SUNDAY_TIMES : WEEKDAY_TIMES;

  function copyAccountNumber() {
    navigator.clipboard.writeText(paymentDetails.accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleProofFile(file) {
    if (!file) return;
    setProofFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProofPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function toggleService(service) {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  }

  function toggleAddOn(addon) {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
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
        state: {
          service: {
            name: serviceNameDisplay,
            price: totalServicesPrice,
          },
          selectedServices,
          selectedAddOns,
          totalPrice,
          selectedDate: selectedDateDisplay,
          selectedTime,
          client,
          deposit,
        },
      });
    }, 900);
  }

  return (
    <>
      <SeoHead
        title="Book Online | Luxury Gel Manicures & Lash Artistry Abeokuta"
        description="Book your bespoke nail manicure, luxury lash extension, or beauty care appointment online with ThePrettyPlug in Abeokuta."
        canonicalPath="/book"
      />
      <BookingHeader />
      <main className="mx-auto min-h-screen max-w-[1280px] px-5 pb-36 pt-12 md:px-20">
        <Progress step={step} />

        {/* ── Step 1: Service Selection ─────────────────────────────────── */}
        {step === 1 && (
          <section>
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Select Your Treatments
              </h1>
              <p className="mx-auto max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
                Luxury is in the details. Select one or multiple beauty services for your session.
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
              <div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {apiServices.map((service) => {
                    const isSelected = selectedServices.some((s) => s.id === service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service)}
                        className={`flex min-h-[220px] cursor-pointer flex-col justify-between border p-8 text-left transition-all hover:border-primary-container hover:shadow-md ${
                          isSelected
                            ? "border-2 border-primary-container bg-surface-container-low shadow-lg"
                            : service.is_featured
                            ? "border-primary-container bg-primary-container text-on-primary"
                            : "border-outline-variant/50 bg-surface-container-lowest"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`font-label text-[10px] font-bold uppercase tracking-[0.14em] ${
                              isSelected ? "text-primary-container" : service.is_featured ? "text-on-primary/70" : "text-secondary"
                            }`}>
                              {service.category}
                              {service.is_featured ? " · Featured" : ""}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 bg-primary-container px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-[0.10em] text-on-primary">
                                <Check size={12} />
                                Selected
                              </span>
                            )}
                          </div>
                          <h2 className="mb-2 font-headline text-2xl font-medium">{service.name}</h2>
                          <p className={`font-body text-sm leading-6 ${
                            isSelected ? "text-on-surface-variant" : service.is_featured ? "text-on-primary/80" : "text-on-surface-variant"
                          }`}>
                            {service.description}
                          </p>

                          {/* Add-ons checkboxes if selected */}
                          {isSelected && (() => {
                            const addOnsList = parseAddOns(service.add_ons);
                            if (addOnsList.length === 0) return null;
                            return (
                              <div className="mt-5 border-t border-outline-variant/30 pt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                                <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-primary-container">
                                  Customize Options & Add-Ons:
                                </span>
                                {addOnsList.map((addon, idx) => {
                                  const checked = selectedAddOns.some((a) => a.name === addon.name);
                                  return (
                                    <label
                                      key={idx}
                                      onClick={(e) => e.stopPropagation()}
                                      className={`flex cursor-pointer items-center justify-between border px-3 py-2 text-xs transition-colors ${
                                        checked
                                          ? "border-primary-container bg-primary-container/10 text-on-surface"
                                          : "border-outline-variant/40 bg-surface hover:border-primary-container"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            toggleAddOn(addon);
                                          }}
                                          className="h-4 w-4 accent-primary-container"
                                        />
                                        <span className="font-body font-medium text-on-surface">{addon.name}</span>
                                      </div>
                                      <span className="font-bold text-primary-container">+{formatPrice(addon.price)}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div>
                            <span className="font-bold">{formatPrice(service.price)}</span>
                            {service.duration_minutes && (
                              <span className={`ml-3 font-label text-xs ${
                                isSelected ? "text-on-surface-variant" : service.is_featured ? "text-on-primary/60" : "text-on-surface-variant"
                              }`}>
                                {service.duration_minutes} mins
                              </span>
                            )}
                          </div>
                          <ArrowRight size={18} className="shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Continue action bar once service is selected */}
                {selectedServices.length > 0 && (
                  <div className="mt-10 hidden flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 sm:flex sm:flex-row">
                    <div>
                      <p className="font-headline text-xl font-medium text-on-surface">
                        Selected: <span className="text-primary-container">{serviceNameDisplay}</span>
                      </p>
                      <p className="font-body text-sm text-on-surface-variant">
                        Total Amount: <span className="font-bold text-on-surface">{formatPrice(totalPrice)}</span>
                        {selectedAddOns.length > 0 && ` (${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? "s" : ""} selected)`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex h-14 items-center justify-center gap-3 bg-primary-container px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
                    >
                      Continue to Date & Time
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
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
                Select a date and time for your appointment ({serviceNameDisplay})
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

                {isSelectedDateSunday && selectedDateKey && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg bg-purple-50 px-4 py-3 border border-purple-100">
                    <Info size={16} className="mt-0.5 shrink-0 text-purple-600" />
                    <p className="font-body text-xs text-purple-800">
                      Sunday hours: <span className="font-semibold">1:00 PM – 7:00 PM</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {availableTimes.map((time) => {
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
                  onClick={() => { setSelectedTime(isSelectedDateSunday && !SUNDAY_TIMES.includes(selectedTime) ? null : selectedTime); setStep(3); }}
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
                  selectedServices={selectedServices}
                  selectedAddOns={selectedAddOns}
                  totalPrice={totalPrice}
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
                A {depositPercent}% deposit is required to secure your slot.
              </p>
            </div>

            <div className="mx-auto max-w-[560px] space-y-6">
              {/* ── Bank Transfer Card ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-purple-200/80 p-[2px] shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #e1d2ff 0%, #c4a9f5 40%, #5e4075 100%)",
                }}
              >
                <div
                  className="rounded-[14px] px-7 py-8 md:px-9 md:py-10"
                  style={{
                    background: "linear-gradient(145deg, rgba(247,242,255,0.95) 0%, rgba(235,220,255,0.90) 50%, rgba(218,198,252,0.85) 100%)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Header */}
                  <h2
                    className="mb-8 text-center font-headline text-xl font-medium tracking-wide md:text-2xl"
                    style={{ color: "#3a1e54" }}
                  >
                    Account Details — {formatPrice(deposit)} Deposit
                  </h2>

                  {/* Bank Name */}
                  <div className="mb-6">
                    <span
                      className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "#5e4075" }}
                    >
                      Bank
                    </span>
                    <span
                      className="font-headline text-lg font-semibold tracking-wide md:text-xl"
                      style={{ color: "#21132b" }}
                    >
                      {paymentDetails.bank}
                    </span>
                  </div>

                  {/* Account Number */}
                  <div
                    className="mb-6 flex items-center justify-between rounded-xl px-5 py-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(225,210,255,0.75) 0%, rgba(198,172,245,0.65) 100%)",
                      border: "1px solid rgba(225,210,255,0.9)",
                    }}
                  >
                    <div>
                      <span
                        className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: "#5e4075" }}
                      >
                        Account Number
                      </span>
                      <span
                        className="font-mono text-2xl font-bold tracking-wider md:text-3xl"
                        style={{ color: "#21132b" }}
                      >
                        {paymentDetails.accountNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={copyAccountNumber}
                      className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-label text-xs font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: copied
                          ? "linear-gradient(135deg, #86efac 0%, #4ade80 100%)"
                          : "linear-gradient(135deg, #5e4075 0%, #3a1e54 100%)",
                        color: copied ? "#166534" : "#ffffff",
                        boxShadow: "0 2px 8px rgba(94,64,117,0.25)",
                      }}
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={15} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Name */}
                  <div className="mb-6">
                    <span
                      className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "#5e4075" }}
                    >
                      Account Name
                    </span>
                    <span
                      className="font-headline text-lg font-semibold tracking-wide md:text-xl"
                      style={{ color: "#21132b" }}
                    >
                      {paymentDetails.accountName}
                    </span>
                  </div>

                  {/* Instruction */}
                  <p
                    className="text-center font-body text-sm leading-relaxed md:text-base"
                    style={{ color: "#5e4075" }}
                  >
                    Pay your <strong>{formatPrice(deposit)}</strong> deposit, then scroll down and
                    upload your payment screenshot to activate your booking.
                  </p>
                </div>
              </div>

              {/* ── Proof of Payment Upload ── */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 md:p-8">
                <h3 className="mb-1 font-headline text-lg font-medium text-on-surface">
                  Upload Payment Proof
                </h3>
                <p className="mb-5 font-body text-sm text-on-surface-variant">
                  Upload a screenshot of your successful transfer to confirm your deposit.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleProofFile(e.target.files?.[0])}
                />

                {proofPreview ? (
                  <div className="relative mb-5 overflow-hidden rounded-xl border border-outline-variant/20">
                    <img
                      src={proofPreview}
                      alt="Payment proof preview"
                      className="mx-auto max-h-64 w-full object-contain bg-surface-container"
                    />
                    <button
                      type="button"
                      onClick={() => { setProofFile(null); setProofPreview(null); }}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white transition-transform hover:scale-110"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-2 border-t border-outline-variant/20 bg-green-50 px-4 py-2.5">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="font-body text-sm font-medium text-green-700">{proofFile?.name}</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-outline-variant/40 bg-surface-container/30 px-6 py-10 transition-colors hover:border-primary-container/50 hover:bg-primary-container/5"
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleProofFile(e.dataTransfer.files?.[0]); }}
                  >
                    <Upload size={32} className="text-on-surface-variant/40" />
                    <span className="font-body text-sm text-on-surface-variant">
                      Click or drag & drop your payment screenshot here
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/50">
                      JPG, PNG, WEBP accepted
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={!proofFile || isProcessing}
                  onClick={completePayment}
                  className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-all hover:bg-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CheckCircle size={18} />
                  {isProcessing ? "Processing..." : "Complete Booking"}
                </button>
              </div>

              {/* ── Booking Policies ── */}
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <Info size={18} className="text-primary-container" />
                  <h3 className="font-headline text-lg font-medium text-on-surface">
                    Booking Policies
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <Lock size={12} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-on-surface">Non-Refundable Deposit</p>
                      <p className="font-body text-sm text-on-surface-variant">All deposits are non-refundable once payment is made.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50">
                      <Clock size={12} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-on-surface">Rescheduling</p>
                      <p className="font-body text-sm text-on-surface-variant">{policies.rescheduling}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50">
                      <AlertTriangle size={12} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-on-surface">Late Arrival</p>
                      <p className="font-body text-sm text-on-surface-variant">{policies.lateArrival}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Summary */}
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-sm text-on-surface-variant">Services</p>
                    <p className="font-headline text-lg font-medium text-on-surface">{serviceNameDisplay}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm text-on-surface-variant">Full Price</p>
                    <p className="font-bold text-on-surface">{formatPrice(totalPrice)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-outline-variant/20 pt-3">
                  <span className="font-body text-xs text-on-surface-variant">
                    {selectedDateDisplay} at {selectedTime}
                  </span>
                  <div>
                    <span className="font-body text-xs text-on-surface-variant">Deposit ({depositPercent}%): </span>
                    <span className="font-bold text-primary-container">{formatPrice(deposit)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Floating Universal Sticky Action Bar (Step 1 & Step 2) - Active on Desktop & Mobile */}
      {step === 1 && selectedServices.length > 0 && (
        <div className="fixed bottom-[64px] sm:bottom-6 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%] sm:max-w-[960px] z-40 flex items-center justify-between gap-4 rounded-2xl border border-primary-container/40 bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="truncate">
            <p className="truncate font-headline text-sm font-semibold text-on-surface sm:text-base">
              Selected: <span className="text-primary-container">{serviceNameDisplay}</span>
            </p>
            <p className="font-label text-xs font-bold text-on-surface-variant">
              Total Amount: <span className="text-primary-container">{formatPrice(totalPrice)}</span>
              {selectedAddOns.length > 0 && ` (${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? "s" : ""})`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-container px-6 font-label text-xs font-bold uppercase tracking-[0.12em] text-on-primary transition-all hover:bg-primary shadow-lg hover:scale-105 active:scale-95"
          >
            <span className="hidden sm:inline">Continue to Date & Time</span>
            <span className="sm:hidden">Continue</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && selectedDateKey && selectedTime && (
        <div className="fixed bottom-[64px] sm:bottom-6 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%] sm:max-w-[960px] z-40 flex items-center justify-between gap-4 rounded-2xl border border-primary-container/40 bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="truncate">
            <p className="truncate font-headline text-sm font-semibold text-on-surface sm:text-base">
              Appointment Slot: <span className="text-primary-container">{selectedDateDisplay}</span>
            </p>
            <p className="font-label text-xs font-bold text-on-surface-variant">
              Time: <span className="text-primary-container">{selectedTime}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-container px-6 font-label text-xs font-bold uppercase tracking-[0.12em] text-on-primary transition-all hover:bg-primary shadow-lg hover:scale-105 active:scale-95"
          >
            <span className="hidden sm:inline">Continue to Details</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
