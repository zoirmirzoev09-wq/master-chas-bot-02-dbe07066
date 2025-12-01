-- Fix search_path for security
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;