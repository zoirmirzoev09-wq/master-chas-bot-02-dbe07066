import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Phone, Calendar, Package, Star } from 'lucide-react';
import Header from '@/components/Header';

const ClientCabinet = () => {
  const { language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const texts = {
    ru: {
      title: 'Личный кабинет',
      profile: 'Профиль',
      name: 'Имя',
      phone: 'Телефон',
      age: 'Возраст',
      orders: 'Мои заказы',
      noOrders: 'У вас пока нет заказов',
      completedOrders: 'Выполненных заказов',
      pending: 'В ожидании',
      inProgress: 'В работе',
      completed: 'Выполнен',
      cancelled: 'Отменён',
      leaveReview: 'Оставить отзыв',
      notSpecified: 'Не указано'
    },
    tj: {
      title: 'Кабинети шахсӣ',
      profile: 'Профил',
      name: 'Ном',
      phone: 'Телефон',
      age: 'Синну сол',
      orders: 'Фармоишҳои ман',
      noOrders: 'Шумо ҳоло фармоише надоред',
      completedOrders: 'Фармоишҳои иҷрошуда',
      pending: 'Дар интизорӣ',
      inProgress: 'Дар кор',
      completed: 'Иҷро шуд',
      cancelled: 'Бекор шуд',
      leaveReview: 'Тақриз гузоред',
      notSpecified: 'Муайян нашудааст'
    },
    en: {
      title: 'My Account',
      profile: 'Profile',
      name: 'Name',
      phone: 'Phone',
      age: 'Age',
      orders: 'My Orders',
      noOrders: 'You have no orders yet',
      completedOrders: 'Completed orders',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      leaveReview: 'Leave Review',
      notSpecified: 'Not specified'
    }
  };

  const t = texts[language];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          service_categories (
            name_ru, name_tj, name_en
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: t.pending, variant: 'secondary' },
      in_progress: { label: t.inProgress, variant: 'default' },
      completed: { label: t.completed, variant: 'outline' },
      cancelled: { label: t.cancelled, variant: 'destructive' }
    };
    const s = statusMap[status] || statusMap.pending;
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  const completedCount = orders.filter(o => o.status === 'completed').length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t.title}</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.profile}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{profile?.full_name || t.notSpecified}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.phone || t.notSpecified}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.age ? `${profile.age} лет` : t.notSpecified}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span>{t.completedOrders}: {completedCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {t.orders}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t.noOrders}</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">#{order.order_number}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.service_categories?.[
                                language === 'ru' ? 'name_ru' : 
                                language === 'tj' ? 'name_tj' : 'name_en'
                              ]}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                          {order.total_price && (
                            <span className="font-medium text-primary">
                              {order.total_price} сомони
                            </span>
                          )}
                        </div>
                        {order.status === 'completed' && !order.rating && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            {t.leaveReview}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCabinet;
