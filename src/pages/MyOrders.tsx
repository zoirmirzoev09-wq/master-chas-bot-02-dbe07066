import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Package, MapPin, Calendar, User, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Order {
  id: string;
  order_number: string;
  category_id: string;
  object_type: string;
  district: string;
  address: string;
  preferred_time: string;
  comment: string;
  budget: string;
  status: string;
  created_at: string;
  assigned_master_id: string | null;
  service_categories: {
    name_ru: string;
    name_en: string;
    name_tj: string;
    icon: string;
  };
  masters: {
    full_name: string;
    phone: string;
  } | null;
}

export default function MyOrders() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    loadOrders(user.id);
  };

  const loadOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          service_categories(name_ru, name_en, name_tj, icon),
          masters(full_name, phone)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error("Ошибка загрузки заказов");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category: any) => {
    if (!category) return "";
    switch (language) {
      case "en": return category.name_en;
      case "tj": return category.name_tj;
      default: return category.name_ru;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Ожидает", variant: "secondary" },
      assigned: { label: "Назначен", variant: "default" },
      in_progress: { label: "В работе", variant: "default" },
      completed: { label: "Выполнен", variant: "outline" },
      cancelled: { label: "Отменён", variant: "destructive" },
    };
    return statusMap[status] || statusMap.pending;
  };

  const handleRepeatOrder = (order: Order) => {
    navigate("/quick-order", { state: { repeatOrder: order } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Button>
          <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
            Мои заказы
          </h1>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">У вас пока нет заказов</p>
              <Button onClick={() => navigate("/quick-order")}>
                Создать заказ
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {orders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              return (
                <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <span className="text-3xl">{order.service_categories?.icon}</span>
                          {getCategoryName(order.service_categories)}
                        </CardTitle>
                        <CardDescription className="font-mono text-sm">
                          № {order.order_number}
                        </CardDescription>
                      </div>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium">{order.district}</p>
                        <p className="text-muted-foreground">{order.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{order.preferred_time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span>Тип объекта: {order.object_type}</span>
                    </div>

                    {order.masters && (
                      <div className="flex items-start gap-2 text-sm">
                        <User className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <p className="font-medium">{order.masters.full_name}</p>
                          <p className="text-muted-foreground">{order.masters.phone}</p>
                        </div>
                      </div>
                    )}

                    {order.comment && (
                      <p className="text-sm text-muted-foreground italic border-t pt-3">
                        {order.comment}
                      </p>
                    )}

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => handleRepeatOrder(order)}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Повторить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}