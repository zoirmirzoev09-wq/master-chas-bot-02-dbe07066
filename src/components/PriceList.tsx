import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

interface Category {
  icon: string;
  title: string;
  subCategories: SubCategory[];
}

const priceData: Category[] = [
  {
    icon: "⚡",
    title: "Электрика",
    subCategories: [
      {
        icon: "🔌",
        title: "Розетки и выключатели",
        items: [
          { service: "Замена розетки (внутр. / наруж.)", unit: "шт", min: "20", avg: "40", max: "80", note: "Бетон/ГКЛ/кирпич. Доступ к проводу" },
          { service: "Замена розетки с демонтажем старой и выемкой подрозетника", unit: "шт", min: "40", avg: "70", max: "120", note: "Старые советские розетки" },
          { service: "Установка влагозащищённой розетки (ванная/гараж)", unit: "шт", min: "50", avg: "90", max: "150", note: "Герметичная, проверка заземления" },
          { service: "Установка розетки с USB / зарядкой", unit: "шт", min: "40", avg: "70", max: "130", note: "Современные модели" },
          { service: "Установка блока розеток (3+ точек)", unit: "шт", min: "80", avg: "130", max: "200", note: "Требует разводки" },
          { service: "Установка одинарного выключателя", unit: "шт", min: "20", avg: "40", max: "80", note: "Простая замена" },
          { service: "Установка двух-/трёхклавишного выключателя", unit: "шт", min: "30", avg: "60", max: "120", note: "Нужно знать схему" },
          { service: "Перенос выключателя по стене", unit: "п.м.", min: "30", avg: "50", max: "100", note: "Штроба, новая линия" },
          { service: "Монтаж проходного выключателя", unit: "шт", min: "50", avg: "90", max: "160", note: "Установка в двух точках" },
        ],
      },
      {
        icon: "💡",
        title: "Освещение",
        items: [
          { service: "Установка светильника/бра (до 5 кг)", unit: "шт", min: "30", avg: "60", max: "120", note: "Простая замена" },
          { service: "Установка люстры (до 3 кг, стандарт)", unit: "шт", min: "50", avg: "100", max: "150", note: "Высота до 2.7 м" },
          { service: "Установка люстры (тяжёлая, высокие потолки)", unit: "шт", min: "100", avg: "180", max: "300", note: "С лесами" },
          { service: "Установка трековой системы", unit: "пог.м", min: "60", avg: "90", max: "140", note: "Разметка + подключение" },
        ],
      },
    ],
  },
  {
    icon: "🚰",
    title: "Сантехника",
    subCategories: [
      {
        icon: "🚰",
        title: "Смесители и краны",
        items: [
          { service: "Замена смесителя (кухня/ванна)", unit: "шт", min: "30", avg: "60", max: "100", note: "Без демонтажа плитки" },
          { service: "Установка нового смесителя с обвязкой", unit: "шт", min: "50", avg: "90", max: "140", note: "Врезка в трубы" },
          { service: "Замена гибкой подводки", unit: "пара", min: "10", avg: "20", max: "35" },
          { service: "Установка термостатического смесителя", unit: "шт", min: "60", avg: "100", max: "180" },
        ],
      },
      {
        icon: "🚽",
        title: "Унитазы и биде",
        items: [
          { service: "Установка унитаза (напольный)", unit: "шт", min: "80", avg: "120", max: "150" },
          { service: "Установка инсталляции", unit: "комплект", min: "150", avg: "220", max: "300", note: "Без облицовки" },
          { service: "Замена унитаза + гофра", unit: "шт", min: "90", avg: "140", max: "200" },
          { service: "Установка биде / гигиенического душа", unit: "шт", min: "70", avg: "110", max: "180" },
        ],
      },
      {
        icon: "🛁",
        title: "Ванны и душевые",
        items: [
          { service: "Установка ванны (акрил/сталь/чугун)", unit: "шт", min: "100", avg: "180", max: "280" },
          { service: "Установка душевой кабины", unit: "шт", min: "150", avg: "220", max: "300" },
          { service: "Установка душевого трапа", unit: "шт", min: "80", avg: "140", max: "200" },
        ],
      },
    ],
  },
  {
    icon: "🎨",
    title: "Отделка и ремонт",
    subCategories: [
      {
        icon: "🧱",
        title: "Стены и потолки",
        items: [
          { service: "Шпаклёвка под обои (1 слой)", unit: "м²", min: "15", avg: "25", max: "35" },
          { service: "Шпаклёвка под покраску (2 слоя)", unit: "м²", min: "25", avg: "40", max: "60" },
          { service: "Покраска стен (2 слоя)", unit: "м²", min: "20", avg: "35", max: "55" },
          { service: "Покраска потолка", unit: "м²", min: "25", avg: "40", max: "60" },
          { service: "Поклейка флизелиновых обоев", unit: "м²", min: "25", avg: "40", max: "60" },
          { service: "Поклейка обоев с рисунком", unit: "м²", min: "30", avg: "45", max: "70", note: "Подгонка рисунка" },
        ],
      },
      {
        icon: "🧱",
        title: "Полы и плитка",
        items: [
          { service: "Укладка ламината", unit: "м²", min: "25", avg: "40", max: "65" },
          { service: "Укладка линолеума", unit: "м²", min: "15", avg: "25", max: "40" },
          { service: "Укладка плитки на пол", unit: "м²", min: "45", avg: "70", max: "100", note: "С затиркой" },
          { service: "Укладка плитки на стену", unit: "м²", min: "50", avg: "80", max: "120" },
        ],
      },
    ],
  },
];

export const PriceList = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t("priceListTitle")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("priceListSubtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {priceData.map((category, catIndex) => (
              <AccordionItem
                key={catIndex}
                value={`category-${catIndex}`}
                className="border-2 border-border rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-lg-orange transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {category.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-8 mt-4">
                    {category.subCategories.map((subCat, subIndex) => (
                      <div key={subIndex} className="space-y-4">
                        <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground">
                          <span className="text-2xl">{subCat.icon}</span>
                          {subCat.title}
                        </h3>
                        
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/50">
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
                                  className={itemIndex % 2 === 0 ? "bg-background" : "bg-muted/20"}
                                >
                                  <td className="p-4 text-sm">{item.service}</td>
                                  <td className="p-4 text-center text-sm text-muted-foreground">{item.unit}</td>
                                  <td className="p-4 text-center text-sm font-semibold text-green-600 dark:text-green-400">
                                    {item.min}
                                  </td>
                                  <td className="p-4 text-center text-sm font-bold text-green-600 dark:text-green-400">
                                    {item.avg}
                                  </td>
                                  <td className="p-4 text-center text-sm font-semibold text-green-600 dark:text-green-400">
                                    {item.max}
                                  </td>
                                  <td className="p-4 text-sm text-muted-foreground">{item.note || "—"}</td>
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
                              className="p-4 rounded-lg border border-border bg-card"
                            >
                              <h4 className="font-semibold text-sm mb-3">{item.service}</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Ед.:</span>{" "}
                                  <span className="font-medium">{item.unit}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Мин:</span>{" "}
                                  <span className="font-semibold text-green-600 dark:text-green-400">{item.min}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Средняя:</span>{" "}
                                  <span className="font-bold text-green-600 dark:text-green-400">{item.avg}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Макс:</span>{" "}
                                  <span className="font-semibold text-green-600 dark:text-green-400">{item.max}</span>
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};