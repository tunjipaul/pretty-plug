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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <RevealSection>
          <Hero />
        </RevealSection>
        <RevealSection delay={80}>
          <TrustMetrics />
        </RevealSection>
        <RevealSection delay={120}>
          <ServiceChapter />
        </RevealSection>
        <RevealSection delay={120}>
          <PortfolioPreview />
        </RevealSection>
        <RevealSection delay={120}>
          <Testimonials />
        </RevealSection>
        <RevealSection delay={120}>
          <Newsletter />
        </RevealSection>
        <RevealSection delay={120}>
          <InstagramGrid />
        </RevealSection>
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
