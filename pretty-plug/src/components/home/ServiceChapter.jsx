const services = [
  {
    id: 1,
    name: "Architectural Nails",
    subtitle: "Sculpted Extensions & Gel Art",
    number: "01",
    colClass: "md:col-span-7",
    aspectClass: "aspect-[4/5]",
    image: "/images/nails.png",
    alt: "Luxury nail art on melanin skin",
  },
  {
    id: 2,
    name: "Velvet Lashes",
    subtitle: "Hand-crafted Volume & Classics",
    number: "02",
    colClass: "md:col-span-4 md:col-start-9 md:pt-40",
    aspectClass: "aspect-[2/3]",
    image: "/images/lashes.png",
    alt: "Premium lash extensions close-up",
  },
  {
    id: 3,
    name: "The Glow Pedi",
    subtitle: "Medical Grade Aesthetics",
    number: "03",
    colClass: "md:col-span-5 md:-mt-[10rem]",
    aspectClass: "aspect-[4/5]",
    image: "/images/pedi.jpg",
    alt: "Luxurious pedicure treatment",
  },
];

export default function ServiceChapter() {
  return (
    <section className="py-32 px-8 md:px-20 bg-surface">
      {/* Section Header */}
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-xl">
          <span className="font-label text-xs tracking-widest uppercase text-primary">
            The Collective
          </span>
          <h2 className="font-headline text-5xl font-bold mt-4 leading-tight">
            Service Chapter: <br /> The Luxury Edit
          </h2>
        </div>
        <p className="max-w-sm text-on-surface-variant leading-relaxed">
          We don't just apply; we curate. Every set of lashes and every stroke
          of polish is tailored to your unique anatomical beauty.
        </p>
      </div>

      {/* Asymmetric 12-col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
        {services.map((service) => (
          <div key={service.id} className={`${service.colClass} group`}>
            {/* Service Image */}
            <div
              className={`relative overflow-hidden ${service.aspectClass} bg-surface-container-low mb-8`}
            >
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Service Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-3xl italic mb-2">
                  {service.name}
                </h3>
                <p className="font-body text-on-surface-variant text-sm tracking-widest uppercase">
                  {service.subtitle}
                </p>
              </div>
              <span className="font-headline text-2xl text-primary/40">
                {service.number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
