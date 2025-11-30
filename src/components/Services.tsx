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
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
            {t("servicesTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("servicesSubtitle")}
          </p>
        </div>

        <Accordion type="multiple" className="space-y-4 max-w-6xl mx-auto">
          {categories.map((category) => {
            const groupedServices = groupServicesBySubcategory(category.id);
            const hasServices = Object.keys(groupedServices).length > 0;

            if (!hasServices) return null;

            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="bg-card rounded-lg shadow-lg overflow-hidden border-2 border-border hover:border-primary/50 transition-all"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-4xl">{category.icon}</span>
                    <span className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {getCategoryName(category)}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-8">
                    {Object.entries(groupedServices).map(
                      ([subcategory, subcategoryServices]) => (
                        <div key={subcategory} className="space-y-4">
                          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            {subcategoryServices[0]?.subcategory_icon && (
                              <span className="text-2xl">
                                {subcategoryServices[0].subcategory_icon}
                              </span>
                            )}
                            {subcategory}
                          </h3>

                          {/* Desktop Table */}
                          <div className="hidden md:block rounded-lg overflow-hidden border border-border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-bold">
                                    {t("serviceNameColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold">
                                    {t("unitColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-primary">
                                    {t("minPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-primary">
                                    {t("avgPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold text-primary">
                                    {t("maxPriceColumn")}
                                  </TableHead>
                                  <TableHead className="font-bold">
                                    {t("noteColumn")}
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subcategoryServices.map((service, idx) => (
                                  <TableRow
                                    key={service.id}
                                    className={
                                      idx % 2 === 0 ? "bg-background" : "bg-muted/30"
                                    }
                                  >
                                    <TableCell className="font-medium">
                                      {getServiceName(service)}
                                    </TableCell>
                                    <TableCell>{getUnit(service)}</TableCell>
                                    <TableCell className="text-primary font-semibold">
                                      {service.min_price}
                                    </TableCell>
                                    <TableCell className="text-primary font-semibold">
                                      {service.avg_price}
                                    </TableCell>
                                    <TableCell className="text-primary font-semibold">
                                      {service.max_price}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
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
                                className="bg-card p-4 rounded-lg border border-border space-y-3"
                              >
                                <h4 className="font-bold text-lg">
                                  {getServiceName(service)}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      {t("unitColumn")}:
                                    </span>
                                    <span className="ml-2 font-medium">
                                      {getUnit(service)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      {t("minPriceColumn")}:
                                    </span>
                                    <span className="ml-2 font-semibold text-primary">
                                      {service.min_price}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      {t("avgPriceColumn")}:
                                    </span>
                                    <span className="ml-2 font-semibold text-primary">
                                      {service.avg_price}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      {t("maxPriceColumn")}:
                                    </span>
                                    <span className="ml-2 font-semibold text-primary">
                                      {service.max_price}
                                    </span>
                                  </div>
                                </div>
                                {getNote(service) && (
                                  <p className="text-sm text-muted-foreground pt-2 border-t border-border">
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
