import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Artisan", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Editorial", path: "/editorial" },
  { label: "Atelier", path: "/atelier" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Right side — CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a href="/book">
            <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-body text-sm tracking-widest uppercase font-extrabold hover:opacity-80 active:scale-[0.99] transition-all cursor-pointer">
              Book Your Glow
            </button>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-1 transition-all duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-8 pb-8 gap-6 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/10">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`font-body text-sm tracking-widest uppercase transition-all duration-300 ${
                index === 0
                  ? "text-primary font-bold"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
