import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Wrench, Loader2 } from "lucide-react";
import { z } from "zod";
import Header from "@/components/Header";

const phoneSchema = z.string().regex(/^\+992\d{9}$/, "Формат: +992XXXXXXXXX");
const emailSchema = z.string().email("Введите корректный email");
const passwordSchema = z.string().min(6, "Минимум 6 символов");

const serviceCategories = [
  { id: "electric", labelKey: "serviceElectric" },
  { id: "plumbing", labelKey: "servicePlumbing" },
  { id: "cleaning", labelKey: "serviceCleaning" },
  { id: "furniture", labelKey: "serviceFurniture" },
  { id: "renovation", labelKey: "serviceRenovation" },
  { id: "security", labelKey: "serviceSecurity" },
  { id: "welding", labelKey: "serviceWelding" },
  { id: "smartHome", labelKey: "serviceSmartHome" },
  { id: "basement", labelKey: "serviceBasement" },
  { id: "turnkey", labelKey: "serviceTurnkey" },
];

export default function Auth() {
  const { t } = useLanguage();
  const { user, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"client" | "master">("client");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+992");
  const [age, setAge] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      
      if (authMode === "register") {
        if (!fullName.trim()) {
          throw new Error(t('enterName'));
        }
        phoneSchema.parse(phone);
        
        if (userType === "master" && selectedCategories.length === 0) {
          throw new Error(t('selectCategory'));
        }
      }
      return true;
    } catch (error: any) {
      toast({
        title: t('validationError'),
        description: error.message || t('checkData'),
        variant: "destructive"
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (authMode === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        // Check user status
        const { data: { user: loggedUser } } = await supabase.auth.getUser();
        if (loggedUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('status')
            .eq('id', loggedUser.id)
            .maybeSingle();
          
          if (profile?.status === 'pending') {
            toast({
              title: t('pendingApproval'),
              description: t('pendingApprovalText'),
              variant: "destructive"
            });
            await supabase.auth.signOut();
            return;
          }
          
          if (profile?.status === 'rejected') {
            toast({
              title: t('accessDenied'),
              description: t('accessDeniedText'),
              variant: "destructive"
            });
            await supabase.auth.signOut();
            return;
          }
        }
        
        toast({
          title: t('welcome'),
          description: t('loginSuccess')
        });
        navigate("/");
      } else {
        // Register
        const metadata = {
          full_name: fullName,
          phone,
          age: age ? parseInt(age) : null
        };
        
        const { error } = await signUp(email, password, metadata);
        if (error) throw error;
        
        // If master, create application
        if (userType === "master") {
          const { data: { user: newUser } } = await supabase.auth.getUser();
          
          if (newUser) {
            const { error: appError } = await supabase
              .from('master_applications')
              .insert({
                user_id: newUser.id,
                full_name: fullName,
                phone,
                age: age ? parseInt(age) : null,
                categories: selectedCategories,
                experience,
                status: 'pending'
              });
            
            if (appError) {
              console.error("Error creating master application:", appError);
            }
          }
          
          toast({
            title: t('masterSuccess'),
            description: t('masterSuccessText')
          });
        } else {
          toast({
            title: t('registerSuccess'),
            description: t('registrationPending')
          });
        }
        
        // Don't navigate - user needs to wait for approval
        setAuthMode("login");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      let message = t('error');
      if (error.message?.includes("already registered")) {
        message = t('emailExists');
      } else if (error.message?.includes("Invalid login")) {
        message = t('invalidCredentials');
      }
      
      toast({
        title: t('error'),
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton />
      
      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-2 border-border bg-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-primary">
                Мастер Час
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {authMode === "login" ? t('loginToAccount') : t('createAccount')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">{t('login')}</TabsTrigger>
                  <TabsTrigger value="register">{t('register')}</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === "register" && (
                    <div className="flex gap-2 mb-4">
                      <Button
                        type="button"
                        variant={userType === "client" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setUserType("client")}
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t('client')}
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "master" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setUserType("master")}
                      >
                        <Wrench className="w-4 h-4 mr-2" />
                        {t('master')}
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                  
                  {authMode === "register" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-foreground">{t('fullName')}</Label>
                        <Input
                          id="fullName"
                          placeholder="Иван Иванов"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="bg-background text-foreground border-input"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">{t('phone')}</Label>
                        <Input
                          id="phone"
                          placeholder="+992XXXXXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="bg-background text-foreground border-input"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-foreground">{t('age')}</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="25"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          min="18"
                          max="80"
                          className="bg-background text-foreground border-input"
                        />
                      </div>
                      
                      {userType === "master" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-foreground">{t('categories')}</Label>
                            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-border rounded-lg bg-background">
                              {serviceCategories.map((cat) => (
                                <div key={cat.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={cat.id}
                                    checked={selectedCategories.includes(cat.id)}
                                    onCheckedChange={() => toggleCategory(cat.id)}
                                  />
                                  <label
                                    htmlFor={cat.id}
                                    className="text-sm cursor-pointer text-foreground"
                                  >
                                    {t(cat.labelKey)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="experience" className="text-foreground">{t('experience')}</Label>
                            <Input
                              id="experience"
                              placeholder="5 лет работы электриком"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              className="bg-background text-foreground border-input"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('loading')}
                      </>
                    ) : authMode === "login" ? (
                      t('submit')
                    ) : userType === "master" ? (
                      t('submitMaster')
                    ) : (
                      t('submitRegister')
                    )}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
