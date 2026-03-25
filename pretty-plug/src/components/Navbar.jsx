const navLinks = [
  { label: "Artisan", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Editorial", path: "/editorial" },
  { label: "Atelier", path: "/atelier" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl transition-colors duration-500">
      <div className="flex justify-between items-center w-full px-8 py-6">
        {/* Logo */}
        <a
          href="/"
          className="font-headline text-2xl italic text-primary tracking-tighter"
        >
          ThePrettyPlug
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.path}
              className={`font-body text-sm tracking-widest uppercase transition-all duration-300 ${
                index === 0
                  ? "text-primary border-b border-primary pb-1 font-bold"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href="/book">
          <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-body text-sm tracking-widest uppercase font-extrabold hover:opacity-80 active:scale-[0.99] transition-all cursor-pointer">
            Book Your Glow
          </button>
        </a>
      </div>
    </nav>
  );
}
