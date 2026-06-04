export default function Newsletter() {
  return (
    <section className="bg-primary-container py-24 text-on-primary md:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="mb-6 font-headline text-4xl font-medium md:text-5xl">
          Stay Polished
        </h2>
        <p className="mb-10 font-body text-base leading-7 text-white/90 md:text-lg">
          Join our inner circle for priority booking, seasonal trends, and
          exclusive beauty notes.
        </p>
        <form className="flex flex-col sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your Email Address"
            className="h-16 flex-1 border border-white/30 bg-white/10 px-6 font-body text-white outline-none placeholder:text-white/55 focus:border-white"
          />
          <button
            type="submit"
            className="h-16 bg-white px-10 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-6 font-body text-sm text-white/60">
          Respecting your inbox like your time. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
