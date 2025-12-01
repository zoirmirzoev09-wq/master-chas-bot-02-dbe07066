-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.service_categories(id) NOT NULL,
  object_type TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  photos TEXT[],
  comment TEXT,
  budget TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  assigned_master_id UUID,
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders RLS policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
  ON public.orders FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Create masters table
CREATE TABLE public.masters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  categories TEXT[] NOT NULL,
  experience TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  documents TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.masters ENABLE ROW LEVEL SECURITY;

-- Masters RLS policies
CREATE POLICY "Anyone can view active masters"
  ON public.masters FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can manage masters"
  ON public.masters FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Add foreign key for assigned master
ALTER TABLE public.orders
  ADD CONSTRAINT fk_assigned_master
  FOREIGN KEY (assigned_master_id)
  REFERENCES public.masters(id)
  ON DELETE SET NULL;

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  year TEXT;
  seq_num TEXT;
  new_number TEXT;
BEGIN
  year := TO_CHAR(NOW(), 'YYYY');
  
  SELECT LPAD((COUNT(*) + 1)::TEXT, 6, '0')
  INTO seq_num
  FROM public.orders
  WHERE order_number LIKE 'MC-' || year || '-%';
  
  new_number := 'MC-' || year || '-' || seq_num;
  
  RETURN new_number;
END;
$$;

-- Trigger to auto-generate order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_insert_order
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();