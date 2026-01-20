import { useLanguage } from "@/contexts/LanguageContext";
import { MousePointer, MessageSquare, Truck } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    titleKey: "step1Title",
    descKey: "step1Desc",
    color: "from-blue-500 to-cyan-500",
    number: "01"
  },
  {
    icon: MessageSquare,
    titleKey: "step2Title",
    descKey: "step2Desc",
    color: "from-primary to-orange-400",
    number: "02"
  },
  {
    icon: Truck,
    titleKey: "step3Title",
    descKey: "step3Desc",
    color: "from-green-500 to-emerald-500",
    number: "03"
  },
];

export const HowItWorksSection = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howItWorksSubtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Connection line - desktop only */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-lg">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                  </div>
                  
                  {/* Arrow - mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <svg className="w-4 h-4 text-muted-foreground rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
