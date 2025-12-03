import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  Zap, 
  Wrench, 
  Sparkles, 
  Hammer, 
  PaintBucket, 
  Video, 
  Settings,
  MoreHorizontal,
  Search,
  Wifi,
  Flame
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServiceItem {
  service: string;
  unit: string;
  min: string;
  avg: string;
  max: string;
  note?: string;
}

interface SubCategory {
  icon: string;
  title: string;
  items: ServiceItem[];
}

interface ServiceCategory {
  icon: any;
  key: string;
  subCategories?: SubCategory[];
}

const servicesData: ServiceCategory[] = [
  { 
    icon: Zap, 
    key: "serviceElectric",
    subCategories: [
      {
        icon: "🔌",
        title: "Розетки и выключатели",
        items: [
          { service: "Замена розетки (внутр. / наруж.)", unit: "шт", min: "20", avg: "40", max: "80", note: "Стена: бетон/ГКЛ/кирпич" },
          { service: "Замена розетки с демонтажем старой", unit: "шт", min: "40", avg: "70", max: "120", note: "Старые советские розетки" },
          { service: "Установка влагозащищённой розетки", unit: "шт", min: "50", avg: "90", max: "150", note: "Ванная/гараж, с заземлением" },
          { service: "Установка розетки с USB / зарядкой", unit: "шт", min: "40", avg: "70", max: "130", note: "Современные модели" },
          { service: "Установка блока розеток (3+ точек)", unit: "шт", min: "80", avg: "130", max: "200", note: "Разводка и доп. проводка" },
          { service: "Установка выключателя (одинарного)", unit: "шт", min: "20", avg: "40", max: "80", note: "Простая замена" },
          { service: "Установка двух- или трёхклавишного", unit: "шт", min: "30", avg: "60", max: "120", note: "Схема разводки" },
          { service: "Перенос выключателя по стене", unit: "п.м.", min: "30", avg: "50", max: "100", note: "Новая линия, штроба" },
          { service: "Монтаж проходного выключателя", unit: "шт", min: "50", avg: "90", max: "160", note: "Установка в двух точках" },
        ],
      },
      {
        icon: "💡",
        title: "Освещение",
        items: [
          { service: "Установка светильника/бра (до 5 кг)", unit: "шт", min: "30", avg: "60", max: "120", note: "Простая замена или новое подключение" },
          { service: "Установка люстры (до 3 кг, стандартная)", unit: "шт", min: "50", avg: "100", max: "150", note: "Высота до 2.7 м" },
          { service: "Установка люстры (более 3 кг, высокие потолки)", unit: "шт", min: "100", avg: "180", max: "300", note: "С лесами, усиленный крепёж" },
          { service: "Установка трековой системы освещения", unit: "пог.м", min: "60", avg: "90", max: "140", note: "Разметка, монтаж шин, подключение" },
        ],
      },
      {
        icon: "🔧",
        title: "Прокладка кабеля и новые линии",
        items: [
          { service: "Прокладка кабеля по стене (в гофре)", unit: "п.м.", min: "10", avg: "15", max: "25", note: "Крепёж к стене, гофра" },
          { service: "Прокладка кабеля в штробе", unit: "п.м.", min: "20", avg: "35", max: "60", note: "Штробление, закладка, штукатурка отдельно" },
          { service: "Монтаж новой линии от щита", unit: "линия", min: "80", avg: "150", max: "300", note: "Счётчик, автомат, трасса до точки" },
          { service: "Установка наружного электрощита", unit: "шт", min: "150", avg: "250", max: "400", note: "Подключение 3–5 автоматов, шина заземления" },
        ],
      },
      {
        icon: "⚡",
        title: "Электрощиты и автоматы",
        items: [
          { service: "Установка УЗО / дифавтомата", unit: "шт", min: "100", avg: "200", max: "300", note: "Без переделки схемы" },
          { service: "Переподключение вводного автомата", unit: "шт", min: "150", avg: "300", max: "500", note: "Отключение питания (по заявке в ЖЭК)" },
          { service: "Монтаж квартирного щитка на 6–12 модулей", unit: "шт", min: "250", avg: "400", max: "650", note: "Распределение, маркировка, заземление" },
          { service: "Расширение щитка под доп. автоматы", unit: "шт", min: "80", avg: "150", max: "250", note: "Перегруппировка линий, перемычки" },
          { service: "Сборка и подключение щитка «под ключ»", unit: "шт", min: "400", avg: "650", max: "950", note: "Проект, закупка, сборка, маркировка, тестирование" },
        ],
      },
      {
        icon: "🛠️",
        title: "Сложные работы",
        items: [
          { service: "Установка розетки на плитке/граните", unit: "шт", min: "60", avg: "100", max: "150", note: "Алмазное сверление, специнструмент" },
          { service: "Установка розетки в бетонном полу", unit: "шт", min: "100", avg: "200", max: "300", note: "Подпитка снизу, штробление пола" },
          { service: "Прокладка кабеля через перекрытие", unit: "узел", min: "80", avg: "160", max: "300", note: "Сверление монолита, гильза, гофра" },
          { service: "Восстановление скрытой проводки без схемы", unit: "зона", min: "100", avg: "200", max: "400", note: "Детекторы, прозвонка, вскрытие стен" },
          { service: "Удаление старой алюминиевой проводки", unit: "п.м.", min: "30", avg: "60", max: "100", note: "Демонтаж, вынос, зачистка каналов" },
        ],
      },
      {
        icon: "🔍",
        title: "Диагностика и ремонт",
        items: [
          { service: "Диагностика одной линии", unit: "линия", min: "40", avg: "70", max: "120", note: "Прозвонка, тест, замена автомата" },
          { service: "Поиск обрыва / КЗ в стене", unit: "зона", min: "60", avg: "100", max: "180", note: "Вскрытие по необходимости" },
          { service: "Сборка временной схемы (удлинители, переноски)", unit: "объект", min: "30", avg: "50", max: "90", note: "При ремонтах" },
          { service: "Аварийный выезд 24/7", unit: "вызов", min: "150", avg: "250", max: "400", note: "Приоритетное реагирование, диагностика на месте" },
        ],
      },
    ]
  },
  { 
    icon: Wrench, 
    key: "servicePlumbing",
    subCategories: [
      {
        icon: "🚰",
        title: "Смесители и краны",
        items: [
          { service: "Замена смесителя (кухня/ванна)", unit: "шт", min: "30", avg: "60", max: "100", note: "Без демонтажа плитки" },
          { service: "Установка нового смесителя с обвязкой", unit: "шт", min: "50", avg: "90", max: "140", note: "Врезка в трубы, герметизация" },
          { service: "Замена гибкой подводки к смесителю", unit: "пара", min: "10", avg: "20", max: "35", note: "Только материалы клиента" },
          { service: "Установка термостатического смесителя", unit: "шт", min: "60", avg: "100", max: "180", note: "Стена, параметры воды" },
          { service: "Демонтаж старого смесителя + зачистка резьбы", unit: "шт", min: "20", avg: "35", max: "50", note: "Подготовка поверхности" },
        ],
      },
      {
        icon: "🚽",
        title: "Унитазы и биде",
        items: [
          { service: "Установка унитаза (напольный)", unit: "шт", min: "80", avg: "120", max: "150", note: "Без демонтажа кафеля" },
          { service: "Установка инсталляции", unit: "комплект", min: "150", avg: "220", max: "300", note: "Монтаж рамы, подключение" },
          { service: "Замена унитаза + гофры", unit: "шт", min: "90", avg: "140", max: "200", note: "Удаление, герметизация" },
          { service: "Установка биде / гигиенического душа", unit: "шт", min: "70", avg: "110", max: "180", note: "Тройник, кран, шланг" },
        ],
      },
      {
        icon: "🔧",
        title: "Прочистка труб",
        items: [
          { service: "Прочистка труб (сифон/раковина)", unit: "точка", min: "10", avg: "15", max: "25", note: "Ручная, без демонтажа" },
          { service: "Прочистка трубы с демонтажем сифона", unit: "точка", min: "30", avg: "50", max: "70", note: "Возможно повреждение герметика" },
          { service: "Прочистка стояка (вертикаль)", unit: "участок", min: "80", avg: "150", max: "250", note: "При вызове ЖЭК отдельно" },
          { service: "Прочистка труб механически (змеевик)", unit: "п.м.", min: "25", avg: "40", max: "60", note: "Локальный засор до 50 мм" },
        ],
      },
      {
        icon: "🔥",
        title: "Водонагреватели и фильтры",
        items: [
          { service: "Установка водонагревателя (накопительный)", unit: "шт", min: "80", avg: "120", max: "180", note: "Крепление, соединение, слив" },
          { service: "Установка проточного бойлера", unit: "шт", min: "60", avg: "100", max: "160", note: "Проверка мощности эл.сети" },
          { service: "Монтаж фильтра воды под мойку", unit: "шт", min: "40", avg: "80", max: "120", note: "Учет давления, кран врезки" },
          { service: "Монтаж магистрального фильтра", unit: "шт", min: "100", avg: "150", max: "250", note: "С отводом в стояк, байпас" },
        ],
      },
      {
        icon: "🧯",
        title: "Устранение неисправностей",
        items: [
          { service: "Устранение протечки (смеситель, труба)", unit: "вызов", min: "25", avg: "50", max: "90", note: "Локальная, без замены деталей" },
          { service: "Устранение течи в соединении", unit: "шт", min: "30", avg: "60", max: "100", note: "Герметик/замена" },
          { service: "Выезд аварийного сантехника (срочно)", unit: "вызов", min: "100", avg: "150", max: "250", note: "Временная мера на месте" },
        ],
      },
      {
        icon: "🧱",
        title: "Монтаж труб и канализация",
        items: [
          { service: "Монтаж труб ПП/PEX (гор. и хол. вода)", unit: "п.м.", min: "30", avg: "50", max: "80", note: "В стену или снаружи" },
          { service: "Замена стояка воды", unit: "шт", min: "150", avg: "250", max: "400", note: "С отключением стояка (ЖЭК)" },
          { service: "Разводка труб на квартиру", unit: "объект", min: "300", avg: "500", max: "800", note: "До 5 точек, скрытая прокладка" },
          { service: "Монтаж канализационных труб (50/110 мм)", unit: "п.м.", min: "25", avg: "40", max: "65", note: "Уголки, отводы, фиксация" },
          { service: "Монтаж ревизии/прочистного люка", unit: "шт", min: "30", avg: "60", max: "90", note: "Врезка, герметизация" },
          { service: "Удаление старых труб", unit: "п.м.", min: "15", avg: "30", max: "50", note: "Металл, ПВХ, чугун" },
        ],
      },
      {
        icon: "🛁",
        title: "Ванны и душевые",
        items: [
          { service: "Установка ванны (акрил/сталь/чугун)", unit: "шт", min: "100", avg: "180", max: "280", note: "Выравнивание, подключение" },
          { service: "Замена ванны", unit: "шт", min: "150", avg: "220", max: "350", note: "Демонтаж, вынос, установка" },
          { service: "Установка душевой кабины", unit: "шт", min: "150", avg: "220", max: "300", note: "Герметизация, слив" },
          { service: "Монтаж душевой стойки / панели", unit: "шт", min: "60", avg: "100", max: "150", note: "Гибкая/жёсткая подводка" },
          { service: "Установка трапа (напольный слив)", unit: "шт", min: "80", avg: "140", max: "200", note: "Вырез, герметик" },
          { service: "Установка зеркала с подсветкой", unit: "шт", min: "50", avg: "80", max: "120", note: "С проводкой" },
        ],
      },
      {
        icon: "🍳",
        title: "Кухни, мойки, комплектующие",
        items: [
          { service: "Установка кухонной мойки", unit: "шт", min: "60", avg: "100", max: "140", note: "Подключение к сифону и крану" },
          { service: "Замена сифона", unit: "шт", min: "15", avg: "25", max: "40", note: "Пластик/металл" },
          { service: "Врезка крана в мойку", unit: "шт", min: "30", avg: "50", max: "80", note: "Герметик, прокладка" },
          { service: "Подключение ПММ/СМ", unit: "шт", min: "50", avg: "90", max: "130", note: "Кран, слив, тест" },
          { service: "Подключение фильтра обратного осмоса", unit: "шт", min: "70", avg: "120", max: "180", note: "Несколько колб, давление воды" },
        ],
      },
    ]
  },
  { 
    icon: Sparkles, 
    key: "serviceCleaning",
    subCategories: [
      {
        icon: "🧹",
        title: "Базовый клининг",
        items: [
          { service: "Поддерживающая уборка квартиры", unit: "объект", min: "120", avg: "180", max: "240", note: "До 40 м², сухая + влажная" },
          { service: "Мытьё окон (внутри)", unit: "шт", min: "15", avg: "25", max: "30", note: "Стекло, рама, отливы" },
        ],
      },
      {
        icon: "🧼",
        title: "Средний клининг",
        items: [
          { service: "Генеральная уборка квартиры", unit: "м²", min: "7", avg: "10", max: "12", note: "Мебель сдвигается частично" },
          { service: "Уборка подвала/гаража", unit: "м²", min: "8", avg: "12", max: "20", note: "Влажная, с инвентарём" },
          { service: "Уборка кухни (жир, налёт, плита)", unit: "зона", min: "40", avg: "60", max: "90", note: "Плитка, техника, духовой шкаф" },
        ],
      },
      {
        icon: "🧽",
        title: "Большой клининг",
        items: [
          { service: "Уборка после ремонта", unit: "м²", min: "8", avg: "12", max: "20", note: "Пыль, цемент, плёнка, стекло" },
          { service: "Химчистка мебели", unit: "место", min: "80", avg: "120", max: "180", note: "Пена, экстрактор" },
          { service: "Удаление плесени/затхлости", unit: "зона", min: "50", avg: "90", max: "140", note: "Спецсредства, СИЗ" },
        ],
      },
    ]
  },
  { 
    icon: Hammer, 
    key: "serviceFurniture",
    subCategories: [
      {
        icon: "🛠️",
        title: "Сборка мебели",
        items: [
          { service: "Сборка табурета / полки / тумбы", unit: "шт", min: "20", avg: "35", max: "50", note: "По инструкции" },
          { service: "Сборка стола / комода", unit: "шт", min: "40", avg: "70", max: "100", note: "До 10 деталей" },
          { service: "Сборка шкафа / кровати", unit: "шт", min: "80", avg: "120", max: "180", note: "IKEA / BRW и др." },
          { service: "Установка кухонного модуля", unit: "шт", min: "60", avg: "90", max: "130", note: "Выравнивание, крепёж" },
          { service: "Перестановка мебели с разборкой", unit: "объект", min: "100", avg: "180", max: "250", note: "Подготовка, разборка, сборка" },
        ],
      },
      {
        icon: "🔩",
        title: "Навеска и крепёж",
        items: [
          { service: "Навес полки / зеркала / картины", unit: "шт", min: "20", avg: "35", max: "50", note: "До 5 кг" },
          { service: "Навес ТВ до 32″", unit: "шт", min: "50", avg: "80", max: "120", note: "Дюбеля, проверка уровня" },
          { service: "Навес ТВ 40–65″", unit: "шт", min: "80", avg: "130", max: "180", note: "Вес, стена бетон/ГКЛ" },
          { service: "Навес кухонных шкафов (навесной ряд)", unit: "п.м.", min: "50", avg: "80", max: "120", note: "Подгонка, выравнивание" },
          { service: "Установка карниза (стена/потолок)", unit: "м.п.", min: "15", avg: "25", max: "40", note: "Бетон, ГКЛ, крепёж" },
        ],
      },
      {
        icon: "🚪",
        title: "Двери, замки, ручки",
        items: [
          { service: "Установка дверной ручки / защёлки", unit: "шт", min: "20", avg: "35", max: "50", note: "Врезка" },
          { service: "Замена замка в двери", unit: "шт", min: "40", avg: "70", max: "120", note: "Врезной/накладной" },
          { service: "Монтаж дверного доводчика", unit: "шт", min: "30", avg: "60", max: "90", note: "Металлическая/межкомнатная" },
          { service: "Регулировка дверей шкафа, петель", unit: "шт", min: "10", avg: "20", max: "35", note: "Шкафы/кухня" },
        ],
      },
      {
        icon: "🔧",
        title: "Прочий мелкий ремонт",
        items: [
          { service: "Замена батарейки / лампочки", unit: "точка", min: "5", avg: "10", max: "15", note: "Только работа" },
          { service: "Сборка стула/кровати детской", unit: "шт", min: "30", avg: "50", max: "80", note: "Без ошибок — безопасность!" },
          { service: "Мелкий демонтаж (крюки, дюбеля, штанги)", unit: "объект", min: "10", avg: "20", max: "30", note: "Без порчи стены" },
          { service: "Закрытие трещин, сколов (косметика)", unit: "точка", min: "15", avg: "25", max: "40", note: "Герметик, шпатлёвка" },
        ],
      },
    ]
  },
  { 
    icon: PaintBucket, 
    key: "serviceRenovation",
    subCategories: [
      {
        icon: "🎨",
        title: "Шпаклёвка, покраска, обои",
        items: [
          { service: "Шпаклёвка под обои (1 слой)", unit: "м²", min: "15", avg: "25", max: "35", note: "С финишной шкуркой" },
          { service: "Шпаклёвка под покраску (2 слоя)", unit: "м²", min: "25", avg: "40", max: "60", note: "С армирующей сеткой" },
          { service: "Покраска стен (2 слоя)", unit: "м²", min: "20", avg: "35", max: "55", note: "С подготовкой, без материала" },
          { service: "Покраска потолка", unit: "м²", min: "25", avg: "40", max: "60", note: "С защитой помещения" },
          { service: "Демонтаж старых обоев", unit: "м²", min: "5", avg: "10", max: "15", note: "С удалением мусора" },
          { service: "Поклейка флизелиновых обоев", unit: "м²", min: "25", avg: "40", max: "60", note: "Без подбора рисунка" },
          { service: "Поклейка обоев с рисунком", unit: "м²", min: "30", avg: "45", max: "70", note: "Подгонка и состыковка" },
        ],
      },
      {
        icon: "🏠",
        title: "Полы",
        items: [
          { service: "Стяжка пола цементная до 5 см", unit: "м²", min: "25", avg: "40", max: "65", note: "Подготовка черновая" },
          { service: "Укладка ламината", unit: "м²", min: "25", avg: "40", max: "65", note: "Без подложки" },
          { service: "Укладка линолеума", unit: "м²", min: "15", avg: "25", max: "40", note: "С выравниванием основания" },
          { service: "Укладка плитки на пол", unit: "м²", min: "45", avg: "70", max: "100", note: "С затиркой" },
          { service: "Установка плинтусов (ПВХ/МДФ)", unit: "п.м.", min: "10", avg: "15", max: "25", note: "Подрезка, уголки" },
        ],
      },
      {
        icon: "🧱",
        title: "Плитка, ванная, кухня",
        items: [
          { service: "Укладка плитки на стену (санузел)", unit: "м²", min: "50", avg: "80", max: "120", note: "Без укладки бордюров" },
          { service: "Укладка декоративной плитки / мозаики", unit: "м²", min: "60", avg: "100", max: "160", note: "Без заусовки" },
          { service: "Демонтаж старой плитки", unit: "м²", min: "20", avg: "35", max: "50", note: "С выносом" },
          { service: "Гидроизоляция санузла", unit: "м²", min: "15", avg: "25", max: "35", note: "Материалы отдельно" },
          { service: "Установка уголков / порожков", unit: "шт", min: "10", avg: "20", max: "35", note: "Металл/пластик" },
        ],
      },
      {
        icon: "🏗️",
        title: "Потолки, гипсокартон, декор",
        items: [
          { service: "Монтаж потолка из ГКЛ", unit: "м²", min: "30", avg: "50", max: "80", note: "Каркас, зашивка, шпатлёвка" },
          { service: "Монтаж перегородки из ГКЛ", unit: "м²", min: "40", avg: "65", max: "100", note: "Профиль, шумоизоляция" },
          { service: "Обшивка труб/стояков ГКЛ", unit: "м.п.", min: "25", avg: "40", max: "60", note: "Армировка, грунтовка" },
          { service: "Монтаж карниза потолочного", unit: "м.п.", min: "15", avg: "25", max: "40", note: "С дюбелями и креплением" },
          { service: "Монтаж натяжного потолка (ПВХ)", unit: "м²", min: "40", avg: "70", max: "100", note: "С багетом и светильниками" },
        ],
      },
    ]
  },
  { 
    icon: Video, 
    key: "serviceSecurity",
    subCategories: [
      {
        icon: "🎥",
        title: "Видеонаблюдение",
        items: [
          { service: "Установка видеокамеры (внутренней)", unit: "шт", min: "80", avg: "120", max: "180", note: "С настройкой, кабель отдельно" },
          { service: "Установка видеокамеры (уличной/IP)", unit: "шт", min: "100", avg: "150", max: "220", note: "Герметичность, питание" },
          { service: "Прокладка кабеля к видеокамере", unit: "п.м.", min: "10", avg: "20", max: "30", note: "Гофра, крепёж, сверление" },
          { service: "Подключение DVR / NVR-регистратора", unit: "шт", min: "70", avg: "100", max: "150", note: "Сеть, просмотр, HDD" },
          { service: "Настройка удалённого доступа", unit: "объект", min: "40", avg: "80", max: "120", note: "Приложение, облако, права" },
          { service: "Установка датчика дыма/газа", unit: "шт", min: "25", avg: "40", max: "60", note: "Сигнал + тест вызова" },
          { service: "Техническое обслуживание системы", unit: "объект", min: "100", avg: "150", max: "250", note: "Чистка, апдейт, проверка записи" },
        ],
      },
    ]
  },
  { 
    icon: Flame, 
    key: "serviceWelding",
    subCategories: [
      {
        icon: "🔥",
        title: "Сварочные работы",
        items: [
          { service: "Сварка петель/замков/ручек", unit: "шт", min: "30", avg: "50", max: "80", note: "На калитке, двери, люке" },
          { service: "Ремонт ворот/решёток (частично)", unit: "зона", min: "60", avg: "100", max: "150", note: "С зачисткой и грунтом" },
          { service: "Изготовление каркаса (навес, мангал)", unit: "м²", min: "120", avg: "180", max: "250", note: "Сварка, резка, сборка" },
          { service: "Установка металлической двери", unit: "шт", min: "150", avg: "250", max: "400", note: "Монтаж, анкеры, уровень" },
          { service: "Изготовление лестницы / перил", unit: "м.п.", min: "100", avg: "180", max: "300", note: "Черновой/финишный вариант" },
          { service: "Сварка баков, ёмкостей, труб", unit: "узел", min: "80", avg: "140", max: "220", note: "Углеродистая сталь, инвертор" },
          { service: "Сварка в труднодоступных местах", unit: "шов", min: "100", avg: "180", max: "280", note: "Позиционная, ручная, без разбора" },
        ],
      },
    ]
  },
  { 
    icon: Settings, 
    key: "serviceRepair"
  },
  { 
    icon: Wifi, 
    key: "serviceSmartHome",
    subCategories: [
      {
        icon: "🏠",
        title: "Умный дом",
        items: [
          { service: "Установка умной розетки (Wi‑Fi)", unit: "шт", min: "30", avg: "45", max: "60", note: "Настройка через приложение" },
          { service: "Установка умной лампы (RGB/белая)", unit: "шт", min: "25", avg: "40", max: "60", note: "Сценарии и таймеры" },
          { service: "Настройка голосового управления (Яндекс, Google)", unit: "объект", min: "60", avg: "100", max: "150", note: "Привязка к сценарию, тест" },
          { service: "Монтаж датчиков движения/света/протечки", unit: "шт", min: "30", avg: "50", max: "80", note: "Связка по условию" },
          { service: "Настройка сценариев освещения/климата", unit: "зона", min: "80", avg: "130", max: "200", note: "Условия, автоматизация" },
          { service: "Интеграция с системами безопасности", unit: "объект", min: "100", avg: "150", max: "250", note: "Совместимость, приложение" },
        ],
      },
    ]
  },
  { 
    icon: MoreHorizontal, 
    key: "serviceOther"
  },
];

export const Services = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);

  const filteredServices = servicesData.filter((service) => {
    const matchesSearch = t(service.key).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || service.key === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("servicesSubtitle")}</p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(null)}
            >
              {t("filterAll")}
            </Button>
            {servicesData.map((service) => (
              <Button
                key={service.key}
                variant={selectedFilter === service.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(service.key === selectedFilter ? null : service.key)}
              >
                {t(service.key)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {filteredServices.map(({ icon: Icon, key, subCategories }, index) => (
            <Card 
              key={key}
              className="shadow-card hover:shadow-lg-orange transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => subCategories && setSelectedService(servicesData.find(s => s.key === key) || null)}
            >
              {subCategories && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                  💰
                </div>
              )}
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground">{t(key)}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Price Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
            <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              {selectedService && (
                <>
                  <span className="text-3xl">{servicesData.find(s => s.key === selectedService.key)?.icon && 
                    (() => {
                      const IconComponent = servicesData.find(s => s.key === selectedService.key)?.icon;
                      return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
                    })()
                  }</span>
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    {t(selectedService.key)}
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-full max-h-[calc(85vh-100px)]">
            <div className="p-6 space-y-8">
              {selectedService?.subCategories?.map((subCat, subIndex) => (
                <div key={subIndex} className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground sticky top-0 bg-background py-2 z-5">
                    <span className="text-2xl">{subCat.icon}</span>
                    {subCat.title}
                  </h3>
                  
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary/10 to-secondary/10">
                          <th className="text-left p-4 font-semibold text-sm">Услуга</th>
                          <th className="text-center p-4 font-semibold text-sm w-20">Ед.</th>
                          <th className="text-center p-4 font-semibold text-sm w-24">Мин</th>
                          <th className="text-center p-4 font-semibold text-sm w-24">Средняя</th>
                          <th className="text-center p-4 font-semibold text-sm w-24">Макс</th>
                          <th className="text-left p-4 font-semibold text-sm">Примечание</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subCat.items.map((item, itemIndex) => (
                          <tr
                            key={itemIndex}
                            className={`transition-colors hover:bg-muted/50 ${
                              itemIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                            }`}
                          >
                            <td className="p-4 text-sm font-medium">{item.service}</td>
                            <td className="p-4 text-center text-sm text-muted-foreground">{item.unit}</td>
                            <td className="p-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              {item.min}
                            </td>
                            <td className="p-4 text-center text-sm">
                              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-lg">
                                {item.avg}
                              </span>
                            </td>
                            <td className="p-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              {item.max}
                            </td>
                            <td className="p-4 text-sm text-muted-foreground italic">{item.note || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-3">
                    {subCat.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-4 rounded-xl border-2 border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-all"
                      >
                        <h4 className="font-semibold text-sm mb-3 text-foreground">{item.service}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-muted-foreground">Единица: {item.unit}</span>
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-lg">
                            {item.avg}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Мин:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.min}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Макс:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.max}</span>
                          </div>
                        </div>
                        {item.note && (
                          <p className="mt-3 text-xs text-muted-foreground italic border-t border-border pt-2">
                            {item.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};
