import { useLanguage } from "@/contexts/LanguageContext";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import MasterApplicationForm from "@/components/MasterApplicationForm";
import { DollarSign, Users, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Стабильный доход",
    desc: "Получайте заказы каждый день и зарабатывайте больше",
  },
  {
    icon: Users,
    title: "Новые клиенты",
    desc: "Мы приводим клиентов — вы только выполняете работу",
  },
  {
    icon: Clock,
    title: "Гибкий график",
    desc: "Работайте когда удобно, принимайте только интересные заказы",
  },
  {
    icon: Shield,
    title: "Поддержка",
    desc: "Помощь в сложных ситуациях и защита от недобросовестных клиентов",
  },
];

const BecomeMaster = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("menuBecomeMaster")}
            </h1>
            <p className="text-lg text-muted-foreground">
              Присоединяйтесь к команде профессионалов и получайте заказы каждый день
            </p>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto">
            <MasterApplicationForm userId="" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeMaster;
