import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Lock,
  X,
} from "lucide-react";

const services = [
  {
    name: "The Classic Manicure",
    shortName: "Classic Manicure",
    category: "Most Popular",
    description:
      "Hand soak, detailed cuticle care, massage, and expert polish application.",
    price: 15000,
    duration: "60 mins",
    image: "/images/nails.png",
    layout: "feature",
  },
  {
    name: "Luxury Pedi",
    category: "Feet",
    description: "A polished pedicure ritual with soak, exfoliation, and finish.",
    price: 12000,
    duration: "45 mins",
    image: "/images/pedi.jpg",
    layout: "image",
  },
  {
    name: "Gel Extensions",
    category: "Nails",
    description: "Sculpted extensions with long-wear gel strength.",
    price: 25000,
    duration: "90 mins",
    image: "/images/gallery-5.jpg",
    layout: "image",
  },
  {
    name: "Silk Lash Lift",
    category: "Eyes",
    description: "Naturally enhanced, lifted lashes that last up to 6 weeks.",
    price: 18000,
    duration: "45 mins",
  },
  {
    name: "Signature Brows",
    category: "Facial",
    description: "Precision mapping, tinting, and shaping for your perfect arch.",
    price: 8000,
    duration: "30 mins",
  },
  {
    name: "The Full Glam Plug",
    category: "Premium",
    description: "Manicure, pedicure, and brows combo for weekend prep.",
    price: 45000,
    duration: "120 mins",
    premium: true,
  },
];

const times = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
  "07:30 PM",
];

const dateOptions = [
  { label: "Mon", day: "11", value: "Nov 11, 2026" },
  { label: "Tue", day: "12", value: "Nov 12, 2026" },
  { label: "Wed", day: "13", value: "Nov 13, 2026" },
  { label: "Thu", day: "14", value: "Nov 14, 2026" },
  { label: "Fri", day: "15", value: "Nov 15, 2026" },
  { label: "Sat", day: "16", value: "Nov 16, 2026" },
];

function formatPrice(price) {
  return `NGN ${price.toLocaleString()}`;
}

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

function Summary({ selectedService, selectedDate, selectedTime }) {
  const service = selectedService ?? {
    name: "Select a service",
    price: 0,
    duration: "0 mins",
  };

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
          <span className="font-bold text-primary-container">
            {formatPrice(service.price)}
          </span>
        </div>
        <div className="flex items-center gap-2 font-body text-sm text-on-surface-variant">
          <Clock size={16} />
          {service.duration}
        </div>
        {selectedDate && selectedTime ? (
          <div className="border-t border-outline-variant/30 pt-5">
            <div className="flex items-center gap-2 font-body text-sm font-bold text-secondary">
              <CalendarDays size={16} />
              {selectedDate} at {selectedTime}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);
  const [selectedTime, setSelectedTime] = useState("06:00 PM");
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const deposit = useMemo(
    () => Math.ceil((selectedService?.price ?? 0) * 0.2),
    [selectedService],
  );

  function selectService(service) {
    setSelectedService(service);
    setTimeout(() => setStep(2), 250);
  }

  function updateClient(field, value) {
    setClient((current) => ({ ...current, [field]: value }));
  }

  function completePayment() {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/book/confirm", {
        state: {
          service: selectedService,
          selectedDate,
          selectedTime,
          client,
          deposit,
        },
      });
    }, 900);
  }

  return (
    <>
      <BookingHeader />
      <main className="mx-auto min-h-screen max-w-[1280px] px-5 pb-28 pt-12 md:px-20">
        <Progress step={step} />

        {step === 1 ? (
          <section className="animate-fade-in">
            <div className="mb-12 text-center">
              <h1 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Select Your Treatment
              </h1>
              <p className="mx-auto max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
                Luxury is in the details. Choose from our curated selection of
                premium beauty services.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {services.map((service) => {
                if (service.layout === "feature") {
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => selectService(service)}
                      className="group relative h-[400px] overflow-hidden bg-surface-container-low text-left md:col-span-8"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover grayscale-[25%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/85 via-black/20 to-transparent p-8">
                        <span className="mb-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-fixed">
                          {service.category}
                        </span>
                        <h2 className="mb-2 font-headline text-3xl font-medium text-white">
                          {service.name}
                        </h2>
                        <p className="mb-6 max-w-md font-body text-base leading-6 text-white/80">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {formatPrice(service.price)}
                          </span>
                          <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                }

                if (service.layout === "image") {
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => selectService(service)}
                      className="group relative h-[188px] overflow-hidden bg-surface-container text-center md:col-span-4"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 p-4">
                        <h2 className="font-headline text-2xl font-medium text-white">
                          {service.name}
                        </h2>
                        <span className="mt-2 font-bold text-white">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => selectService(service)}
                    className={`flex min-h-[250px] flex-col justify-between border p-8 text-left transition-colors md:col-span-4 ${
                      service.premium
                        ? "border-primary-container bg-primary-container text-on-primary hover:bg-primary"
                        : "border-outline-variant/50 hover:bg-surface-container"
                    }`}
                  >
                    <div>
                      <span
                        className={`mb-4 block font-label text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          service.premium
                            ? "text-on-primary/70"
                            : "text-secondary"
                        }`}
                      >
                        {service.category}
                      </span>
                      <h2 className="mb-2 font-headline text-2xl font-medium">
                        {service.name}
                      </h2>
                      <p
                        className={`font-body text-base leading-6 ${
                          service.premium
                            ? "text-on-primary/80"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="font-bold">
                        {formatPrice(service.price)}
                      </span>
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-2"
                        size={20}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="animate-fade-in">
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
                Select a date for your {selectedService?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="border border-outline-variant/30 bg-surface-container-lowest p-8 lg:col-span-7">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="font-headline text-2xl font-medium">
                    November 2026
                  </h2>
                  <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Mon - Sat
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {dateOptions.map((date) => {
                    const isActive = date.value === selectedDate;
                    return (
                      <button
                        key={date.value}
                        type="button"
                        onClick={() => setSelectedDate(date.value)}
                        className={`border p-5 text-left transition-colors ${
                          isActive
                            ? "border-primary-container bg-primary-container text-on-primary"
                            : "border-outline-variant/40 hover:border-primary-container"
                        }`}
                      >
                        <span className="block font-label text-xs font-semibold uppercase tracking-[0.12em] opacity-70">
                          {date.label}
                        </span>
                        <span className="mt-2 block font-headline text-3xl font-medium">
                          {date.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5">
                <h2 className="mb-6 font-headline text-2xl font-medium">
                  Available Times
                </h2>
                <p className="mb-8 font-body text-sm text-on-surface-variant">
                  Selected Date:{" "}
                  <span className="font-bold text-on-surface">
                    {selectedDate}
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {times.map((time) => {
                    const disabled = time === "12:00 PM";
                    const active = time === selectedTime;
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedTime(time)}
                        className={`border py-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                          disabled
                            ? "cursor-not-allowed border-outline-variant bg-surface-container opacity-40 line-through"
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
                  onClick={() => setStep(3)}
                  className="mt-12 h-14 w-full bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.18em] text-on-primary transition-colors hover:bg-primary"
                >
                  Continue to Details
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="animate-fade-in">
            <div className="mb-10 text-center">
              <h1 className="mb-2 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Final Touches
              </h1>
              <p className="font-body text-lg text-on-surface-variant">
                Please provide your contact information to finalize your
                appointment.
              </p>
            </div>

            <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-8 lg:grid-cols-3">
              <form className="space-y-6 border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm lg:col-span-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Full Name
                    </span>
                    <input
                      value={client.name}
                      onChange={(event) =>
                        updateClient("name", event.target.value)
                      }
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="Bertie Capone"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Email Address
                    </span>
                    <input
                      type="email"
                      value={client.email}
                      onChange={(event) =>
                        updateClient("email", event.target.value)
                      }
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="bertie@theprettyplug.com"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    value={client.phone}
                    onChange={(event) =>
                      updateClient("phone", event.target.value)
                    }
                    className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                    placeholder="+234 800 000 0000"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Special Notes (Optional)
                  </span>
                  <textarea
                    value={client.notes}
                    onChange={(event) =>
                      updateClient("notes", event.target.value)
                    }
                    className="resize-none border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                    placeholder="Please let us know about any allergies or specific requests..."
                    rows={4}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
                >
                  Proceed to Payment
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="space-y-6">
                <Summary
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
                <img
                  src="/images/download (4).jfif"
                  alt="Manicure tools and polish"
                  className="h-[220px] w-full object-cover shadow-lg"
                />
              </div>
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="animate-fade-in">
            <div className="mb-10 text-center">
              <h1 className="mb-2 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Deposit Payment
              </h1>
              <p className="font-body text-lg text-on-surface-variant">
                A 20% deposit is required to secure your slot.
              </p>
            </div>

            <div className="editorial-shadow mx-auto max-w-[520px] border border-outline-variant/20 bg-surface-container-lowest p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="mb-1 font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                  Deposit Amount
                </div>
                <div className="font-display text-5xl font-semibold text-primary-container">
                  {formatPrice(deposit)}
                </div>
              </div>
              <div className="space-y-6">
                {["Cardholder Name", "Card Number"].map((label) => (
                  <label key={label} className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      {label}
                    </span>
                    <input
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder={
                        label === "Card Number"
                          ? "0000 0000 0000 0000"
                          : "BERTIE CAPONE"
                      }
                    />
                  </label>
                ))}
                <div className="grid grid-cols-2 gap-8">
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Expiry Date
                    </span>
                    <input
                      className="border-0 border-b border-outline-variant bg-transparent py-3 font-body text-base outline-none focus:border-primary-container"
                      placeholder="MM/YY"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      CVV
                    </span>
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
                  {isProcessing
                    ? "Processing..."
                    : `Securely Pay ${formatPrice(deposit)}`}
                </button>
                <p className="flex items-center justify-center gap-2 text-center font-body text-xs text-outline">
                  <Lock size={14} />
                  UI prototype only. Paystack integration remains backend work.
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {step < 3 ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant/40 bg-surface p-5 md:hidden">
          <Summary
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      ) : null}
    </>
  );
}
