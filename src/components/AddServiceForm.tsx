import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Array<{ id: string; key: string; name_ru: string }>;
  onServiceAdded: () => void;
}

export const AddServiceForm = ({ open, onOpenChange, categories, onServiceAdded }: AddServiceFormProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    subcategory_icon: "",
    subcategory_ru: "",
    subcategory_en: "",
    subcategory_tj: "",
    service_name_ru: "",
    service_name_en: "",
    service_name_tj: "",
    unit_ru: "",
    unit_en: "",
    unit_tj: "",
    min_price: "",
    avg_price: "",
    max_price: "",
    note_ru: "",
    note_en: "",
    note_tj: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("services").insert([formData]);

      if (error) throw error;

      toast({
        title: language === "ru" ? "Успешно!" : language === "en" ? "Success!" : "Муваффақ!",
        description: language === "ru" ? "Услуга добавлена" : language === "en" ? "Service added" : "Хизмат илова шуд",
      });

      setFormData({
        category_id: "",
        subcategory_icon: "",
        subcategory_ru: "",
        subcategory_en: "",
        subcategory_tj: "",
        service_name_ru: "",
        service_name_en: "",
        service_name_tj: "",
        unit_ru: "",
        unit_en: "",
        unit_tj: "",
        min_price: "",
        avg_price: "",
        max_price: "",
        note_ru: "",
        note_en: "",
        note_tj: "",
      });
      onServiceAdded();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: language === "ru" ? "Ошибка" : language === "en" ? "Error" : "Хато",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            {language === "ru" ? "Добавить услугу" : language === "en" ? "Add Service" : "Илова кардани хизмат"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>{language === "ru" ? "Категория" : language === "en" ? "Category" : "Категория"}</Label>
            <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder={language === "ru" ? "Выберите категорию" : language === "en" ? "Select category" : "Категорияро интихоб кунед"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name_ru}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>{language === "ru" ? "Подкатегория (Русский)" : language === "en" ? "Subcategory (Russian)" : "Зеркатегория (Русӣ)"}</Label>
            <Input
              value={formData.subcategory_ru}
              onChange={(e) => setFormData({ ...formData, subcategory_ru: e.target.value })}
              placeholder="Розетки и выключатели"
            />
          </div>
          <div>
            <Label>{language === "ru" ? "Эмодзи подкатегории" : language === "en" ? "Subcategory Emoji" : "Эмоҷии зеркатегория"}</Label>
            <Input
              value={formData.subcategory_icon}
              onChange={(e) => setFormData({ ...formData, subcategory_icon: e.target.value })}
              placeholder="🔌"
            />
          </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>{language === "ru" ? "Название услуги (Русский)" : language === "en" ? "Service Name (Russian)" : "Номи хизмат (Русӣ)"}</Label>
              <Input
                required
                value={formData.service_name_ru}
                onChange={(e) => setFormData({ ...formData, service_name_ru: e.target.value })}
                placeholder="Замена розетки"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Название (English)" : language === "en" ? "Name (English)" : "Ном (English)"}</Label>
              <Input
                required
                value={formData.service_name_en}
                onChange={(e) => setFormData({ ...formData, service_name_en: e.target.value })}
                placeholder="Socket replacement"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Название (Тоҷикӣ)" : language === "en" ? "Name (Tajik)" : "Ном (Тоҷикӣ)"}</Label>
              <Input
                required
                value={formData.service_name_tj}
                onChange={(e) => setFormData({ ...formData, service_name_tj: e.target.value })}
                placeholder="Иваз кардани розетка"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>{language === "ru" ? "Единица (Русский)" : language === "en" ? "Unit (Russian)" : "Воҳид (Русӣ)"}</Label>
              <Input
                required
                value={formData.unit_ru}
                onChange={(e) => setFormData({ ...formData, unit_ru: e.target.value })}
                placeholder="шт"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Единица (English)" : language === "en" ? "Unit (English)" : "Воҳид (English)"}</Label>
              <Input
                required
                value={formData.unit_en}
                onChange={(e) => setFormData({ ...formData, unit_en: e.target.value })}
                placeholder="pcs"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Единица (Тоҷикӣ)" : language === "en" ? "Unit (Tajik)" : "Воҳид (Тоҷикӣ)"}</Label>
              <Input
                required
                value={formData.unit_tj}
                onChange={(e) => setFormData({ ...formData, unit_tj: e.target.value })}
                placeholder="дона"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>{language === "ru" ? "Мин. цена" : language === "en" ? "Min Price" : "Нархи мин"}</Label>
              <Input
                required
                value={formData.min_price}
                onChange={(e) => setFormData({ ...formData, min_price: e.target.value })}
                placeholder="20"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Средняя цена" : language === "en" ? "Avg Price" : "Нархи миёна"}</Label>
              <Input
                required
                value={formData.avg_price}
                onChange={(e) => setFormData({ ...formData, avg_price: e.target.value })}
                placeholder="40"
              />
            </div>
            <div>
              <Label>{language === "ru" ? "Макс. цена" : language === "en" ? "Max Price" : "Нархи макс"}</Label>
              <Input
                required
                value={formData.max_price}
                onChange={(e) => setFormData({ ...formData, max_price: e.target.value })}
                placeholder="80"
              />
            </div>
          </div>

          <div>
            <Label>{language === "ru" ? "Примечание (необязательно)" : language === "en" ? "Note (optional)" : "Қайд (ихтиёрӣ)"}</Label>
            <Textarea
              value={formData.note_ru}
              onChange={(e) => setFormData({ ...formData, note_ru: e.target.value })}
              placeholder={language === "ru" ? "Дополнительная информация" : language === "en" ? "Additional info" : "Маълумоти иловагӣ"}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? (language === "ru" ? "Добавление..." : language === "en" ? "Adding..." : "Илова шуда истодааст...")
              : (language === "ru" ? "Добавить услугу" : language === "en" ? "Add Service" : "Илова кардан")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};