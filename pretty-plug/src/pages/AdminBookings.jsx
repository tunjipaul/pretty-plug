import { useMemo, useState } from "react";
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
  LayoutDashboard,
  LogOut,
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

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings", active: true },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const bookings = [
  {
    id: "TPP-1048",
    client: "Folake Adeyemi",
    email: "folake.a@gmail.com",
    phone: "+234 810 443 2941",
    initials: "FA",
    service: "Gel Extensions",
    date: "Jun 05, 2026",
    time: "10:30 AM",
    specialist: "Tomi A.",
    status: "Confirmed",
    amount: 25000,
    deposit: 5000,
  },
  {
    id: "TPP-1047",
    client: "Chidinma Okafor",
    email: "chichi.o@yahoo.com",
    phone: "+234 803 221 1004",
    initials: "CO",
    service: "The Full Glam Plug",
    date: "Jun 05, 2026",
    time: "12:00 PM",
    specialist: "Tomi A.",
    status: "Pending",
    amount: 45000,
    deposit: 9000,
  },
  {
    id: "TPP-1046",
    client: "Teniola Apata",
    email: "teni.apata@icloud.com",
    phone: "+234 907 302 4418",
    initials: "TA",
    service: "Silk Lash Lift",
    date: "Jun 04, 2026",
    time: "03:00 PM",
    specialist: "Aisha B.",
    status: "In Progress",
    amount: 18000,
    deposit: 3600,
  },
  {
    id: "TPP-1045",
    client: "Sandra Bello",
    email: "sbello@gmail.com",
    phone: "+234 809 778 1190",
    initials: "SB",
    service: "Classic Manicure",
    date: "Jun 04, 2026",
    time: "04:30 PM",
    specialist: "Tomi A.",
    status: "Completed",
    amount: 15000,
    deposit: 3000,
  },
  {
    id: "TPP-1044",
    client: "Amaka Nwosu",
    email: "amaka.nwosu@gmail.com",
    phone: "+234 802 660 9182",
    initials: "AN",
    service: "Luxury Pedi",
    date: "Jun 03, 2026",
    time: "01:30 PM",
    specialist: "Aisha B.",
    status: "Cancelled",
    amount: 12000,
    deposit: 0,
  },
];

const filters = ["All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled"];

function formatPrice(value) {
  return `NGN ${value.toLocaleString()}`;
}

function statusStyles(status) {
  const styles = {
    Confirmed: "bg-primary-fixed text-on-primary-fixed",
    Pending: "bg-secondary-fixed text-on-secondary-fixed",
    "In Progress": "bg-tertiary-fixed text-on-tertiary-fixed",
    Completed: "bg-green-50 text-green-700",
    Cancelled: "bg-error-container text-on-error-container",
  };

  return styles[status] ?? "bg-surface-container text-on-surface-variant";
}

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

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] ${statusStyles(
        status,
      )}`}
    >
      {status === "Cancelled" ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
      {status}
    </span>
  );
}

export default function AdminBookings() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const currentYear = new Date().getFullYear();

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter =
        activeFilter === "All" || booking.status === activeFilter;
      const searchableText = [
        booking.id,
        booking.client,
        booking.email,
        booking.phone,
        booking.service,
        booking.specialist,
        booking.status,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, query]);

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;
  const pendingCount = bookings.filter((booking) => booking.status === "Pending")
    .length;
  const projectedRevenue = bookings.reduce(
    (total, booking) =>
      booking.status === "Cancelled" ? total : total + booking.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-background text-on-background">
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
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="group transition-colors hover:bg-surface-container-low"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center bg-primary-fixed font-label text-xs font-bold text-on-primary-fixed">
                            {booking.initials}
                          </div>
                          <div>
                            <p className="font-body font-bold text-on-surface">
                              {booking.client}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              {booking.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="font-body font-semibold text-on-surface">
                          {booking.service}
                        </p>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          {booking.id}
                        </p>
                      </td>
                      <td className="p-5">
                        <p className="font-body text-on-surface">{booking.date}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                          <Clock size={13} />
                          {booking.time}
                        </p>
                      </td>
                      <td className="p-5 font-body text-on-surface">
                        {booking.specialist}
                      </td>
                      <td className="p-5">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="p-5">
                        <p className="font-body font-bold text-on-surface">
                          {formatPrice(booking.amount)}
                        </p>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          Deposit {formatPrice(booking.deposit)}
                        </p>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-end gap-3">
                          <button className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                            Edit
                          </button>
                          <button
                            className="h-9 w-9 text-on-surface-variant transition-colors hover:bg-surface-container"
                            aria-label={`More actions for ${booking.client}`}
                          >
                            <MoreHorizontal className="mx-auto" size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-outline-variant/10 xl:hidden">
              {filteredBookings.map((booking) => (
                <article key={booking.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-fixed font-label text-xs font-bold text-on-primary-fixed">
                        {booking.initials}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate font-body font-bold text-on-surface">
                          {booking.client}
                        </h2>
                        <p className="truncate text-xs text-on-surface-variant">
                          {booking.email}
                        </p>
                      </div>
                    </div>
                    <div className="sm:shrink-0">
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        Service
                      </p>
                      <p className="mt-1 font-body font-semibold text-on-surface">
                        {booking.service}
                      </p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        Date
                      </p>
                      <p className="mt-1 font-body text-on-surface">
                        {booking.date}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {booking.time}
                      </p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        Amount
                      </p>
                      <p className="mt-1 font-body font-bold text-on-surface">
                        {formatPrice(booking.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        Specialist
                      </p>
                      <p className="mt-1 font-body text-on-surface">
                        {booking.specialist}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-outline-variant/10 pt-4">
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      {booking.id}
                    </span>
                    <button className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                      Edit
                    </button>
                  </div>
                </article>
              ))}
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
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">
                <ChevronLeft size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center bg-primary-container font-label text-xs font-bold text-on-primary">
                1
              </button>
              <button className="flex h-10 w-10 items-center justify-center border border-outline-variant font-label text-xs font-bold text-on-surface-variant hover:bg-surface-container-high">
                2
              </button>
              <button className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

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

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 bg-surface/90 px-1 py-3 backdrop-blur-md lg:hidden">
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
