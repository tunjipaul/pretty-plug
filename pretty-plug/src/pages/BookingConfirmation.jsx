import { Link, useLocation } from "react-router-dom";
import { CalendarDays, CheckCircle, Download, MapPin, Share2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function formatPrice(price) {
  return `NGN ${Number(price || 0).toLocaleString()}`;
}

export default function BookingConfirmation() {
  const { state } = useLocation();
  const booking = {
    service: state?.service ?? {
      name: "The Classic Manicure",
      price: 15000,
      duration: "60 mins",
    },
    selectedDate: state?.selectedDate ?? "Nov 11, 2026",
    selectedTime: state?.selectedTime ?? "06:00 PM",
    client: state?.client ?? { name: "Beauty Plug Client" },
    deposit: state?.deposit ?? 3000,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-5 py-20 md:px-20 md:py-28">
        <section className="mx-auto max-w-[760px] text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary-container/10">
            <CheckCircle
              size={54}
              className="fill-primary-container text-primary-container"
            />
          </div>
          <h1 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
            Booking Confirmed
          </h1>
          <p className="mx-auto mb-10 max-w-xl font-body text-lg leading-7 text-on-surface-variant">
            You are all set, {booking.client.name || "Beauty Plug Client"}. A
            confirmation email and digital receipt will be sent once payment is
            processed by the live system.
          </p>

          <div className="editorial-shadow mb-10 border border-outline-variant/30 bg-surface p-8 text-left">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                Appointment Ticket
              </h2>
              <span className="font-mono text-sm text-on-surface-variant">
                #BP-88290
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                  Service
                </span>
                <span className="font-body font-bold">
                  {booking.service.name}
                </span>
              </div>
              <div>
                <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                  Deposit Paid
                </span>
                <span className="font-body">{formatPrice(booking.deposit)}</span>
              </div>
              <div>
                <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                  Time
                </span>
                <span className="font-body">
                  {booking.selectedTime} - {booking.selectedDate}
                </span>
              </div>
              <div>
                <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                  Balance
                </span>
                <span className="font-body">
                  {formatPrice(booking.service.price - booking.deposit)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-dashed border-outline-variant pt-6">
              <MapPin className="mt-0.5 shrink-0 text-primary-container" />
              <span className="font-body text-sm italic text-on-surface-variant">
                Abeokuta Luxury Suite, Ogun State, Nigeria.
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 bg-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <CalendarDays size={18} />
              Add to Calendar
            </button>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 border border-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary-container/5"
            >
              <Download size={18} />
              Download Receipt
            </button>
            <Link
              to="/"
              className="inline-flex h-14 items-center justify-center gap-3 border border-outline px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-container"
            >
              <Share2 size={18} />
              Return Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
