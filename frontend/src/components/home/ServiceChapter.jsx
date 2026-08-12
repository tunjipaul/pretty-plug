import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

const fallbackServices = [
  {
    name: "Lash Extensions",
    description: "Volume, hybrid, and classic sets tailored to your eye shape.",
    price: "From NGN 15,000",
    image: "/images/lashes.png",
    alt: "Premium lash extensions close-up",
  },
  {
    name: "Nail Artistry",
    description: "Sculpted gels and hand-painted miniature art.",
    price: "From NGN 12,000",
    image: "/images/nails.png",
    alt: "Luxury nail art on melanin skin",
    offset: true,
  },
  {
    name: "Pedi-Rituals",
    description: "Restorative treatments focused on comfort and polish.",
    price: "From NGN 10,000",
    image: "/images/pedi.jpg",
    alt: "Luxurious pedicure treatment",
  },
];

export default function ServiceChapter({ services: dynamicServices }) {
  const displayServices = useMemo(() => {
    const dynamicItems = (dynamicServices || []).slice(0, 6);
    if (dynamicItems.length < 3) {
      return [...dynamicItems, ...fallbackServices.slice(dynamicItems.length, 3)];
    }
    return dynamicItems;
  }, [dynamicServices]);

  return (
    <section className="bg-surface py-16 md:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="mb-5 font-headline text-3xl font-medium leading-tight text-on-surface sm:text-4xl lg:text-5xl">
              Signature Services
            </h2>
            <p className="font-body text-base leading-7 text-on-surface-variant lg:text-lg">
              Each treatment is a bespoke experience, blending careful
              craftsmanship with modern beauty aesthetics.
            </p>
          </div>
          <Link
            to="/services"
            className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary underline underline-offset-8"
          >
            All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, idx) => (
            <Link
              key={service.id || service.name || idx}
              to="/services"
              className={`group block ${idx === 1 ? "lg:mt-20" : ""}`}
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-surface-container-high sm:aspect-[3/4]">
                <img
                  src={resolveImageUrl(service.image_url || service.image_path) || service.image}
                  alt={service.alt || service.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <h3 className="mb-2 font-headline text-2xl font-medium text-on-surface">
                {service.name}
              </h3>
              <p className="mb-4 font-body text-sm leading-5 text-on-surface-variant">
                {service.description}
              </p>
              <div className="mb-4 h-px w-full overflow-hidden bg-outline-variant/30">
                <div className="h-full w-0 bg-primary-container transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  {service.price && typeof service.price === 'number' ? `From NGN ${service.price.toLocaleString()}` : service.price}
                </span>
                <ArrowRight
                  size={18}
                  className="text-primary-container transition-transform duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
