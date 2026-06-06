import {
  CalendarDays,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  MessageSquareQuote,
  Plus,
  Scissors,
  Settings,
  Sparkles,
  Star,
  ToggleRight,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Website", icon: FileText, path: "/admin/content", active: true },
  { label: "Services", icon: Scissors, path: "/admin/services" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Bookings", icon: CalendarDays, path: "/admin/bookings" },
  { label: "Clients", icon: Users, path: "/admin/clients" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const contentSections = [
  {
    title: "Homepage Hero",
    description: "Headline, subtitle, CTA labels, and hero image.",
    status: "Ready",
    icon: Sparkles,
  },
  {
    title: "Trust Metrics",
    description: "Happy clients, years of excellence, reviews, and certifications.",
    status: "Ready",
    icon: Star,
  },
  {
    title: "Portfolio Preview",
    description: "Selected public gallery images and categories.",
    status: "Needs media",
    icon: Image,
    path: "/admin/gallery",
  },
  {
    title: "Testimonials",
    description: "Featured quotes, client names, services, and avatars.",
    status: "Ready",
    icon: MessageSquareQuote,
    path: "/admin/testimonials",
  },
  {
    title: "FAQ",
    description: "Public questions, answers, categories, and display order.",
    status: "Ready",
    icon: HelpCircle,
    path: "/admin/faq",
  },
  {
    title: "Footer & Contact",
    description: "Studio address, social links, email, phone, and opening copy.",
    status: "Ready",
    icon: LinkIcon,
    path: "/admin/settings",
  },
];

const draftContent = {
  eyebrow: "Abeokuta Luxury Suite",
  headline: "Best Nails for Best Moments",
  highlight: "Best Moments",
  body:
    "Loved by beauty minimalists and curated for the meticulous. Step into an era of editorial beauty where every finish is personal.",
  primaryCta: "Book Appointment",
  secondaryCta: "View Portfolio",
};

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

function Field({ label, value }) {
  return (
    <label className="block">
      <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </span>
      <input
        defaultValue={value}
        className="mt-2 h-12 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
      />
    </label>
  );
}

export default function AdminContent() {
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
                Website Content
              </h1>
              <p className="mt-1 font-body text-sm text-on-surface-variant md:text-base">
                Edit public website copy, media, links, and section visibility without touching code.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 bg-primary-container px-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
            >
              <Plus size={17} />
              Add Content Block
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-5 md:p-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:p-10">
          <section className="space-y-6">
            <div className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-medium text-on-surface">
                    Homepage Hero
                  </h2>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    This controls the first screen of the public homepage.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-green-700">
                  <ToggleRight size={14} />
                  Published
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Eyebrow" value={draftContent.eyebrow} />
                <Field label="Highlight Text" value={draftContent.highlight} />
                <Field label="Primary CTA" value={draftContent.primaryCta} />
                <Field label="Secondary CTA" value={draftContent.secondaryCta} />
              </div>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Headline
                </span>
                <textarea
                  defaultValue={draftContent.headline}
                  rows={2}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Body Copy
                </span>
                <textarea
                  defaultValue={draftContent.body}
                  rows={4}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {contentSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.title}
                    className="border border-outline-variant/20 bg-surface-container-lowest p-5 transition-colors hover:border-primary-container/40"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center bg-primary-fixed text-primary-container">
                        <Icon size={19} />
                      </div>
                      <span className="bg-surface-container-high px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                        {section.status}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl font-medium text-on-surface">
                      {section.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-6 text-on-surface-variant">
                      {section.description}
                    </p>
                    <Link
                      to={section.path ?? "/admin/content"}
                      className="mt-6 inline-block font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container"
                    >
                      Edit Section
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="border border-outline-variant/20 bg-surface-container-lowest p-5">
              <h2 className="font-headline text-2xl font-medium text-on-surface">
                CMS Priority
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  ["1", "Homepage content"],
                  ["2", "Services and pricing"],
                  ["3", "Portfolio/gallery media"],
                  ["4", "Testimonials and FAQ"],
                  ["5", "Footer and business settings"],
                ].map(([step, label]) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center bg-primary-container font-label text-xs font-bold text-on-primary">
                      {step}
                    </div>
                    <p className="font-body text-sm text-on-surface">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-outline-variant/20 bg-tertiary-fixed p-5">
              <h2 className="font-headline text-2xl font-medium text-on-surface">
                How This Connects Later
              </h2>
              <p className="mt-3 font-body text-sm leading-6 text-on-surface-variant">
                Backend work should replace hardcoded page arrays with CMS records. These controls are structured to map directly into homepage, services, portfolio, testimonials, FAQ, and footer content.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 bg-surface/90 px-1 py-3 backdrop-blur-md lg:hidden">
        {navItems
          .filter((item) =>
            ["Dashboard", "Website", "Services", "Gallery", "Settings"].includes(
              item.label,
            ),
          )
          .map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 ${
                  item.active
                    ? "text-primary-container"
                    : "text-on-surface-variant"
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
