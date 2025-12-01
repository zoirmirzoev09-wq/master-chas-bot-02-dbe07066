import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { AddServiceButton } from "./AddServiceButton";
import { AddServiceForm } from "./AddServiceForm";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceCategory {
  id: string;
  key: string;
  icon: string;
  name_ru: string;
  name_en: string;
  name_tj: string;
  sort_order: number;
}

interface Service {
  id: string;
  category_id: string;
  subcategory_icon?: string;
  subcategory_ru?: string;
  subcategory_en?: string;
  subcategory_tj?: string;
  service_name_ru: string;
  service_name_en: string;
  service_name_tj: string;
  unit_ru: string;
  unit_en: string;
  unit_tj: string;
  min_price: string;
  avg_price: string;
  max_price: string;
  note_ru?: string;
  note_en?: string;
  note_tj?: string;
}

export const Services = () => {
  const { language, t } = useLanguage();
  const { isAdmin } = useAdmin();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadData();

    const servicesChannel = supabase
      .channel("services-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(servicesChannel);
    };
  }, []);

  const loadData = async () => {
    try {
      const [categoriesResult, servicesResult] = await Promise.all([
        supabase
          .from("service_categories")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase.from("services").select("*"),
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (servicesResult.error) throw servicesResult.error;

      setCategories(categoriesResult.data || []);
      setServices(servicesResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category: ServiceCategory) => {
    switch (language) {
      case "en":
        return category.name_en;
      case "tj":
        return category.name_tj;
      default:
        return category.name_ru;
    }
  };

  const getServiceName = (service: Service) => {
    switch (language) {
      case "en":
        return service.service_name_en;
      case "tj":
        return service.service_name_tj;
      default:
        return service.service_name_ru;
    }
  };

  const getUnit = (service: Service) => {
    switch (language) {
      case "en":
        return service.unit_en;
      case "tj":
        return service.unit_tj;
      default:
        return service.unit_ru;
    }
  };

  const getNote = (service: Service) => {
    switch (language) {
      case "en":
        return service.note_en;
      case "tj":
        return service.note_tj;
      default:
        return service.note_ru;
    }
  };

  const getSubcategory = (service: Service) => {
    switch (language) {
      case "en":
        return service.subcategory_en;
      case "tj":
        return service.subcategory_tj;
      default:
        return service.subcategory_ru;
    }
  };

  const groupServicesBySubcategory = (categoryId: string) => {
    const categoryServices = services.filter(
      (s) => s.category_id === categoryId
    );

    const grouped: { [key: string]: Service[] } = {};

    categoryServices.forEach((service) => {
      const subcategory = getSubcategory(service) || "Без категории";
      if (!grouped[subcategory]) {
        grouped[subcategory] = [];
      }
      grouped[subcategory].push(service);
    });

    return grouped;
  };

  if (loading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
            {t("servicesTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("servicesSubtitle")}
          </p>
        </div>

        <Accordion type="multiple" className="space-y-6 max-w-7xl mx-auto">
          {categories.map((category) => {
            const groupedServices = groupServicesBySubcategory(category.id);
            const hasServices = Object.keys(groupedServices).length > 0;

            if (!hasServices) return null;

            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="bg-card rounded-2xl shadow-xl overflow-hidden border-2 border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline group bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 hover:from-primary/20 hover:via-primary/15 hover:to-primary/10 transition-all duration-300">
                  <div className="flex items-center gap-4 text-left w-full">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                      {getCategoryName(category)}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-8 pb-8 pt-4">
                  <div className="space-y-10">
                    {Object.entries(groupedServices).map(
                      ([subcategory, subcategoryServices]) => (
                        <div key={subcategory} className="space-y-4 animate-fade-in">
                          <h3 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-3 pb-2 border-b-2 border-primary/20">
                            {subcategoryServices[0]?.subcategory_icon && (
                              <span className="text-3xl">
                                {subcategoryServices[0].subcategory_icon}
                              </span>
                            )}
                            {subcategory}
                          </h3>

                          {/* Desktop Table */}
                          <div className="hidden md:block rounded-xl overflow-hidden border-2 border-border/50 shadow-lg">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gradient-to-r from-muted/80 to-muted/50 hover:from-muted hover:to-muted/70">
                                  <TableHead className="font-bold text-base">
                                    {t("serviceNameColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-base">
                                    {t("unitColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-base text-primary">
                                    {t("minPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-base text-primary">
                                    {t("avgPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-base text-primary">
                                    {t("maxPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-base">
                                    {t("noteColumn")}
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subcategoryServices.map((service, idx) => (
                                  <TableRow
                                    key={service.id}
                                    className={`transition-colors duration-200 ${
                                      idx % 2 === 0 
                                        ? "bg-background hover:bg-muted/30" 
                                        : "bg-muted/20 hover:bg-muted/40"
                                    }`}
                                  >
                                    <TableCell className="font-medium text-base py-4">
                                      {getServiceName(service)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {getUnit(service)}
                                    </TableCell>
                                    <TableCell className="text-primary font-bold text-base">
                                      {service.min_price} с.
                                    </TableCell>
                                    <TableCell className="text-primary font-bold text-base">
                                      {service.avg_price} с.
                                    </TableCell>
                                    <TableCell className="text-primary font-bold text-base">
                                      {service.max_price} с.
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground italic">
                                      {getNote(service)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Mobile Cards */}
                          <div className="md:hidden space-y-4">
                            {subcategoryServices.map((service) => (
                              <div
                                key={service.id}
                                className="bg-card p-5 rounded-xl border-2 border-border/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-4 hover:border-primary/30"
                              >
                                <h4 className="font-bold text-lg text-foreground">
                                  {getServiceName(service)}
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="space-y-1">
                                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                                      {t("unitColumn")}
                                    </span>
                                    <p className="font-medium text-base">
                                      {getUnit(service)}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                                      {t("minPriceColumn")}
                                    </span>
                                    <p className="font-bold text-base text-primary">
                                      {service.min_price} с.
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                                      {t("avgPriceColumn")}
                                    </span>
                                    <p className="font-bold text-base text-primary">
                                      {service.avg_price} с.
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-muted-foreground text-xs uppercase tracking-wide">
                                      {t("maxPriceColumn")}
                                    </span>
                                    <p className="font-bold text-base text-primary">
                                      {service.max_price} с.
                                    </p>
                                  </div>
                                </div>
                                {getNote(service) && (
                                  <p className="text-sm text-muted-foreground pt-3 border-t border-border/50 italic">
                                    {getNote(service)}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {isAdmin && (
          <>
            <AddServiceButton onClick={() => setShowAddForm(true)} />
            <AddServiceForm
              open={showAddForm}
              onOpenChange={setShowAddForm}
              categories={categories}
              onServiceAdded={loadData}
            />
          </>
        )}
      </div>
    </section>
  );
};
