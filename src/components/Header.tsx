import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Languages, Moon, Sun, LogIn, User, LogOut, ArrowLeft, Shield, Wrench } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  showBackButton?: boolean;
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, userRole, isSuperAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = userRole === "admin" || isSuperAdmin;
  const isMaster = userRole === "master";

  const getLanguageLabel = () => {
    switch (language) {
      case "ru": return "🇷🇺 RU";
      case "tj": return "🇹🇯 TJ";
      case "en": return "🇬🇧 EN";
      default: return "🇷🇺 RU";
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const texts = {
    ru: { 
      back: 'На главную', 
      profile: 'Личный кабинет', 
      logout: 'Выйти', 
      login: 'Вход',
      admin: 'Админ-панель',
      masterCabinet: 'Кабинет мастера'
    },
    tj: { 
      back: 'Ба саҳифаи асосӣ', 
      profile: 'Кабинети шахсӣ', 
      logout: 'Баромад', 
      login: 'Вуруд',
      admin: 'Панели администратор',
      masterCabinet: 'Кабинети устод'
    },
    en: { 
      back: 'Back to Home', 
      profile: 'My Account', 
      logout: 'Logout', 
      login: 'Login',
      admin: 'Admin Panel',
      masterCabinet: 'Master Cabinet'
    }
  };

  const t = texts[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>
          )}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              М
            </div>
            <span className="font-bold text-lg">Мастер Час</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Languages className="w-4 h-4" />
                {getLanguageLabel()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("ru")}>
                🇷🇺 Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("tj")}>
                🇹🇯 Тоҷикӣ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme switcher */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Shield className="w-4 h-4 mr-2" />
                      {t.admin}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isMaster && (
                  <DropdownMenuItem onClick={() => navigate("/cabinet/master")}>
                    <Wrench className="w-4 h-4 mr-2" />
                    {t.masterCabinet}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/cabinet/client")}>
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-4 h-4" />
              {t.login}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
