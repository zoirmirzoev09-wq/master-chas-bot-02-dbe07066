import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Wrench, 
  Sparkles, 
  Hammer, 
  PaintBucket, 
  Video, 
  Settings,
  MoreHorizontal,
  Search,
  Wifi,
  Flame,
  Warehouse,
  KeyRound,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItem {
  icon: React.ElementType;
  key: string;
  isEmergency?: boolean;
}

const categories: CategoryItem[] = [
  { icon: Zap, key: "serviceElectric" },
  { icon: Wrench, key: "servicePlumbing" },
  { icon: Sparkles, key: "serviceCleaning" },
  { icon: Hammer, key: "serviceFurniture" },
  { icon: PaintBucket, key: "serviceRenovation" },
  { icon: Video, key: "serviceSecurity" },
  { icon: Flame, key: "serviceWelding" },
  { icon: Settings, key: "serviceRepair" },
  { icon: Wifi, key: "serviceSmartHome" },
  { icon: Warehouse, key: "serviceBasement" },
  { icon: KeyRound, key: "serviceTurnkey" },
  { icon: MoreHorizontal, key: "serviceOther" },
  { icon: AlertTriangle, key: "serviceEmergency", isEmergency: true },
];

export const CategoriesSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(cat => 
    t(cat.key).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (key: string) => {
    navigate(`/categories/${key.replace("service", "").toLowerCase()}`);
  };

  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("servicesSubtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base rounded-xl border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            const isEmergency = category.isEmergency;
            
            return (
              <Card
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className={cn(
                  "relative group cursor-pointer p-6 text-center transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 hover:border-primary/50",
                  "bg-card/80 backdrop-blur-sm",
                  isEmergency && "border-destructive/50 bg-destructive/5 col-span-2 sm:col-span-1"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10",
                  isEmergency 
                    ? "bg-destructive/20" 
                    : "bg-primary/10"
                )} />
                
                {/* Emergency badge */}
                {isEmergency && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 animate-pulse"
                  >
                    {t("serviceEmergencyBadge")}
                  </Badge>
                )}
                
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300",
                  "group-hover:scale-110 group-hover:shadow-lg",
                  isEmergency 
                    ? "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground" 
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Label */}
                <h3 className={cn(
                  "font-semibold text-sm sm:text-base transition-colors",
                  isEmergency ? "text-destructive" : "group-hover:text-primary"
                )}>
                  {t(category.key)}
                </h3>
                
                {/* Emergency note */}
                {isEmergency && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("emergencyNote")}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
