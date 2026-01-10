import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Shield, 
  Wrench,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

interface PendingUser {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  age: number | null;
  created_at: string;
  status: string;
  role: string;
}

interface MasterApplication {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  age: number | null;
  categories: string[];
  experience: string | null;
  status: string;
  created_at: string;
}

export default function AdminPanel() {
  const { user, userRole, isSuperAdmin, loading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [masterApplications, setMasterApplications] = useState<MasterApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const texts = {
    ru: {
      title: "Панель администратора",
      pendingUsers: "Ожидающие подтверждения",
      masterApplications: "Заявки мастеров",
      approve: "Одобрить",
      reject: "Отклонить",
      noPending: "Нет пользователей, ожидающих подтверждения",
      noApplications: "Нет заявок от мастеров",
      approved: "Одобрено",
      rejected: "Отклонено",
      pending: "Ожидает",
      accessDenied: "Доступ запрещён",
      categories: "Категории",
      experience: "Опыт",
      client: "Клиент",
      master: "Мастер"
    },
    tj: {
      title: "Панели администратор",
      pendingUsers: "Интизории тасдиқ",
      masterApplications: "Дархостҳои устодон",
      approve: "Тасдиқ кардан",
      reject: "Рад кардан",
      noPending: "Корбароне, ки мунтазири тасдиқанд, нестанд",
      noApplications: "Дархосте аз устодон нест",
      approved: "Тасдиқ шуд",
      rejected: "Рад шуд",
      pending: "Интизорӣ",
      accessDenied: "Дастрасӣ манъ аст",
      categories: "Категорияҳо",
      experience: "Таҷриба",
      client: "Муштарӣ",
      master: "Устод"
    },
    en: {
      title: "Admin Panel",
      pendingUsers: "Pending Approval",
      masterApplications: "Master Applications",
      approve: "Approve",
      reject: "Reject",
      noPending: "No users pending approval",
      noApplications: "No master applications",
      approved: "Approved",
      rejected: "Rejected",
      pending: "Pending",
      accessDenied: "Access Denied",
      categories: "Categories",
      experience: "Experience",
      client: "Client",
      master: "Master"
    }
  };

  const t = texts[language];

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (userRole !== "admin" && !isSuperAdmin) {
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, userRole, isSuperAdmin, loading, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch pending users with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'pending');

      if (profilesError) throw profilesError;

      // Get user emails from auth (we'll use profiles for now)
      const pendingWithRoles: PendingUser[] = [];
      
      for (const profile of profiles || []) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', profile.id)
          .maybeSingle();

        pendingWithRoles.push({
          id: profile.id,
          full_name: profile.full_name || 'N/A',
          phone: profile.phone || 'N/A',
          email: 'N/A',
          age: profile.age,
          created_at: profile.created_at || '',
          status: profile.status || 'pending',
          role: roleData?.role || 'user'
        });
      }

      setPendingUsers(pendingWithRoles);

      // Fetch master applications
      const { data: applications, error: appsError } = await supabase
        .from('master_applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setMasterApplications(applications || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    setProcessingId(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'approved' })
        .eq('id', userId);

      if (error) throw error;

      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: user?.id,
        action: 'approve_user',
        target_user_id: userId,
        details: { approved_at: new Date().toISOString() }
      });

      toast({
        title: t.approved,
        description: "Пользователь успешно одобрен"
      });

      fetchData();
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить пользователя",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectUser = async (userId: string) => {
    setProcessingId(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'rejected' })
        .eq('id', userId);

      if (error) throw error;

      await supabase.from('admin_actions').insert({
        admin_id: user?.id,
        action: 'reject_user',
        target_user_id: userId,
        details: { rejected_at: new Date().toISOString() }
      });

      toast({
        title: t.rejected,
        description: "Пользователь отклонён"
      });

      fetchData();
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить пользователя",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveMaster = async (application: MasterApplication) => {
    setProcessingId(application.id);
    try {
      // Update application status
      const { error: appError } = await supabase
        .from('master_applications')
        .update({ 
          status: 'approved',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (appError) throw appError;

      // Update user role to master
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role: 'master' })
        .eq('user_id', application.user_id);

      if (roleError) {
        // If no role exists, insert one
        await supabase.from('user_roles').insert({
          user_id: application.user_id,
          role: 'master'
        });
      }

      // Approve user profile
      await supabase
        .from('profiles')
        .update({ status: 'approved' })
        .eq('id', application.user_id);

      // Create master entry
      await supabase.from('masters').insert({
        user_id: application.user_id,
        full_name: application.full_name,
        phone: application.phone,
        categories: application.categories,
        experience: application.experience,
        district: 'Душанбе',
        status: 'active'
      });

      toast({
        title: t.approved,
        description: "Мастер успешно одобрен"
      });

      fetchData();
    } catch (error) {
      console.error('Error approving master:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить мастера",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectMaster = async (applicationId: string, userId: string) => {
    setProcessingId(applicationId);
    try {
      const { error } = await supabase
        .from('master_applications')
        .update({ 
          status: 'rejected',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      await supabase
        .from('profiles')
        .update({ status: 'rejected' })
        .eq('id', userId);

      toast({
        title: t.rejected,
        description: "Заявка мастера отклонена"
      });

      fetchData();
    } catch (error) {
      console.error('Error rejecting master:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить заявку",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (userRole !== "admin" && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton />
        <div className="flex flex-col items-center justify-center py-20">
          <Shield className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground">{t.accessDenied}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton />
      
      <div className="container px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingUsers.length}</p>
                <p className="text-sm text-muted-foreground">{t.pendingUsers}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{masterApplications.length}</p>
                <p className="text-sm text-muted-foreground">{t.masterApplications}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">—</p>
                <p className="text-sm text-muted-foreground">Всего пользователей</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t.pendingUsers}
            </TabsTrigger>
            <TabsTrigger value="masters" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              {t.masterApplications}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {pendingUsers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t.noPending}</p>
                </CardContent>
              </Card>
            ) : (
              pendingUsers.map((pendingUser) => (
                <Card key={pendingUser.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{pendingUser.full_name}</h3>
                          <Badge variant="outline">
                            {pendingUser.role === 'user' ? t.client : t.master}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">📞 {pendingUser.phone}</p>
                        {pendingUser.age && (
                          <p className="text-sm text-muted-foreground">🎂 {pendingUser.age} лет</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(pendingUser.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApproveUser(pendingUser.id)}
                          disabled={processingId === pendingUser.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {processingId === pendingUser.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          {t.approve}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRejectUser(pendingUser.id)}
                          disabled={processingId === pendingUser.id}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {t.reject}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="masters" className="space-y-4">
            {masterApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t.noApplications}</p>
                </CardContent>
              </Card>
            ) : (
              masterApplications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{app.full_name}</h3>
                          <Badge className="bg-amber-100 text-amber-800">
                            {t.pending}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">📞 {app.phone}</p>
                        {app.age && (
                          <p className="text-sm text-muted-foreground">🎂 {app.age} лет</p>
                        )}
                        
                        <div>
                          <p className="text-sm font-medium mb-1">{t.categories}:</p>
                          <div className="flex flex-wrap gap-1">
                            {app.categories.map((cat, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {app.experience && (
                          <div>
                            <p className="text-sm font-medium">{t.experience}:</p>
                            <p className="text-sm text-muted-foreground">{app.experience}</p>
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground">
                          {new Date(app.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApproveMaster(app)}
                          disabled={processingId === app.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {processingId === app.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          {t.approve}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRejectMaster(app.id, app.user_id)}
                          disabled={processingId === app.id}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {t.reject}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
