import { useState, useEffect } from "react";
export default function Hero() {
  const [count, setCount] = useState(0);

  const avatars = [
    { id: 1, src: "/images/avatar-1.png", alt: "Happy client" },
    { id: 2, src: "/images/avatar-2.jpg", alt: "Happy client" },
    { id: 3, src: "/images/avatar-3.png", alt: "Happy client" },
  ];

  // Count-up animation — starts after the element fades in
  useEffect(() => {
    const delay = setTimeout(() => {
      const end = 500;
      const duration = 2000;
      const stepTime = 16;
      const increment = end / (duration / stepTime);
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(counter);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background Image — Ken Burns ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_bg.jfif"
          alt="Abeokuta's Finest Melanin Artistry"
          className="w-full h-full object-cover object-center animate-kenburns"
        />

        {/* Left gradient — text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />

        {/* Bottom vignette — depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-8 md:px-20 w-full max-w-5xl">
        {/* Label */}
        <p
          className="font-label text-sm tracking-[0.3em] uppercase mb-4 text-primary-container animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Est. Abeokuta
        </p>

        {/* Headline */}
        <h1 className="font-display text-6xl md:text-8xl tracking-tight text-white mb-8 leading-[1.1]">
          <span
            className="block font-black animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Abeokuta's Finest
          </span>
          <span
            className="block font-normal italic animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Melanin Artistry
          </span>
        </h1>

        {/* CTA + Social Proof */}
        <div
          className="flex flex-col md:flex-row gap-6 items-start md:items-center animate-fade-up"
          style={{ animationDelay: "0.75s" }}
        >
          {/* CTA Button */}
          <a href="/book">
            <button className="animate-pulse-glow bg-primary text-on-primary px-10 py-5 rounded-xl font-body text-lg tracking-widest uppercase font-bold hover:scale-105 hover:brightness-110 transition-all duration-300 cursor-pointer">
              Book Your Glow
            </button>
          </a>

          {/* Social Proof */}
          <div
            className="flex items-center gap-4 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            {/* Avatar stack — each bounces with staggered lilac glow */}
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className="w-10 h-10 rounded-full border-2 border-primary-container/60 overflow-hidden animate-avatar-float"
                  style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Count-up */}
            <p className="text-sm font-body tracking-wider text-white/75 font-semibold underline underline-offset-4 decoration-white/40">
              {count}+ Happy Clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
