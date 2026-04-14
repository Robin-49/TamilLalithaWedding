import SmoothScroll from "@/components/SmoothScroll";
import FloatingElements from "@/components/FloatingElements";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import KolamSeparator from "@/components/KolamSeparator";
import CountdownSection from "@/components/CountdownSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import FixedButtons from "@/components/FixedButtons";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

const IndexContent = () => {
  const { lang } = useLanguage();
  const isTamil = lang === "ta";

  return (
    <div className={isTamil ? 'font-tamil' : ''}>
      <SmoothScroll>
        <FloatingElements />
        <TopBar />
        <FixedButtons />
        <main className="relative">
          <HeroSection />
          <KolamSeparator />
          <CountdownSection />
          <KolamSeparator />
          <EventsSection />
          <KolamSeparator />
          <GallerySection />
          <ContactSection />
          <KolamSeparator />
          <FooterSection />
        </main>
      </SmoothScroll>
    </div>
  );
};

export default Index;
