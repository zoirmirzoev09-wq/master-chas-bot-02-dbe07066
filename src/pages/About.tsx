import { useLanguage } from "@/contexts/LanguageContext";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import { Shield, DollarSign, Zap, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    titleKey: "aboutFeature1",
    descKey: "aboutFeature1Desc",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: DollarSign,
    titleKey: "aboutFeature2",
    descKey: "aboutFeature2Desc",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    titleKey: "aboutFeature3",
    descKey: "aboutFeature3Desc",
    color: "from-primary to-orange-400",
  },
  {
    icon: Headphones,
    titleKey: "aboutFeature4",
    descKey: "aboutFeature4Desc",
    color: "from-purple-500 to-pink-500",
  },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("aboutTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("aboutDescription")}
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-20 bg-muted/50 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Мастеров</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Заказов</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
