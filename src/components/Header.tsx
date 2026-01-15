import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Languages, Moon, Sun, LogIn, User, LogOut, ArrowLeft, Shield, Wrench, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
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

const languageOptions: { code: Language; flag: string; name: string }[] = [
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "tj", flag: "🇹🇯", name: "Тоҷикӣ" },
  { code: "en", flag: "🇬🇧", name: "English" },
];

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, userRole, isSuperAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const isAdmin = userRole === "admin" || isSuperAdmin;
  const isMaster = userRole === "master";

  const currentLang = languageOptions.find(l => l.code === language);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getThemeIcon = () => {
    if (theme === "dark") return <Moon className="h-4 w-4" />;
    if (theme === "light") return <Sun className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('back')}
            </Button>
          )}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              М
            </div>
            <span className="font-bold text-lg text-foreground">Мастер Час</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 min-w-[100px]">
                <Languages className="w-4 h-4" />
                <span>{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border border-border">
              {languageOptions.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer ${language === lang.code ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {getThemeIcon()}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border border-border">
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                <Sun className="h-4 w-4 mr-2" />
                {t('lightMode')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                <Moon className="h-4 w-4 mr-2" />
                {t('darkMode')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                <Monitor className="h-4 w-4 mr-2" />
                {t('systemMode')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border">
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                      <Shield className="w-4 h-4 mr-2" />
                      {t('admin')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isMaster && (
                  <DropdownMenuItem onClick={() => navigate("/cabinet/master")} className="cursor-pointer">
                    <Wrench className="w-4 h-4 mr-2" />
                    {t('masterCabinet')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/cabinet/client")} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  {t('clientCabinet')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
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
              {t('loginBtn')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
