-- Create table for service categories
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_tj TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE NOT NULL,
  subcategory_icon TEXT,
  subcategory_ru TEXT,
  subcategory_en TEXT,
  subcategory_tj TEXT,
  service_name_ru TEXT NOT NULL,
  service_name_en TEXT NOT NULL,
  service_name_tj TEXT NOT NULL,
  unit_ru TEXT NOT NULL,
  unit_en TEXT NOT NULL,
  unit_tj TEXT NOT NULL,
  min_price TEXT NOT NULL,
  avg_price TEXT NOT NULL,
  max_price TEXT NOT NULL,
  note_ru TEXT,
  note_en TEXT,
  note_tj TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view service categories"
  ON public.service_categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view services"
  ON public.services FOR SELECT
  USING (true);

-- Insert service categories
INSERT INTO public.service_categories (key, icon, name_ru, name_en, name_tj, sort_order) VALUES
('serviceElectric', 'Zap', 'Электрика', 'Electrical', 'Барқ', 1),
('servicePlumbing', 'Wrench', 'Сантехника', 'Plumbing', 'Сантехника', 2),
('serviceCleaning', 'Sparkles', 'Клининговые услуги', 'Cleaning Services', 'Хизматҳои тозакорӣ', 3),
('serviceFurniture', 'Hammer', 'Сборка мебели', 'Furniture Assembly', 'Ҷамъоварии мебел', 4),
('serviceRenovation', 'PaintBucket', 'Отделка и ремонт', 'Renovation', 'Таъмир ва санҷиш', 5),
('serviceSecurity', 'Video', 'Видеонаблюдение', 'Video Surveillance', 'Назорати видеоӣ', 6),
('serviceRepair', 'Settings', 'Мелкий ремонт', 'Small Repairs', 'Таъмироти хурд', 7),
('serviceSmartHome', 'Brain', 'Умный дом', 'Smart Home', 'Хонаи ҳушманд', 8),
('serviceGarden', 'TreePine', 'Сад и участок', 'Garden', 'Боғ ва майдон', 9),
('serviceWelding', 'Flame', 'Сварка', 'Welding', 'Ҷӯшкорӣ', 10),
('serviceBasement', 'Home', 'Подвалы и гаражи', 'Basements & Garages', 'Зерзамин ва гараж', 11),
('serviceTurnkey', 'Building', 'Ремонт под ключ', 'Turnkey Renovation', 'Таъмири пурра', 12),
('serviceOther', 'MoreHorizontal', 'Другое', 'Other', 'Дигар', 13);

-- Insert Электрика services
INSERT INTO public.services (category_id, subcategory_icon, subcategory_ru, subcategory_en, subcategory_tj, service_name_ru, service_name_en, service_name_tj, unit_ru, unit_en, unit_tj, min_price, avg_price, max_price, note_ru, note_en, note_tj) 
SELECT id, '🔌', 'Розетки и выключатели', 'Sockets and Switches', 'Розетка ва калидҳо', 'Замена розетки (внутр. / наруж.)', 'Socket replacement (internal/external)', 'Иваз кардани розетка', 'шт', 'pcs', 'дона', '20', '40', '80', 'Бетон/ГКЛ/кирпич', 'Concrete/drywall/brick', 'Бетон/ГКЛ/хишт'
FROM public.service_categories WHERE key = 'serviceElectric';

INSERT INTO public.services (category_id, subcategory_icon, subcategory_ru, subcategory_en, subcategory_tj, service_name_ru, service_name_en, service_name_tj, unit_ru, unit_en, unit_tj, min_price, avg_price, max_price, note_ru, note_en, note_tj) 
SELECT id, '🔌', 'Розетки и выключатели', 'Sockets and Switches', 'Розетка ва калидҳо', 'Замена розетки с демонтажем', 'Socket replacement with removal', 'Иваз бо демонтаж', 'шт', 'pcs', 'дона', '40', '70', '120', 'Старые советские', 'Old Soviet', 'Советии кӯҳна'
FROM public.service_categories WHERE key = 'serviceElectric';

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_categories;