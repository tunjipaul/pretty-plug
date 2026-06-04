import {
  CalendarDays,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Plus,
  Scissors,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery", active: true },
  { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const galleryItems = [
  {
    title: "Golden Hour Manicure",
    category: "Nails",
    image: "/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif",
    visibility: "Featured",
  },
  {
    title: "Volume Lash Artistry",
    category: "Lashes",
    image: "/images/lashes.png",
    visibility: "Published",
  },
  {
    title: "Milk and Honey Pedicure",
    category: "Pedicure",
    image: "/images/pedi.jpg",
    visibility: "Published",
  },
  {
    title: "Artisan Florals",
    category: "Nails",
    image: "/images/gallery-2.png",
    visibility: "Draft",
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
          CMS Console
        </p>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
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
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
          >
            <LogOut size={20} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
              Back to Site
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function AdminGallery() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />
      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.16em] text-primary-container">
                CMS
              </p>
              <h1 className="mt-1 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl">
                Gallery & Portfolio
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage public portfolio images, categories, captions, and featured work.
              </p>
            </div>
            <button className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary">
              <Plus size={17} />
              Add Gallery Item
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-5 md:p-8 xl:p-10">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden border border-outline-variant/20 bg-surface-container-lowest"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="bg-tertiary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-tertiary-fixed">
                      {item.category}
                    </span>
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      {item.visibility}
                    </span>
                  </div>
                  <h2 className="font-headline text-2xl font-medium text-on-surface">
                    {item.title}
                  </h2>
                  <button className="mt-5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                    Edit Image Content
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
      <MobileAdminNav navItems={navItems} />
    </div>
  );
}

function MobileAdminNav({ navItems }) {
  const visible = ["Dashboard", "Website", "Services", "Gallery", "Settings"];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 bg-surface/90 px-1 py-3 backdrop-blur-md lg:hidden">
      {navItems
        .filter((item) => visible.includes(item.label))
        .map((item) => {
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
  );
}
