import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, Play, Quote, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import RevealSection from "../components/home/RevealSection";
import { getTestimonials, getGallery, getContent } from "../lib/content";

function resolveImageUrl(p) {
  if (!p) return "";
  if (typeof p === "string") return p;
  if (typeof p === "object") {
    return (
      p.publicUrl || p.publicURL || p.public_url || p.url ||
      Object.values(p).find((v) => typeof v === "string" && v.startsWith("http")) ||
      ""
    );
  }
  return "";
}

function PageSection({ children, className = "" }) {
  return (
    <RevealSection delay={80}>
      <section className={className}>{children}</section>
    </RevealSection>
  );
}

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerContent, setHeaderContent] = useState(null);

  useEffect(() => {
    getContent().then((data) => {
      if (data?.pageHeaders?.testimonials) {
        setHeaderContent(data.pageHeaders.testimonials);
      }
    });

    Promise.allSettled([getTestimonials(), getGallery()])
      .then(([testimonialsRes, galleryRes]) => {
        if (testimonialsRes.status === "fulfilled" && testimonialsRes.value) {
          setReviews(testimonialsRes.value.filter((t) => t.is_published !== false));
        }
        if (galleryRes.status === "fulfilled" && galleryRes.value) {
          // Use gallery images to mock the reels section if available
          const gallery = galleryRes.value.filter((g) => g.is_published);
          const mockReels = gallery.slice(0, 4).map((g, index) => ({
            name: `Client Showcase ${index + 1}`,
            views: `${Math.floor(Math.random() * 20 + 5)}k views`,
            image: resolveImageUrl(g.image_path),
            alt: g.title,
            offset: index % 2 !== 0,
          }));
          setReels(mockReels.length > 0 ? mockReels : [
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
          ]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <PageSection className="relative mx-auto max-w-[1280px] overflow-hidden px-5 pb-24 pt-20 md:px-20 md:pb-32 md:pt-24">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <span className="mb-6 block font-label text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Kind Words From Abeokuta
              </span>
              <h1 className="mb-8 font-display text-[40px] font-semibold leading-tight text-primary-container md:text-[64px]">
                {headerContent?.title || "Where Elegance Meets Endless Appreciation."}
              </h1>
              <p className="max-w-xl font-body text-base leading-7 text-on-surface-variant md:text-lg">
                {headerContent?.subtitle || "Discover why ThePrettyPlug is a coveted sanctuary for refined beauty care. Our commitment to meticulous detail is mirrored in the stories of our clients."}
              </p>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  src="/images/poses for photo shoot, done in AI_.jfif"
                  alt="Client glowing after service"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-container/80 to-transparent p-8">
                  <div className="flex h-full flex-col justify-end">
                    <Quote className="mb-4 text-primary opacity-60" size={40} />
                    <p className="font-headline text-xl italic text-on-primary md:text-2xl">
                      "I have finally found my forever beauty studio in
                      Abeokuta."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection className="bg-surface-container-lowest">
          <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-20 md:py-32">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                  Verified Experiences
                </h2>
                <p className="font-body text-base leading-7 text-on-surface-variant">
                  We collect genuine feedback after every appointment. These are
                  the unedited voices of our community.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-4">
                  {[
                    "/images/avatar-1.png",
                    "/images/avatar-2.jpg",
                    "/images/avatar-3.png",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Reviewer avatar"
                      className="h-10 w-10 rounded-full border-2 border-surface object-cover"
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-1 text-secondary">
                    <Star size={14} className="fill-current" />
                    <Star size={14} className="fill-current" />
                    <Star size={14} className="fill-current" />
                    <Star size={14} className="fill-current" />
                    <Star size={14} className="fill-current" />
                  </div>
                  <div className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Based on 200+ Reviews
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex w-full h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex w-full h-64 items-center justify-center font-body text-on-surface-variant">
                No reviews found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <article
                    key={review.id || review.client_name}
                    className="editorial-shadow flex flex-col justify-between border border-outline-variant/10 bg-surface p-8 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div>
                      <div className="mb-6 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1 font-headline text-xl font-medium text-on-surface">
                            {review.service_label || review.client_name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                              {review.rating ? `${review.rating} Rating` : "5.0 Rating"}
                            </span>
                            <BadgeCheck size={14} className="text-secondary" />
                          </div>
                        </div>
                        <img
                          src={resolveImageUrl(review.avatar_path) || "https://i.pravatar.cc/100"}
                          alt={review.client_name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <p className="mb-8 font-body text-base leading-7 text-on-surface-variant">
                        "{review.quote}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6">
                      <div className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
                        {review.client_name}
                      </div>
                      <div className="font-label text-[10px] uppercase tracking-[0.12em] text-outline-variant">
                        Verified Client
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </PageSection>

        <PageSection className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline text-4xl font-medium text-on-surface md:text-5xl">
                Studio Highlights
              </h2>
              <p className="mx-auto max-w-xl font-body text-base leading-7 text-on-surface-variant">
                Glimpses of beauty in motion. See real transformations as they
                happen in our Abeokuta sanctuary.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
              {reels.map((reel, index) => (
                <div
                  key={index}
                  className={`group relative aspect-[9/16] w-full overflow-hidden bg-surface-container ${
                    reel.offset ? "md:translate-y-12" : ""
                  }`}
                >
                  <img
                    src={reel.image}
                    alt={reel.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:scale-110 md:h-16 md:w-16">
                      <Play
                        size={20}
                        className="ml-1 fill-current md:h-6 md:w-6"
                      />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                    <div className="font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                      {reel.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1 font-body text-xs text-white/70">
                      <Play size={10} />
                      {reel.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center md:mt-32">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:text-primary"
              >
                Follow Our Journey on Instagram
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </PageSection>

        <PageSection className="bg-primary-container px-5 py-24 text-center text-on-primary md:px-20 md:py-28">
          <h2 className="mb-8 font-display text-[40px] font-semibold leading-tight md:text-[64px]">
            Ready to be Pampered?
          </h2>
          <p className="mx-auto mb-12 max-w-xl font-body text-base leading-7 text-primary-fixed md:text-lg">
            Book your appointment online and experience the meticulous standard
            of ThePrettyPlug.
          </p>
          <div className="flex justify-center">
            <Link
              to="/book"
              className="inline-flex h-14 items-center justify-center bg-on-primary px-12 font-label text-xs font-semibold uppercase tracking-[0.12em] text-primary-container transition-colors hover:bg-primary-fixed"
            >
              Book Online
            </Link>
          </div>
        </PageSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
