const collectiveLinks = [
  { label: "Instagram", href: "#" },
  { label: "Editorial", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-20 px-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Col 1 — Brand */}
        <div className="col-span-1">
          <div className="font-headline text-3xl italic mb-4 text-primary">
            ThePrettyPlug
          </div>
          <p className="font-body text-sm leading-relaxed text-primary/70 max-w-xs">
            Curating premium beauty experiences for the modern African woman.
            Visit our private atelier in the heart of Abeokuta.
          </p>
        </div>

        {/* Col 2 — The Collective Links */}
        <div className="flex flex-col gap-4">
          <span className="font-headline italic text-lg text-primary">
            The Collective
          </span>
          {collectiveLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary/70 hover:translate-x-1 hover:text-primary transition-all duration-300 font-body text-sm uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Col 3 — Location */}
        <div className="flex flex-col justify-between h-full text-primary">
          <div>
            <span className="font-headline italic text-lg">Location</span>
            <p className="mt-2 text-sm font-body opacity-70">
              Abeokuta Luxury District, Ogun State.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-xs font-body opacity-50">
              © 2025 ThePrettyPlug. Crafted in Abeokuta.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
