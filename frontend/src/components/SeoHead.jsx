import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_DOMAIN = "https://theprettyplug.com";

/**
 * SeoHead component for dynamic page title, meta tags, canonical link, and JSON-LD schema injection.
 */
export default function SeoHead({
  title,
  description,
  canonicalPath,
  ogImage = "/images/studio.jpg",
  ogType = "website",
  noindex = false,
  schema = null,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Document Title
    const finalTitle = title
      ? `${title} | ThePrettyPlug Abeokuta`
      : "ThePrettyPlug | Luxury Nails, Lashes & Editorial Artistry in Abeokuta";
    document.title = finalTitle;

    // 2. Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description ||
          "Abeokuta's premier luxury studio for meticulous gel manicures, luxury lash extensions, and editorial beauty care.",
      );
    }

    // 3. Robots Meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      "content",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    // 4. Canonical URL Link
    const currentPath = canonicalPath || location.pathname;
    const fullCanonicalUrl = `${BASE_DOMAIN}${currentPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullCanonicalUrl);

    // 5. OpenGraph & Twitter Meta Tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute("content", finalTitle);

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag && description) ogDescTag.setAttribute("content", description);

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.setAttribute("content", fullCanonicalUrl);
    } else {
      const newOgUrl = document.createElement("meta");
      newOgUrl.setAttribute("property", "og:url");
      newOgUrl.setAttribute("content", fullCanonicalUrl);
      document.head.appendChild(newOgUrl);
    }

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag && ogImage) ogImageTag.setAttribute("content", ogImage);

    // 6. JSON-LD Structured Data Injection
    const existingScript = document.getElementById("json-ld-schema");
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "json-ld-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up dynamic schema when unmounting
      const activeScript = document.getElementById("json-ld-schema");
      if (activeScript) activeScript.remove();
    };
  }, [title, description, canonicalPath, ogImage, ogType, noindex, schema, location.pathname]);

  return null;
}
