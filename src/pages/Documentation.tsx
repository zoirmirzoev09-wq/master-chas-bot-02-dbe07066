import { useState } from "react";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Wrench,
  Shield,
  Crown,
  ArrowRight,
  Star,
  ClipboardList,
  Settings,
  Bell,
  Lock,
  BarChart3,
  UserCheck,
  Search,
  MessageSquare,
  Calendar,
  DollarSign,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: "intro",
    icon: Eye,
    title: {
      ru: "Введение в платформу Мастер Час",
      tj: "Муаррифӣ ба платформаи Мастер Час",
      en: "Introduction to Master Hour Platform",
    },
    content: {
      ru: {
        subtitle: "Платформа для заказа мастеров",
        description:
          "Мастер Час — это онлайн-сервис, который помогает быстро найти проверенного мастера рядом с вами. Платформа объединяет клиентов, мастеров и администраторов в единой экосистеме.",
        points: [
          "Быстрый поиск и заказ мастера в несколько кликов",
          "Прозрачная система рейтингов и отзывов",
          "Управление заказами в реальном времени",
          "Личные кабинеты для каждой роли пользователя",
        ],
        goal: "Цель кабинетов — упростить взаимодействие каждого участника с платформой, обеспечивая удобный и безопасный доступ к нужным функциям.",
      },
      tj: {
        subtitle: "Платформа барои фармоиши устодон",
        description:
          "Мастер Час — ин хидмати онлайнӣ аст, ки ба шумо кӯмак мекунад устоди боэътимодро дар наздикии худ пайдо кунед.",
        points: [
          "Ҷустуҷӯи зуд ва фармоиши устод дар якчанд клик",
          "Системаи шаффофи рейтингу тақризҳо",
          "Идоракунии фармоишҳо дар вақти воқеӣ",
          "Кабинетҳои шахсӣ барои ҳар як нақш",
        ],
        goal: "Мақсади кабинетҳо — соддакунии ҳамкории ҳар як иштирокчӣ бо платформа.",
      },
      en: {
        subtitle: "Platform for ordering service professionals",
        description:
          "Master Hour is an online service that helps you quickly find a verified professional near you. The platform unites clients, masters, and administrators in a single ecosystem.",
        points: [
          "Quick search and ordering in a few clicks",
          "Transparent rating and review system",
          "Real-time order management",
          "Personal cabinets for each user role",
        ],
        goal: "The goal of cabinets is to simplify interaction for every participant, providing convenient and secure access to the needed features.",
      },
    },
  },
  {
    id: "customer",
    icon: Users,
    title: {
      ru: "Кабинет клиента (Customer)",
      tj: "Кабинети муштарӣ (Customer)",
      en: "Customer Cabinet",
    },
    content: {
      ru: {
        subtitle: "Всё для удобного заказа услуг",
        features: [
          { icon: Lock, text: "Регистрация и вход через email + пароль" },
          { icon: Search, text: "Просмотр и поиск мастеров по категориям" },
          { icon: ClipboardList, text: "Создание заказов с выбором даты и времени" },
          { icon: BarChart3, text: "Отслеживание статуса: Новый → В работе → Выполнен" },
          { icon: Calendar, text: "Полная история заказов с фильтрацией" },
          { icon: Star, text: "Отзывы и рейтинг мастеров (1–5 звёзд)" },
          { icon: Settings, text: "Управление профилем и настройками" },
          { icon: Bell, text: "Уведомления о статусе заказа" },
        ],
      },
      tj: {
        subtitle: "Ҳама чиз барои фармоиши осон",
        features: [
          { icon: Lock, text: "Бақайдгирӣ ва вуруд тавассути email + пароль" },
          { icon: Search, text: "Дидану ҷустуҷӯи устодон аз рӯи категорияҳо" },
          { icon: ClipboardList, text: "Сохтани фармоиш бо интихоби сана ва вақт" },
          { icon: BarChart3, text: "Пайгирии ҳолат: Нав → Дар кор → Иҷро шуд" },
          { icon: Calendar, text: "Таърихи пурраи фармоишҳо" },
          { icon: Star, text: "Тақризҳо ва рейтинги устодон (1–5 ситора)" },
          { icon: Settings, text: "Идоракунии профил ва танзимот" },
          { icon: Bell, text: "Огоҳиномаҳо дар бораи ҳолати фармоиш" },
        ],
      },
      en: {
        subtitle: "Everything for convenient service ordering",
        features: [
          { icon: Lock, text: "Registration and login via email + password" },
          { icon: Search, text: "Browse and search masters by category" },
          { icon: ClipboardList, text: "Create orders with date and time selection" },
          { icon: BarChart3, text: "Track status: New → In Progress → Completed" },
          { icon: Calendar, text: "Full order history with filtering" },
          { icon: Star, text: "Reviews and master ratings (1–5 stars)" },
          { icon: Settings, text: "Profile and settings management" },
          { icon: Bell, text: "Order status notifications" },
        ],
      },
    },
  },
  {
    id: "master",
    icon: Wrench,
    title: {
      ru: "Кабинет мастера (Service Provider)",
      tj: "Кабинети устод (Service Provider)",
      en: "Master Cabinet (Service Provider)",
    },
    content: {
      ru: {
        subtitle: "Инструменты для профессионалов",
        features: [
          { icon: UserCheck, text: "Регистрация и подтверждение профиля админом" },
          { icon: ClipboardList, text: "Просмотр и управление назначенными заказами" },
          { icon: DollarSign, text: "Управление услугами и ценами" },
          { icon: Calendar, text: "Календарь занятости и расписание" },
          { icon: Star, text: "Просмотр рейтинга и отзывов клиентов" },
          { icon: Bell, text: "Уведомления о новых заказах" },
          { icon: BarChart3, text: "Статистика: выполненные заказы, заработок" },
          { icon: Settings, text: "Настройка профиля и категорий услуг" },
        ],
      },
      tj: {
        subtitle: "Абзорҳо барои касбиён",
        features: [
          { icon: UserCheck, text: "Бақайдгирӣ ва тасдиқи профил аз ҷониби админ" },
          { icon: ClipboardList, text: "Дидан ва идоракунии фармоишҳои таъинотшуда" },
          { icon: DollarSign, text: "Идоракунии хидматҳо ва нархҳо" },
          { icon: Calendar, text: "Тақвими банд будан ва ҷадвал" },
          { icon: Star, text: "Дидани рейтинг ва тақризҳои муштариён" },
          { icon: Bell, text: "Огоҳиномаҳо дар бораи фармоишҳои нав" },
          { icon: BarChart3, text: "Омор: фармоишҳои иҷрошуда, даромад" },
          { icon: Settings, text: "Танзими профил ва категорияҳои хидматрасонӣ" },
        ],
      },
      en: {
        subtitle: "Tools for professionals",
        features: [
          { icon: UserCheck, text: "Registration and admin-verified profile" },
          { icon: ClipboardList, text: "View and manage assigned orders" },
          { icon: DollarSign, text: "Manage services and pricing" },
          { icon: Calendar, text: "Availability calendar and schedule" },
          { icon: Star, text: "View ratings and client reviews" },
          { icon: Bell, text: "Notifications for new orders" },
          { icon: BarChart3, text: "Statistics: completed orders, earnings" },
          { icon: Settings, text: "Profile and service category settings" },
        ],
      },
    },
  },
  {
    id: "admin",
    icon: Shield,
    title: {
      ru: "Кабинет админа (Admin)",
      tj: "Кабинети админ (Admin)",
      en: "Admin Cabinet",
    },
    content: {
      ru: {
        subtitle: "Управление платформой",
        features: [
          { icon: Users, text: "Управление пользователями и мастерами" },
          { icon: ClipboardList, text: "Просмотр всех заказов и статистики" },
          { icon: MessageSquare, text: "Модерация отзывов" },
          { icon: Settings, text: "Управление категориями услуг" },
          { icon: UserCheck, text: "Одобрение / отклонение заявок мастеров" },
          { icon: BarChart3, text: "Отчёты: ежедневные и ежемесячные" },
          { icon: Bell, text: "Настройка правил работы платформы" },
          { icon: AlertTriangle, text: "Блокировка нарушителей" },
        ],
      },
      tj: {
        subtitle: "Идоракунии платформа",
        features: [
          { icon: Users, text: "Идоракунии корбарон ва устодон" },
          { icon: ClipboardList, text: "Дидани ҳамаи фармоишҳо ва омор" },
          { icon: MessageSquare, text: "Модератсияи тақризҳо" },
          { icon: Settings, text: "Идоракунии категорияҳои хидматрасонӣ" },
          { icon: UserCheck, text: "Тасдиқ / радди дархостҳои устодон" },
          { icon: BarChart3, text: "Ҳисоботҳо: рӯзона ва моҳона" },
          { icon: Bell, text: "Танзими қоидаҳои кории платформа" },
          { icon: AlertTriangle, text: "Баста кардани вайронкунандагон" },
        ],
      },
      en: {
        subtitle: "Platform management",
        features: [
          { icon: Users, text: "Manage users and masters" },
          { icon: ClipboardList, text: "View all orders and statistics" },
          { icon: MessageSquare, text: "Review moderation" },
          { icon: Settings, text: "Manage service categories" },
          { icon: UserCheck, text: "Approve / reject master applications" },
          { icon: BarChart3, text: "Reports: daily and monthly" },
          { icon: Bell, text: "Platform rules configuration" },
          { icon: AlertTriangle, text: "Block violators" },
        ],
      },
    },
  },
  {
    id: "superadmin",
    icon: Crown,
    title: {
      ru: "Кабинет супер-админа (Super Admin)",
      tj: "Кабинети супер-админ (Super Admin)",
      en: "Super Admin Cabinet",
    },
    content: {
      ru: {
        subtitle: "Полный контроль над платформой",
        features: [
          { icon: Crown, text: "Полный контроль над всеми данными и настройками" },
          { icon: Users, text: "Управление администраторами" },
          { icon: DollarSign, text: "Настройка финансовых отчётов и комиссий" },
          { icon: BarChart3, text: "Доступ к аналитике и логам" },
          { icon: Shield, text: "Управление безопасностью платформы" },
          { icon: AlertTriangle, text: "Экстренная блокировка пользователей и мастеров" },
          { icon: Settings, text: "Глобальные настройки системы" },
          { icon: Eye, text: "Аудит действий всех пользователей" },
        ],
      },
      tj: {
        subtitle: "Назорати пурра бар платформа",
        features: [
          { icon: Crown, text: "Назорати пурра бар ҳамаи маълумотҳо" },
          { icon: Users, text: "Идоракунии администраторон" },
          { icon: DollarSign, text: "Танзими ҳисоботҳои молиявӣ ва комиссияҳо" },
          { icon: BarChart3, text: "Дастрасӣ ба таҳлилу логҳо" },
          { icon: Shield, text: "Идоракунии амнияти платформа" },
          { icon: AlertTriangle, text: "Баста кардани фаврии корбарон ва устодон" },
          { icon: Settings, text: "Танзимоти глобалии система" },
          { icon: Eye, text: "Аудити амалиёти ҳамаи корбарон" },
        ],
      },
      en: {
        subtitle: "Full platform control",
        features: [
          { icon: Crown, text: "Full control over all data and settings" },
          { icon: Users, text: "Manage administrators" },
          { icon: DollarSign, text: "Financial reports and commissions setup" },
          { icon: BarChart3, text: "Access to analytics and logs" },
          { icon: Shield, text: "Platform security management" },
          { icon: AlertTriangle, text: "Emergency block of users and masters" },
          { icon: Settings, text: "Global system settings" },
          { icon: Eye, text: "Audit of all user actions" },
        ],
      },
    },
  },
  {
    id: "flow",
    icon: ArrowRight,
    title: {
      ru: "Схема взаимодействия",
      tj: "Нақшаи ҳамкорӣ",
      en: "Interaction Flow",
    },
    content: {
      ru: {
        subtitle: "Как работает платформа",
        flows: [
          {
            title: "Поток заказа",
            steps: [
              "Клиент выбирает услугу и оформляет заказ",
              "Админ / система назначает мастера",
              "Мастер получает уведомление и принимает заказ",
              "Мастер выполняет работу",
              "Клиент оценивает мастера (1–5 ⭐)",
              "Рейтинг мастера обновляется",
            ],
          },
          {
            title: "Поток регистрации мастера",
            steps: [
              "Мастер заполняет анкету",
              "Админ проверяет заявку",
              "При одобрении — мастер появляется в системе",
              "При отклонении — мастер получает уведомление",
            ],
          },
        ],
      },
      tj: {
        subtitle: "Чӣ тавр платформа кор мекунад",
        flows: [
          {
            title: "Ҷараёни фармоиш",
            steps: [
              "Муштарӣ хидматро интихоб мекунад",
              "Админ / система устодро таъин мекунад",
              "Устод огоҳиномаро мегирад",
              "Устод корро иҷро мекунад",
              "Муштарӣ устодро баҳо медиҳад (1–5 ⭐)",
              "Рейтинги устод навсозӣ мешавад",
            ],
          },
          {
            title: "Ҷараёни бақайдгирии устод",
            steps: [
              "Устод анкетаро пур мекунад",
              "Админ дархостро тафтиш мекунад",
              "Ҳангоми тасдиқ — устод дар система пайдо мешавад",
              "Ҳангоми рад — устод огоҳинома мегирад",
            ],
          },
        ],
      },
      en: {
        subtitle: "How the platform works",
        flows: [
          {
            title: "Order Flow",
            steps: [
              "Client selects a service and places an order",
              "Admin / system assigns a master",
              "Master receives notification and accepts order",
              "Master completes the work",
              "Client rates the master (1–5 ⭐)",
              "Master's rating is updated",
            ],
          },
          {
            title: "Master Registration Flow",
            steps: [
              "Master fills out the application form",
              "Admin reviews the application",
              "If approved — master appears in the system",
              "If rejected — master receives a notification",
            ],
          },
        ],
      },
    },
  },
  {
    id: "bestpractices",
    icon: Shield,
    title: {
      ru: "Best Practices",
      tj: "Амалияҳои беҳтарин",
      en: "Best Practices",
    },
    content: {
      ru: {
        subtitle: "Рекомендации по безопасности и UX",
        sections: [
          {
            title: "🔒 Безопасность",
            items: [
              "Аутентификация через email + пароль (Supabase Auth)",
              "Row Level Security (RLS) на все таблицы",
              "Роли хранятся в базе данных, не в клиенте",
              "Сессии с автоматическим истечением",
            ],
          },
          {
            title: "🛡 Разграничение прав",
            items: [
              "Клиент видит только свои заказы",
              "Мастер видит только назначенные ему заказы",
              "Админ управляет пользователями и заказами",
              "Супер-админ имеет полный доступ ко всему",
            ],
          },
          {
            title: "🎨 UX / Интерфейс",
            items: [
              "Адаптивный дизайн (mobile-first)",
              "Тёмная и светлая темы",
              "Мультиязычность (RU / TJ / EN)",
              "Быстрая навигация и минимум кликов",
            ],
          },
        ],
      },
      tj: {
        subtitle: "Тавсияҳо оид ба амният ва UX",
        sections: [
          {
            title: "🔒 Амният",
            items: [
              "Аутентификация тавассути email + пароль",
              "Row Level Security (RLS) дар ҳамаи ҷадвалҳо",
              "Нақшҳо дар базаи маълумот нигоҳ дошта мешаванд",
              "Сессияҳо бо хотимаи автоматикӣ",
            ],
          },
          {
            title: "🛡 Ҳуқуқҳои дастрасӣ",
            items: [
              "Муштарӣ танҳо фармоишҳои худро мебинад",
              "Устод танҳо фармоишҳои таъинотшударо мебинад",
              "Админ корбарон ва фармоишҳоро идора мекунад",
              "Супер-админ дастрасии пурра дорад",
            ],
          },
          {
            title: "🎨 UX / Интерфейс",
            items: [
              "Дизайни мутобиқшаванда (mobile-first)",
              "Мавзӯъҳои торику равшан",
              "Бисёрзабонӣ (RU / TJ / EN)",
              "Навигатсияи зуд ва ҳадди ақали кликҳо",
            ],
          },
        ],
      },
      en: {
        subtitle: "Security and UX recommendations",
        sections: [
          {
            title: "🔒 Security",
            items: [
              "Authentication via email + password (Supabase Auth)",
              "Row Level Security (RLS) on all tables",
              "Roles stored in database, not in client",
              "Sessions with automatic expiration",
            ],
          },
          {
            title: "🛡 Access Control",
            items: [
              "Client sees only their own orders",
              "Master sees only assigned orders",
              "Admin manages users and orders",
              "Super Admin has full access to everything",
            ],
          },
          {
            title: "🎨 UX / Interface",
            items: [
              "Responsive design (mobile-first)",
              "Dark and light themes",
              "Multilingual (RU / TJ / EN)",
              "Quick navigation with minimal clicks",
            ],
          },
        ],
      },
    },
  },
  {
    id: "summary",
    icon: Star,
    title: {
      ru: "Итоги",
      tj: "Натиҷаҳо",
      en: "Summary",
    },
    content: {
      ru: {
        subtitle: "Полная экосистема для сервиса мастеров",
        summary: [
          "4 типа кабинетов: Клиент, Мастер, Админ, Супер-админ",
          "Каждый кабинет имеет чёткий набор функций",
          "Безопасность на уровне базы данных (RLS)",
          "Мультиязычная поддержка: RU, TJ, EN",
          "Адаптивный дизайн для всех устройств",
          "Система рейтингов и отзывов",
          "Автоматическое распределение заказов",
          "Финансовая аналитика и отчётность",
        ],
        cta: "Платформа готова к масштабированию и росту 🚀",
      },
      tj: {
        subtitle: "Экосистемаи пурра барои хидмати устодон",
        summary: [
          "4 навъи кабинет: Муштарӣ, Устод, Админ, Супер-админ",
          "Ҳар як кабинет маҷмӯаи аниқи вазифаҳо дорад",
          "Амният дар сатҳи базаи маълумот (RLS)",
          "Дастгирии бисёрзабонӣ: RU, TJ, EN",
          "Дизайни мутобиқшаванда барои ҳамаи дастгоҳҳо",
          "Системаи рейтингу тақризҳо",
          "Тақсимоти автоматикии фармоишҳо",
          "Таҳлили молиявӣ ва ҳисоботдиҳӣ",
        ],
        cta: "Платформа барои васеъшавӣ ва рушд омода аст 🚀",
      },
      en: {
        subtitle: "Complete ecosystem for master services",
        summary: [
          "4 cabinet types: Client, Master, Admin, Super Admin",
          "Each cabinet has a clear set of features",
          "Database-level security (RLS)",
          "Multilingual support: RU, TJ, EN",
          "Responsive design for all devices",
          "Rating and review system",
          "Automatic order distribution",
          "Financial analytics and reporting",
        ],
        cta: "The platform is ready for scaling and growth 🚀",
      },
    },
  },
];

const roleColors: Record<string, string> = {
  intro: "from-blue-500/20 to-cyan-500/20",
  customer: "from-emerald-500/20 to-teal-500/20",
  master: "from-amber-500/20 to-orange-500/20",
  admin: "from-violet-500/20 to-purple-500/20",
  superadmin: "from-rose-500/20 to-red-500/20",
  flow: "from-sky-500/20 to-indigo-500/20",
  bestpractices: "from-green-500/20 to-emerald-500/20",
  summary: "from-yellow-500/20 to-amber-500/20",
};

const roleIconColors: Record<string, string> = {
  intro: "text-blue-500",
  customer: "text-emerald-500",
  master: "text-amber-500",
  admin: "text-violet-500",
  superadmin: "text-rose-500",
  flow: "text-sky-500",
  bestpractices: "text-green-500",
  summary: "text-yellow-500",
};

const Documentation = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const content = slide.content[language];

  const next = () => setCurrentSlide((p) => Math.min(p + 1, slides.length - 1));
  const prev = () => setCurrentSlide((p) => Math.max(p - 1, 0));

  const renderContent = () => {
    const c = content as any;

    // Features list slides (customer, master, admin, superadmin)
    if (c.features) {
      return (
        <div className="grid sm:grid-cols-2 gap-3">
          {c.features.map((f: any, i: number) => {
            const FIcon = f.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <FIcon className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-sm">{f.text}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // Flow slide
    if (c.flows) {
      return (
        <div className="space-y-6">
          {c.flows.map((flow: any, i: number) => (
            <div key={i}>
              <h3 className="font-bold text-lg mb-3">{flow.title}</h3>
              <div className="space-y-2">
                {flow.steps.map((step: string, j: number) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {j + 1}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Best practices slide
    if (c.sections) {
      return (
        <div className="space-y-5">
          {c.sections.map((section: any, i: number) => (
            <div key={i}>
              <h3 className="font-bold text-base mb-2">{section.title}</h3>
              <ul className="space-y-1.5">
                {section.items.map((item: string, j: number) => (
                  <li key={j} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    // Summary slide
    if (c.summary) {
      return (
        <div>
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {c.summary.map((item: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border"
              >
                <span className="text-primary">✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xl font-bold text-primary">{c.cta}</p>
        </div>
      );
    }

    // Intro slide
    if (c.points) {
      return (
        <div>
          <p className="text-muted-foreground mb-4">{c.description}</p>
          <ul className="space-y-2 mb-4">
            {c.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✦</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium">{c.goal}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Slide navigation dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Slide card */}
          <div
            className={`rounded-3xl border border-border bg-gradient-to-br ${roleColors[slide.id]} p-8 sm:p-10 min-h-[500px] flex flex-col`}
          >
            {/* Slide header */}
            <div className="flex items-center gap-4 mb-2">
              <div
                className={`w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center ${roleIconColors[slide.id]}`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {currentSlide + 1} / {slides.length}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {slide.title[language]}
                </h1>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              {(content as any).subtitle}
            </p>

            {/* Slide content */}
            <div className="flex-1">{renderContent()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prev}
                disabled={currentSlide === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {language === "ru" ? "Назад" : language === "tj" ? "Бозгашт" : "Back"}
              </Button>

              <span className="text-sm text-muted-foreground">
                {slide.title[language]}
              </span>

              <Button
                variant="outline"
                onClick={next}
                disabled={currentSlide === slides.length - 1}
                className="gap-2"
              >
                {language === "ru" ? "Далее" : language === "tj" ? "Пеш" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Slide list */}
          <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-2">
            {slides.map((s, i) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    i === currentSlide
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <SIcon
                    className={`w-5 h-5 mx-auto mb-1 ${
                      i === currentSlide ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
