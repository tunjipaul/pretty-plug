import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, Play, Quote, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";

const reels = [
  {
    name: "Tosin A.",
    views: "15k views",
    image: "/images/gallery-3.jpg",
    alt: "Client showing blue manicure",
  },
  {
    name: "Bisi O.",
    views: "8k views",
    image: "/images/lashes.png",
    alt: "Client receiving lash service",
    offset: true,
  },
  {
    name: "Amaka J.",
    views: "22k views",
    image: "/images/download (2).jfif",
    alt: "Luxury polish bottles in studio",
  },
  {
    name: "Zainab L.",
    views: "12k views",
    image: "/images/poses for photo shoot, done in AI_.jfif",
    alt: "Client admiring finished beauty look",
    offset: true,
  },
];

const reviews = [
  {
    title: "Luxury Gel Mani",
    author: "Anita Ochei",
    rating: "5.0",
    image: "/images/gallery-1.jpg",
    quote:
      "Anita was incredibly patient with my design choice. The studio is so quiet and peaceful, a true escape from the city.",
    date: "2 days ago",
  },
  {
    title: "Acrylic Extensions",
    author: "Sharon Peter",
    rating: "5.0",
    image: "/images/download (4).jfif",
    quote:
      "The shape of these extensions is perfection. I have never had acrylics that look this natural and slim.",
    date: "1 week ago",
  },
  {
    title: "Classic Manicure",
    author: "Kemi Balogun",
    rating: "4.9",
    image: "/images/nails.png",
    quote:
      "Quick, efficient, and clean. Exactly what I need for a lunch break service. The booking process was seamless.",
    date: "2 weeks ago",
  },
];

function PageSection({ children, className = "" }) {
  return (
    <RevealSection delay={80}>
      <section className={className}>{children}</section>
    </RevealSection>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <PageSection className="relative mx-auto max-w-[1280px] overflow-hidden px-5 pb-24 pt-20 md:px-20 md:pb-32 md:pt-24">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-6 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Kind Words From Abeokuta
              </span>
              <h1 className="mb-8 font-display text-[40px] font-semibold leading-tight text-primary-container md:text-[64px]">
                Where <span className="font-light italic">Elegance</span>{" "}
                Meets Endless Appreciation.
              </h1>
              <p className="max-w-xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
                Discover why Beauty Plug is a coveted sanctuary for refined
                beauty care. Our commitment to meticulous detail is mirrored in
                the stories of our clients.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  src="/images/poses for photo shoot, done in AI_.jfif"
                  alt="Sophisticated client portrait in salon"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-container/25 to-transparent" />
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection className="bg-surface-container-low py-24 md:py-32">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 md:px-20 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Quote
                size={56}
                className="mb-8 fill-primary text-primary opacity-40"
              />
              <blockquote className="mb-10 font-headline text-3xl font-medium leading-tight text-on-surface md:text-5xl">
                "First time trying it out, I loved the cleanliness. Great
                customer service and affordable. The meticulous attention to
                detail at Beauty Plug is unmatched."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-outline-variant" />
                <div>
                  <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-surface">
                    Layrena Meglio
                  </p>
                  <p className="font-body text-sm italic text-on-surface-variant">
                    The Signature Gel Manicure
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-full border-8 border-white shadow-2xl shadow-primary/10">
                <img
                  src="/images/avatar-1.png"
                  alt="Radiant Beauty Plug client"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
          <div className="mb-16 text-center md:mb-20">
            <h2 className="mb-4 font-headline text-4xl font-medium uppercase tracking-tight text-primary-container md:text-5xl">
              The Studio Vibe
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              Step inside our sanctuary through the eyes of our guests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reels.map((reel) => (
              <button
                key={reel.name}
                type="button"
                className={`group relative aspect-[9/16] overflow-hidden bg-surface-container-highest text-left ${
                  reel.offset ? "lg:translate-y-8" : ""
                }`}
                aria-label={`Play testimonial from ${reel.name}`}
              >
                <img
                  src={reel.image}
                  alt={reel.alt}
                  className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/70 text-primary-container backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <Play size={22} fill="currentColor" />
                  </span>
                </div>
                <p className="absolute bottom-6 left-6 right-6 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {reel.name} - {reel.views}
                </p>
              </button>
            ))}
          </div>
        </PageSection>

        <PageSection className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="mb-2 block font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  Verified Experiences
                </span>
                <h2 className="font-headline text-4xl font-medium tracking-tight text-primary-container md:text-5xl">
                  The Gallery of Joy
                </h2>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center border border-outline text-on-surface transition-colors hover:bg-primary-container hover:text-on-primary"
                  aria-label="Previous reviews"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center border border-primary-container bg-primary-container text-on-primary transition-colors hover:bg-primary"
                  aria-label="Next reviews"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.title} className="group">
                  <div className="relative mb-8 aspect-video overflow-hidden bg-surface-container-low">
                    <img
                      src={review.image}
                      alt={`${review.title} result`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1 bg-white/90 px-3 py-1 shadow-sm">
                      <Star
                        size={14}
                        className="fill-secondary text-secondary"
                      />
                      <span className="font-label text-xs font-semibold">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-headline text-2xl font-medium text-on-surface">
                          {review.title}
                        </h3>
                        <p className="font-body text-sm italic text-on-surface-variant">
                          by {review.author}
                        </p>
                      </div>
                      <BadgeCheck
                        size={20}
                        className="shrink-0 text-primary-container"
                      />
                    </div>
                    <p className="font-body text-base leading-7 text-on-surface-variant">
                      "{review.quote}"
                    </p>
                    <span className="border-t border-outline-variant/30 pt-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-secondary/70">
                      {review.date}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
          <div className="relative overflow-hidden bg-primary-container px-6 py-20 text-center text-on-primary md:px-24 md:py-24">
            <h2 className="relative z-10 mb-8 font-headline text-4xl font-medium md:text-5xl">
              Experience the Plug.
            </h2>
            <p className="relative z-10 mx-auto mb-12 max-w-2xl font-body text-base leading-7 text-on-primary/80 md:text-lg">
              Join the league of sophisticated women who trust us with every
              detail. Secure your suite appointment today.
            </p>
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex h-14 items-center justify-center bg-white px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-surface-container"
              >
                Book Your Service
              </Link>
              <Link
                to="/services"
                className="inline-flex h-14 items-center justify-center border border-white/50 px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
              >
                View Price List
              </Link>
            </div>
          </div>
        </PageSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
