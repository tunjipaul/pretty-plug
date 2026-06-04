import {
  Bell,
  CalendarDays,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  Star,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin", active: true },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const statCards = [
  {
    label: "Homepage Sections",
    value: "7",
    icon: FileText,
    accent: "bg-primary-container/20 text-primary-container",
  },
  {
    label: "Public Services",
    value: "8",
    icon: Scissors,
    accent: "bg-secondary-container/35 text-secondary",
  },
  {
    label: "Client Stories",
    value: "2",
    icon: Star,
    accent: "bg-tertiary-container/25 text-tertiary",
  },
  {
    label: "Pending Bookings",
    value: "1",
    icon: CalendarDays,
    accent: "bg-primary-container/20 text-primary-container",
  },
];

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

const revenueBars = [
  { month: "Jan", height: "40%", active: false },
  { month: "Feb", height: "65%", active: false },
  { month: "Mar", height: "55%", active: false },
  { month: "Apr", height: "85%", active: true },
  { month: "May", height: "70%", active: false },
  { month: "Jun", height: "95%", active: true },
];

const topServices = [
  { label: "Lash Extensions", value: 45, color: "bg-primary-container" },
  { label: "Nail Art & Gels", value: 32, color: "bg-secondary" },
  { label: "Luxury Pedi", value: 23, color: "bg-tertiary" },
];

const appointments = [
  {
    time: "10",
    period: "AM",
    client: "Adesua Wellington",
    service: "Full Set Mink Lashes",
    location: "Abeokuta",
    status: "Confirmed",
    statusClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    time: "12",
    period: "PM",
    client: "Zainab Balogun",
    service: "Acrylic Refill + Art",
    location: "Suite A",
    status: "In Progress",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
  },
  {
    time: "02",
    period: "PM",
    client: "Teniola Apata",
    service: "Lash Removal & Treatment",
    location: "Main Room",
    status: "Pending",
    statusClass: "bg-surface-container-highest text-on-surface-variant",
  },
];

const activities = [
  {
    title: "New Booking",
    text: "from Funke Akindele for Hybrid Lashes.",
    time: "2 minutes ago",
    dot: "bg-primary-container",
  },
  {
    title: "Payment Received",
    text: "NGN 45,000 from Zainab Balogun.",
    time: "45 minutes ago",
    dot: "bg-green-500",
  },
  {
    title: "Client Review",
    text: "5-star rating from Bolanle Peters.",
    time: "2 hours ago",
    dot: "bg-secondary",
  },
  {
    title: "Inventory Alert",
    text: "Lash Adhesive is running low.",
    time: "4 hours ago",
    dot: "bg-tertiary",
  },
];

function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant/20 bg-surface-container p-2 pt-10 shadow-sm lg:flex">
      <div className="mb-10 px-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-primary-container">
          ThePrettyPlug Admin
        </h1>
        <p className="mt-2 font-label text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
          Abeokuta Suite
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems
          .filter((item) => item.label !== "Clients")
          .map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all ${
                item.active
                  ? "bg-primary-container font-bold text-on-primary"
                  : "text-on-surface-variant hover:translate-x-1 hover:bg-surface-variant/50"
              }`}
            >
              <Icon size={20} />
              <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 px-2 pb-8">
        <div className="border-t border-outline-variant/30 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
          >
            <HelpCircle size={20} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
              Help
            </span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
          >
            <LogOut size={20} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <article className="border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex items-start justify-between">
        <div className={`p-3 ${stat.accent}`}>
          <Icon size={24} />
        </div>
        {stat.trend ? (
          <span className="flex items-center gap-1 bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
            <TrendingUp size={14} />
            {stat.trend}
          </span>
        ) : null}
      </div>
      <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        {stat.label}
      </p>
      <h2 className="mt-2 font-display text-5xl font-medium leading-none text-on-surface">
        {stat.value}
      </h2>
    </article>
  );
}

export default function AdminDashboard() {
  const currentYear = new Date().getFullYear();
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-outline-variant/30 bg-surface/90 px-5 py-4 backdrop-blur-md md:px-8">
          <div>
            <h2 className="font-headline text-3xl font-medium text-on-surface">
              CMS Overview
            </h2>
            <p className="font-body text-sm text-on-surface-variant md:text-base">
              Manage the public website first, then operations.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
              aria-label="Notifications"
            >
              <Bell size={24} />
            </button>
            <div className="flex items-center gap-3 border-l border-outline-variant/30 pl-4">
              <div
                className="flex h-10 w-10 items-center justify-center bg-primary-container font-label text-xs font-bold uppercase tracking-[0.08em] text-on-primary"
                aria-hidden="true"
              >
                AU
              </div>
              <div className="hidden sm:block">
                <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface">
                  Admin User
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
                  Manager
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-10 p-5 md:p-10">
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {cmsShortcuts.map((shortcut) => (
              <Link
                key={shortcut.title}
                to={shortcut.path}
                className="border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition-colors hover:border-primary-container/40 hover:bg-surface-container-low"
              >
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  {shortcut.title}
                </h2>
                <p className="mt-3 font-body text-sm leading-6 text-on-surface-variant">
                  {shortcut.text}
                </p>
                <span className="mt-6 inline-block font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                  Open
                </span>
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <article className="border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm lg:col-span-2">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="font-headline text-3xl font-medium text-on-surface">
                  Revenue Overview
                </h2>
                <select className="border-none bg-surface px-4 py-3 font-label text-xs uppercase tracking-[0.12em] text-on-surface-variant outline-none">
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
              <div className="flex h-72 items-end justify-between gap-4 px-2">
                {revenueBars.map((bar) => (
                  <div
                    key={bar.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div
                      className={`w-full transition-all duration-700 ${
                        bar.active ? "bg-primary-container" : "bg-primary-fixed"
                      }`}
                      style={{ height: bar.height }}
                    />
                    <span className="font-label text-[10px] font-semibold uppercase tracking-[0.12em]">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="flex flex-col border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
              <h2 className="mb-8 font-headline text-3xl font-medium text-on-surface">
                Top Services
              </h2>
              <div className="flex flex-1 flex-col justify-center space-y-7">
                {topServices.map((service) => (
                  <div key={service.label} className="space-y-2">
                    <div className="flex items-center justify-between font-label text-xs font-semibold uppercase tracking-[0.12em]">
                      <span>{service.label}</span>
                      <span>{service.value}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden bg-surface-container">
                      <div
                        className={`h-full ${service.color}`}
                        style={{ width: `${service.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 bg-surface p-5">
                <p className="font-body text-sm italic leading-6 text-on-surface-variant">
                  "Lash extensions are up 15% from last month. Consider a
                  mid-week promo for pedicures."
                </p>
              </div>
            </article>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
              <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-bright p-6">
                <h2 className="font-headline text-3xl font-medium text-on-surface">
                  Upcoming Appointments
                </h2>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-primary-container">
                  Today, {todayLabel}
                </span>
              </div>

              <div className="divide-y divide-outline-variant/10">
                {appointments.map((appointment) => (
                  <button
                    key={`${appointment.time}-${appointment.client}`}
                    type="button"
                    className="group flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface"
                  >
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-surface-container">
                      <span className="font-bold text-on-surface">
                        {appointment.time}
                      </span>
                      <span className="text-[10px] uppercase">
                        {appointment.period}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-body font-bold text-on-surface transition-colors group-hover:text-primary-container">
                        {appointment.client}
                      </h3>
                      <p className="truncate font-body text-sm text-on-surface-variant">
                        {appointment.service} - {appointment.location}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase ${appointment.statusClass}`}
                    >
                      {appointment.status}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="w-full border-t border-outline-variant/20 py-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary/5"
              >
                View All Appointments
              </button>
            </article>

            <article className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
              <div className="border-b border-outline-variant/20 bg-surface-bright p-6">
                <h2 className="font-headline text-3xl font-medium text-on-surface">
                  Recent Activity
                </h2>
              </div>
              <div className="relative space-y-8 p-6">
                <div className="absolute bottom-10 left-8 top-10 w-px bg-outline-variant/20" />
                {activities.map((activity) => (
                  <div key={`${activity.title}-${activity.time}`} className="relative pl-8">
                    <div
                      className={`absolute left-[-2px] top-2 h-3 w-3 ${activity.dot} ring-4 ring-background`}
                    />
                    <p className="font-body text-on-surface">
                      <span className="font-bold">{activity.title}</span>{" "}
                      {activity.text}
                    </p>
                    <span className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>

        <footer className="mt-24 border-t border-outline-variant/20 bg-surface-container-low px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-2xl text-on-surface">
                ThePrettyPlug
              </h2>
              <p className="mt-2 font-body text-sm text-on-surface-variant">
                (c) {currentYear} ThePrettyPlug. Admin dashboard.
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

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 bg-surface/90 py-3 backdrop-blur-md lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                item.active ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              <Icon size={20} />
              <span className="font-label text-[10px] uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
