import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Gavel,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";
import { getFAQs, getContent } from "../lib/content";
import SeoHead from "../components/SeoHead";
import { getFaqSchema, getBreadcrumbSchema } from "../lib/seoSchemas";

function getIconForCategory(categoryStr) {
  const cat = (categoryStr || "").toLowerCase();
  if (cat.includes("book")) return CalendarDays;
  if (cat.includes("price") || cat.includes("pay")) return CreditCard;
  if (cat.includes("care") || cat.includes("after")) return Sparkles;
  if (cat.includes("policy") || cat.includes("rule")) return Gavel;
  return MessageCircle;
}

function FAQAccordion({ item, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group border border-outline-variant/30 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-surface-container-lowest"
      >
        <span className="font-headline text-lg font-medium text-on-surface md:text-xl">
          {item.question}
        </span>
        <span
          className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/30 transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-primary-container text-on-primary" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-outline-variant/20 p-6 pt-4 font-body text-base leading-7 text-on-surface-variant">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerContent, setHeaderContent] = useState(null);

  useEffect(() => {
    getContent().then((data) => {
      if (data?.pageHeaders?.faq) {
        setHeaderContent(data.pageHeaders.faq);
      }
    });

    getFAQs()
      .then((data) => {
        if (data) {
          const published = data.filter((f) => f.is_published);
          setFaqs(published);
          
          if (published.length > 0) {
            setActiveCategory(published[0].category || "General");
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);
  const faqSchema = getFaqSchema(faqs);
  const schemas = [breadcrumbs, faqSchema].filter(Boolean);

  const categories = useMemo(() => {
    const grouped = {};
    for (const f of faqs) {
      const cat = f.category || "General";
      if (!grouped[cat]) {
        grouped[cat] = {
          id: cat,
          label: cat,
          icon: getIconForCategory(cat),
          questions: [],
        };
      }
      grouped[cat].questions.push(f);
    }
    return Object.values(grouped);
  }, [faqs]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    return categories
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [categories, searchQuery]);

  return (
    <>
      <SeoHead
        title={headerContent?.title || "Frequently Asked Questions | ThePrettyPlug Abeokuta"}
        description={headerContent?.subtitle || "Find answers to booking questions, gel manicure care, lash maintenance, Sunday hours, and deposit policies."}
        canonicalPath="/faq"
        schema={schemas}
      />
      <Navbar />
      <main className="pb-20 md:pb-0">
        <RevealSection>
          <header className="mx-auto max-w-[1280px] px-5 pb-10 pt-20 text-center md:px-20 md:pt-28">
            <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
              Need Assistance?
            </span>
            <h1 className="mb-8 font-display text-[40px] font-semibold leading-tight text-on-surface md:text-[64px]">
              {headerContent?.title || "Frequently Asked Questions"}
            </h1>
            <p className="mx-auto max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
              {headerContent?.subtitle || "Everything you need to know about preparing for your service, our studio policies, and managing your booking."}
            </p>
          </header>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="bg-surface-container-lowest">
            <div className="mx-auto max-w-4xl px-5 py-10 md:px-20">
              <div className="relative mx-auto max-w-2xl">
                <div className="flex h-16 w-full items-center border border-outline-variant/40 bg-white px-6 shadow-sm transition-shadow focus-within:border-primary-container focus-within:shadow-md">
                  <Search className="mr-4 text-outline" size={22} />
                  <input
                    id="faq-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full bg-transparent font-body text-base outline-none placeholder:text-outline/60 md:text-lg"
                    placeholder="Search for pricing, aftercare, or policies..."
                    type="search"
                  />
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
              {loading ? (
                <div className="flex w-full h-64 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
                </div>
              ) : faqs.length === 0 ? (
                <div className="flex w-full h-64 items-center justify-center font-body text-on-surface-variant">
                  No FAQs available.
                </div>
              ) : (
                <>
                  <aside className="w-full lg:sticky lg:top-32 lg:w-1/3">
                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;

                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setSearchQuery("");
                            }}
                            className={`flex w-full items-center gap-4 border-l-2 p-4 text-left transition-colors ${
                              isActive
                                ? "border-primary-container bg-surface-container-low"
                                : "border-transparent text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface"
                            }`}
                          >
                            <Icon
                              size={20}
                              className={
                                isActive ? "text-primary-container" : "text-outline"
                              }
                            />
                            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em]">
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </aside>

                  <div className="w-full lg:w-2/3">
                    {filteredCategories.length === 0 ? (
                      <div className="py-20 text-center text-on-surface-variant">
                        <Search size={32} className="mx-auto mb-4 opacity-50" />
                        <p className="font-body text-base">
                          No answers found for "{searchQuery}"
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container"
                        >
                          Clear Search
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-16">
                        {filteredCategories.map(
                          (cat) =>
                            (searchQuery || activeCategory === cat.id) && (
                              <div key={cat.id}>
                                <h2 className="mb-8 font-headline text-3xl font-medium text-on-surface flex items-center gap-4">
                                  <span className="bg-primary-container/10 p-3 text-primary-container rounded-full">
                                    <cat.icon size={22} />
                                  </span>
                                  {cat.label}
                                </h2>
                                <div className="flex flex-col gap-4">
                                  {cat.questions.map((q, index) => (
                                    <FAQAccordion
                                      key={q.question}
                                      item={q}
                                      defaultOpen={index === 0 && !searchQuery}
                                    />
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="bg-surface-container px-5 py-24 text-center md:px-20 md:py-32">
          <div className="mx-auto max-w-2xl border border-outline-variant/20 bg-white p-10 shadow-2xl">
            <span className="mb-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary-container">
                <MessageCircle size={32} />
              </span>
            </span>
            <h2 className="mb-4 font-headline text-3xl font-medium text-on-surface">
              Still Have Questions?
            </h2>
            <p className="mb-10 font-body text-base text-on-surface-variant">
              Can't find the answer you're looking for? Reach out to our
              concierge team. We typically respond within 2 hours during business
              hours.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex h-12 items-center justify-center bg-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
              >
                Contact Us
              </a>
              <a
                href="tel:+23400000000"
                className="inline-flex h-12 items-center justify-center gap-3 border border-outline px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-container"
              >
                <Phone size={16} />
                Call Studio
              </a>
            </div>
          </div>
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
