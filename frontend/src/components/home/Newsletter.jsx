export default function Newsletter({ content }) {
  const data = content || {
    title: "Stay Polished",
    subtitle: "Join our inner circle for priority booking, seasonal trends, and exclusive beauty notes.",
    buttonText: "Subscribe",
    finePrint: "Respecting your inbox like your time. Unsubscribe anytime.",
  };

  return (
    <section className="bg-primary-container py-12 text-on-primary md:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-6">
        <h2 className="mb-4 font-headline text-3xl font-medium sm:text-4xl lg:mb-6 lg:text-5xl">
          {data.title}
        </h2>
        <p className="mb-6 font-body text-base leading-7 text-white/90 md:mb-8 lg:mb-10 lg:text-lg">
          {data.subtitle}
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-0" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your Email Address"
            className="h-12 min-h-[48px] w-full flex-1 box-border px-4 border border-white/30 bg-white/10 text-center font-body text-sm text-white outline-none placeholder:text-white/55 focus:border-white sm:h-16 sm:px-8 sm:text-left sm:text-base"
          />
          <button
            type="submit"
            className="h-12 w-full bg-white px-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-secondary-container hover:text-on-secondary-container sm:h-16 sm:w-auto sm:px-10"
          >
            {data.buttonText || "Subscribe"}
          </button>
        </form>
        <p className="mt-6 font-body text-sm text-white/60">
          {data.finePrint}
        </p>
      </div>
    </section>
  );
}
