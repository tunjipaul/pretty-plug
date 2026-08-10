export default function TrustMetrics({ content }) {
  const items = content?.items || [
    { value: "500+", label: "Happy Clients" },
    { value: "3+", label: "Years Excellence" },
    { value: "5", label: "Star Reviews" },
    { value: "1", label: "Certified Master" },
  ];

  return (
    <section className="border-y border-outline-variant/20 bg-surface-container-low py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <div className="grid grid-cols-2 gap-y-8 text-center lg:grid-cols-4">
          {items.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-2 ${
                index > 0 ? "lg:border-l lg:border-outline-variant/30" : ""
              }`}
            >
              <span className="font-display text-[36px] font-medium leading-none text-primary-container md:text-[40px] lg:text-5xl">
                {metric.value}
              </span>
              <span className="font-label text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
