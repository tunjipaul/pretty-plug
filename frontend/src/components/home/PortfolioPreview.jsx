import { useState } from "react";

const filters = ["All", "Lashes", "Nails", "Pedicure"];

const works = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Minimal manicure portfolio work",
    category: "Nails",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Soft lash portfolio work",
    category: "Lashes",
    offset: "lg:mt-12",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Dark editorial nail portfolio work",
    category: "Nails",
  },
  {
    src: "/images/gallery-4.png",
    alt: "Detailed hand pose with nail art",
    category: "Nails",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Nail technician applying detail",
    category: "Nails",
    offset: "lg:-mt-12",
  },
  {
    src: "/images/download (6).jfif",
    alt: "Luxury pedicure portfolio work",
    category: "Pedicure",
  },
];

export default function PortfolioPreview() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleWorks =
    activeFilter === "All"
      ? works
      : works.filter((work) => work.category === activeFilter);

  return (
    <section className="bg-surface-container-low py-16 md:py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-6 font-headline text-3xl font-medium text-on-surface sm:text-4xl lg:text-5xl">
            Selected Works
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-5 py-2 font-label text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "border-primary-container bg-primary-container text-on-primary"
                      : "border-outline-variant text-on-surface-variant hover:border-primary-container"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-8">
          {visibleWorks.map((work) => (
            <figure
              key={`${work.src}-${work.category}`}
              className={`group relative aspect-square overflow-hidden bg-surface-variant ${
                work.offset ?? ""
              }`}
            >
              <img
                src={work.src}
                alt={work.alt}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-primary-container/90 px-4 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-transform duration-300 group-hover:translate-y-0">
                {work.category}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
