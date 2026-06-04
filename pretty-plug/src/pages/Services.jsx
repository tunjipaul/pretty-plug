import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";

const lashServices = [
  {
    name: "Classic Set",
    tag: "New",
    description:
      "A natural, mascara-look. One individual extension applied to each natural lash.",
    price: "NGN 25,000",
    duration: "90 mins",
  },
  {
    name: "Hybrid Set",
    description:
      "The perfect balance of natural and volume. A mix of classic and fan extensions.",
    price: "NGN 35,000",
    duration: "120 mins",
  },
  {
    name: "Volume Set",
    description:
      "Bold and dramatic. Multiple lightweight fans per natural lash for maximum fullness.",
    price: "NGN 45,000",
    duration: "150 mins",
  },
];

const lashComparison = [
  ["Lash Ratio", "1:1", "Mix 1:1 and 3D", "5D - 7D", "10D - 15D"],
  ["Appearance", "Natural", "Textured", "Full and Fluffy", "Dense and Black"],
  ["Duration", "90 Min", "120 Min", "150 Min", "180 Min"],
  ["Maintenance", "2 - 3 Weeks", "2 - 3 Weeks", "3 - 4 Weeks", "3 - 4 Weeks"],
];

const nailServices = [
  {
    name: "Signature Gel Manicure",
    price: "NGN 15,000",
    description:
      "Cuticle care, shaping, and long-wear premium gel polish with 14-day shine.",
    duration: "45 mins",
  },
  {
    name: "Hard Gel Extensions",
    price: "NGN 30,000",
    description:
      "Sculpted extensions using luxury builder gel for strength and natural thinness.",
    duration: "120 mins",
  },
  {
    name: "Russian E-File Mani",
    price: "NGN 18,000",
    description:
      "Precision cuticle care using specialized drill bits for a flawless look.",
    duration: "60 mins",
  },
  {
    name: "Chrome and 3D Art",
    price: "NGN 5,000+",
    description:
      "Add-on service for mirror pigments or hand-sculpted 3D accents.",
    duration: "30 mins",
  },
];

const pedicureServices = [
  {
    name: "The Rosewater Soak",
    description: "Himalayan salt, rose petals, and essential oil infusion.",
    price: "NGN 12,000",
  },
  {
    name: "Medical Grade Pedi",
    description: "Deep callus removal and intensive hydration therapy.",
    price: "NGN 20,000",
  },
  {
    name: "Paraffin Wax Spa",
    description: "Ultimate softness with warm wax dip and massage.",
    price: "NGN 18,000",
  },
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
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <ServiceShell className="mx-auto max-w-[1280px] px-5 pb-24 pt-20 text-center md:px-20 md:pb-32 md:pt-24">
          <span className="mb-6 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Exclusive Experiences
          </span>
          <h1 className="mx-auto mb-8 max-w-3xl font-display text-[40px] font-semibold leading-tight text-on-surface md:text-[64px]">
            Elevated Beauty for Your Best Moments
          </h1>
          <p className="mx-auto mb-12 max-w-2xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
            Carefully curated services designed to enhance your natural grace.
            From meticulous nail artistry to cinematic lash transformations.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group relative h-[320px] overflow-hidden bg-surface-container-high md:h-[400px]">
              <img
                src="/images/studio.jpg"
                alt="Luxury beauty studio interior"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
            </div>
            <div className="group relative h-[320px] overflow-hidden bg-surface-container-high md:h-[400px]">
              <img
                src="/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif"
                alt="Dusty rose and gold nail artistry"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </ServiceShell>

        <ServiceShell
          id="lashes"
          className="bg-surface-container-low py-24 md:py-32"
        >
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-lg">
                <h2 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                  Lash Services
                </h2>
                <p className="font-body text-base leading-7 text-on-surface-variant">
                  Our lash technicians use premium synthetic silk to create
                  weightless, stunning eyes that last.
                </p>
              </div>
              <span className="hidden font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline md:block">
                01 / Lashes
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {lashServices.map((service) => (
                <article
                  key={service.name}
                  className="editorial-shadow group flex h-full flex-col border border-outline-variant/10 bg-surface p-8 transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <h3 className="font-headline text-2xl font-medium text-on-surface">
                      {service.name}
                    </h3>
                    {service.tag ? (
                      <span className="bg-primary-fixed px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container">
                        {service.tag}
                      </span>
                    ) : null}
                  </div>
                  <p className="mb-auto font-body text-sm leading-6 text-on-surface-variant">
                    {service.description}
                  </p>
                  <div className="mt-8 flex items-center justify-between border-t border-outline-variant/30 pt-6">
                    <div>
                      <div className="font-headline text-2xl font-medium text-on-surface">
                        {service.price}
                      </div>
                      <div className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                        {service.duration}
                      </div>
                    </div>
                    <Link
                      to="/book"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary text-secondary transition-colors hover:bg-secondary hover:text-on-primary"
                      aria-label={`Book ${service.name}`}
                    >
                      <Plus size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ServiceShell>

        <ServiceShell className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
          <h2 className="mb-14 text-center font-headline text-3xl font-medium text-on-surface md:text-4xl">
            Choose Your Level of Drama
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="w-1/4 py-8 font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                    Feature
                  </th>
                  {["Classic", "Hybrid", "Volume", "Mega Volume"].map(
                    (level) => (
                      <th
                        key={level}
                        className={`py-8 font-headline text-2xl font-medium ${
                          level === "Mega Volume"
                            ? "text-primary-container"
                            : "text-on-surface"
                        }`}
                      >
                        {level}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="font-body text-sm text-on-surface">
                {lashComparison.map(([feature, ...values]) => (
                  <tr
                    key={feature}
                    className="border-b border-outline-variant/30"
                  >
                    <td className="py-6 font-bold">{feature}</td>
                    {values.map((value) => (
                      <td key={value} className="py-6 text-on-surface-variant">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ServiceShell>

        <ServiceShell className="bg-surface py-24 md:py-32">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 md:flex-row md:px-20">
            <aside className="w-full md:w-1/3">
              <div className="md:sticky md:top-32">
                <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  Artistry
                </span>
                <h2 className="mb-8 font-headline text-4xl font-medium leading-tight text-on-surface md:text-5xl">
                  Masterful Nail Extensions and Art
                </h2>
                <p className="mb-8 font-body text-base leading-7 text-on-surface-variant">
                  From minimalist nudes to architectural gel extensions, our
                  artists treat every nail as a canvas for luxury.
                </p>
                <img
                  src="/images/gallery-5.jpg"
                  alt="Nail artist painting detailed nail art"
                  className="editorial-shadow h-80 w-full object-cover"
                />
              </div>
            </aside>

            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {nailServices.map((service) => (
                  <article
                    key={service.name}
                    className="border border-outline-variant/50 bg-surface-container-lowest p-8 transition-colors hover:border-primary-container"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="font-headline text-2xl font-medium text-on-surface">
                        {service.name}
                      </h3>
                      <div className="shrink-0 font-label text-xs font-bold uppercase tracking-[0.08em] text-primary-container">
                        {service.price}
                      </div>
                    </div>
                    <p className="mb-6 font-body text-sm leading-6 text-on-surface-variant">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                        {service.duration}
                      </span>
                      <Link
                        to="/book"
                        className="ml-auto border-b border-primary-container font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:text-primary"
                      >
                        Book
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </ServiceShell>

        <ServiceShell className="bg-surface-container py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="mb-16 text-center">
              <h2 className="font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Therapeutic Pedicures
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-secondary" />
            </div>

            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="relative lg:w-1/2">
                <img
                  src="/images/pedi.jpg"
                  alt="Luxury pedicure station"
                  className="editorial-shadow aspect-[4/3] w-full object-cover"
                />
                <div className="absolute -bottom-8 right-6 hidden bg-primary-container p-8 text-on-primary md:block">
                  <div className="font-headline text-2xl font-medium">
                    Best of Abeokuta
                  </div>
                  <div className="mt-2 font-label text-xs font-semibold uppercase tracking-[0.12em]">
                    2023 Spa Awards
                  </div>
                </div>
              </div>

              <div className="w-full space-y-8 lg:w-1/2">
                {pedicureServices.map((service) => (
                  <article key={service.name} className="group">
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
                          {service.price}
                        </div>
                        <Link
                          to="/book"
                          className="mt-2 inline-flex font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container"
                        >
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
