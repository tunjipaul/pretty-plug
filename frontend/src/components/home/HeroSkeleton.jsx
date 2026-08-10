export default function HeroSkeleton() {
  return (
    <section className="relative flex min-h-auto items-center overflow-hidden bg-surface lg:min-h-[calc(100vh-73px)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:px-20 lg:py-20">
        <div className="order-2 z-10 flex flex-col justify-center space-y-6 lg:order-1 lg:col-span-6 lg:space-y-8">
          <div className="h-5 w-48 rounded-full bg-surface-container-highest animate-pulse" />
          <div className="space-y-4">
            <div className="h-14 w-full rounded-2xl bg-surface-container-highest animate-pulse" />
            <div className="h-14 w-3/4 rounded-2xl bg-surface-container-highest animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-4 w-full max-w-lg rounded-full bg-surface-container-highest animate-pulse" />
            <div className="h-4 w-5/6 rounded-full bg-surface-container-highest animate-pulse" />
          </div>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <div className="h-14 w-40 rounded-full bg-surface-container-highest animate-pulse" />
            <div className="h-14 w-40 rounded-full border border-outline-variant bg-surface-container-highest animate-pulse" />
          </div>
        </div>

        <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-6">
          <div className="aspect-4/5 w-full rounded-4xl bg-surface-container-highest shadow-inner shadow-black/10 animate-pulse sm:aspect-5/4 lg:aspect-4/5" />
        </div>
      </div>
    </section>
  );
}
