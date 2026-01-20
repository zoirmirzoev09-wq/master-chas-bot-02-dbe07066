import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Clock, Star, CheckCircle, AlertTriangle } from "lucide-react";

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollToOrder = () => {
    document.getElementById("quick-order")?.scrollIntoView({ behavior: "smooth" });
  };

  const trustItems = [
    {
      icon: Clock,
      value: t("trustTime"),
      label: t("trustTimeDesc"),
    },
    {
      icon: Star,
      value: t("trustRating"),
      label: t("trustRatingDesc"),
    },
    {
      icon: CheckCircle,
      value: t("trustOrders"),
      label: t("trustOrdersDesc"),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
              М
            </div>
            <span className="text-lg font-semibold text-foreground">Мастер Час</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight">
            {t("heroTitle")}
          </h1>

          {/* Subtitle with checkmarks */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            {t("heroSubtitle")}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto">
            {t("heroDescription")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl"
              onClick={scrollToOrder}
            >
              {t("heroButton")}
            </Button>
            <Button 
              size="lg" 
              variant="destructive"
              className="text-base sm:text-lg px-6 py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl gap-2"
              onClick={() => navigate("/categories?filter=emergency")}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="hidden sm:inline">{t("heroEmergency")}</span>
              <span className="sm:hidden">🚨 Аварийный 24/7</span>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 max-w-2xl mx-auto">
            {trustItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 hover:border-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{item.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
