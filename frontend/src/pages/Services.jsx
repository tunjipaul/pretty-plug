import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";
import { getContent, getServices } from "../lib/content";
import SeoHead from "../components/SeoHead";
import { getServicesSchema, getBreadcrumbSchema } from "../lib/seoSchemas";

function formatPrice(value) {
  return `NGN ${(value || 0).toLocaleString()}`;
}

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

const lashComparison = [
  ["Lash Ratio", "1:1", "Mix 1:1 and 3D", "5D - 7D", "10D - 15D"],
  ["Appearance", "Natural", "Textured", "Full and Fluffy", "Dense and Black"],
  ["Duration", "90 Min", "120 Min", "150 Min", "180 Min"],
  ["Maintenance", "2 - 3 Weeks", "2 - 3 Weeks", "3 - 4 Weeks", "3 - 4 Weeks"],
];

function ServiceShell({ children, className = "", ...sectionProps }) {
  return (
    <RevealSection delay={80}>
      <section className={className} {...sectionProps}>
        {children}
      </section>
    </RevealSection>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerContent, setHeaderContent] = useState(null);

  useEffect(() => {
    getContent().then((data) => {
      if (data?.pageHeaders?.services) {
        setHeaderContent(data.pageHeaders.services);
      }
    });

    getServices()
      .then((data) => {
        if (data) {
          // Only show active services on the public page
          setServices(data.filter((s) => s.is_active));
        }
      })
      .catch((err) => console.error("Failed to fetch services:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const grouped = {};
    for (const s of services) {
      const cat = s.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    }
    return grouped;
  }, [services]);

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);
  const servicesSchema = getServicesSchema(services);
  const pageSchemas = [breadcrumbs, servicesSchema].filter(Boolean);

  // Extract common known categories for bespoke layouts, if they exist
  const lashKey = Object.keys(categories).find((k) => k.toLowerCase().includes("lash"));
  const nailKey = Object.keys(categories).find((k) => k.toLowerCase().includes("nail"));
  const pediKey = Object.keys(categories).find((k) => k.toLowerCase().includes("pedi") || k.toLowerCase().includes("feet"));
  
  const lashServices = lashKey ? categories[lashKey] : [];
  const nailServices = nailKey ? categories[nailKey] : [];
  const pediServices = pediKey ? categories[pediKey] : [];

  // Identify any other categories that aren't lashes, nails, or pedis
  const otherKeys = Object.keys(categories).filter(
    (k) => k !== lashKey && k !== nailKey && k !== pediKey
  );

  return (
    <>
      <SeoHead
        title={headerContent?.title || "Services Catalog | Gel Manicures & Lashes Abeokuta"}
        description={headerContent?.subtitle || "Explore bespoke beauty treatments, gel manicures, luxury lash extensions, and aesthetic care in Abeokuta."}
        canonicalPath="/services"
        schema={pageSchemas}
      />
      <Navbar />
      <main className="pb-20 md:pb-0">
        {/* HERO */}
        <ServiceShell className="mx-auto flex max-w-[1280px] flex-col px-5 pb-24 pt-20 text-center md:px-20 md:pb-32 md:pt-24">
          <div className="order-2 lg:order-1">
            <span className="mb-6 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Exclusive Experiences
            </span>
            <h1 className="mx-auto mb-8 max-w-3xl font-display text-[40px] font-semibold leading-tight text-on-surface md:text-[64px]">
              {headerContent?.title || "Elevated Beauty for Your Best Moments"}
            </h1>
            <p className="mx-auto mb-12 max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
              {headerContent?.subtitle || "Carefully curated services designed to enhance your natural grace. From meticulous nail artistry to cinematic lash transformations."}
            </p>
          </div>
          <div className="order-1 mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:order-2 lg:mb-0">
            <div className="group relative h-[320px] overflow-hidden bg-surface-container-high md:h-[400px]">
              <img
                src={headerContent?.image1Url || "/images/studio.jpg"}
                alt="Luxury beauty studio interior"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
            </div>
            <div className="group relative h-[320px] overflow-hidden bg-surface-container-high md:h-[400px]">
              <img
                src={headerContent?.image2Url || "/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif"}
                alt="Dusty rose and gold nail artistry"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </ServiceShell>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          </div>
        ) : (
          <>
            {/* LASHES SECTION (if exists) */}
            {lashServices.length > 0 && (
              <ServiceShell id="lashes" className="bg-surface-container-low py-24 md:py-32">
                <div className="mx-auto max-w-[1280px] px-5 md:px-20">
                  <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-lg">
                      <h2 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                        {lashKey || "Lash Services"}
                      </h2>
                      <p className="font-body text-base leading-7 text-on-surface-variant">
                        Our lash technicians use premium synthetic silk to create weightless, stunning eyes that last.
                      </p>
                    </div>
                    <span className="hidden font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline md:block">
                      01 / Lashes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {lashServices.map((service) => {
                      const img = resolveImageUrl(service.image_url || service.image_path);
                      return (
                        <article key={service.id} className="editorial-shadow group flex h-full flex-col overflow-hidden border border-outline-variant/10 bg-surface p-8 transition-transform duration-300 hover:-translate-y-2">
                          {img && (
                            <div className="-mx-8 -mt-8 mb-6 aspect-[4/3] overflow-hidden bg-surface-container-high">
                              <img src={img} alt={service.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                          )}
                          <div className="mb-8 flex items-start justify-between gap-4">
                            <h3 className="font-headline text-2xl font-medium text-on-surface">{service.name}</h3>
                            {service.is_featured && (
                              <span className="bg-primary-fixed px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="mb-auto font-body text-sm leading-6 text-on-surface-variant">
                            {service.description}
                          </p>
                          <div className="mt-8 flex items-center justify-between border-t border-outline-variant/30 pt-6">
                            <div>
                              <div className="font-headline text-2xl font-medium text-on-surface">{formatPrice(service.price)}</div>
                              <div className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                                {service.duration_minutes ? `${service.duration_minutes} Mins` : "—"}
                              </div>
                            </div>
                            <Link to="/book" className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary text-secondary transition-colors hover:bg-secondary hover:text-on-primary">
                              <Plus size={18} />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </ServiceShell>
            )}

            {/* LASH COMPARISON (Static, but only show if lashes exist) */}
            {lashServices.length > 0 && (
              <ServiceShell className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
                <h2 className="mb-14 text-center font-headline text-3xl font-medium text-on-surface md:text-4xl">Choose Your Level of Drama</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-outline-variant">
                        <th className="w-1/4 py-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">Feature</th>
                        {["Classic", "Hybrid", "Volume", "Mega Volume"].map((level) => (
                          <th key={level} className={`py-8 font-headline text-2xl font-medium ${level === "Mega Volume" ? "text-primary-container" : "text-on-surface"}`}>{level}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="font-body text-sm text-on-surface">
                      {lashComparison.map(([feature, ...values]) => (
                        <tr key={feature} className="border-b border-outline-variant/30">
                          <td className="py-6 font-bold">{feature}</td>
                          {values.map((value) => (
                            <td key={value} className="py-6 text-on-surface-variant">{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ServiceShell>
            )}

            {/* NAILS SECTION (if exists) */}
            {nailServices.length > 0 && (
              <ServiceShell className="bg-surface py-24 md:py-32">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 md:flex-row md:px-20">
                  <aside className="w-full md:w-1/3">
                    <div className="md:sticky md:top-32">
                      <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">Artistry</span>
                      <h2 className="mb-8 font-headline text-4xl font-medium leading-tight text-on-surface md:text-5xl">
                        {nailKey || "Masterful Nails"}
                      </h2>
                      <p className="mb-8 font-body text-base leading-7 text-on-surface-variant">
                        From minimalist nudes to architectural gel extensions, our artists treat every nail as a canvas for luxury.
                      </p>
                      <img src="/images/gallery-5.jpg" alt="Nail artist painting detailed nail art" className="editorial-shadow h-80 w-full object-cover" />
                    </div>
                  </aside>
                  <div className="w-full md:w-2/3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {nailServices.map((service) => {
                        const img = resolveImageUrl(service.image_url || service.image_path);
                        return (
                          <article key={service.id} className="border border-outline-variant/50 bg-surface-container-lowest p-8 transition-colors hover:border-primary-container overflow-hidden">
                            {img && (
                              <div className="-mx-8 -mt-8 mb-6 aspect-[4/3] overflow-hidden bg-surface-container-high">
                                <img src={img} alt={service.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                              </div>
                            )}
                            <div className="mb-4 flex items-start justify-between gap-4">
                              <h3 className="font-headline text-2xl font-medium text-on-surface">{service.name}</h3>
                              <div className="shrink-0 font-label text-xs font-bold uppercase tracking-[0.08em] text-primary-container">
                                {formatPrice(service.price)}
                              </div>
                            </div>
                            <p className="mb-6 font-body text-sm leading-6 text-on-surface-variant">{service.description}</p>
                            {service.add_ons && service.add_ons.length > 0 && (
                              <div className="mb-6 border-t border-outline-variant/20 pt-3">
                                <span className="mb-2 block font-label text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                                  Available Add-Ons:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {service.add_ons.map((addon, idx) => (
                                    <span key={idx} className="bg-surface-container-high px-2.5 py-1 font-body text-[11px] text-on-surface-variant">
                                      {addon.name} (+{formatPrice(addon.price)})
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                                {service.duration_minutes ? `${service.duration_minutes} Mins` : ""}
                              </span>
                              <Link to="/book" className="ml-auto border-b border-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:text-primary">
                                Book
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ServiceShell>
            )}

            {/* PEDICURE SECTION (if exists) */}
            {pediServices.length > 0 && (
              <ServiceShell className="bg-surface-container py-24 md:py-32">
                <div className="mx-auto max-w-[1280px] px-5 md:px-20">
                  <div className="mb-16 text-center">
                    <h2 className="font-headline text-4xl font-medium text-on-surface md:text-5xl">
                      {pediKey || "Therapeutic Pedicures"}
                    </h2>
                    <div className="mx-auto mt-6 h-px w-24 bg-secondary" />
                  </div>
                  <div className="flex flex-col items-center gap-12 lg:flex-row">
                    <div className="relative lg:w-1/2">
                      <img src="/images/pedi.jpg" alt="Luxury pedicure station" className="editorial-shadow aspect-[4/3] w-full object-cover" />
                      <div className="absolute -bottom-8 right-6 hidden bg-primary-container p-8 text-on-primary md:block">
                        <div className="font-headline text-2xl font-medium">Best of Abeokuta</div>
                        <div className="mt-2 font-label text-xs font-semibold uppercase tracking-[0.12em]">2023 Spa Awards</div>
                      </div>
                    </div>
                    <div className="w-full space-y-8 lg:w-1/2">
                      {pediServices.map((service) => (
                        <article key={service.id} className="group">
                          <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="font-headline text-2xl font-medium text-on-surface transition-colors group-hover:text-primary-container">
                                {service.name}
                              </h3>
                              <p className="mt-1 font-body text-sm leading-6 text-on-surface-variant">
                                {service.description}
                              </p>
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="font-label text-sm font-bold uppercase tracking-[0.08em] text-on-surface">
                                {formatPrice(service.price)}
                              </div>
                              <Link to="/book" className="mt-2 inline-flex font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container">
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </ServiceShell>
            )}

            {/* OTHER DYNAMIC CATEGORIES (if admin creates a new one) */}
            {otherKeys.map((catKey) => (
              <ServiceShell key={catKey} className="bg-surface py-24 md:py-32 border-t border-outline-variant/20">
                <div className="mx-auto max-w-[1280px] px-5 md:px-20">
                  <div className="mb-12 text-center">
                    <h2 className="font-headline text-4xl font-medium text-on-surface md:text-5xl">{catKey}</h2>
                    <div className="mx-auto mt-6 h-px w-24 bg-primary-container" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {categories[catKey].map((service) => {
                      const img = resolveImageUrl(service.image_url || service.image_path);
                      return (
                        <article key={service.id} className="border border-outline-variant/50 bg-surface-container-lowest p-8 transition-colors hover:border-primary-container overflow-hidden">
                          {img && (
                            <div className="-mx-8 -mt-8 mb-6 aspect-[4/3] overflow-hidden bg-surface-container-high">
                              <img src={img} alt={service.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                          )}
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <h3 className="font-headline text-2xl font-medium text-on-surface">{service.name}</h3>
                            {service.is_featured && (
                              <span className="bg-primary-fixed px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container">Featured</span>
                            )}
                          </div>
                          <p className="mb-6 font-body text-sm leading-6 text-on-surface-variant">{service.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
                            <div>
                              <div className="font-headline text-xl font-medium text-on-surface">{formatPrice(service.price)}</div>
                              <div className="font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-outline">
                                {service.duration_minutes ? `${service.duration_minutes} Mins` : ""}
                              </div>
                            </div>
                            <Link to="/book" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary transition-colors hover:bg-primary">
                              <Plus size={16} />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </ServiceShell>
            ))}
          </>
        )}

        {/* CTA */}
        <ServiceShell className="bg-primary-container px-5 py-24 text-center text-on-primary md:px-20 md:py-28">
          <h2 className="mb-8 font-display text-[40px] font-semibold leading-tight md:text-[64px]">
            Ready to be Pampered?
          </h2>
          <p className="mx-auto mb-12 max-w-xl font-body text-base leading-7 text-primary-fixed md:text-lg">
            Book your appointment online and experience the meticulous standard
            of ThePrettyPlug.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex h-14 items-center justify-center bg-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary-fixed"
            >
              Book Online
            </Link>
            <a
              href="#lashes"
              className="inline-flex h-14 items-center justify-center border border-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-white/10"
            >
              View All Services
            </a>
          </div>
        </ServiceShell>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
