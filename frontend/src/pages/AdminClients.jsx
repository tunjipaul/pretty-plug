import { useEffect, useMemo, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquareQuote,
  Phone,
  Plus,
  Scissors,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getBookings } from "../lib/content";
import SeoHead from "../components/SeoHead";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients", active: true },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const sampleClients = [
  {
    id: "CL-1001",
    name: "Chinwe Okoro",
    initials: "CO",
    email: "chinwe.okoro@outlook.com",
    phone: "+234 812 345 6789",
    location: "Abeokuta",
    status: "VIP",
    focus: "Lashes & Brows",
    lastSeen: "Active",
    loyalty: "Gold",
    totalSpend: 450000,
    visits: 14,
    frequency: "Bi-weekly",
    notes:
      "Prefers a quiet appointment and ginger tea with honey on arrival.",
    sensitivities: ["Latex-based lash adhesive", "Sensitive eye area"],
    preferences: [
      "Natural mapping for lash extensions",
      "Thin French tips",
      "High-gloss finish",
    ],
    history: [
      { service: "Classic Lash Refill + Brow Tint", date: "May 28, 2026", amount: 32000 },
      { service: "Luxury Gel Manicure", date: "May 14, 2026", amount: 25000 },
      { service: "Hydra-Radiance Facial", date: "Apr 30, 2026", amount: 55000 },
    ],
  },
  {
    id: "CL-1002",
    name: "Amina Bello",
    initials: "AB",
    email: "amina.bello@gmail.com",
    phone: "+234 803 112 9002",
    location: "Lafenwa",
    status: "Regular",
    focus: "Nail Art",
    lastSeen: "2 weeks ago",
    loyalty: "Silver",
    totalSpend: 210000,
    visits: 8,
    frequency: "Monthly",
    notes: "Likes short square nails and neutral colors for work weeks.",
    sensitivities: ["Avoid strong acetone smell"],
    preferences: ["Short square shape", "Neutral gel polish", "Minimal art"],
    history: [
      { service: "Gel Extensions", date: "May 20, 2026", amount: 25000 },
      { service: "Luxury Pedi", date: "Apr 29, 2026", amount: 12000 },
    ],
  },
  {
    id: "CL-1003",
    name: "Zainab Yusuf",
    initials: "ZY",
    email: "zainab.yusuf@icloud.com",
    phone: "+234 907 443 1820",
    location: "Onikolobo",
    status: "Pending",
    focus: "Facial",
    lastSeen: "1 month ago",
    loyalty: "Starter",
    totalSpend: 85000,
    visits: 3,
    frequency: "Occasional",
    notes: "New client. Confirm skincare products before facial treatments.",
    sensitivities: ["Fragrance-sensitive skincare"],
    preferences: ["Hydrating facial", "Soft glam brows"],
    history: [
      { service: "Signature Brows", date: "Apr 18, 2026", amount: 8000 },
      { service: "Silk Lash Lift", date: "Mar 25, 2026", amount: 18000 },
    ],
  },
  {
    id: "CL-1004",
    name: "Teniola Apata",
    initials: "TA",
    email: "teni.apata@gmail.com",
    phone: "+234 810 602 4411",
    location: "Ibara",
    status: "Regular",
    focus: "Full Glam",
    lastSeen: "4 days ago",
    loyalty: "Gold",
    totalSpend: 330000,
    visits: 11,
    frequency: "Every 3 weeks",
    notes: "Often books evening appointments and prefers WhatsApp reminders.",
    sensitivities: ["None recorded"],
    preferences: ["Long almond nails", "Wispy lash sets", "Evening slots"],
    history: [
      { service: "The Full Glam Plug", date: "Jun 01, 2026", amount: 45000 },
      { service: "Classic Manicure", date: "May 10, 2026", amount: 15000 },
    ],
  },
];

function formatPrice(value) {
  return `NGN ${value.toLocaleString()}`;
}

function ClientListItem({ client, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(client.id)}
      className={`w-full border p-4 text-left transition-colors ${
        isActive
          ? "border-primary-container bg-surface-container-lowest shadow-sm"
          : "border-transparent hover:bg-surface-container-high"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-fixed font-label text-xs font-bold text-on-primary-fixed">
          {client.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-body font-bold text-on-surface">
            {client.name}
          </p>
          <p className="truncate text-sm text-on-surface-variant">
            {client.focus} - {client.lastSeen}
          </p>
        </div>
        <span className="shrink-0 bg-secondary-fixed px-2 py-1 font-label text-[10px] font-bold uppercase tracking-[0.1em] text-on-secondary-fixed">
          {client.status}
        </span>
      </div>
    </button>
  );
}

export default function AdminClients() {
  const [query, setQuery] = useState("");
  const [apiBookings, setApiBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then((data) => {
        if (data) setApiBookings(data);
      })
      .catch((err) => console.error("Failed to fetch bookings for clients:", err))
      .finally(() => setLoading(false));
  }, []);

  const dynamicClients = useMemo(() => {
    if (!apiBookings || apiBookings.length === 0) return sampleClients;

    const grouped = {};

    apiBookings.forEach((b, idx) => {
      const name = b.client_name || b.client || `Client #${b.id || idx + 1}`;
      const email = b.client_email || b.email || "No email";
      const phone = b.client_phone || b.phone || "No phone";
      const key = email !== "No email" ? email.toLowerCase() : name.toLowerCase();

      if (!grouped[key]) {
        const parts = name.split(" ");
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();

        grouped[key] = {
          id: `CL-API-${idx + 1}`,
          name,
          initials,
          email,
          phone,
          location: "Online Booking",
          status: b.status || "Active",
          focus: b.service_name || b.service || "Beauty Care",
          lastSeen: b.appointment_date || "Recent",
          loyalty: "Member",
          totalSpend: 0,
          visits: 0,
          frequency: "Regular",
          notes: b.notes || "Booked online",
          sensitivities: ["None recorded"],
          preferences: [b.service_name || b.service || "Standard service"],
          history: [],
        };
      }

      const price = b.price || b.amount || 0;
      grouped[key].totalSpend += Number(price);
      grouped[key].visits += 1;
      grouped[key].history.push({
        service: b.service_name || b.service || "Appointment",
        date: b.appointment_date || "Booked",
        amount: price,
      });
    });

    const realList = Object.values(grouped);
    return realList.length > 0 ? realList : sampleClients;
  }, [apiBookings]);

  const [selectedId, setSelectedId] = useState(null);

  const activeClients = dynamicClients;
  const currentSelected =
    activeClients.find((c) => c.id === selectedId) ?? activeClients[0];

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeClients.filter((client) =>
      [
        client.name,
        client.email,
        client.phone,
        client.location,
        client.focus,
        client.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, activeClients]);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <SeoHead title="Client Directory | ThePrettyPlug" noindex={true} />
      <AdminSidebar />

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                Admin
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Client Directory
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Track client profiles, preferences, history, and loyalty.
              </p>
            </div>
            <button
              type="button"
              aria-label="Add a client profile"
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add Client
            </button>
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="border-b border-outline-variant/20 bg-surface-container-low lg:border-b-0 lg:border-r">
            <div className="p-4">
              <label className="relative block">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-12 w-full border border-outline-variant/40 bg-surface-container-lowest pl-12 pr-4 font-body text-sm outline-none transition-colors focus:border-primary-container"
                  placeholder="Search clients"
                />
              </label>
            </div>
            <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-4 lg:block lg:max-h-[calc(100vh-160px)] lg:space-y-2 lg:overflow-y-auto lg:px-2">
              {filteredClients.map((client) => (
                <div key={client.id} className="w-[285px] shrink-0 lg:w-auto">
                  <ClientListItem
                    client={client}
                    isActive={client.id === currentSelected.id}
                    onSelect={setSelectedId}
                  />
                </div>
              ))}
            </div>
          </aside>

          <section className="space-y-8 p-4 sm:p-5 md:p-8 xl:p-10">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
              <div className="border border-outline-variant/20 bg-surface-container-lowest p-6 text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center bg-primary-fixed font-display text-5xl font-semibold text-on-primary-fixed">
                  {currentSelected.initials}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 bg-secondary-fixed px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.12em] text-on-secondary-fixed">
                  <Star size={14} />
                  {currentSelected.loyalty}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-headline text-4xl font-medium text-on-surface">
                        {currentSelected.name}
                      </h2>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                        aria-label={`Edit ${currentSelected.name}`}
                      >
                        <Edit3 size={17} />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 text-sm text-on-surface-variant md:flex-row md:flex-wrap md:items-center">
                      <span className="inline-flex items-center gap-2">
                        <Mail size={16} />
                        {currentSelected.email}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Phone size={16} />
                        {currentSelected.phone}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={16} />
                        {currentSelected.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="border border-outline-variant/20 bg-surface-container-lowest p-5">
                    <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      Total Spend
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-primary-container">
                      {formatPrice(currentSelected.totalSpend)}
                    </p>
                  </div>
                  <div className="border border-outline-variant/20 bg-surface-container-lowest p-5">
                    <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      Visits
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-on-surface">
                      {currentSelected.visits}
                    </p>
                  </div>
                  <div className="border border-outline-variant/20 bg-surface-container-lowest p-5">
                    <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      Frequency
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold text-secondary">
                      {currentSelected.frequency}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-headline text-2xl font-medium text-on-surface">
                    Appointment History
                  </h3>
                  <button className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {currentSelected.history.map((entry) => (
                    <article
                      key={`${entry.service}-${entry.date}`}
                      className="flex flex-col gap-3 border border-outline-variant/10 bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-fixed text-primary-container">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <p className="font-body font-bold text-on-surface">
                            {entry.service}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            {entry.date} - Abeokuta Suite
                          </p>
                        </div>
                      </div>
                      <p className="font-body font-bold text-primary-container">
                        {formatPrice(entry.amount)}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="border border-outline-variant/20 bg-tertiary-fixed p-5 md:p-6">
                <h3 className="font-headline text-2xl font-medium text-on-surface">
                  Client Notes & Preferences
                </h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="mb-2 font-label text-xs font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed-variant">
                      Medical & Sensitivities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentSelected.sensitivities.map((item) => (
                        <span
                          key={item}
                          className="bg-surface-container-lowest px-3 py-2 text-sm text-on-surface"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-label text-xs font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed-variant">
                      Style Preferences
                    </p>
                    <ul className="space-y-2">
                      {currentSelected.preferences.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 size={16} className="text-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface-container-lowest p-4">
                    <p className="font-body text-sm italic leading-6 text-on-surface-variant">
                      "{currentSelected.notes}"
                    </p>
                  </div>
                  <button className="h-11 w-full bg-tertiary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-tertiary-container transition-colors hover:bg-tertiary">
                    Update Preferences
                  </button>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>

      <MobileAdminNav />
    </div>
  );
}
