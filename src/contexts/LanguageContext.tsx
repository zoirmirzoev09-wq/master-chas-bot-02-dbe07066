import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "ru" | "tj" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header menu
    menuAbout: "О компании",
    menuCategories: "Категории",
    menuHowItWorks: "Как это работает",
    menuContacts: "Контакты",
    menuBecomeMaster: "Стать мастером",
    menuLogin: "Вход",
    menuCabinet: "Личный кабинет",
    menuLogout: "Выйти",
    
    // Hero section
    heroTitle: "Мастер приедет уже сегодня",
    heroSubtitle: "Проверенные мастера • Выезд от 30 минут • Гарантия работ",
    heroDescription: "Мы быстро подбираем мастера рядом с вами — для срочного ремонта и бытовых задач по дому.",
    heroButton: "Заказать мастера",
    heroEmergency: "🚨 Аварийный мастер 24/7 — выезд 30–60 минут",
    
    // Trust indicators
    trustTime: "За 1 час",
    trustTimeDesc: "мастер приедет",
    trustRating: "4.9",
    trustRatingDesc: "средний рейтинг",
    trustOrders: "5000+",
    trustOrdersDesc: "выполненных заказов",
    
    // Services / Categories
    servicesTitle: "Каталог услуг",
    servicesSubtitle: "Выберите категорию и закажите мастера в несколько кликов",
    searchPlaceholder: "Поиск услуг...",
    filterAll: "Все услуги",
    serviceElectric: "Электрика",
    servicePlumbing: "Сантехника",
    serviceCleaning: "Клининг",
    serviceFurniture: "Сборка мебели",
    serviceRenovation: "Отделка",
    serviceSecurity: "Видеонаблюдение",
    serviceWelding: "Сварка",
    serviceBasement: "Подвалы и гаражи",
    serviceTurnkey: "Ремонт под ключ",
    serviceRepair: "Ремонт техники",
    serviceSmartHome: "Умный дом",
    serviceOther: "Другие услуги",
    serviceEmergency: "Аварийные услуги 24/7",
    serviceEmergencyBadge: "Срочно",
    priceFrom: "от",
    orderMaster: "Заказать мастера",
    
    // Subcategories - Electrical
    subElectricSockets: "Розетки и выключатели",
    subElectricLights: "Люстры и светильники",
    subElectricPanel: "Автоматы и щитки",
    subElectricShort: "Короткое замыкание",
    subElectricUrgent: "Срочный вызов",
    
    // Subcategories - Plumbing
    subPlumbingFaucets: "Смесители и краны",
    subPlumbingToilet: "Унитазы и биде",
    subPlumbingPipes: "Прочистка труб",
    subPlumbingHeater: "Водонагреватели",
    subPlumbingLeak: "Устранение протечек",
    
    // Subcategories - Emergency
    subEmergencyElectric: "Срочный электрик",
    subEmergencyPlumber: "Срочный сантехник",
    subEmergencyLeak: "Протечка / авария",
    subEmergencyDiag: "Аварийная диагностика",
    subEmergencyNight: "Ночной и выходной выезд",
    subEmergencyCall: "Срочный звонок",
    emergencyNote: "Выезд 30–60 минут",
    
    // How it works
    howItWorksTitle: "Как заказать мастера за 3 простых шага",
    howItWorksSubtitle: "Без звонков, без ожиданий, всё онлайн",
    step1Title: "Выберите услугу",
    step1Desc: "Укажите, что у вас сломалось или что нужно сделать",
    step2Title: "Опишите проблему",
    step2Desc: "Добавьте детали, чтобы мастер подготовился заранее",
    step3Title: "Мастер выезжает",
    step3Desc: "Специалист приедет в удобное для вас время",
    
    // About page
    aboutTitle: "Мастер Час — сервис быстрых и надежных мастеров",
    aboutDescription: "Мастер Час — это онлайн-сервис, который помогает быстро найти проверенного мастера рядом с вами. Мы объединяем профессионалов в сфере ремонта и бытовых услуг, чтобы вы могли решить проблему без лишних звонков и ожиданий.",
    aboutFeature1: "Проверенные мастера",
    aboutFeature1Desc: "Все специалисты проходят проверку квалификации и документов",
    aboutFeature2: "Прозрачные цены",
    aboutFeature2Desc: "Стоимость работ известна заранее, без скрытых платежей",
    aboutFeature3: "Быстрый выезд",
    aboutFeature3Desc: "Мастер приедет в течение 1 часа после подтверждения заказа",
    aboutFeature4: "Поддержка 24/7",
    aboutFeature4Desc: "Наша команда всегда на связи для решения любых вопросов",
    
    // Contacts page
    contactsTitle: "Свяжитесь с нами",
    contactsDescription: "Если у вас есть вопросы, предложения или срочная ситуация — мы всегда на связи.",
    contactPhone: "Телефон",
    contactEmail: "Email",
    contactHours: "Работаем",
    contactHoursValue: "24/7",
    
    // Quick Order Form
    quickOrderTitle: "Быстрый заказ",
    quickOrderSubtitle: "Заполните форму и мы свяжемся с вами",
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
    
    // Loading
    loading: "Загрузка...",
    backToHome: "На главную",
  },
  tj: {
    // Header menu
    menuAbout: "Дар бораи ширкат",
    menuCategories: "Категорияҳо",
    menuHowItWorks: "Чӣ тавр кор мекунад",
    menuContacts: "Тамос",
    menuBecomeMaster: "Устод шудан",
    menuLogin: "Даромад",
    menuCabinet: "Кабинети шахсӣ",
    menuLogout: "Баромадан",
    
    // Hero section
    heroTitle: "Устод ҳамин рӯз меояд",
    heroSubtitle: "Устодони тасдиқшуда • Баромад аз 30 дақиқа • Кафолати корҳо",
    heroDescription: "Мо зуд устодро дар наздикии шумо пайдо мекунем — барои таъмири зуд ва корҳои маишӣ.",
    heroButton: "Устод фармоиш додан",
    heroEmergency: "🚨 Устоди таъҷилӣ 24/7 — баромад 30–60 дақиқа",
    
    // Trust indicators
    trustTime: "Дар 1 соат",
    trustTimeDesc: "устод меояд",
    trustRating: "4.9",
    trustRatingDesc: "рейтинги миёна",
    trustOrders: "5000+",
    trustOrdersDesc: "фармоишҳои иҷрошуда",
    
    // Services / Categories
    servicesTitle: "Каталоги хидматҳо",
    servicesSubtitle: "Категорияро интихоб кунед ва устодро дар якчанд клик фармоиш диҳед",
    searchPlaceholder: "Ҷустуҷӯи хидматҳо...",
    filterAll: "Ҳамаи хидматҳо",
    serviceElectric: "Барқкорӣ",
    servicePlumbing: "Сантехника",
    serviceCleaning: "Тозакунӣ",
    serviceFurniture: "Ҷамъкунии мебел",
    serviceRenovation: "Таъмири хона",
    serviceSecurity: "Видеоназорат",
    serviceWelding: "Ҷӯшкорӣ",
    serviceBasement: "Зеҳзамин ва гаражҳо",
    serviceTurnkey: "Таъмир зери калид",
    serviceRepair: "Таъмири техника",
    serviceSmartHome: "Хонаи зирак",
    serviceOther: "Дигар хидматҳо",
    serviceEmergency: "Хидматҳои таъҷилӣ 24/7",
    serviceEmergencyBadge: "Зуд",
    priceFrom: "аз",
    orderMaster: "Устод фармоиш додан",
    
    // Subcategories - Electrical
    subElectricSockets: "Розеткаҳо ва выключателҳо",
    subElectricLights: "Люстраҳо ва чароғҳо",
    subElectricPanel: "Автоматҳо ва щиткаҳо",
    subElectricShort: "Қисмати кӯтоҳ",
    subElectricUrgent: "Даъвати зуд",
    
    // Subcategories - Plumbing
    subPlumbingFaucets: "Смесителҳо ва кранҳо",
    subPlumbingToilet: "Унитозҳо ва биде",
    subPlumbingPipes: "Тозакунии қубурҳо",
    subPlumbingHeater: "Обгармкунакҳо",
    subPlumbingLeak: "Бартараф кардани рехт",
    
    // Subcategories - Emergency
    subEmergencyElectric: "Барқкори зуд",
    subEmergencyPlumber: "Сантехники зуд",
    subEmergencyLeak: "Рехт / садама",
    subEmergencyDiag: "Диагностикаи таъҷилӣ",
    subEmergencyNight: "Баромади шабона ва истироҳатӣ",
    subEmergencyCall: "Занги зуд",
    emergencyNote: "Баромад 30–60 дақиқа",
    
    // How it works
    howItWorksTitle: "Чӣ тавр устодро дар 3 қадам фармоиш кардан мумкин",
    howItWorksSubtitle: "Бе зангҳо, бе интизорӣ, ҳама чиз онлайн",
    step1Title: "Хидматро интихоб кунед",
    step1Desc: "Нишон диҳед, ки чӣ шикаст ё чӣ кор кардан лозим",
    step2Title: "Мушкилиро тавсиф кунед",
    step2Desc: "Тафсилот илова кунед, то устод пешакӣ омода шавад",
    step3Title: "Устод меояд",
    step3Desc: "Мутахассис дар вақти мувофиқи шумо меояд",
    
    // About page
    aboutTitle: "Мастер Час — хидмати устодони зуд ва боэътимод",
    aboutDescription: "Мастер Час — ин хидмати онлайн аст, ки ба шумо кӯмак мекунад устоди тасдиқшударо дар наздикии худ зуд пайдо кунед. Мо мутахассисони соҳаи таъмир ва хидматҳои маиширо муттаҳид мекунем.",
    aboutFeature1: "Устодони тасдиқшуда",
    aboutFeature1Desc: "Ҳамаи мутахассисон аз санҷиши ихтисос ва ҳуҷҷатҳо мегузаранд",
    aboutFeature2: "Нархҳои шаффоф",
    aboutFeature2Desc: "Арзиши корҳо пешакӣ маълум аст, бе пардохтҳои пинҳонӣ",
    aboutFeature3: "Баромади зуд",
    aboutFeature3Desc: "Устод дар давоми 1 соат пас аз тасдиқи фармоиш меояд",
    aboutFeature4: "Дастгирии 24/7",
    aboutFeature4Desc: "Даста мои мо ҳамеша барои ҳалли ҳама гуна саволҳо дар алоқа аст",
    
    // Contacts page
    contactsTitle: "Бо мо тамос гиред",
    contactsDescription: "Агар саволҳо, пешниҳодҳо ё ҳолати таъҷилӣ дошта бошед — мо ҳамеша дар алоқа ҳастем.",
    contactPhone: "Телефон",
    contactEmail: "Email",
    contactHours: "Кор мекунем",
    contactHoursValue: "24/7",
    
    // Quick Order Form
    quickOrderTitle: "Фармоиши зуд",
    quickOrderSubtitle: "Формаро пур кунед ва мо бо шумо тамос мегирем",
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
    
    // Loading
    loading: "Боркунӣ...",
    backToHome: "Ба сафҳаи асосӣ",
  },
  en: {
    // Header menu
    menuAbout: "About",
    menuCategories: "Categories",
    menuHowItWorks: "How It Works",
    menuContacts: "Contacts",
    menuBecomeMaster: "Become a Master",
    menuLogin: "Login",
    menuCabinet: "My Cabinet",
    menuLogout: "Logout",
    
    // Hero section
    heroTitle: "Master arrives today",
    heroSubtitle: "Verified masters • Arrival from 30 min • Work guarantee",
    heroDescription: "We quickly find a master near you — for urgent repairs and household tasks.",
    heroButton: "Order a Master",
    heroEmergency: "🚨 Emergency Master 24/7 — arrival 30–60 min",
    
    // Trust indicators
    trustTime: "Within 1 hour",
    trustTimeDesc: "master arrives",
    trustRating: "4.9",
    trustRatingDesc: "average rating",
    trustOrders: "5000+",
    trustOrdersDesc: "completed orders",
    
    // Services / Categories
    servicesTitle: "Service Catalog",
    servicesSubtitle: "Choose a category and order a master in a few clicks",
    searchPlaceholder: "Search services...",
    filterAll: "All Services",
    serviceElectric: "Electrical",
    servicePlumbing: "Plumbing",
    serviceCleaning: "Cleaning",
    serviceFurniture: "Furniture Assembly",
    serviceRenovation: "Renovation",
    serviceSecurity: "Video Surveillance",
    serviceWelding: "Welding",
    serviceBasement: "Basements & Garages",
    serviceTurnkey: "Turnkey Renovation",
    serviceRepair: "Appliance Repair",
    serviceSmartHome: "Smart Home",
    serviceOther: "Other Services",
    serviceEmergency: "Emergency Services 24/7",
    serviceEmergencyBadge: "Urgent",
    priceFrom: "from",
    orderMaster: "Order a Master",
    
    // Subcategories - Electrical
    subElectricSockets: "Sockets & Switches",
    subElectricLights: "Chandeliers & Lights",
    subElectricPanel: "Circuit Breakers & Panels",
    subElectricShort: "Short Circuit",
    subElectricUrgent: "Urgent Call",
    
    // Subcategories - Plumbing
    subPlumbingFaucets: "Faucets & Taps",
    subPlumbingToilet: "Toilets & Bidets",
    subPlumbingPipes: "Pipe Cleaning",
    subPlumbingHeater: "Water Heaters",
    subPlumbingLeak: "Leak Repair",
    
    // Subcategories - Emergency
    subEmergencyElectric: "Emergency Electrician",
    subEmergencyPlumber: "Emergency Plumber",
    subEmergencyLeak: "Leak / Accident",
    subEmergencyDiag: "Emergency Diagnostics",
    subEmergencyNight: "Night & Weekend Service",
    subEmergencyCall: "Emergency Call",
    emergencyNote: "Arrival 30–60 minutes",
    
    // How it works
    howItWorksTitle: "How to order a master in 3 simple steps",
    howItWorksSubtitle: "No calls, no waiting, everything online",
    step1Title: "Choose a service",
    step1Desc: "Indicate what's broken or what needs to be done",
    step2Title: "Describe the problem",
    step2Desc: "Add details so the master can prepare in advance",
    step3Title: "Master arrives",
    step3Desc: "The specialist will arrive at a convenient time for you",
    
    // About page
    aboutTitle: "Master Chas — Fast & Reliable Masters Service",
    aboutDescription: "Master Chas is an online service that helps you quickly find a verified master near you. We unite professionals in repairs and household services so you can solve problems without unnecessary calls and waiting.",
    aboutFeature1: "Verified Masters",
    aboutFeature1Desc: "All specialists undergo qualification and document verification",
    aboutFeature2: "Transparent Prices",
    aboutFeature2Desc: "Work cost is known in advance, no hidden fees",
    aboutFeature3: "Fast Arrival",
    aboutFeature3Desc: "Master arrives within 1 hour after order confirmation",
    aboutFeature4: "24/7 Support",
    aboutFeature4Desc: "Our team is always available to resolve any issues",
    
    // Contacts page
    contactsTitle: "Contact Us",
    contactsDescription: "If you have questions, suggestions, or an urgent situation — we're always in touch.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactHours: "Working hours",
    contactHoursValue: "24/7",
    
    // Quick Order Form
    quickOrderTitle: "Quick Order",
    quickOrderSubtitle: "Fill out the form and we'll contact you",
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
    
    // Loading
    loading: "Loading...",
    backToHome: "Back to Home",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ru";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
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
