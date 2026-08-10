import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  MessageSquareQuote,
  Scissors,
  ArrowRight,
  Clock,
} from "lucide-react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import { getBookings, getServices, getTestimonials, getStoredUser } from "../lib/content";

const STATUS_STYLES = {
  pending:     "bg-amber-50 text-amber-700",
  confirmed:   "bg-primary-fixed text-on-primary-fixed",
  completed:   "bg-green-50 text-green-700",
  cancelled:   "bg-red-50 text-red-600",
  "in-progress": "bg-secondary-fixed text-on-secondary-fixed",
};

function statusStyle(status = "") {
  return STATUS_STYLES[status.toLowerCase()] ?? "bg-surface-container-highest text-on-surface-variant";
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return { hour: String(hour).padStart(2, "0"), period };
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

function StatCard({ label, value, icon: Icon, accent, path, loading }) {
  const card = (
    <article className={`border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-md ${path ? "hover:border-primary-container/30 cursor-pointer" : ""}`}>
      <div className="mb-5 flex items-start justify-between">
        <div className={`p-3 ${accent}`}>
          <Icon size={22} />
        </div>
        {path && <ArrowRight size={16} className="text-on-surface-variant/40" />}
      </div>
      <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-2 font-display text-5xl font-medium leading-none text-on-surface">
        {loading ? (
          <span className="inline-block h-10 w-12 animate-pulse rounded bg-surface-container-highest" />
        ) : (
          value ?? "—"
        )}
      </p>
    </article>
  );

  return path ? <Link to={path}>{card}</Link> : card;
}

const cmsShortcuts = [
  {
    title: "Website Content",
    text: "Edit homepage copy, hero CTAs, metrics, testimonials, and footer blocks.",
    path: "/admin/content",
  },
  {
    title: "Services Catalog",
    text: "Update public prices, durations, featured services, and booking availability.",
    path: "/admin/services",
  },
  {
    title: "Business Settings",
    text: "Control contact details, opening hours, deposits, and notification rules.",
    path: "/admin/settings",
  },
];

export default function AdminDashboard() {
  const user = getStoredUser();
  const currentYear = new Date().getFullYear();
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());
  const today = new Date().toISOString().split("T")[0];

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "AU";
  const displayName = user?.full_name || user?.email || "Admin User";
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Admin";

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getBookings(), getServices(), getTestimonials()]).then(
      ([b, s, t]) => {
        if (b.status === "fulfilled") setBookings(b.value ?? []);
        if (s.status === "fulfilled") setServices(s.value ?? []);
        if (t.status === "fulfilled") setTestimonials(t.value ?? []);
        setLoading(false);
      }
    );
  }, []);

  const pendingCount = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending"
  ).length;

  const todayBookings = bookings
    .filter((b) => b.appointment_date === today)
    .sort((a, b) => (a.appointment_time ?? "").localeCompare(b.appointment_time ?? ""));

  const upcomingBookings = bookings
    .filter((b) => b.appointment_date >= today)
    .sort((a, b) => {
      const dateCompare = a.appointment_date.localeCompare(b.appointment_date);
      if (dateCompare !== 0) return dateCompare;
      return (a.appointment_time ?? "").localeCompare(b.appointment_time ?? "");
    })
    .slice(0, 5);

  const statCards = [
    {
      label: "Public Services",
      value: services.length,
      icon: Scissors,
      accent: "bg-primary-container/20 text-primary-container",
      path: "/admin/services",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      accent: "bg-secondary-container/35 text-secondary",
      path: "/admin/bookings",
    },
    {
      label: "Pending Bookings",
      value: pendingCount,
      icon: Clock,
      accent: "bg-amber-100 text-amber-700",
      path: "/admin/bookings",
    },
    {
      label: "Client Reviews",
      value: testimonials.length,
      icon: MessageSquareQuote,
      accent: "bg-tertiary-container/25 text-tertiary",
      path: "/admin/testimonials",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-outline-variant/30 bg-surface/90 px-5 py-4 backdrop-blur-md md:px-8">
          <div>
            <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
              Admin
            </p>
            <h1 className="font-headline text-2xl font-medium text-on-surface sm:text-3xl">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 pl-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-label text-xs font-bold uppercase tracking-[0.08em] text-on-primary"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface">
                {displayName}
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
                {displayRole}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-10 p-5 md:p-10">
          {/* Quick Links */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {cmsShortcuts.map((shortcut) => (
              <Link
                key={shortcut.title}
                to={shortcut.path}
                className="group border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-all hover:border-primary-container/40 hover:shadow-md"
              >
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  {shortcut.title}
                </h2>
                <p className="mt-3 font-body text-sm leading-6 text-on-surface-variant">
                  {shortcut.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-transform group-hover:translate-x-1">
                  Open <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </section>

          {/* Stat Cards */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map((stat) => (
              <StatCard key={stat.label} loading={loading} {...stat} />
            ))}
          </section>

          {/* Bookings */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Today's appointments */}
            <article className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
              <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-bright px-6 py-5">
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  Today
                </h2>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-primary-container">
                  {todayLabel}
                </span>
              </div>

              {loading ? (
                <div className="space-y-3 p-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded bg-surface-container-highest" />
                  ))}
                </div>
              ) : todayBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                  <CalendarDays size={36} className="text-outline-variant/50" />
                  <p className="mt-4 font-body text-sm text-on-surface-variant">
                    No appointments today
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/10">
                  {todayBookings.map((booking) => {
                    const t = formatTime(booking.appointment_time);
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center gap-4 px-6 py-4"
                      >
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-surface-container text-center">
                          <span className="font-bold text-on-surface">{t.hour}</span>
                          <span className="text-[10px] uppercase text-on-surface-variant">{t.period}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-body font-semibold text-on-surface truncate">
                            {booking.client_name}
                          </p>
                          <p className="truncate font-body text-sm text-on-surface-variant">
                            {booking.service_name || "—"}
                          </p>
                        </div>
                        <span className={`shrink-0 px-3 py-1 text-[10px] font-bold uppercase ${statusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <Link
                to="/admin/bookings"
                className="flex w-full items-center justify-center gap-2 border-t border-outline-variant/20 py-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary/5"
              >
                View All Bookings <ArrowRight size={12} />
              </Link>
            </article>

            {/* Upcoming */}
            <article className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
              <div className="border-b border-outline-variant/20 bg-surface-bright px-6 py-5">
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  Upcoming
                </h2>
              </div>

              {loading ? (
                <div className="space-y-3 p-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded bg-surface-container-highest" />
                  ))}
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                  <FileText size={36} className="text-outline-variant/50" />
                  <p className="mt-4 font-body text-sm text-on-surface-variant">
                    No upcoming bookings
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/10">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-surface-container text-center">
                        <span className="font-bold text-on-surface text-xs">
                          {formatDate(booking.appointment_date)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-body font-semibold text-on-surface truncate">
                          {booking.client_name}
                        </p>
                        <p className="truncate font-body text-sm text-on-surface-variant">
                          {booking.service_name || "—"}
                        </p>
                      </div>
                      <span className={`shrink-0 px-3 py-1 text-[10px] font-bold uppercase ${statusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to="/admin/bookings"
                className="flex w-full items-center justify-center gap-2 border-t border-outline-variant/20 py-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary/5"
              >
                Manage Bookings <ArrowRight size={12} />
              </Link>
            </article>
          </section>
        </div>

        <footer className="mt-24 border-t border-outline-variant/20 bg-surface-container-low px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-2xl text-on-surface">ThePrettyPlug</h2>
              <p className="mt-2 font-body text-sm text-on-surface-variant">
                © {currentYear} ThePrettyPlug. Admin dashboard.
              </p>
            </div>
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
