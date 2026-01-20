import { MainHeader } from "@/components/layout/MainHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { QuickOrder } from "@/components/QuickOrder";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <QuickOrder />
      <Footer />
    </div>
  );
};

export default Index;
