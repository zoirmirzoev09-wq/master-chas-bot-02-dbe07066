import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const QuickOrder = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    district: "",
    comment: "",
  });

  const services = [
    "serviceElectric",
    "servicePlumbing",
    "serviceCleaning",
    "serviceFurniture",
    "serviceRenovation",
    "serviceSecurity",
    "serviceRepair",
    "serviceOther",
  ];

  const districts = [
    "districtSino",
    "districtFirdausi",
    "districtShomansur",
    "districtIsmoili",
    "districtSuburb",
    "districtOther",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.district) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Here you would typically send data to a backend
    console.log("Order submitted:", formData);
    toast.success(t("formSuccess"));
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      service: "",
      district: "",
      comment: "",
    });
  };

  return (
    <section id="quick-order" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg-orange">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold">
                {t("quickOrderTitle")}
              </CardTitle>
              <CardDescription className="text-lg">
                {t("quickOrderSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    placeholder={t("formName")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder={t("formPhone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("formService")} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {t(service)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData({ ...formData, district: value })}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("formDistrict")} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {t(district)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder={t("formComment")}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg h-14 shadow-lg-orange hover:scale-105 transition-transform"
                >
                  {t("formSubmit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
