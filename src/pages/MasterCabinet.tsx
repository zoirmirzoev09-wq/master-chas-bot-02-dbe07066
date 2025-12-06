import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Phone, Briefcase, Package, Star, DollarSign, AlertCircle } from 'lucide-react';
import MasterApplicationForm from '@/components/MasterApplicationForm';
import Header from '@/components/Header';

const MasterCabinet = () => {
  const { language } = useLanguage();
  const { user, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [master, setMaster] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const texts = {
    ru: {
      title: 'Кабинет мастера',
      notMaster: 'Вы ещё не зарегистрированы как мастер',
      pendingApplication: 'Ваша заявка на рассмотрении',
      pendingText: 'Мы свяжемся с вами в течение 24 часов',
      rejectedApplication: 'Ваша заявка отклонена',
      profile: 'Профиль',
      name: 'Имя',
      phone: 'Телефон',
      experience: 'Опыт',
      categories: 'Категории',
      stats: 'Статистика',
      completedOrders: 'Выполнено заказов',
      earnings: 'Заработок',
      rating: 'Рейтинг',
      orders: 'Мои заказы',
      noOrders: 'У вас пока нет заказов',
      pending: 'В ожидании',
      inProgress: 'В работе',
      completed: 'Выполнен',
      notSpecified: 'Не указано',
      blocked: 'Ваш аккаунт заблокирован',
      blockedText: 'Свяжитесь с администратором для разблокировки'
    },
    tj: {
      title: 'Кабинети устод',
      notMaster: 'Шумо ҳанӯз ҳамчун устод сабт нашудаед',
      pendingApplication: 'Дархости шумо дар баррасӣ аст',
      pendingText: 'Мо дар давоми 24 соат бо шумо тамос мегирем',
      rejectedApplication: 'Дархости шумо рад шуд',
      profile: 'Профил',
      name: 'Ном',
      phone: 'Телефон',
      experience: 'Таҷриба',
      categories: 'Категорияҳо',
      stats: 'Омор',
      completedOrders: 'Фармоишҳои иҷрошуда',
      earnings: 'Даромад',
      rating: 'Рейтинг',
      orders: 'Фармоишҳои ман',
      noOrders: 'Шумо ҳоло фармоише надоред',
      pending: 'Дар интизорӣ',
      inProgress: 'Дар кор',
      completed: 'Иҷро шуд',
      notSpecified: 'Муайян нашудааст',
      blocked: 'Аккаунти шумо баста аст',
      blockedText: 'Барои кушодан бо администратор тамос гиред'
    },
    en: {
      title: 'Master Cabinet',
      notMaster: 'You are not registered as a master yet',
      pendingApplication: 'Your application is under review',
      pendingText: 'We will contact you within 24 hours',
      rejectedApplication: 'Your application was rejected',
      profile: 'Profile',
      name: 'Name',
      phone: 'Phone',
      experience: 'Experience',
      categories: 'Categories',
      stats: 'Statistics',
      completedOrders: 'Completed orders',
      earnings: 'Earnings',
      rating: 'Rating',
      orders: 'My Orders',
      noOrders: 'You have no orders yet',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      notSpecified: 'Not specified',
      blocked: 'Your account is blocked',
      blockedText: 'Contact administrator to unblock'
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
      // Check if user is an approved master
      const { data: masterData } = await supabase
        .from('masters')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (masterData) {
        setMaster(masterData);
        
        // Fetch assigned orders
        const { data: ordersData } = await supabase
          .from('orders')
          .select(`
            *,
            service_categories (name_ru, name_tj, name_en)
          `)
          .eq('assigned_master_id', masterData.id)
          .order('created_at', { ascending: false });

        setOrders(ordersData || []);
      } else {
        // Check for pending application
        const { data: appData } = await supabase
          .from('master_applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        setApplication(appData);
      }
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
      completed: { label: t.completed, variant: 'outline' }
    };
    const s = statusMap[status] || statusMap.pending;
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalEarnings = completedOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);
  const avgRating = completedOrders.length > 0
    ? completedOrders.reduce((sum, o) => sum + (o.rating || 0), 0) / completedOrders.filter(o => o.rating).length
    : 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Master is blocked
  if (master?.status === 'blocked') {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton />
        <div className="flex items-center justify-center p-8">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">{t.blocked}</h2>
              <p className="text-muted-foreground mb-4">{t.blockedText}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Not a master - show application form or status
  if (!master) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">{t.title}</h1>

          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6">
              {application?.status === 'pending' ? (
                <div className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                  <h2 className="text-xl font-bold text-foreground mb-2">{t.pendingApplication}</h2>
                  <p className="text-muted-foreground">{t.pendingText}</p>
                </div>
              ) : application?.status === 'rejected' ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-foreground mb-2">{t.rejectedApplication}</h2>
                  <MasterApplicationForm userId={user!.id} onSuccess={fetchData} />
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-6 text-center">{t.notMaster}</p>
                  <MasterApplicationForm userId={user!.id} onSuccess={fetchData} />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Approved master - show full cabinet
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
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{master.full_name}</p>
                  <Badge variant="outline" className="mt-1">
                    {master.status === 'active' ? 'Активен' : master.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{master.phone}</span>
                </div>
                {master.experience && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t.experience}:</span>
                    <p className="mt-1">{master.experience}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t.stats}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{completedOrders.length}</p>
                  <p className="text-xs text-muted-foreground">{t.completedOrders}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">{totalEarnings}</p>
                  <p className="text-xs text-muted-foreground">{t.earnings}</p>
                </div>
                <div className="col-span-2 text-center p-4 bg-muted rounded-lg">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl font-bold">{avgRating ? avgRating.toFixed(1) : '—'}</p>
                  <p className="text-xs text-muted-foreground">{t.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card className="md:col-span-3">
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
                          <p className="text-sm text-muted-foreground mt-1">
                            📍 {order.address}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                        {order.total_price && (
                          <span className="font-medium text-green-600">
                            +{order.total_price} сомони
                          </span>
                        )}
                      </div>
                      {order.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < order.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
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
  );
};

export default MasterCabinet;
