import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ru" | "tj" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
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
    serviceBasement: "Подвалы и гаражи",
    serviceTurnkey: "Ремонт под ключ",
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

    // Auth
    login: "Вход",
    register: "Регистрация",
    client: "Я клиент",
    master: "Я мастер",
    email: "Email",
    password: "Пароль",
    fullName: "Полное имя",
    phone: "Телефон",
    age: "Возраст",
    categories: "Категории услуг",
    experience: "Опыт работы",
    submit: "Войти",
    submitRegister: "Зарегистрироваться",
    submitMaster: "Отправить заявку",
    welcome: "Добро пожаловать!",
    loginSuccess: "Вы успешно вошли в систему",
    registerSuccess: "Регистрация успешна!",
    masterSuccess: "Заявка отправлена!",
    masterSuccessText: "Мы свяжемся с вами в течение 24 часов для проверки",
    loading: "Загрузка...",
    validationError: "Ошибка валидации",
    checkData: "Проверьте введённые данные",
    enterName: "Введите имя",
    selectCategory: "Выберите хотя бы одну категорию услуг",
    pendingApproval: "Ожидание подтверждения",
    pendingApprovalText: "Ваша регистрация ещё не подтверждена администратором",
    accessDenied: "Доступ запрещён",
    accessDeniedText: "Ваша регистрация была отклонена",
    error: "Ошибка",
    emailExists: "Этот email уже зарегистрирован",
    invalidCredentials: "Неверный email или пароль",
    loginToAccount: "Войдите в свой аккаунт",
    createAccount: "Создайте новый аккаунт",
    registrationPending: "Ваша регистрация отправлена на проверку администратору",

    // Header
    back: "На главную",
    profile: "Личный кабинет",
    logout: "Выйти",
    loginBtn: "Вход",
    admin: "Админ-панель",
    masterCabinet: "Кабинет мастера",
    clientCabinet: "Кабинет клиента",

    // Cabinet
    myProfile: "Мой профиль",
    myOrders: "Мои заказы",
    orderNumber: "Заказ №",
    noOrders: "У вас пока нет заказов",
    completedOrders: "Завершённых заказов",
    leaveReview: "Оставить отзыв",
    status: "Статус",
    date: "Дата",
    price: "Цена",

    // Order statuses
    statusPending: "Ожидает",
    statusInProgress: "В работе",
    statusCompleted: "Выполнен",
    statusCancelled: "Отменён",
    statusNew: "Новый",

    // Admin
    adminPanel: "Панель администратора",
    users: "Пользователи",
    orders: "Заказы",
    masters: "Мастера",
    applications: "Заявки",
    statistics: "Статистика",
    settings: "Настройки",
    approve: "Одобрить",
    reject: "Отклонить",
    block: "Заблокировать",
    unblock: "Разблокировать",
    view: "Просмотр",
    edit: "Редактировать",
    delete: "Удалить",
    search: "Поиск",
    filter: "Фильтр",
    all: "Все",
    active: "Активные",
    pending: "Ожидающие",
    rejected: "Отклонённые",
    blocked: "Заблокированные",
    approved: "Одобренные",

    // Master cabinet
    masterDashboard: "Панель мастера",
    assignedOrders: "Назначенные заказы",
    earnings: "Заработок",
    rating: "Рейтинг",
    noAssignedOrders: "Нет назначенных заказов",
    applicationPending: "Ваша заявка на рассмотрении",
    applicationRejected: "Ваша заявка была отклонена",
    becomeMaster: "Стать мастером",
    accountBlocked: "Ваш аккаунт заблокирован",

    // Create order
    createOrder: "Создать заказ",
    selectService: "Выберите услугу",
    selectDateTime: "Выберите дату и время",
    enterAddress: "Введите адрес",
    enterComment: "Дополнительный комментарий",
    selectBudget: "Бюджет",
    orderCreated: "Заказ создан!",
    orderCreatedText: "Мы скоро свяжемся с вами",

    // Theme
    lightMode: "Светлая тема",
    darkMode: "Тёмная тема",
    systemMode: "Системная тема",
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
    serviceBasement: "Зеҳзамин ва гаражҳо",
    serviceTurnkey: "Таъмир зери калид",
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

    // Auth
    login: "Вуруд",
    register: "Сабт",
    client: "Ман муштарӣ",
    master: "Ман устод",
    email: "Email",
    password: "Рамз",
    fullName: "Номи пурра",
    phone: "Телефон",
    age: "Синну сол",
    categories: "Категорияҳои хидматрасонӣ",
    experience: "Таҷрибаи корӣ",
    submit: "Даромадан",
    submitRegister: "Сабт кардан",
    submitMaster: "Фиристодани дархост",
    welcome: "Хуш омадед!",
    loginSuccess: "Шумо бо муваффақият ворид шудед",
    registerSuccess: "Сабт бо муваффақият!",
    masterSuccess: "Дархост фиристода шуд!",
    masterSuccessText: "Мо дар давоми 24 соат бо шумо тамос мегирем",
    loading: "Интизор шавед...",
    validationError: "Хатои тасдиқ",
    checkData: "Маълумоти воридшударо тафтиш кунед",
    enterName: "Номро ворид кунед",
    selectCategory: "Ақаллан як категорияро интихоб кунед",
    pendingApproval: "Дар интизори тасдиқ",
    pendingApprovalText: "Сабти шумо ҳанӯз аз ҷониби администратор тасдиқ нашудааст",
    accessDenied: "Дастрасӣ манъ аст",
    accessDeniedText: "Сабти шумо рад карда шуд",
    error: "Хато",
    emailExists: "Ин email аллакай сабт шудааст",
    invalidCredentials: "Email ё рамзи нодуруст",
    loginToAccount: "Ба аккаунти худ ворид шавед",
    createAccount: "Аккаунти нав эҷод кунед",
    registrationPending: "Сабти шумо барои тафтиш ба администратор фиристода шуд",

    // Header
    back: "Ба саҳифаи асосӣ",
    profile: "Кабинети шахсӣ",
    logout: "Баромад",
    loginBtn: "Вуруд",
    admin: "Панели администратор",
    masterCabinet: "Кабинети устод",
    clientCabinet: "Кабинети муштарӣ",

    // Cabinet
    myProfile: "Профили ман",
    myOrders: "Фармоишҳои ман",
    orderNumber: "Фармоиш №",
    noOrders: "Шумо ҳанӯз фармоиш надоред",
    completedOrders: "Фармоишҳои анҷомёфта",
    leaveReview: "Баҳо гузоштан",
    status: "Ҳолат",
    date: "Сана",
    price: "Нарх",

    // Order statuses
    statusPending: "Интизорӣ",
    statusInProgress: "Дар кор",
    statusCompleted: "Иҷро шуд",
    statusCancelled: "Бекор шуд",
    statusNew: "Нав",

    // Admin
    adminPanel: "Панели администратор",
    users: "Истифодабарандагон",
    orders: "Фармоишҳо",
    masters: "Устодон",
    applications: "Дархостҳо",
    statistics: "Омор",
    settings: "Танзимот",
    approve: "Тасдиқ кардан",
    reject: "Рад кардан",
    block: "Баста кардан",
    unblock: "Кушодан",
    view: "Дидан",
    edit: "Таҳрир",
    delete: "Нест кардан",
    search: "Ҷустуҷӯ",
    filter: "Филтр",
    all: "Ҳама",
    active: "Фаъол",
    pending: "Интизорӣ",
    rejected: "Рад шуда",
    blocked: "Баста шуда",
    approved: "Тасдиқ шуда",

    // Master cabinet
    masterDashboard: "Панели устод",
    assignedOrders: "Фармоишҳои таъин шуда",
    earnings: "Даромад",
    rating: "Рейтинг",
    noAssignedOrders: "Фармоиши таъиншуда нест",
    applicationPending: "Дархости шумо дар баррасӣ аст",
    applicationRejected: "Дархости шумо рад карда шуд",
    becomeMaster: "Устод шудан",
    accountBlocked: "Аккаунти шумо баста шудааст",

    // Create order
    createOrder: "Фармоиш эҷод кардан",
    selectService: "Хидматро интихоб кунед",
    selectDateTime: "Сана ва вақтро интихоб кунед",
    enterAddress: "Суроғаро ворид кунед",
    enterComment: "Шарҳи иловагӣ",
    selectBudget: "Буҷет",
    orderCreated: "Фармоиш эҷод шуд!",
    orderCreatedText: "Мо зуд бо шумо тамос мегирем",

    // Theme
    lightMode: "Мавзӯи равшан",
    darkMode: "Мавзӯи торик",
    systemMode: "Мавзӯи система",
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
    serviceBasement: "Basements & Garages",
    serviceTurnkey: "Turnkey Renovation",
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

    // Auth
    login: "Login",
    register: "Register",
    client: "I'm a client",
    master: "I'm a master",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    phone: "Phone",
    age: "Age",
    categories: "Service Categories",
    experience: "Work Experience",
    submit: "Sign In",
    submitRegister: "Register",
    submitMaster: "Submit Application",
    welcome: "Welcome!",
    loginSuccess: "You have successfully logged in",
    registerSuccess: "Registration successful!",
    masterSuccess: "Application submitted!",
    masterSuccessText: "We will contact you within 24 hours for verification",
    loading: "Loading...",
    validationError: "Validation Error",
    checkData: "Please check the entered data",
    enterName: "Enter your name",
    selectCategory: "Select at least one service category",
    pendingApproval: "Pending Approval",
    pendingApprovalText: "Your registration has not yet been confirmed by the administrator",
    accessDenied: "Access Denied",
    accessDeniedText: "Your registration was rejected",
    error: "Error",
    emailExists: "This email is already registered",
    invalidCredentials: "Invalid email or password",
    loginToAccount: "Log in to your account",
    createAccount: "Create a new account",
    registrationPending: "Your registration has been sent for administrator review",

    // Header
    back: "Back to Home",
    profile: "My Account",
    logout: "Logout",
    loginBtn: "Login",
    admin: "Admin Panel",
    masterCabinet: "Master Cabinet",
    clientCabinet: "Client Cabinet",

    // Cabinet
    myProfile: "My Profile",
    myOrders: "My Orders",
    orderNumber: "Order #",
    noOrders: "You don't have any orders yet",
    completedOrders: "Completed Orders",
    leaveReview: "Leave Review",
    status: "Status",
    date: "Date",
    price: "Price",

    // Order statuses
    statusPending: "Pending",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",
    statusNew: "New",

    // Admin
    adminPanel: "Admin Panel",
    users: "Users",
    orders: "Orders",
    masters: "Masters",
    applications: "Applications",
    statistics: "Statistics",
    settings: "Settings",
    approve: "Approve",
    reject: "Reject",
    block: "Block",
    unblock: "Unblock",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    all: "All",
    active: "Active",
    pending: "Pending",
    rejected: "Rejected",
    blocked: "Blocked",
    approved: "Approved",

    // Master cabinet
    masterDashboard: "Master Dashboard",
    assignedOrders: "Assigned Orders",
    earnings: "Earnings",
    rating: "Rating",
    noAssignedOrders: "No assigned orders",
    applicationPending: "Your application is under review",
    applicationRejected: "Your application was rejected",
    becomeMaster: "Become a Master",
    accountBlocked: "Your account is blocked",

    // Create order
    createOrder: "Create Order",
    selectService: "Select Service",
    selectDateTime: "Select Date & Time",
    enterAddress: "Enter Address",
    enterComment: "Additional Comment",
    selectBudget: "Budget",
    orderCreated: "Order Created!",
    orderCreatedText: "We will contact you soon",

    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    systemMode: "System Theme",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "masterChas_language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && ["ru", "tj", "en"].includes(saved)) {
        return saved as Language;
      }
    }
    return "ru";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

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

export { translations };
