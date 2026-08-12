import { useEffect, useMemo, useState } from "react";
import { getSetting } from "../../lib/content";

const fallbackImages = [
  { src: "/images/gallery-1.jpg", alt: "Detailed nail art close-up" },
  { src: "/images/lashes.png", alt: "Editorial lash extension close-up" },
  { src: "/images/download (2).jfif", alt: "Luxury beauty product styling" },
  { src: "/images/poses for photo shoot, done in AI_.jfif", alt: "Beauty studio portrait" },
  { src: "/images/studio.jpg", alt: "Softly lit studio interior" },
  { src: "/images/nails.png", alt: "Neutral manicure detail" },
  { src: "/images/download (6).jfif", alt: "Spa pedicure basin" },
  { src: "/images/gallery-3.jpg", alt: "Dark editorial nail polish" },
  { src: "/images/gallery-5.jpg", alt: "Nail artist applying detail" },
];

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

export default function InstagramGrid({ gallery = [] }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSetting("global_settings").then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const instagramUrl = settings?.socials?.instagram || "https://instagram.com";
  const brandName = settings?.business?.name || "theprettyplug";
  const handle = `@${brandName.toLowerCase().replace(/\s+/g, "")}`;

  const displayImages = useMemo(() => {
    // Map dynamic gallery items to the expected structure
    const dynamicItems = gallery.slice(0, 9).map((g) => ({
      src: resolveImageUrl(g.image_path),
      alt: g.title || "Gallery image",
    }));

    // If we have less than 9 dynamic images, fill the rest with fallbacks
    if (dynamicItems.length < 9) {
      const needed = 9 - dynamicItems.length;
      return [...dynamicItems, ...fallbackImages.slice(0, needed)];
    }

    return dynamicItems;
  }, [gallery]);

  return (
    <section className="bg-surface-container-low py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center lg:mb-10">
          <h2 className="break-all font-headline text-2xl font-medium text-on-surface md:text-3xl">
            {handle}
          </h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container underline underline-offset-4 md:text-xs"
          >
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-9">
          {displayImages.map((img, index) => (
            <a
              key={img.src + index}
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="aspect-square overflow-hidden bg-surface-variant transition-opacity hover:opacity-80"
              aria-label={img.alt}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
