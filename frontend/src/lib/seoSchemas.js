const BASE_DOMAIN = "https://theprettyplug.com";

/**
 * Returns JSON-LD schema for LocalBusiness / BeautySalon in Abeokuta
 */
export function getLocalBusinessSchema(settings) {
  const business = settings?.business || {
    name: "ThePrettyPlug",
    email: "hello@theprettyplug.test",
    whatsapp: "+234 800 000 0000",
    address: "Abeokuta, Ogun State, Nigeria",
  };

  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${BASE_DOMAIN}/#organization`,
    name: business.name || "ThePrettyPlug",
    url: BASE_DOMAIN,
    logo: `${BASE_DOMAIN}/favicon.svg`,
    image: `${BASE_DOMAIN}/images/studio.jpg`,
    description:
      "Abeokuta's premier luxury beauty studio specializing in editorial gel manicures, handcrafted nail art, luxury lash extensions, and aesthetic care.",
    telephone: business.whatsapp || "+2348000000000",
    email: business.email || "hello@theprettyplug.test",
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address || "Abeokuta Luxury Suite",
      addressLocality: "Abeokuta",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.1475",
      longitude: "3.3619",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "13:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      settings?.socials?.instagram || "https://instagram.com",
      "https://substack.com/@theprettyplug",
    ],
  };
}

/**
 * Returns JSON-LD schema for Breadcrumbs
 */
export function getBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_DOMAIN}${item.path}`,
    })),
  };
}

/**
 * Returns JSON-LD schema for FAQ page
 */
export function getFaqSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Returns JSON-LD schema for Services Catalog
 */
export function getServicesSchema(services = []) {
  if (!services || services.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ThePrettyPlug Services Catalog",
    description: "Full list of editorial nail art, manicures, and lash extension services in Abeokuta.",
    itemListElement: services.map((s, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description || s.name,
        provider: {
          "@type": "BeautySalon",
          name: "ThePrettyPlug",
        },
        offers: {
          "@type": "Offer",
          price: s.price || "0",
          priceCurrency: "NGN",
        },
      },
    })),
  };
}
