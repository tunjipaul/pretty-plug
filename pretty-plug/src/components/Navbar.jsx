import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services", path: "/services" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-20">
        <Link
          to="/"
          className="font-headline text-xl font-semibold tracking-tight text-primary-container"
        >
          Beauty Plug
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `font-label text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive
                    ? "border-b-2 border-primary-container pb-1 text-primary-container"
                    : "text-on-surface-variant hover:text-primary-container"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="hidden bg-primary-container px-6 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="p-2 text-primary-container md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-outline-variant/20 bg-surface/95 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-5 py-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-label text-xs font-semibold uppercase tracking-[0.14em] ${
                  isActive
                    ? "text-primary-container"
                    : "text-on-surface-variant"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            onClick={() => setIsOpen(false)}
            className="bg-primary-container px-6 py-4 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-on-primary"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
