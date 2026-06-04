const testimonials = [
  {
    quote:
      "The attention to detail at Beauty Plug is unmatched. My lashes lasted for weeks and looked incredibly natural.",
    name: "Ifeoma Adeyemi",
    service: "Hybrid Lash Set",
    avatar: "/images/avatar-1.png",
  },
  {
    quote:
      "Finally found a studio that understands editorial nail art. The environment is serene, precise, and professional.",
    name: "Sarah Cole",
    service: "Signature Gel Manicure",
    avatar: "/images/avatar-2.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 md:grid-cols-2 md:px-20">
        <div>
          <span className="mb-4 block font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary-container">
            Client Experiences
          </span>
          <h2 className="mb-10 font-headline text-4xl font-medium leading-tight text-on-surface md:text-5xl">
            Hear What Our <br /> Customers Say
          </h2>
          <div className="space-y-10">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`relative border-l-2 pl-8 ${
                  index === 0
                    ? "border-primary-container"
                    : "border-outline-variant/30 opacity-70"
                }`}
              >
                <p className="mb-6 font-body text-base italic leading-7 text-on-surface md:text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} portrait`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-sm text-on-surface-variant">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="relative h-[600px] w-full rotate-2 overflow-hidden rounded-full border-8 border-white bg-surface-container-high shadow-2xl">
            <img
              src="/images/studio.jpg"
              alt="Beauty Plug studio interior"
              className="h-full w-full -rotate-2 scale-110 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
