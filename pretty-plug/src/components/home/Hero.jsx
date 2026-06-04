import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-surface">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-5 py-14 md:grid-cols-12 md:px-20 md:py-20">
        <div className="z-10 flex flex-col justify-center space-y-8 md:col-span-6">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Abeokuta Luxury Suite
          </span>
          <h1 className="font-display text-[42px] font-semibold leading-[1.08] tracking-tight text-on-surface sm:text-6xl md:text-[64px]">
            Best Nails for <br />
            <span className="italic text-primary-container">Best Moments</span>
          </h1>
          <p className="max-w-md font-body text-lg leading-7 text-on-surface-variant">
            Loved by beauty minimalists and curated for the meticulous. Step
            into an era of editorial beauty where every finish is personal.
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex h-14 items-center justify-center bg-primary-container px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-14 items-center justify-center border border-secondary px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary transition-colors duration-300 hover:bg-secondary/10"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center md:col-span-6">
          <div className="group relative aspect-[4/5] w-full overflow-hidden bg-surface-container-high">
            <img
              src="/images/Timeless Nude Nails Neutral Manicure with Soft Luxury Style.jfif"
              alt="Luxury nude manicure with soft neutral styling"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="editorial-shadow absolute bottom-8 left-0 hidden max-w-xs bg-white p-6 lg:block">
              <p className="mb-2 font-headline text-2xl text-primary-container">
                Summer Collection
              </p>
              <p className="mb-4 font-body text-sm leading-5 text-on-surface-variant">
                Limited edition hand-painted finishes inspired by soft Lagos
                evenings.
              </p>
              <Link
                to="/portfolio"
                className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
