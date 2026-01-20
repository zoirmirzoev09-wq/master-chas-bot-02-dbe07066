import { useLanguage } from "@/contexts/LanguageContext";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const Contacts = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      label: t("contactPhone"),
      value: "+992 XXX XX XX",
      href: "tel:+992XXXXXX",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      label: t("contactEmail"),
      value: "support@masterchas.tj",
      href: "mailto:support@masterchas.tj",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      label: t("contactHours"),
      value: t("contactHoursValue"),
      color: "from-primary to-orange-400",
    },
    {
      icon: MapPin,
      label: "Душанбе",
      value: "Таджикистан",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("contactsTitle")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("contactsDescription")}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <Card className="group p-6 text-center hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-bold text-lg">{item.value}</div>
                </Card>
              );

              return item.href ? (
                <a key={index} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>

          {/* Map placeholder */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 bg-muted/30">
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Карта скоро будет добавлена</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
