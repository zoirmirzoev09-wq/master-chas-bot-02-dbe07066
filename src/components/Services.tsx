import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
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
  Brain,
  TreePine,
  Flame,
  Home,
  Building
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AddServiceButton } from "./AddServiceButton";
import { AddServiceForm } from "./AddServiceForm";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const iconMap: Record<string, any> = {
  Zap,
  Wrench,
  Sparkles,
  Hammer,
  PaintBucket,
  Video,
  Settings,
  MoreHorizontal,
  Brain,
  TreePine,
  Flame,
  Home,
  Building
};

interface ServiceCategory {
  id: string;
  key: string;
  icon: string;
  name_ru: string;
  name_en: string;
  name_tj: string;
}

interface Service {
  id: string;
  category_id: string;
  subcategory_icon: string | null;
  subcategory_ru: string | null;
  subcategory_en: string | null;
  subcategory_tj: string | null;
  service_name_ru: string;
  service_name_en: string;
  service_name_tj: string;
  unit_ru: string;
  unit_en: string;
  unit_tj: string;
  min_price: string;
  avg_price: string;
  max_price: string;
  note_ru: string | null;
  note_en: string | null;
  note_tj: string | null;
}

export const Services = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('services-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: categoriesData } = await supabase
        .from("service_categories")
        .select("*")
        .order("sort_order");

      const { data: servicesData } = await supabase
        .from("services")
        .select("*");

      if (categoriesData) setCategories(categoriesData);
      if (servicesData) setServices(servicesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category: ServiceCategory) => {
    return language === "ru" ? category.name_ru : language === "en" ? category.name_en : category.name_tj;
  };

  const getServiceName = (service: Service) => {
    return language === "ru" ? service.service_name_ru : language === "en" ? service.service_name_en : service.service_name_tj;
  };

  const getUnit = (service: Service) => {
    return language === "ru" ? service.unit_ru : language === "en" ? service.unit_en : service.unit_tj;
  };

  const getNote = (service: Service) => {
    return language === "ru" ? service.note_ru : language === "en" ? service.note_en : service.note_tj;
  };

  const getSubcategory = (service: Service) => {
    return language === "ru" ? service.subcategory_ru : language === "en" ? service.subcategory_en : service.subcategory_tj;
  };

  const filteredCategories = categories.filter((category) => {
    const name = getCategoryName(category);
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || category.id === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const categoryServices = selectedCategory
    ? services.filter((s) => s.category_id === selectedCategory.id)
    : [];

  const groupedServices = categoryServices.reduce((acc, service) => {
    const subcategory = getSubcategory(service) || "Другое";
    if (!acc[subcategory]) {
      acc[subcategory] = { icon: service.subcategory_icon || "📋", items: [] };
    }
    acc[subcategory].items.push(service);
    return acc;
  }, {} as Record<string, { icon: string; items: Service[] }>);

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
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedFilter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(category.id === selectedFilter ? null : category.id)}
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{language === "ru" ? "Загрузка..." : language === "en" ? "Loading..." : "Бор шуда истодааст..."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {filteredCategories.map((category, index) => {
              const Icon = iconMap[category.icon] || MoreHorizontal;
              const hasServices = services.some((s) => s.category_id === category.id);
              
              return (
                <Card 
                  key={category.id}
                  className="shadow-card hover:shadow-lg-orange transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => hasServices && setSelectedCategory(category)}
                >
                  {hasServices && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                      💰
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground">{getCategoryName(category)}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <AddServiceButton onClick={() => setShowAddForm(true)} />
        <AddServiceForm
          open={showAddForm}
          onOpenChange={setShowAddForm}
          categories={categories}
          onServiceAdded={loadData}
        />
      </div>

      {/* Price Details Modal */}
      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
            <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              {selectedCategory && (
                <>
                  {(() => {
                    const Icon = iconMap[selectedCategory.icon] || MoreHorizontal;
                    return <Icon className="w-8 h-8" />;
                  })()}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    {getCategoryName(selectedCategory)}
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-full max-h-[calc(85vh-100px)]">
            <div className="p-6 space-y-8">
              {Object.entries(groupedServices).map(([subcategory, data], subIndex) => (
                <div key={subIndex} className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-3 text-foreground sticky top-0 bg-background py-2 z-5">
                    <span className="text-2xl">{data.icon}</span>
                    {subcategory}
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
                        {data.items.map((item, itemIndex) => (
                          <tr
                            key={item.id}
                            className={`transition-colors hover:bg-muted/50 ${
                              itemIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                            }`}
                          >
                            <td className="p-4 text-sm font-medium">{getServiceName(item)}</td>
                            <td className="p-4 text-center text-sm text-muted-foreground">{getUnit(item)}</td>
                            <td className="p-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              {item.min_price}
                            </td>
                            <td className="p-4 text-center text-sm">
                              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-lg">
                                {item.avg_price}
                              </span>
                            </td>
                            <td className="p-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                              {item.max_price}
                            </td>
                            <td className="p-4 text-sm text-muted-foreground italic">{getNote(item) || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-3">
                    {data.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border-2 border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-all"
                      >
                        <h4 className="font-semibold text-sm mb-3 text-foreground">{getServiceName(item)}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-muted-foreground">
                            {language === "ru" ? "Единица" : language === "en" ? "Unit" : "Воҳид"}: {getUnit(item)}
                          </span>
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-lg">
                            {item.avg_price}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{language === "ru" ? "Мин" : language === "en" ? "Min" : "Мин"}:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.min_price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{language === "ru" ? "Макс" : language === "en" ? "Max" : "Макс"}:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.max_price}</span>
                          </div>
                        </div>
                        {getNote(item) && (
                          <p className="mt-3 text-xs text-muted-foreground italic border-t border-border pt-2">
                            {getNote(item)}
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