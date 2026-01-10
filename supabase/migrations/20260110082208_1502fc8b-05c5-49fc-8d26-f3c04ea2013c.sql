-- Add 'master' role to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'master';

-- Add status column to profiles for admin approval
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';

-- Add comment explaining status values: 'pending', 'approved', 'rejected'
COMMENT ON COLUMN public.profiles.status IS 'User status: pending (awaiting admin approval), approved, rejected';

-- Update existing approved users (those who already exist should be approved)
UPDATE public.profiles SET status = 'approved' WHERE status = 'pending';

-- Create admin_users table to track admin actions
CREATE TABLE IF NOT EXISTS public.admin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin_actions
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin actions
CREATE POLICY "Admins can view admin actions"
ON public.admin_actions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert admin actions
CREATE POLICY "Admins can insert admin actions"
ON public.admin_actions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Update profiles RLS to allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update profiles RLS to allow admins to update all profiles
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all user roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));