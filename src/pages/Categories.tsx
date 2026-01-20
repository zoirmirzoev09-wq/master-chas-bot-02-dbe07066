import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubCategory {
  key: string;
  priceFrom: string;
}

interface CategoryData {
  icon: React.ElementType;
  key: string;
  isEmergency?: boolean;
  subcategories: SubCategory[];
}

const categoriesData: CategoryData[] = [
  { 
    icon: Zap, 
    key: "serviceElectric",
    subcategories: [
      { key: "subElectricSockets", priceFrom: "20" },
      { key: "subElectricLights", priceFrom: "30" },
      { key: "subElectricPanel", priceFrom: "100" },
      { key: "subElectricShort", priceFrom: "60" },
      { key: "subElectricUrgent", priceFrom: "150" },
    ]
  },
  { 
    icon: Wrench, 
    key: "servicePlumbing",
    subcategories: [
      { key: "subPlumbingFaucets", priceFrom: "30" },
      { key: "subPlumbingToilet", priceFrom: "80" },
      { key: "subPlumbingPipes", priceFrom: "10" },
      { key: "subPlumbingHeater", priceFrom: "60" },
      { key: "subPlumbingLeak", priceFrom: "25" },
    ]
  },
  { icon: Sparkles, key: "serviceCleaning", subcategories: [] },
  { icon: Hammer, key: "serviceFurniture", subcategories: [] },
  { icon: PaintBucket, key: "serviceRenovation", subcategories: [] },
  { icon: Video, key: "serviceSecurity", subcategories: [] },
  { icon: Flame, key: "serviceWelding", subcategories: [] },
  { icon: Settings, key: "serviceRepair", subcategories: [] },
  { icon: Wifi, key: "serviceSmartHome", subcategories: [] },
  { icon: Warehouse, key: "serviceBasement", subcategories: [] },
  { icon: KeyRound, key: "serviceTurnkey", subcategories: [] },
  { icon: MoreHorizontal, key: "serviceOther", subcategories: [] },
  { 
    icon: AlertTriangle, 
    key: "serviceEmergency", 
    isEmergency: true,
    subcategories: [
      { key: "subEmergencyElectric", priceFrom: "150" },
      { key: "subEmergencyPlumber", priceFrom: "100" },
      { key: "subEmergencyLeak", priceFrom: "80" },
      { key: "subEmergencyDiag", priceFrom: "50" },
      { key: "subEmergencyNight", priceFrom: "200" },
      { key: "subEmergencyCall", priceFrom: "0" },
    ]
  },
];

const Categories = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

  const filterEmergency = searchParams.get("filter") === "emergency";

  const filteredCategories = categoriesData.filter(cat => {
    if (filterEmergency && !cat.isEmergency) return false;
    return t(cat.key).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const scrollToOrder = () => {
    navigate("/#quick-order");
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("servicesTitle")}
            </h1>
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
          {!selectedCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {filteredCategories.map((category) => {
                const Icon = category.icon;
                const isEmergency = category.isEmergency;
                
                return (
                  <Card
                    key={category.key}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "relative group cursor-pointer p-6 text-center transition-all duration-300",
                      "hover:shadow-xl hover:-translate-y-1 hover:border-primary/50",
                      isEmergency && "border-destructive/50 bg-destructive/5"
                    )}
                  >
                    {isEmergency && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 animate-pulse"
                      >
                        {t("serviceEmergencyBadge")}
                      </Badge>
                    )}
                    
                    <div className={cn(
                      "w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300",
                      "group-hover:scale-110",
                      isEmergency 
                        ? "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground" 
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className={cn(
                      "font-semibold",
                      isEmergency ? "text-destructive" : "group-hover:text-primary"
                    )}>
                      {t(category.key)}
                    </h3>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Category Detail View */
            <div className="max-w-3xl mx-auto">
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => setSelectedCategory(null)}
              >
                ← {t("backToHome")}
              </Button>
              
              <Card className={cn(
                "p-8",
                selectedCategory.isEmergency && "border-destructive/50"
              )}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center",
                    selectedCategory.isEmergency 
                      ? "bg-destructive text-destructive-foreground" 
                      : "bg-primary text-primary-foreground"
                  )}>
                    <selectedCategory.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t(selectedCategory.key)}</h2>
                    {selectedCategory.isEmergency && (
                      <p className="text-destructive font-medium">{t("emergencyNote")}</p>
                    )}
                  </div>
                </div>
                
                {selectedCategory.subcategories.length > 0 ? (
                  <div className="space-y-3 mb-8">
                    {selectedCategory.subcategories.map((sub) => (
                      <div 
                        key={sub.key}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                      >
                        <span className="font-medium">{t(sub.key)}</span>
                        <span className="text-muted-foreground">
                          {t("priceFrom")} {sub.priceFrom} сом.
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground mb-8">{t("servicesSubtitle")}</p>
                )}
                
                <Button 
                  size="lg" 
                  className={cn(
                    "w-full gap-2",
                    selectedCategory.isEmergency && "bg-destructive hover:bg-destructive/90"
                  )}
                  onClick={scrollToOrder}
                >
                  {t("orderMaster")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
