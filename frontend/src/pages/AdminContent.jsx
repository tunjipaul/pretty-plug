import { useEffect, useState } from "react";
import { AdminSidebar, MobileAdminNav } from "../components/AdminSidebar";
import { ApiErrorDisplay } from "../components/ApiErrorBoundary";
import {
  CalendarDays,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  MessageSquareQuote,
  Scissors,
  Settings,
  Sparkles,
  Star,
  ToggleRight,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getContent, saveContent } from "../lib/content";

const contentSections = [
  {
    title: "Homepage Hero",
    description: "Headline, subtitle, CTA labels, and hero image.",
    status: "Ready",
    icon: Sparkles,
    anchor: "#hero-section",
  },
  {
    title: "Trust Metrics",
    description: "Happy clients, years of excellence, reviews, and certifications.",
    status: "Ready",
    icon: Star,
    anchor: "#trust-metrics-section",
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
  hero: {
    eyebrow: "Abeokuta Luxury Suite",
    headline: "Best Nails for Best Moments",
    highlight: "Best Moments",
    body:
      "Loved by beauty minimalists and curated for the meticulous. Step into an era of editorial beauty where every finish is personal.",
    primaryCta: "Book Appointment",
    secondaryCta: "View Portfolio",
  },
  trustMetrics: {
    items: [
      { value: "500+", label: "Happy Clients" },
      { value: "3+", label: "Years Excellence" },
      { value: "5", label: "Star Reviews" },
      { value: "1", label: "Certified Master" },
    ],
  },
};

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
      />
    </label>
  );
}

function AdminContentSkeleton() {
  return (
    <main className="min-h-screen pb-28 lg:ml-64 lg:pb-0">
      <div className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/90 px-4 py-4 backdrop-blur-md sm:px-5 md:px-8">
        <div className="flex flex-col gap-4">
          <div className="h-5 w-40 rounded-full bg-surface-container-highest animate-pulse" />
          <div className="h-6 w-3/4 rounded-full bg-surface-container-highest animate-pulse" />
          <div className="h-4 w-full max-w-2xl rounded-full bg-surface-container-highest animate-pulse" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-5 md:p-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:p-10">
        <section className="space-y-6">
          <div className="space-y-4 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
            <div className="h-6 w-72 rounded-full bg-surface-container-highest animate-pulse" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-16 rounded-3xl bg-surface-container-highest animate-pulse" />
              <div className="h-16 rounded-3xl bg-surface-container-highest animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-40 rounded-3xl bg-surface-container-highest animate-pulse" />
              <div className="h-24 rounded-3xl bg-surface-container-highest animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm"
              >
                <div className="h-5 w-32 rounded-full bg-surface-container-highest animate-pulse" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-full rounded-full bg-surface-container-highest animate-pulse" />
                  <div className="h-4 w-5/6 rounded-full bg-surface-container-highest animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm"
            >
              <div className="h-6 w-40 rounded-full bg-surface-container-highest animate-pulse" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-full rounded-full bg-surface-container-highest animate-pulse" />
                <div className="h-4 w-5/6 rounded-full bg-surface-container-highest animate-pulse" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}

export default function AdminContent() {
  const [draft, setDraft] = useState(draftContent);
  const [status, setStatus] = useState("Saved");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContent()
      .then((data) => {
        console.log("CMS DEBUG: Received content:", data);
        if (data) {
          setDraft((current) => ({
            ...current,
            ...data,
            hero: {
              ...current.hero,
              ...(data.hero || {}),
            },
            trustMetrics: {
              items: data.trustMetrics?.items || current.trustMetrics.items,
            },
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content:", err);
        setError(err.message || "Failed to load content from server");
        setLoading(false);
      });
  }, []);

  function updateHeroField(field, value) {
    setDraft((current) => ({
      ...current,
      hero: { ...current.hero, [field]: value },
    }));
    setStatus("Unsaved");
    setError(null);
  }

  function updateMetric(index, field, value) {
    setDraft((current) => {
      const newItems = [...current.trustMetrics.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...current,
        trustMetrics: { ...current.trustMetrics, items: newItems },
      };
    });
    setStatus("Unsaved");
  }

  async function handleSave() {
    setStatus("Saving...");
    setError(null);
    try {
      await saveContent(draft);
      setStatus("Saved");
    } catch (err) {
      console.error("Save failed:", err);
      const errMsg = err.message || "Failed to save content to server";
      setError(errMsg);
      setStatus("Error saving");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <AdminSidebar />
        <AdminContentSkeleton />
        <MobileAdminNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminSidebar />
      <ApiErrorDisplay error={error} onDismiss={() => setError(null)} />

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


          </div>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-5 md:p-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:p-10">
          <section className="space-y-10">
            {/* HERO SECTION */}
            <div id="hero-section" className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6">
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
                <Field
                  label="Eyebrow"
                  value={draft.hero.eyebrow}
                  onChange={(value) => updateHeroField("eyebrow", value)}
                />
                <Field
                  label="Highlight Text"
                  value={draft.hero.highlight}
                  onChange={(value) => updateHeroField("highlight", value)}
                />
                <Field
                  label="Primary CTA"
                  value={draft.hero.primaryCta}
                  onChange={(value) => updateHeroField("primaryCta", value)}
                />
                <Field
                  label="Secondary CTA"
                  value={draft.hero.secondaryCta}
                  onChange={(value) => updateHeroField("secondaryCta", value)}
                />
              </div>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Headline
                </span>
                <textarea
                  value={draft.hero.headline}
                  onChange={(event) => updateHeroField("headline", event.target.value)}
                  rows={2}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
              <label className="mt-4 block">
                <span className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                  Body Copy
                </span>
                <textarea
                  value={draft.hero.body}
                  onChange={(event) => updateHeroField("body", event.target.value)}
                  rows={4}
                  className="mt-2 w-full resize-none border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface outline-none transition-colors focus:border-primary-container"
                />
              </label>
            </div>

            {/* TRUST METRICS SECTION */}
            <div id="trust-metrics-section" className="border border-outline-variant/20 bg-surface-container-lowest p-5 md:p-6">
              <div className="mb-6">
                <h2 className="font-headline text-2xl font-medium text-on-surface">
                  Trust Metrics
                </h2>
                <p className="mt-1 font-body text-sm text-on-surface-variant">
                  Stats and highlights shown after the hero section.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {draft.trustMetrics.items.map((metric, idx) => (
                  <div key={idx} className="space-y-3">
                    <Field
                      label={`Value ${idx + 1}`}
                      value={metric.value}
                      onChange={(val) => updateMetric(idx, "value", val)}
                    />
                    <Field
                      label={`Label ${idx + 1}`}
                      value={metric.label}
                      onChange={(val) => updateMetric(idx, "label", val)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
              >
                Save All Changes
              </button>
              <span className="font-body text-sm text-on-surface-variant">
                Status: {status}
              </span>
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
                    {section.anchor ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(section.anchor.replace('#', ''));
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="mt-6 inline-block font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container hover:text-primary"
                      >
                        Edit Section ↑
                      </button>
                    ) : (
                      <Link
                        to={section.path ?? "/admin/content"}
                        className="mt-6 inline-block font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container"
                      >
                        Edit Section
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </section>



        </div>
      </main>

      <MobileAdminNav />
    </div>
  );
}
