import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import ServiceChapter from "../components/home/ServiceChapter";
import StyleQuiz from "../components/home/StyleQuiz";
import SecuringGlow from "../components/home/SecuringGlow";
import InstagramGrid from "../components/home/InstagramGrid";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <ServiceChapter />
        <StyleQuiz />
        <SecuringGlow />
        <InstagramGrid />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
