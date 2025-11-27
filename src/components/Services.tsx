import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  Zap, 
  Wrench, 
  Sparkles, 
  Hammer, 
  PaintBucket, 
  Video, 
  Settings,
  MoreHorizontal,
  Search
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Zap, key: "serviceElectric" },
  { icon: Wrench, key: "servicePlumbing" },
  { icon: Sparkles, key: "serviceCleaning" },
  { icon: Hammer, key: "serviceFurniture" },
  { icon: PaintBucket, key: "serviceRenovation" },
  { icon: Video, key: "serviceSecurity" },
  { icon: Settings, key: "serviceRepair" },
  { icon: MoreHorizontal, key: "serviceOther" },
];

export const Services = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch = t(service.key).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || service.key === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("servicesTitle")}</h2>
          <p className="text-lg text-muted-foreground">{t("servicesSubtitle")}</p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(null)}
            >
              {t("filterAll")}
            </Button>
            {services.map((service) => (
              <Button
                key={service.key}
                variant={selectedFilter === service.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(service.key === selectedFilter ? null : service.key)}
              >
                {t(service.key)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {filteredServices.map(({ icon: Icon, key }, index) => (
            <Card 
              key={key}
              className="shadow-card hover:shadow-lg-orange transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground">{t(key)}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
