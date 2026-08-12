import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import RevealSection from "../components/home/RevealSection";
import TrustMetrics from "../components/home/TrustMetrics";
import ServiceChapter from "../components/home/ServiceChapter";
import PortfolioPreview from "../components/home/PortfolioPreview";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import InstagramGrid from "../components/home/InstagramGrid";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import { getContent, getGallery, getServices, getTestimonials } from "../lib/content";

const defaultContent = {
  hero: {
    eyebrow: "Abeokuta Luxury Suite",
    headline: "Best Nails for Best Moments",
    highlight: "Best Moments",
    body:
      "Loved by beauty minimalists and curated for the meticulous. Step into an era of editorial beauty where every finish is personal.",
    primaryCta: "Book Appointment",
    secondaryCta: "View Portfolio",
  },
  trustMetrics: {
    items: [
      { value: "500+", label: "Happy Clients" },
      { value: "3+", label: "Years Excellence" },
      { value: "5", label: "Star Reviews" },
      { value: "1", label: "Certified Master" },
    ],
  },
};

export default function Home() {
  const [content, setContent] = useState(defaultContent);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    getContent()
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Content load failed:", err))
      .finally(() => setContentLoading(false));

    getServices().then((data) => {
      if (data) setServices(data.filter((s) => s.is_featured));
    });
    getTestimonials().then((data) => {
      if (data) setTestimonials(data.filter((t) => t.is_featured));
    });
    getGallery().then((data) => {
      if (data) setGallery(data.filter((i) => i.is_published));
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <RevealSection>
          <Hero content={content.hero} />
        </RevealSection>
        <RevealSection delay={80}>
          <TrustMetrics content={content.trustMetrics} />
        </RevealSection>
        <RevealSection delay={120}>
          <ServiceChapter services={services} />
        </RevealSection>
        <RevealSection delay={120}>
          <PortfolioPreview items={gallery} />
        </RevealSection>
        <RevealSection delay={120}>
          <Testimonials testimonials={testimonials} sideImageUrl={content.clientExperiencesImageUrl} />
        </RevealSection>
        <RevealSection delay={120}>
          <Newsletter content={content.newsletter} />
        </RevealSection>
        <RevealSection delay={120}>
          <InstagramGrid gallery={gallery} />
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
