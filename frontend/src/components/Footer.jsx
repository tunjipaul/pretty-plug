import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { getSetting } from "../lib/content";

const studioLinks = [
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "FAQ", path: "/faq" },
  { label: "Book Online", path: "/book" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSetting("global_settings").then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const business = settings?.business || {
    name: "ThePrettyPlug",
    location: "Abeokuta Suite",
    email: "hello@theprettyplug.test",
    whatsapp: "+234 800 000 0000",
    address: "Abeokuta, Ogun State, Nigeria",
  };

  const contactLinks = [
    {
      label: "Instagram",
      href: settings?.socials?.instagram || "https://instagram.com",
      icon: FaInstagram,
    },
    {
      label: "Email",
      href: `mailto:${business.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      href: `tel:${business.whatsapp}`,
      icon: Phone,
    },
  ];

  return (
    <footer id="footer" className="border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-6 md:gap-12 lg:grid-cols-4 lg:px-20 lg:py-24">
        <div className="space-y-6">
          <div className="font-headline text-2xl font-semibold tracking-tight text-on-surface">
            {business.name}
          </div>
          <p className="max-w-xs font-body text-sm leading-6 text-on-surface-variant">
            Elevating beauty to an editorial art form in {business.location}. Your
            destination for meticulous nails, lashes, and refined beauty care.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
            Studio
          </p>
          <ul className="space-y-4 font-body text-sm text-on-surface-variant">
            {studioLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-primary-container"
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
            Info
          </p>
          <div className="flex gap-4">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  className="flex h-10 w-10 items-center justify-center border border-outline-variant/40 text-on-surface-variant transition-colors hover:text-primary-container"
                  href={link.href}
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
            Visit Us
          </p>
          <p className="font-body text-sm leading-7 text-on-surface-variant">
            {business.address.split(',').map((part, i) => (
              <span key={i}>
                {part.trim()}
                {i < business.address.split(',').length - 1 && <br />}
              </span>
            ))}
            <br />
            <br />
            Mon - Sat: 9am - 7pm
            <br />
            Sun: Closed
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] border-t border-outline-variant/10 px-5 py-8 text-center sm:px-6 lg:px-20">
        <p className="font-body text-sm text-on-surface-variant/70">
          (c) {currentYear} {business.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
