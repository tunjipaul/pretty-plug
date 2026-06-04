import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";

const filters = ["All Work", "Lashes", "Nails", "Pedicure", "Treatments"];

const portfolioItems = [
  {
    title: "Golden Hour Manicure",
    category: "Nails",
    meta: "Signature Look",
    description:
      "A fusion of soft rose polish, gold accents, and contemporary minimal silhouettes.",
    image: "/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif",
    alt: "Luxury nail art with gold details",
    featured: true,
  },
  {
    title: "Volume Lash Artistry",
    category: "Lashes",
    meta: "Expert Application - 2 Hours",
    image: "/images/lashes.png",
    alt: "Volume lash extension close-up",
    badge: "Most Wanted",
  },
  {
    title: "Milk and Honey Pedicure",
    category: "Pedicure",
    meta: "Nourishing Therapy - 90 Mins",
    image: "/images/pedi.jpg",
    alt: "Luxury pedicure result",
  },
  {
    title: "Lush Chrome Set",
    category: "Nails",
    meta: "Nail Design",
    image: "/images/download (2).jfif",
    alt: "Beauty tools and nail polish flat lay",
  },
  {
    title: "Glass Skin Facial",
    category: "Treatments",
    meta: "Skin Care",
    image: "/images/poses for photo shoot, done in AI_.jfif",
    alt: "Serene beauty treatment portrait",
  },
  {
    title: "Artisan Florals",
    category: "Nails",
    meta: "Nail Art",
    image: "/images/gallery-2.png",
    alt: "Floral nail art detail",
  },
];

function filteredItems(activeFilter) {
  if (activeFilter === "All Work") {
    return portfolioItems;
  }

  return portfolioItems.filter((item) => item.category === activeFilter);
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All Work");
  const visibleItems = useMemo(
    () => filteredItems(activeFilter),
    [activeFilter],
  );
  const featureItem = visibleItems.find((item) => item.featured) ?? visibleItems[0];
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
                Beauty Plug Excellence
              </span>
            </h1>
            <div className="mx-auto h-px w-24 bg-outline-variant" />
          </header>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="mx-auto mb-14 max-w-[1280px] px-5 md:px-20">
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              {filters.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`pb-2 font-label text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "border-b-2 border-primary-container text-primary-container"
                        : "text-on-surface-variant hover:text-primary-container"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={100}>
          <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-20 md:pb-32">
            {visibleItems.length > 0 ? (
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
                {featureItem ? (
                  <article className="group relative overflow-hidden bg-surface-container-low md:col-span-7">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={featureItem.image}
                        alt={featureItem.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-primary-container/20 p-5 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 md:p-10">
                      <div className="translate-y-4 bg-surface/90 p-8 transition-transform duration-500 group-hover:translate-y-0">
                        <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                          {featureItem.meta}
                        </span>
                        <h2 className="mb-4 font-headline text-3xl font-medium text-on-surface">
                          {featureItem.title}
                        </h2>
                        <p className="mb-6 font-body text-base leading-7 text-on-surface-variant">
                          {featureItem.description}
                        </p>
                        <Link
                          to="/book"
                          className="inline-flex h-12 items-center justify-center bg-primary-container px-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary"
                        >
                          Book This Look
                        </Link>
                      </div>
                    </div>
                  </article>
                ) : null}

                <div className="flex flex-col gap-6 md:col-span-5">
                  {sideItems.map((item) => (
                    <article
                      key={item.title}
                      className="group relative overflow-hidden bg-surface-container-low"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="font-headline text-2xl font-medium text-on-surface">
                          {item.title}
                        </h2>
                        <p className="mt-2 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                          {item.meta}
                        </p>
                      </div>
                      {item.badge ? (
                        <span className="absolute right-4 top-4 border border-primary-container/20 bg-surface/85 px-4 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container backdrop-blur">
                          {item.badge}
                        </span>
                      ) : null}
                    </article>
                  ))}
                </div>

                <div className="py-12 md:col-span-12">
                  <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                    <div className="space-y-6">
                      <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                        Transformations
                      </span>
                      <h2 className="font-headline text-4xl font-medium leading-tight text-on-surface md:text-5xl">
                        The Beauty Plug Difference
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

                {gridItems.map((item) => (
                  <article
                    key={item.title}
                    className="group overflow-hidden bg-surface-container-low md:col-span-4"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="border-b border-outline-variant/30 p-6">
                      <h2 className="font-headline text-2xl font-medium text-on-surface">
                        {item.title}
                      </h2>
                      <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
                        {item.meta}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center">
                <h2 className="font-headline text-3xl font-medium">
                  No work in this category yet
                </h2>
              </div>
            )}
          </section>
        </RevealSection>

        <RevealSection delay={80}>
          <section className="bg-primary-container py-24 text-center text-on-primary md:py-32">
            <div className="mx-auto max-w-[1280px] px-5 md:px-20">
              <h2 className="mb-8 font-headline text-4xl font-medium md:text-5xl">
                Ready to book your transformation?
              </h2>
              <p className="mx-auto mb-12 max-w-2xl font-body text-base leading-7 opacity-90 md:text-lg">
                Experience the meticulous care and premium artistry that defines
                the Beauty Plug signature look.
              </p>
              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <Link
                  to="/book"
                  className="inline-flex h-14 items-center justify-center bg-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary-fixed"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/services"
                  className="inline-flex h-14 items-center justify-center border border-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-white/10"
                >
                  View Services
                </Link>
              </div>
            </div>
          </section>
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
