import { Link } from "react-router-dom";

export default function Hero({ content }) {
  const hero = content ?? {
    eyebrow: "Abeokuta Luxury Suite",
    headline: "Best Nails for Best Moments",
    highlight: "Best Moments",
    body:
      "Loved by beauty minimalists and curated for the meticulous. Step into an era of editorial beauty where every finish is personal.",
    primaryCta: "Book Appointment",
    secondaryCta: "View Portfolio",
  };

  return (
    <section className="relative flex min-h-[auto] items-center overflow-hidden bg-surface lg:min-h-[calc(100vh-73px)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:px-20 lg:py-20">
        <div className="order-2 z-10 flex flex-col justify-center space-y-6 lg:order-1 lg:col-span-6 lg:space-y-8">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            {hero.eyebrow}
          </span>
          <h1 className="font-display text-[40px] font-semibold leading-[1.08] tracking-tight text-on-surface sm:text-[56px] lg:text-[64px]">
            {(() => {
              const [before, after] = hero.headline.split(hero.highlight);
              return (
                <>
                  {before}
                  <span className="italic text-primary-container">{hero.highlight}</span>
                  {after}
                </>
              );
            })()}
          </h1>
          <p className="max-w-md font-body text-base leading-7 text-on-surface-variant sm:text-lg">
            {hero.body}
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex h-14 items-center justify-center bg-primary-container px-6 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-transform duration-300 hover:-translate-y-0.5 sm:px-10"
            >
              {hero.primaryCta}
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-14 items-center justify-center border border-secondary px-6 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary transition-colors duration-300 hover:bg-secondary/10 sm:px-10"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-6">
          <div className="group relative aspect-[4/5] max-h-[620px] w-full overflow-hidden bg-surface-container-high sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src={hero.imageUrl || hero.image || "/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif"}
              alt={hero.headline || "Luxury nude manicure"}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {hero.showBadge !== false && (
              <div className="editorial-shadow absolute bottom-8 left-0 hidden max-w-xs bg-white p-6 lg:block">
                <p className="mb-2 font-headline text-2xl text-primary-container">
                  {hero.badgeTitle || "Summer Collection"}
                </p>
                <p className="mb-4 font-body text-sm leading-5 text-on-surface-variant">
                  {hero.badgeBody || "Limited edition hand-painted finishes inspired by soft Abeokuta evenings."}
                </p>
                <Link
                  to="/portfolio"
                  className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary"
                >
                  Discover
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
