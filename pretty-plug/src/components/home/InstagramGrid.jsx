const galleryImages = [
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

export default function InstagramGrid() {
  return (
    <section className="bg-surface-container-low py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="font-headline text-2xl font-medium text-on-surface md:text-3xl">
            @theprettyplugabeokuta
          </h2>
          <a
            href="https://instagram.com"
            className="font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-container underline underline-offset-4 md:text-xs"
          >
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-9">
          {galleryImages.map((img) => (
            <a
              key={img.src}
              href="https://instagram.com"
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
