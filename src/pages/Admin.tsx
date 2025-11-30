import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { AddServiceForm } from "@/components/AddServiceForm";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Service {
  id: string;
  service_name_ru: string;
  service_name_en: string;
  service_name_tj: string;
  unit_ru: string;
  min_price: string;
  avg_price: string;
  max_price: string;
  note_ru?: string;
  subcategory_ru?: string;
  category_id: string;
}

interface ServiceCategory {
  id: string;
  key: string;
  name_ru: string;
  name_en: string;
  name_tj: string;
  icon: string;
}

export default function Admin() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    loadServices();

    const channel = supabase
      .channel("admin-services-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        () => {
          loadServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadServices = async () => {
    try {
      const [servicesResult, categoriesResult] = await Promise.all([
        supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("service_categories")
          .select("*")
          .order("sort_order", { ascending: true }),
      ]);

      if (servicesResult.error) throw servicesResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setServices(servicesResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error("Error loading services:", error);
      toast.error("Ошибка загрузки услуг");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту услугу?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;
      toast.success("Услуга удалена");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Ошибка удаления услуги");
    }
  };

  if (adminLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Button>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-primary-foreground"
          >
            Добавить услугу
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Подкатегория</TableHead>
                  <TableHead>Ед.</TableHead>
                  <TableHead>Мин</TableHead>
                  <TableHead>Средняя</TableHead>
                  <TableHead>Макс</TableHead>
                  <TableHead>Примечание</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {getServiceName(service)}
                    </TableCell>
                    <TableCell>{service.subcategory_ru}</TableCell>
                    <TableCell>{service.unit_ru}</TableCell>
                    <TableCell className="text-primary font-semibold">
                      {service.min_price}
                    </TableCell>
                    <TableCell className="text-primary font-semibold">
                      {service.avg_price}
                    </TableCell>
                    <TableCell className="text-primary font-semibold">
                      {service.max_price}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {service.note_ru}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AddServiceForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        categories={categories}
        onServiceAdded={loadServices}
      />
    </div>
  );
}
