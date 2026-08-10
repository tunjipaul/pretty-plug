import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";
import { getGallery } from "../lib/content";

function resolveImageUrl(p) {
  if (!p) return "";
  if (typeof p === "string") return p;
  if (typeof p === "object") {
    return (
      p.publicUrl || p.publicURL || p.public_url || p.url ||
      Object.values(p).find((v) => typeof v === "string" && v.startsWith("http")) ||
      ""
    );
  }
  return "";
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All Work");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then((data) => {
        if (data) setItems(data.filter((i) => i.is_published));
      })
      .finally(() => setLoading(false));
  }, []);

  const filters = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category).filter(Boolean))];
    return ["All Work", ...cats];
  }, [items]);

  const visibleItems = useMemo(() => {
    if (activeFilter === "All Work") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  const featureItem = visibleItems.find((item) => item.is_featured) ?? visibleItems[0];
  const sideItems = visibleItems.filter((item) => item !== featureItem).slice(0, 2);
  const gridItems = visibleItems.filter(
    (item) => item !== featureItem && !sideItems.includes(item),
  );

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <RevealSection>
          <header className="mx-auto max-w-[1280px] px-5 pb-10 pt-20 text-center md:px-20 md:pt-28">
            <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
              Curated Artistry
            </span>
            <h1 className="mb-8 font-display text-[40px] font-semibold leading-tight text-on-surface md:text-[64px]">
              The Portfolio of <br />
              <span className="italic text-primary-container">
                ThePrettyPlug Excellence
              </span>
            </h1>
            <div className="mx-auto h-px w-24 bg-outline-variant" />
          </header>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="mx-auto mb-14 max-w-[1280px] px-5 md:px-20">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-6 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors md:px-8 ${
                    activeFilter === filter
                      ? "border-primary-container bg-primary-container text-on-primary"
                      : "border-outline-variant/50 text-on-surface hover:border-primary-container/50 hover:bg-surface-container-low"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </section>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="flex h-64 items-center justify-center font-body text-on-surface-variant">
              No gallery items found.
            </div>
          ) : (
            <>
              {featureItem && (
                <section className="mx-auto mb-6 flex max-w-[1280px] flex-col gap-6 px-5 md:mb-14 md:px-20 lg:flex-row">
                  <article className="group relative min-h-[400px] flex-1 overflow-hidden bg-surface-container-high lg:min-h-[600px]">
                    <img
                      src={resolveImageUrl(featureItem.image_path)}
                      alt={featureItem.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 md:p-10">
                      <div className="flex h-full flex-col justify-end">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-fixed">
                            {featureItem.category}
                          </span>
                          {featureItem.is_featured && (
                            <span className="bg-primary-fixed px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container">
                              Featured
                            </span>
                          )}
                        </div>
                        <h2 className="mb-2 font-headline text-3xl font-medium text-white md:text-5xl">
                          {featureItem.title}
                        </h2>
                      </div>
                    </div>
                  </article>

                  <div className="flex w-full flex-col gap-6 lg:w-[400px]">
                    {sideItems.map((item) => (
                      <article
                        key={item.id || item.title}
                        className="group relative h-[300px] overflow-hidden bg-surface-container lg:flex-1"
                      >
                        <img
                          src={resolveImageUrl(item.image_path)}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/10 to-transparent p-6">
                          <span className="mb-2 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-fixed">
                            {item.category}
                          </span>
                          <h3 className="font-headline text-2xl font-medium text-white">
                            {item.title}
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="mx-auto max-w-[1280px] px-5 md:px-20 pb-20">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gridItems.map((item) => (
                    <article
                      key={item.id || item.title}
                      className="group relative h-[300px] overflow-hidden bg-surface-container md:h-[400px]"
                    >
                      <img
                        src={resolveImageUrl(item.image_path)}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/5 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="mb-2 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-fixed">
                          {item.category}
                        </span>
                        <h3 className="font-headline text-xl font-medium text-white">
                          {item.title}
                        </h3>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              
              <section className="mx-auto max-w-[1280px] px-5 md:px-20 pb-24">
                <div className="py-12">
                  <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                    <div className="space-y-6">
                      <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                        Transformations
                      </span>
                      <h2 className="font-headline text-4xl font-medium leading-tight text-on-surface md:text-5xl">
                        ThePrettyPlug Difference
                      </h2>
                      <p className="max-w-lg font-body text-base leading-7 text-on-surface-variant md:text-lg">
                        We do not just apply products; we restore and enhance
                        your natural foundation. View our restorative nail and
                        lash journeys.
                      </p>
                      <Link
                        to="/testimonials"
                        className="inline-flex items-center gap-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container"
                      >
                        View Full Case Studies
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-2"
                        />
                      </Link>
                    </div>
                    <div className="overflow-hidden bg-surface-container shadow-2xl">
                      <div className="flex">
                        <div className="relative w-1/2">
                          <img
                            src="/images/gallery-1.jpg"
                            alt="Before manicure transformation"
                            className="h-[360px] w-full object-cover md:h-[400px]"
                          />
                          <span className="absolute left-4 top-4 bg-black/45 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                            Before
                          </span>
                        </div>
                        <div className="relative w-1/2 border-l-2 border-white/30">
                          <img
                            src="/images/gallery-3.jpg"
                            alt="After manicure transformation"
                            className="h-[360px] w-full object-cover md:h-[400px]"
                          />
                          <span className="absolute right-4 top-4 bg-primary-container/85 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                            After
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </RevealSection>

        <RevealSection className="bg-primary-container px-5 py-24 text-center text-on-primary md:px-20 md:py-28">
          <h2 className="mb-8 font-display text-[40px] font-semibold leading-tight md:text-[64px]">
            Ready to be Pampered?
          </h2>
          <Link
            to="/book"
            className="inline-flex h-14 items-center justify-center bg-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary-fixed"
          >
            Book Online
          </Link>
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
