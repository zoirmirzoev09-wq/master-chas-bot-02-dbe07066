import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  const districts = [
    "districtSino",
    "districtFirdausi",
    "districtShomansur",
    "districtIsmoili",
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                М
              </div>
              <span className="text-xl font-bold">Мастер Час</span>
            </div>
            <p className="text-secondary-foreground/80">
              {t("footerAboutText")}
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footerContacts")}</h3>
            <div className="space-y-3">
              <a href="tel:+992000000000" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+992 (00) 000-00-00</span>
              </a>
              <a href="mailto:info@masterchas.tj" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@masterchas.tj</span>
              </a>
            </div>
          </div>

          {/* Districts */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footerDistricts")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {districts.map((district) => (
                <div key={district} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{t(district)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          {t("footerRights")}
        </div>
      </div>
    </footer>
  );
};
