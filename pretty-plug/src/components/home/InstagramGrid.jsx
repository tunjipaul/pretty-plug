const galleryImages = [
  { id: 1, file: "gallery-1.jpg" },
  { id: 2, file: "gallery-2.jpg" },
  { id: 3, file: "gallery-3.jpg" },
  { id: 4, file: "gallery-4.jpg" },
  { id: 5, file: "gallery-5.jpg" },
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
            className="aspect-square bg-surface-container-high overflow-hidden hover:scale-105 transition-all duration-500 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl opacity-30">📷</span>
              <span className="text-on-surface-variant/40 text-[10px] font-label tracking-widest uppercase text-center px-2">
                {img.file}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
