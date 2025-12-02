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
  Search
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
          { service: "Замена розетки (внутр. / наруж.)", unit: "шт", min: "20", avg: "40", max: "80", note: "Бетон/ГКЛ/кирпич" },
          { service: "Замена розетки с демонтажем", unit: "шт", min: "40", avg: "70", max: "120", note: "Старые советские" },
          { service: "Установка влагозащищённой розетки", unit: "шт", min: "50", avg: "90", max: "150", note: "Ванная/гараж" },
          { service: "Установка розетки с USB", unit: "шт", min: "40", avg: "70", max: "130" },
          { service: "Установка блока розеток (3+)", unit: "шт", min: "80", avg: "130", max: "200" },
          { service: "Установка одинарного выключателя", unit: "шт", min: "20", avg: "40", max: "80" },
          { service: "Установка 2-3 клавишного выключателя", unit: "шт", min: "30", avg: "60", max: "120" },
          { service: "Перенос выключателя по стене", unit: "п.м.", min: "30", avg: "50", max: "100", note: "Штроба" },
          { service: "Монтаж проходного выключателя", unit: "шт", min: "50", avg: "90", max: "160" },
        ],
      },
      {
        icon: "💡",
        title: "Освещение",
        items: [
          { service: "Установка светильника/бра (до 5 кг)", unit: "шт", min: "30", avg: "60", max: "120" },
          { service: "Установка люстры (до 3 кг)", unit: "шт", min: "50", avg: "100", max: "150", note: "Высота до 2.7 м" },
          { service: "Установка люстры (тяжёлая)", unit: "шт", min: "100", avg: "180", max: "300", note: "С лесами" },
          { service: "Установка трековой системы", unit: "пог.м", min: "60", avg: "90", max: "140" },
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
          { service: "Замена смесителя (кухня/ванна)", unit: "шт", min: "30", avg: "60", max: "100" },
          { service: "Установка нового смесителя", unit: "шт", min: "50", avg: "90", max: "140", note: "С обвязкой" },
          { service: "Замена гибкой подводки", unit: "пара", min: "10", avg: "20", max: "35" },
          { service: "Установка термостатического смесителя", unit: "шт", min: "60", avg: "100", max: "180" },
        ],
      },
      {
        icon: "🚽",
        title: "Унитазы и биде",
        items: [
          { service: "Установка унитаза (напольный)", unit: "шт", min: "80", avg: "120", max: "150" },
          { service: "Установка инсталляции", unit: "комплект", min: "150", avg: "220", max: "300" },
          { service: "Замена унитаза + гофра", unit: "шт", min: "90", avg: "140", max: "200" },
          { service: "Установка биде / гигиенического душа", unit: "шт", min: "70", avg: "110", max: "180" },
        ],
      },
      {
        icon: "🛁",
        title: "Ванны и душевые",
        items: [
          { service: "Установка ванны", unit: "шт", min: "100", avg: "180", max: "280", note: "Акрил/сталь/чугун" },
          { service: "Установка душевой кабины", unit: "шт", min: "150", avg: "220", max: "300" },
          { service: "Установка душевого трапа", unit: "шт", min: "80", avg: "140", max: "200" },
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
    key: "serviceFurniture"
  },
  { 
    icon: PaintBucket, 
    key: "serviceRenovation",
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
          { service: "Поклейка обоев с рисунком", unit: "м²", min: "30", avg: "45", max: "70", note: "Подгонка" },
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
    ]
  },
  { 
    icon: Video, 
    key: "serviceSecurity"
  },
  { 
    icon: Settings, 
    key: "serviceRepair"
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
