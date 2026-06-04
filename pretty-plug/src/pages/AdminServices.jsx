import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Edit3,
  Eye,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Scissors,
  Search,
  Settings,
  Sparkles,
  Star,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services", active: true },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const services = [
  {
    id: "SRV-101",
    name: "Classic Set",
    category: "Lashes",
    price: 25000,
    duration: "90 mins",
    bookings: 42,
    status: "Active",
    featured: true,
    description:
      "Natural mascara-look lash set with one extension applied to each natural lash.",
  },
  {
    id: "SRV-102",
    name: "Hybrid Set",
    category: "Lashes",
    price: 35000,
    duration: "120 mins",
    bookings: 58,
    status: "Active",
    featured: true,
    description:
      "Balanced lash set mixing classic extensions and volume fans.",
  },
  {
    id: "SRV-103",
    name: "Volume Set",
    category: "Lashes",
    price: 45000,
    duration: "150 mins",
    bookings: 36,
    status: "Active",
    featured: false,
    description:
      "Bold lightweight volume fans for a full, fluffy lash finish.",
  },
  {
    id: "SRV-201",
    name: "Signature Gel Manicure",
    category: "Nails",
    price: 15000,
    duration: "45 mins",
    bookings: 64,
    status: "Active",
    featured: true,
    description:
      "Cuticle care, shaping, and long-wear premium gel polish.",
  },
  {
    id: "SRV-202",
    name: "Hard Gel Extensions",
    category: "Nails",
    price: 30000,
    duration: "120 mins",
    bookings: 39,
    status: "Active",
    featured: false,
    description:
      "Sculpted builder gel extensions with strength and natural thinness.",
  },
  {
    id: "SRV-203",
    name: "Chrome and 3D Art",
    category: "Add-on",
    price: 5000,
    duration: "30 mins",
    bookings: 27,
    status: "Hidden",
    featured: false,
    description:
      "Add-on for mirror pigments or hand-sculpted 3D accents.",
  },
  {
    id: "SRV-301",
    name: "The Rosewater Soak",
    category: "Pedicure",
    price: 12000,
    duration: "45 mins",
    bookings: 31,
    status: "Active",
    featured: false,
    description:
      "Himalayan salt, rose petals, and essential oil pedicure ritual.",
  },
  {
    id: "SRV-302",
    name: "Medical Grade Pedi",
    category: "Pedicure",
    price: 20000,
    duration: "60 mins",
    bookings: 18,
    status: "Paused",
    featured: false,
    description:
      "Deep callus removal and intensive hydration therapy.",
  },
];

const categories = ["All", "Lashes", "Nails", "Pedicure", "Add-on"];

function formatPrice(value) {
  return `NGN ${value.toLocaleString()}`;
}

function statusClass(status) {
  const styles = {
    Active: "bg-green-50 text-green-700",
    Hidden: "bg-surface-container-high text-on-surface-variant",
    Paused: "bg-secondary-fixed text-on-secondary-fixed",
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
          <button className="flex w-full items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
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

function ServiceCard({ service }) {
  const StatusIcon = service.status === "Active" ? ToggleRight : ToggleLeft;

  return (
    <article className="border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm transition-colors hover:border-primary-container/40">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="bg-tertiary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed">
              {service.category}
            </span>
            {service.featured ? (
              <span className="inline-flex items-center gap-1 bg-primary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary-fixed">
                <Star size={12} />
                Featured
              </span>
            ) : null}
          </div>
          <h2 className="font-headline text-2xl font-medium text-on-surface">
            {service.name}
          </h2>
          <p className="mt-2 font-body text-sm leading-6 text-on-surface-variant">
            {service.description}
          </p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-2 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] ${statusClass(
            service.status,
          )}`}
        >
          <StatusIcon size={14} />
          {service.status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-y border-outline-variant/10 py-4">
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
            Price
          </p>
          <p className="mt-1 font-body font-bold text-on-surface">
            {formatPrice(service.price)}
          </p>
        </div>
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
            Duration
          </p>
          <p className="mt-1 inline-flex items-center gap-1 font-body text-on-surface">
            <Clock size={14} />
            {service.duration}
          </p>
        </div>
        <div>
          <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
            Bookings
          </p>
          <p className="mt-1 font-body font-bold text-on-surface">
            {service.bookings}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
          {service.id}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container"
            aria-label={`Preview ${service.name}`}
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 bg-primary-container px-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-primary"
            aria-label={`Edit ${service.name}`}
          >
            <Edit3 size={15} />
            Edit
          </button>
        </div>
      </div>
    </article>
  );
}

export default function AdminServices() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        activeCategory === "All" || service.category === activeCategory;
      const searchableText = [
        service.id,
        service.name,
        service.category,
        service.description,
        service.status,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, query]);

  const activeServices = services.filter((service) => service.status === "Active")
    .length;
  const totalBookings = services.reduce(
    (total, service) => total + service.bookings,
    0,
  );
  const averagePrice = Math.round(
    services.reduce((total, service) => total + service.price, 0) /
      services.length,
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
                Services Management
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage service names, prices, durations, visibility, and booking availability.
              </p>
            </div>

            <button
              type="button"
              aria-label="Add a new service"
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add Service
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-5 md:space-y-8 md:p-8 xl:p-10">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Active Services
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-on-surface md:text-4xl">
                {activeServices}
              </p>
            </div>
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Total Bookings
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-on-surface md:text-4xl">
                {totalBookings}
              </p>
            </div>
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                Average Price
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-on-surface md:text-4xl">
                {formatPrice(averagePrice)}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <div className="border border-outline-variant/20 bg-surface-container-low p-4 md:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <label className="relative block w-full lg:max-w-md">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                      size={18}
                    />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="h-12 w-full border-0 border-b-2 border-outline-variant bg-surface-container-lowest pl-12 pr-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
                      placeholder="Search service, category, or status"
                    />
                  </label>

                  <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`h-10 shrink-0 border px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                          activeCategory === category
                            ? "border-primary-container bg-primary-container text-on-primary"
                            : "border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {filteredServices.length === 0 ? (
                <div className="border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
                  <p className="font-headline text-2xl text-on-surface">
                    No services found
                  </p>
                  <p className="mt-2 font-body text-sm text-on-surface-variant">
                    Try another search term or category filter.
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="space-y-5">
              <section className="border border-outline-variant/20 bg-surface-container-lowest p-5">
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  Booking Rules
                </h2>
                <div className="mt-5 space-y-4">
                  {[
                    ["Deposit", "20% required before confirmation"],
                    ["Booking Window", "Mon - Sat, 9:00 AM - 7:30 PM"],
                    ["Buffer Time", "15 minutes between appointments"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-outline-variant/10 pb-4">
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        {label}
                      </p>
                      <p className="mt-1 font-body text-sm text-on-surface">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border border-outline-variant/20 bg-tertiary-fixed p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center bg-surface-container-lowest text-primary-container">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h2 className="font-headline text-2xl font-medium text-on-surface">
                      Top Performer
                    </h2>
                    <p className="font-body text-sm text-on-surface-variant">
                      Signature Gel Manicure has the highest booking volume.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </section>
        </div>
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
