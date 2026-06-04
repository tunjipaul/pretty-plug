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
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content" },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials", active: true },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const reviews = [
  {
    author: "Ifeoma Adeyemi",
    service: "Hybrid Lash Set",
    quote:
      "The attention to detail at ThePrettyPlug is unmatched. My lashes lasted for weeks and looked incredibly natural.",
    status: "Featured",
  },
  {
    author: "Sarah Cole",
    service: "Signature Gel Manicure",
    quote:
      "Finally found a studio that understands editorial nail art. The environment is serene, precise, and professional.",
    status: "Published",
  },
  {
    author: "Kemi Balogun",
    service: "Classic Manicure",
    quote:
      "Quick, efficient, and clean. Exactly what I need for a lunch break service.",
    status: "Draft",
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
      <Link
        to="/"
        className="mx-2 mb-8 flex items-center gap-3 border-t border-outline-variant/30 px-4 py-4 text-on-surface-variant"
      >
        <LogOut size={20} />
        <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
          Back to Site
        </span>
      </Link>
    </aside>
  );
}

export default function AdminTestimonials() {
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
                Testimonials
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Manage public reviews, featured quotes, client names, and service labels.
              </p>
            </div>
            <button className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary">
              <Plus size={17} />
              Add Testimonial
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-5xl space-y-4 p-4 sm:p-5 md:p-8 xl:p-10">
          {reviews.map((review) => (
            <article
              key={review.author}
              className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-medium text-on-surface">
                    {review.author}
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant">
                    {review.service}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 bg-primary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary-fixed">
                  <Star size={12} />
                  {review.status}
                </span>
              </div>
              <p className="font-body text-base italic leading-7 text-on-surface">
                "{review.quote}"
              </p>
              <button className="mt-5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                Edit Review
              </button>
            </article>
          ))}
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
