import { useLanguage } from "@/contexts/LanguageContext";
import { ClipboardList, Phone, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: ClipboardList, titleKey: "step1Title", descKey: "step1Desc" },
  { icon: Phone, titleKey: "step2Title", descKey: "step2Desc" },
  { icon: CheckCircle2, titleKey: "step3Title", descKey: "step3Desc" },
];

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("howItWorksTitle")}</h2>
          <p className="text-lg text-muted-foreground">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map(({ icon: Icon, titleKey, descKey }, index) => (
            <div key={titleKey} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
              
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center shadow-lg-orange">
                    <Icon className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{t(titleKey)}</h3>
                <p className="text-muted-foreground">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
