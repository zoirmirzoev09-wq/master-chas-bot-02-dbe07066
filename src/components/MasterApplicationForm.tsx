import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';

interface MasterApplicationFormProps {
  userId: string;
  onSuccess?: () => void;
}

const MasterApplicationForm = ({ userId, onSuccess }: MasterApplicationFormProps) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+992',
    age: '',
    experience: ''
  });

  const texts = {
    ru: {
      title: 'Заявка на регистрацию мастера',
      fullName: 'Полное имя',
      phone: 'Телефон',
      age: 'Возраст',
      experience: 'Опыт работы',
      experiencePlaceholder: 'Опишите ваш опыт...',
      categories: 'Категории услуг',
      submit: 'Отправить заявку',
      success: 'Спасибо! Мы свяжемся с вами в течение 24 часов для проверки',
      error: 'Ошибка при отправке заявки',
      selectCategory: 'Выберите хотя бы одну категорию'
    },
    tj: {
      title: 'Дархост барои сабти устод',
      fullName: 'Номи пурра',
      phone: 'Телефон',
      age: 'Синну сол',
      experience: 'Таҷрибаи корӣ',
      experiencePlaceholder: 'Таҷрибаи худро тавсиф кунед...',
      categories: 'Категорияҳои хидматрасонӣ',
      submit: 'Фиристодани дархост',
      success: 'Ташаккур! Мо дар давоми 24 соат бо шумо тамос мегирем',
      error: 'Хатогӣ ҳангоми фиристодани дархост',
      selectCategory: 'Ақаллан як категорияро интихоб кунед'
    },
    en: {
      title: 'Master Registration Application',
      fullName: 'Full Name',
      phone: 'Phone',
      age: 'Age',
      experience: 'Work Experience',
      experiencePlaceholder: 'Describe your experience...',
      categories: 'Service Categories',
      submit: 'Submit Application',
      success: 'Thank you! We will contact you within 24 hours for verification',
      error: 'Error submitting application',
      selectCategory: 'Select at least one category'
    }
  };

  const t = texts[language];

  useEffect(() => {
    fetchCategories();
  }, [language]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('service_categories')
      .select('id, key, name_ru, name_tj, name_en')
      .order('sort_order');

    if (data && !error) {
      setCategories(data.map(cat => ({
        id: cat.id,
        name: language === 'ru' ? cat.name_ru : language === 'tj' ? cat.name_tj : cat.name_en
      })));
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCategories.length === 0) {
      toast.error(t.selectCategory);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('master_applications')
        .insert({
          user_id: userId,
          full_name: formData.fullName,
          phone: formData.phone,
          age: parseInt(formData.age),
          experience: formData.experience,
          categories: selectedCategories,
          status: 'pending'
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success(t.success);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <p className="text-lg text-foreground">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground mb-4">{t.title}</h3>
      
      <div className="space-y-2">
        <Label htmlFor="fullName">{t.fullName}</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.phone}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">{t.age}</Label>
        <Input
          id="age"
          type="number"
          min="18"
          max="70"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">{t.experience}</Label>
        <textarea
          id="experience"
          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={t.experiencePlaceholder}
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>{t.categories}</Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-input rounded-md p-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.submit}
          </>
        ) : (
          t.submit
        )}
      </Button>
    </form>
  );
};

export default MasterApplicationForm;
