import { useEffect, useMemo, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  MoreHorizontal,
  Plus,
  Printer,
  Scissors,
  Search,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { updateBookingStatus, deleteBooking, saveBooking, getBookings } from "../lib/content";
import SeoHead from "../components/SeoHead";

const filters = ["All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled"];

function formatPrice(value) {
  return `NGN ${(value || 0).toLocaleString()}`;
}

function statusStyles(status = "") {
  const s = status.toLowerCase();
  if (s === "confirmed") return "bg-primary-fixed text-on-primary-fixed";
  if (s === "pending") return "bg-secondary-fixed text-on-secondary-fixed";
  if (s === "in progress" || s === "in-progress") return "bg-tertiary-fixed text-on-tertiary-fixed";
  if (s === "completed") return "bg-green-50 text-green-700";
  if (s === "cancelled") return "bg-error-container text-on-error-container";
  return "bg-surface-container text-on-surface-variant";
}

function StatusBadge({ status }) {
  const isCancelled = (status || "").toLowerCase() === "cancelled";
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] ${statusStyles(
        status,
      )}`}
    >
      {isCancelled ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
      {status || "Pending"}
    </span>
  );
}

function BookingModal({ booking, onClose, onUpdated, onDeleted }) {
  const [status, setStatus] = useState(booking.status || "Pending");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const clientName = booking.client_name || booking.client || "—";
  const serviceName = booking.service_name || booking.service || "—";
  const clientEmail = booking.email || booking.client_email || "—";
  const clientPhone = booking.phone || booking.client_phone || "—";
  const totalAmt = booking.amount ?? booking.total_amount ?? 0;
  const depositAmt = booking.deposit ?? booking.deposit_amount ?? 0;

  async function handleSaveStatus() {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateBookingStatus(booking.id, status);
      onUpdated(updated || { ...booking, status });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete booking for ${clientName}?`)) return;
    setSaving(true);
    try {
      await deleteBooking(booking.id);
      onDeleted(booking.id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete booking");
    } finally {
      setSaving(false);
    }
  }

  // Extract proof URL from notes if present
  const proofUrlMatch = (booking.notes || "").match(/Payment Proof: (https?:\/\/[^\s|]+)/);
  const proofUrl = proofUrlMatch ? proofUrlMatch[1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg border border-outline-variant/20 bg-surface p-6 shadow-2xl md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="mb-6 flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.14em] text-primary-container">
              Booking Details
            </span>
            <h2 className="font-headline text-2xl font-medium text-on-surface">
              {clientName}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-on-surface-variant hover:bg-surface-container">
            <XCircle size={20} />
          </button>
        </div>

        {error && <p className="mb-4 bg-red-50 p-3 font-body text-sm text-red-600">{error}</p>}

        <div className="space-y-4 font-body text-sm">
          <div className="grid grid-cols-2 gap-4 border-b border-outline-variant/10 pb-4">
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Service</p>
              <p className="font-semibold text-on-surface">{serviceName}</p>
            </div>
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Date & Time</p>
              <p className="text-on-surface">{booking.appointment_date} at {booking.appointment_time}</p>
            </div>
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Email</p>
              <p className="text-on-surface">{clientEmail}</p>
            </div>
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Phone</p>
              <p className="text-on-surface">{clientPhone}</p>
            </div>
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Total Amount</p>
              <p className="font-bold text-on-surface">{formatPrice(totalAmt)}</p>
            </div>
            <div>
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Deposit Paid</p>
              <p className="font-bold text-primary-container">{formatPrice(depositAmt)}</p>
            </div>
          </div>

          {booking.notes && (
            <div className="rounded border border-outline-variant/20 bg-surface-container-low p-3">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Notes & Details</p>
              <p className="mt-1 text-xs text-on-surface whitespace-pre-wrap">{booking.notes}</p>
            </div>
          )}

          {proofUrl && (
            <div className="border border-outline-variant/30 p-3 bg-surface-container-lowest">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2">Payment Proof Screenshot</p>
              <a href={proofUrl} target="_blank" rel="noreferrer" className="block max-h-48 overflow-hidden rounded border hover:opacity-90">
                <img src={proofUrl} alt="Payment proof" className="w-full h-full object-contain" />
              </a>
            </div>
          )}

          <div>
            <label className="block font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none focus:border-primary-container"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3 border-t border-outline-variant/20 pt-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            className="h-11 border border-red-200 px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 border border-outline-variant font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveStatus}
            disabled={saving}
            className="h-11 flex-1 bg-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-primary disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingBooking, setEditingBooking] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    getBookings()
      .then((data) => {
        if (data) setBookings(data);
      })
      .catch((err) => console.error("Failed to load bookings:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const statusStr = (booking.status || "Pending").toLowerCase();
      const matchesFilter =
        activeFilter === "All" || statusStr === activeFilter.toLowerCase();
      
      const clientName = booking.client_name || booking.client || "";
      const serviceName = booking.service_name || booking.service || "";
      const clientEmail = booking.email || booking.client_email || "";
      const clientPhone = booking.phone || booking.client_phone || "";

      const searchableText = [
        booking.id,
        clientName,
        clientEmail,
        clientPhone,
        serviceName,
        booking.specialist,
        booking.status,
        booking.notes,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, query, bookings]);

  const confirmedCount = bookings.filter(
    (b) => (b.status || "").toLowerCase() === "confirmed",
  ).length;
  const pendingCount = bookings.filter(
    (b) => (b.status || "").toLowerCase() === "pending",
  ).length;
  const projectedRevenue = bookings.reduce(
    (total, b) => {
      const isCancelled = (b.status || "").toLowerCase() === "cancelled";
      const amt = b.amount ?? b.total_amount ?? 0;
      return isCancelled ? total : total + amt;
    },
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <AdminSidebar />
        <main className="flex min-h-screen items-center justify-center lg:ml-64">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-outline-variant border-t-primary-container" />
            <p className="font-body text-sm text-on-surface-variant">Loading bookings…</p>
          </div>
        </main>
        <MobileAdminNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <SeoHead title="Bookings Management | ThePrettyPlug" noindex={true} />
      <AdminSidebar />

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                Admin
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Bookings Management
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Oversee daily appointments, deposits, and client follow-ups.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                aria-label="Print today's appointments"
                className="inline-flex h-11 items-center justify-center gap-2 border border-outline-variant px-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-surface-container sm:px-4"
              >
                <Printer size={17} />
                Print Today
              </button>
              <button
                type="button"
                aria-label="Export bookings report"
                className="inline-flex h-11 items-center justify-center gap-2 border border-outline-variant px-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-surface-container sm:px-4"
              >
                <Download size={17} />
                Export Report
              </button>
              <button
                type="button"
                aria-label="Add a manual booking"
                className="col-span-2 inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary sm:col-span-1 sm:px-4"
              >
                <Plus size={17} />
                Add Manual Booking
              </button>
              <button
                type="button"
                className="hidden h-11 w-11 text-on-surface-variant transition-colors hover:bg-surface-container sm:block"
                aria-label="Notifications"
              >
                <Bell className="mx-auto" size={22} />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-5 md:space-y-8 md:p-8 xl:p-10">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Confirmed Today
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-on-surface md:text-4xl">
                {confirmedCount}
              </p>
            </div>
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Pending Approval
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-on-surface md:text-4xl">
                {pendingCount}
              </p>
            </div>
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Scheduled Revenue
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-on-surface md:text-4xl">
                {formatPrice(projectedRevenue)}
              </p>
            </div>
          </section>

          <section className="border border-outline-variant/20 bg-surface-container-low p-4 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-md">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-13 w-full border-0 border-b-2 border-outline-variant bg-surface-container-lowest pl-12 pr-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
                  placeholder="Search client, service, phone, or status"
                />
              </label>

              <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`h-10 shrink-0 border px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                      activeFilter === filter
                        ? "border-primary-container bg-primary-container text-on-primary"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[1050px] border-collapse text-left">
                <thead className="border-b border-outline-variant/20 bg-surface-container-high">
                  <tr>
                    {[
                      "Client",
                      "Service",
                      "Date & Time",
                      "Specialist",
                      "Status",
                      "Amount",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="p-5 font-label text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredBookings.map((booking) => {
                    const clientName = booking.client_name || booking.client || "—";
                    const serviceName = booking.service_name || booking.service || "—";
                    const initials = clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);
                    const dateLabel = booking.appointment_date
                      ? new Date(booking.appointment_date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )
                      : booking.date || "—";
                    const timeLabel = booking.appointment_time || booking.time || "—";
                    return (
                    <tr
                      key={booking.id}
                      className="group transition-colors hover:bg-surface-container-low"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center bg-primary-fixed font-label text-xs font-bold text-on-primary-fixed">
                            {initials}
                          </div>
                          <div>
                            <p className="font-body font-bold text-on-surface">
                              {clientName}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              {booking.email || "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="font-body font-semibold text-on-surface">
                          {serviceName}
                        </p>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          {String(booking.id).slice(0, 8).toUpperCase()}
                        </p>
                      </td>
                      <td className="p-5">
                        <p className="font-body text-on-surface">{dateLabel}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                          <Clock size={13} />
                          {timeLabel}
                        </p>
                      </td>
                      <td className="p-5 font-body text-on-surface">
                        {booking.specialist || "—"}
                      </td>
                      <td className="p-5">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="p-5">
                        <p className="font-body font-bold text-on-surface">
                          {formatPrice(booking.amount || 0)}
                        </p>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          Deposit {formatPrice(booking.deposit || 0)}
                        </p>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setEditingBooking(booking)}
                            className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingBooking(booking)}
                            className="h-9 w-9 text-on-surface-variant transition-colors hover:bg-surface-container"
                            aria-label={`More actions for ${clientName}`}
                          >
                            <MoreHorizontal className="mx-auto" size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-outline-variant/10 xl:hidden">
              {filteredBookings.map((booking) => {
                const clientName = booking.client_name || booking.client || "—";
                const serviceName = booking.service_name || booking.service || "—";
                const initials = clientName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                const dateLabel = booking.appointment_date
                  ? new Date(booking.appointment_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : booking.date || "—";
                const timeLabel = booking.appointment_time || booking.time || "—";
                const amt = booking.amount ?? booking.total_amount ?? 0;
                return (
                <article key={booking.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-fixed font-label text-xs font-bold text-on-primary-fixed">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate font-body font-bold text-on-surface">
                          {clientName}
                        </h2>
                        <p className="truncate text-xs text-on-surface-variant">
                          {booking.email || booking.client_email || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="sm:shrink-0">
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Service</p>
                      <p className="mt-1 font-body font-semibold text-on-surface">{serviceName}</p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Date</p>
                      <p className="mt-1 font-body text-on-surface">{dateLabel}</p>
                      <p className="text-xs text-on-surface-variant">{timeLabel}</p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Amount</p>
                      <p className="mt-1 font-body font-bold text-on-surface">{formatPrice(amt)}</p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">Specialist</p>
                      <p className="mt-1 font-body text-on-surface">{booking.specialist || "—"}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-outline-variant/10 pt-4">
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      {String(booking.id).slice(0, 8).toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingBooking(booking)}
                      className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </article>
                );
              })}
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-10 text-center">
                <p className="font-headline text-2xl text-on-surface">
                  No bookings found
                </p>
                <p className="mt-2 font-body text-sm text-on-surface-variant">
                  Try another search term or status filter.
                </p>
              </div>
            ) : null}
          </section>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-sm text-on-surface-variant">
              Showing{" "}
              <span className="font-bold text-on-surface">
                {filteredBookings.length}
              </span>{" "}
              of <span className="font-bold text-on-surface">{bookings.length}</span>{" "}
              appointments
            </p>
          </div>
        </div>

        {editingBooking && (
          <BookingModal
            booking={editingBooking}
            onClose={() => setEditingBooking(null)}
            onUpdated={(updated) => {
              setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
            }}
            onDeleted={(id) => {
              setBookings((prev) => prev.filter((b) => b.id !== id));
            }}
          />
        )}

        <footer className="mt-16 border-t border-outline-variant/20 bg-surface-container-low px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-sm text-on-surface-variant">
              (c) {currentYear} ThePrettyPlug. Admin dashboard.
            </p>
            <Link
              to="/"
              className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:text-primary-container"
            >
              Back to Website
            </Link>
          </div>
        </footer>
      </main>

      <MobileAdminNav />
    </div>
  );
}
