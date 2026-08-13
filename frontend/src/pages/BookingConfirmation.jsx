import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, CheckCircle, Download, Home, MapPin, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSetting } from "../lib/content";
import SeoHead from "../components/SeoHead";

function formatPrice(price) {
  return `NGN ${Number(price || 0).toLocaleString()}`;
}

export default function BookingConfirmation() {
  const { state } = useLocation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSetting("global_settings").then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const business = settings?.business || {
    name: "ThePrettyPlug",
    address: "Abeokuta, Ogun State, Nigeria",
    whatsapp: "+2349028789806",
  };

  const depositPercent = settings?.bookingPolicy?.depositPercent ?? 40;
  const reschedulingPolicy = settings?.bookingPolicy?.rescheduling || "If you need to reschedule, please notify us early — preferably an hour before your appointment.";
  const lateArrivalPolicy = settings?.bookingPolicy?.lateArrival || "Arriving more than 30 minutes late will result in cancellation.";

  const selectedAddOns = state?.selectedAddOns ?? [];
  const totalPrice = state?.totalPrice ?? (state?.service?.price ?? 15000);

  const booking = {
    service: state?.service ?? {
      name: "The Classic Manicure",
      price: 15000,
      duration: "60 mins",
    },
    selectedAddOns,
    totalPrice,
    selectedDate: state?.selectedDate ?? "Nov 11, 2026",
    selectedTime: state?.selectedTime ?? "06:00 PM",
    client: state?.client ?? { name: "ThePrettyPlug Client" },
    deposit: state?.deposit ?? 6000,
  };

  const rawWhatsapp = settings?.business?.whatsapp || business.whatsapp || "+2349028789806";
  const cleanWhatsapp = rawWhatsapp.replace(/[^\d]/g, "") || "2349028789806";

  const clientName = booking.client?.name || "Client";
  const serviceName = booking.service?.name || "Service";
  const dateStr = booking.selectedDate || "";
  const timeStr = booking.selectedTime || "";
  const depositPaid = formatPrice(booking.deposit);

  const whatsappText = `Hello! My name is ${clientName}. I just booked ${serviceName} for ${dateStr} at ${timeStr}. Deposit paid: ${depositPaid}. Here is my booking receipt!`;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappText)}`;

  const downloadReceipt = useCallback(() => {
    const canvas = document.createElement("canvas");
    const w = 800;
    const h = 1000;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#FBFBE2";
    ctx.fillRect(0, 0, w, h);

    // Header bar
    ctx.fillStyle = "#D1C4E9";
    ctx.fillRect(0, 0, w, 120);

    // Brand name
    ctx.fillStyle = "#1B1D0E";
    ctx.font = "bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(business.name, w / 2, 55);

    // Subtitle
    ctx.fillStyle = "#49454D";
    ctx.font = "16px sans-serif";
    ctx.fillText("Booking Receipt", w / 2, 85);

    // Ticket number
    ctx.font = "13px monospace";
    ctx.fillStyle = "#635979";
    ctx.fillText("#BP-" + Math.floor(10000 + Math.random() * 90000), w / 2, 108);

    // Checkmark circle
    ctx.beginPath();
    ctx.arc(w / 2, 180, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#D1C4E9";
    ctx.fill();
    ctx.fillStyle = "#1B1D0E";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("✓", w / 2, 192);

    // Confirmed text
    ctx.fillStyle = "#1B1D0E";
    ctx.font = "bold 28px Georgia, serif";
    ctx.fillText("Booking Confirmed", w / 2, 250);

    // Divider
    ctx.strokeStyle = "#D1C4E9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 280);
    ctx.lineTo(w - 80, 280);
    ctx.stroke();

    // Details section
    ctx.textAlign = "left";
    const leftX = 100;
    const rightX = w / 2 + 20;
    let y = 330;
    const lineHeight = 65;

    function drawField(label, value, x, yPos) {
      ctx.fillStyle = "#635979";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(label.toUpperCase(), x, yPos);
      ctx.fillStyle = "#1B1D0E";
      ctx.font = "18px Georgia, serif";
      ctx.fillText(value, x, yPos + 25);
    }

    drawField("Client", booking.client.name || `${business.name} Client`, leftX, y);
    drawField("Service", booking.service.name, rightX, y);
    y += lineHeight;

    drawField("Date", booking.selectedDate, leftX, y);
    drawField("Time", booking.selectedTime, rightX, y);
    y += lineHeight;

    drawField("Service Price", formatPrice(booking.service.price), leftX, y);
    drawField(`Deposit Paid (${depositPercent}%)`, formatPrice(booking.deposit), rightX, y);
    y += lineHeight;

    drawField("Balance Due", formatPrice(booking.service.price - booking.deposit), leftX, y);
    y += lineHeight;

    // Divider
    ctx.strokeStyle = "#D1C4E9";
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(w - 80, y);
    ctx.stroke();
    ctx.setLineDash([]);
    y += 40;

    // Location
    ctx.fillStyle = "#635979";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("LOCATION", leftX, y);
    ctx.fillStyle = "#49454D";
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillText(business.address, leftX, y + 25);
    y += 70;

    // Policies
    ctx.fillStyle = "#635979";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("BOOKING POLICIES", leftX, y);
    y += 25;
    ctx.fillStyle = "#49454D";
    ctx.font = "14px sans-serif";
    const policiesList = [
      "• Deposits are non-refundable once payment is made.",
      `• Rescheduling: ${reschedulingPolicy}`,
      `• Late arrival: ${lateArrivalPolicy}`,
    ];
    policiesList.forEach((p) => {
      ctx.fillText(p, leftX, y);
      y += 24;
    });

    // Footer
    y = h - 60;
    ctx.textAlign = "center";
    ctx.fillStyle = "#9e9e9e";
    ctx.font = "13px sans-serif";
    ctx.fillText(`© ${new Date().getFullYear()} ${business.name} — All Rights Reserved`, w / 2, y);

    // Download
    const link = document.createElement("a");
    link.download = `${business.name.replace(/\s+/g, "")}-Receipt-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [booking, business, depositPercent, reschedulingPolicy, lateArrivalPolicy]);

  return (
    <>
      <SeoHead
        title="Booking Confirmation & Receipt | ThePrettyPlug"
        description="Booking receipt confirmation page."
        canonicalPath="/book/confirm"
        noindex={true}
      />
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
            You are all set, {booking.client.name || `${business.name} Client`}! Your
            appointment has been booked successfully. Please notify our studio on WhatsApp or download your receipt below.
          </p>

          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-left sm:p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 shrink-0 text-green-700" size={20} />
              <div>
                <p className="font-headline text-base font-semibold text-green-950">
                  Notify Studio via WhatsApp
                </p>
                <p className="mt-1 font-body text-xs leading-5 text-green-800">
                  1. Tap <strong>"Download Receipt"</strong> to save your receipt ticket image.<br />
                  2. Click <strong>"Send via WhatsApp"</strong> to send your pre-filled appointment details directly to our studio phone (<strong>+234 902 878 9806</strong>)!
                </p>
              </div>
            </div>
          </div>

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
                  {formatPrice(booking.totalPrice - booking.deposit)}
                </span>
              </div>
              {booking.selectedAddOns && booking.selectedAddOns.length > 0 && (
                <div className="col-span-full border-t border-outline-variant/20 pt-3">
                  <span className="mb-2 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                    Selected Add-Ons
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {booking.selectedAddOns.map((addon, idx) => (
                      <span key={idx} className="bg-primary-container/10 px-3 py-1 font-body text-xs font-semibold text-primary-container">
                        {addon.name} (+{formatPrice(addon.price)})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-dashed border-outline-variant pt-6">
              <MapPin className="mt-0.5 shrink-0 text-primary-container" />
              <span className="font-body text-sm italic text-on-surface-variant">
                Abeokuta Luxury Suite, Ogun State, Nigeria.
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 bg-[#25D366] px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-md transition-colors hover:bg-[#1EBE5D]"
            >
              <MessageSquare size={18} />
              Send via WhatsApp
            </a>
            <button
              type="button"
              onClick={downloadReceipt}
              className="inline-flex h-14 items-center justify-center gap-3 bg-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Download size={18} />
              Download Receipt
            </button>
            <Link
              to="/"
              className="inline-flex h-14 items-center justify-center gap-3 border border-outline px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-container"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

