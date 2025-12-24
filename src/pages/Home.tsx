import { useLanguage } from "@/contexts/LanguageContext";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedWorks from "@/components/FeaturedWorks";
import Footer from "@/components/Footer";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Hero />
        <div className="pb-20">
          <About />
          <FeaturedWorks />
        </div>
        <Footer />
      </main>
    </div>
  );
}
