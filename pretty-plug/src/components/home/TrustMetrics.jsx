const metrics = [
  { value: "500+", label: "Happy Clients" },
  { value: "3+", label: "Years Excellence" },
  { value: "5", label: "Star Reviews" },
  { value: "1", label: "Certified Master" },
];

export default function TrustMetrics() {
  return (
    <section className="border-y border-outline-variant/20 bg-surface-container-low py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-2 ${
                index > 0 ? "md:border-l md:border-outline-variant/30" : ""
              }`}
            >
              <span className="font-display text-[40px] font-medium leading-none text-primary-container md:text-5xl">
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
