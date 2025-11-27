import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const Hero = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToOrder = () => {
    document.getElementById("quick-order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "ru" ? "tj" : "ru")}
          className="gap-2"
        >
          <Languages className="w-4 h-4" />
          {language === "ru" ? "🇷🇺 RU" : "🇹🇯 TJ"}
        </Button>
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo / Brand */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              М
            </div>
            <span className="text-2xl font-bold text-foreground">Мастер Час</span>
          </div>

          {/* Hero title */}
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg-orange hover:scale-105 transition-transform"
              onClick={scrollToOrder}
            >
              {t("heroButton")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={scrollToOrder}
            >
              {t("heroButtonQuick")}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1">
                {language === "ru" ? "Мастеров" : "Устодон"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground mt-1">
                {language === "ru" ? "Заказов" : "Фармоишҳо"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1 {language === "ru" ? "час" : "соат"}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {language === "ru" ? "Прибытие" : "Омадан"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};
