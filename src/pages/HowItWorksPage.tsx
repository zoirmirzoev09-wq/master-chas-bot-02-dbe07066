import { useLanguage } from "@/contexts/LanguageContext";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24">
        <HowItWorksSection />
        
        {/* CTA */}
        <div className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("howItWorksSubtitle")}</h2>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={() => navigate("/")}
            >
              {t("heroButton")}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
