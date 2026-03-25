export default function Hero() {
  const avatars = [1, 2, 3];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.jfif"
          alt="Abeokuta's Finest Melanin Artistry"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-20 w-full max-w-5xl">
        <p className="font-label text-sm tracking-[0.3em] uppercase mb-4 text-primary">
          Est. Abeokuta
        </p>

        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight text-on-surface mb-8 leading-[1.1]">
          Abeokuta's Finest <br />
          <span className="italic font-light">Melanin Artistry</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* CTA */}
          <a href="/book">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-xl font-body text-lg tracking-widest uppercase font-bold hover:scale-105 transition-transform cursor-pointer">
              Book Your Glow
            </button>
          </a>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            {/* Avatar stack */}
            <div className="flex -space-x-3">
              {avatars.map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden flex items-center justify-center"
                >
                  {/* avatar-{i}.jpg */}
                  <span className="text-[7px] text-on-surface-variant/50 font-label">
                    {i}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm font-body tracking-wider text-on-surface-variant font-semibold underline underline-offset-4">
              500+ Happy Clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
