const galleryImages = [
  { id: 1, src: "/images/gallery-1.jpg", alt: "Portfolio shot 1" },
  { id: 2, src: "/images/gallery-2.png", alt: "Portfolio shot 2" },
  { id: 3, src: "/images/gallery-3.jpg", alt: "Portfolio shot 3" },
  { id: 4, src: "/images/gallery-4.png", alt: "Portfolio shot 4" },
  { id: 5, src: "/images/gallery-5.jpg", alt: "Portfolio shot 5" },
];

export default function InstagramGrid() {
  return (
    <section className="pb-32 px-4">
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl italic">
          @ThePrettyPlug_Abeokuta
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="aspect-square overflow-hidden hover:scale-105 transition-all duration-500"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
