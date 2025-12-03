import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ru" | "tj" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    heroTitle: "Вызов мастера за 1 час",
    heroSubtitle: "Профессиональные мастера в Душанбе для решения любых задач",
    heroButton: "Заказать мастера",
    heroButtonQuick: "Быстрый заказ",
    
    // Services
    servicesTitle: "Наши услуги",
    servicesSubtitle: "Широкий спектр услуг для дома и бизнеса",
    searchPlaceholder: "Поиск услуг...",
    filterAll: "Все услуги",
    serviceElectric: "Электрика",
    servicePlumbing: "Сантехника",
    serviceCleaning: "Клининг",
    serviceFurniture: "Сборка мебели",
    serviceRenovation: "Отделка",
    serviceSecurity: "Видеонаблюдение",
    serviceWelding: "Сварка",
    serviceRepair: "Ремонт техники",
    serviceSmartHome: "Умный дом",
    serviceOther: "Другие услуги",
    
    // How it works
    howItWorksTitle: "Как это работает",
    howItWorksSubtitle: "Всего 3 простых шага до решения вашей задачи",
    step1Title: "Оставьте заявку",
    step1Desc: "Выберите услугу и опишите задачу",
    step2Title: "Мастер свяжется",
    step2Desc: "В течение 15 минут мастер позвонит",
    step3Title: "Работа выполнена",
    step3Desc: "Качественно и в срок",
    
    // Quick Order
    quickOrderTitle: "Быстрый заказ",
    quickOrderSubtitle: "Заполните форму и мы свяжемся с вами",
    
    // Price List
    priceListTitle: "Наши цены",
    priceListSubtitle: "Прозрачные и честные расценки на все виды работ",
    formName: "Ваше имя",
    formPhone: "Телефон",
    formService: "Выберите услугу",
    formDistrict: "Район",
    formComment: "Комментарий (необязательно)",
    formSubmit: "Отправить заявку",
    formSuccess: "Спасибо! Мы скоро свяжемся с вами",
    
    // Districts
    districtSino: "Сино",
    districtFirdausi: "Фирдавси",
    districtShomansur: "Шохмансур",
    districtIsmoili: "Исмоили Сомони",
    districtSuburb: "Пригород",
    districtOther: "Другой",
    
    // Footer
    footerAbout: "О компании",
    footerAboutText: "Мастер Час — надёжный сервис вызова мастеров в Душанбе",
    footerContacts: "Контакты",
    footerPhone: "Телефон",
    footerEmail: "Email",
    footerDistricts: "Районы работы",
    footerRights: "© 2025 Мастер Час. Все права защищены",
  },
  tj: {
    // Header
    heroTitle: "Даъвати устод дар 1 соат",
    heroSubtitle: "Усто дон профессионалӣ дар Душанбе барои ҳалли ҳама гуна вазифаҳо",
    heroButton: "Фармоиш додани устод",
    heroButtonQuick: "Фармоиши тез",
    
    // Services
    servicesTitle: "Хидматҳои мо",
    servicesSubtitle: "Хидматҳои васеъ барои хона ва бизнес",
    searchPlaceholder: "Ҷустуҷӯи хидматҳо...",
    filterAll: "Ҳамаи хидматҳо",
    serviceElectric: "Барқкорӣ",
    servicePlumbing: "Сантехника",
    serviceCleaning: "Тозакунӣ",
    serviceFurniture: "Ҷамъкунии мебел",
    serviceRenovation: "Таъмири хона",
    serviceSecurity: "Видеоназорат",
    serviceWelding: "Ҷӯшкорӣ",
    serviceRepair: "Таъмири техника",
    serviceSmartHome: "Хонаи зирак",
    serviceOther: "Дигар хидматҳо",
    
    // How it works
    howItWorksTitle: "Чӣ тавр кор мекунад",
    howItWorksSubtitle: "Танҳо 3 қадами оддӣ то ҳалли масъалаи шумо",
    step1Title: "Фармоиш диҳед",
    step1Desc: "Хидматро интихоб кунед ва вазифаро шарҳ диҳед",
    step2Title: "Устод тамос мегирад",
    step2Desc: "Дар давоми 15 дақиқа устод занг мезанад",
    step3Title: "Кор анҷом ёфт",
    step3Desc: "Бо сифат ва дар вақт",
    
    // Quick Order
    quickOrderTitle: "Фармоиши тез",
    quickOrderSubtitle: "Формаро пур кунед ва мо бо шумо тамос мегирем",
    
    // Price List
    priceListTitle: "Нархҳои мо",
    priceListSubtitle: "Нархҳои шаффоф ва одилона барои ҳама намудҳои корҳо",
    formName: "Номи шумо",
    formPhone: "Телефон",
    formService: "Хидматро интихоб кунед",
    formDistrict: "Ноҳия",
    formComment: "Шарҳ (ихтиёрӣ)",
    formSubmit: "Фиристодани фармоиш",
    formSuccess: "Ташаккур! Мо зуд бо шумо тамос мегирем",
    
    // Districts
    districtSino: "Сино",
    districtFirdausi: "Фирдавсӣ",
    districtShomansur: "Шоҳмансур",
    districtIsmoili: "Исмоилӣ Сомонӣ",
    districtSuburb: "Атрофи шаҳр",
    districtOther: "Дигар",
    
    // Footer
    footerAbout: "Дар бораи ширкат",
    footerAboutText: "Мастер Час — хидмати боэътимоди даъвати устодон дар Душанбе",
    footerContacts: "Тамосҳо",
    footerPhone: "Телефон",
    footerEmail: "Почтаи электронӣ",
    footerDistricts: "Ноҳияҳои кор",
    footerRights: "© 2025 Мастер Час. Ҳамаи ҳуқуқҳо ҳифз шудаанд",
  },
  en: {
    // Header
    heroTitle: "Call a Master in 1 Hour",
    heroSubtitle: "Professional craftsmen in Dushanbe for any task",
    heroButton: "Order a Master",
    heroButtonQuick: "Quick Order",
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Wide range of services for home and business",
    serviceElectric: "Electrical",
    servicePlumbing: "Plumbing",
    serviceCleaning: "Cleaning",
    serviceFurniture: "Furniture Assembly",
    serviceRenovation: "Renovation",
    serviceSecurity: "Video Surveillance",
    serviceWelding: "Welding",
    serviceRepair: "Appliance Repair",
    serviceSmartHome: "Smart Home",
    serviceOther: "Other Services",
    
    // Search & Filter
    searchPlaceholder: "Search services...",
    filterAll: "All Services",
    
    // How it works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Just 3 simple steps to solve your problem",
    step1Title: "Submit a Request",
    step1Desc: "Choose a service and describe the task",
    step2Title: "Master Contacts You",
    step2Desc: "Within 15 minutes the master will call",
    step3Title: "Work Completed",
    step3Desc: "Quality and on time",
    
    // Quick Order
    quickOrderTitle: "Quick Order",
    quickOrderSubtitle: "Fill out the form and we'll contact you",
    
    // Price List
    priceListTitle: "Our Prices",
    priceListSubtitle: "Transparent and fair pricing for all types of work",
    formName: "Your Name",
    formPhone: "Phone",
    formService: "Select Service",
    formDistrict: "District",
    formComment: "Comment (optional)",
    formSubmit: "Submit Request",
    formSuccess: "Thank you! We'll contact you soon",
    
    // Districts
    districtSino: "Sino",
    districtFirdausi: "Firdausi",
    districtShomansur: "Shomansur",
    districtIsmoili: "Ismoili Somoni",
    districtSuburb: "Suburb",
    districtOther: "Other",
    
    // Footer
    footerAbout: "About Company",
    footerAboutText: "Master Chas — reliable master call service in Dushanbe",
    footerContacts: "Contacts",
    footerPhone: "Phone",
    footerEmail: "Email",
    footerDistricts: "Service Areas",
    footerRights: "© 2025 Master Chas. All rights reserved",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ru");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ru] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
