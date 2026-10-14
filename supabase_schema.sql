
-- ============================================================
-- Brainy Kings & Queens CMS
-- Corrected Supabase Schema + RLS + Admin Authorization
-- ============================================================
-- Uses Supabase Auth.
-- Admins must be explicitly added to public.admins.
-- Public visitors can read only the intended public content.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. SITE SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT DEFAULT '0591664392',
  email TEXT DEFAULT 'brainykingsandqueens1@gmail.com',
  address TEXT DEFAULT 'Anwomaso - Ankaa Junction, Kumasi, Ashanti Region, Ghana',
  hours TEXT DEFAULT 'Mon – Fri: 7:00 AM – 4:00 PM',
  copyright_year INT DEFAULT 2026,
  privacy_policy_link TEXT DEFAULT '#',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 1A. PAGE SECTIONS
-- Editable copy and imagery for fixed public-page sections.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  eyebrow TEXT,
  heading TEXT,
  body TEXT,
  secondary_body TEXT,
  image_url TEXT,
  cta_label TEXT,
  cta_href TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_key, section_key)
);

-- ============================================================
-- 2. HERO SLIDES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  link TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. SCHOOL VALUES
-- "values" is quoted because it conflicts with SQL syntax.
-- ============================================================

CREATE TABLE IF NOT EXISTS public."values" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. CURRICULUM PRINCIPLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.principles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. ACADEMIC PROGRAMS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  level TEXT NOT NULL,
  age_range TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL,
  image_url TEXT NOT NULL,
  border_color TEXT DEFAULT 'border-primary',
  accent_text_color TEXT DEFAULT 'text-primary',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. TESTIMONIALS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 7. GALLERY ITEMS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL DEFAULT 'home',
  row_index INT NOT NULL DEFAULT 0,
  column_index INT NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_items
  ADD COLUMN IF NOT EXISTS page_key TEXT NOT NULL DEFAULT 'home';

-- ============================================================
-- 8. ADMISSIONS STEPS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admissions_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. TEAM MEMBERS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  alt_text TEXT,
  social_media JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 10. BLOG POSTS / NEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 11. MEDIA LIBRARY
-- ============================================================

CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 11A. ADMISSIONS INQUIRIES
-- Public visitors may submit; only admins may read or manage.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admissions_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT NOT NULL,
  preferred_start_date DATE,
  referral_source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 12. ADMINS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_super_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- EXISTING TABLE COMPATIBILITY
-- Add columns missing from older versions of this CMS.
-- ============================================================

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '0591664392',
  ADD COLUMN IF NOT EXISTS email TEXT DEFAULT 'brainykingsandqueens1@gmail.com',
  ADD COLUMN IF NOT EXISTS address TEXT DEFAULT 'Anwomaso - Ankaa Junction, Kumasi, Ashanti Region, Ghana',
  ADD COLUMN IF NOT EXISTS hours TEXT DEFAULT 'Mon – Fri: 7:00 AM – 4:00 PM',
  ADD COLUMN IF NOT EXISTS copyright_year INT DEFAULT 2026,
  ADD COLUMN IF NOT EXISTS privacy_policy_link TEXT DEFAULT '#',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.hero_slides
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS subtitle TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS alt_text TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS link TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public."values"
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS body TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.principles
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS body TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.programs
  ADD COLUMN IF NOT EXISTS number TEXT,
  ADD COLUMN IF NOT EXISTS level TEXT,
  ADD COLUMN IF NOT EXISTS age_range TEXT,
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT 'border-primary',
  ADD COLUMN IF NOT EXISTS accent_text_color TEXT DEFAULT 'text-primary',
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS quote TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.gallery_items
  ADD COLUMN IF NOT EXISTS row_index INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS column_index INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS alt_text TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS caption TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.admissions_steps
  ADD COLUMN IF NOT EXISTS number TEXT,
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS body TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS alt_text TEXT,
  ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS content TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.media_library
  ADD COLUMN IF NOT EXISTS file_path TEXT,
  ADD COLUMN IF NOT EXISTS original_name TEXT,
  ADD COLUMN IF NOT EXISTS mime_type TEXT,
  ADD COLUMN IF NOT EXISTS size_bytes BIGINT,
  ADD COLUMN IF NOT EXISTS uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.admins
  ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ============================================================
-- ADMIN CHECK FUNCTION
-- SECURITY DEFINER avoids recursive admins-table RLS checks.
-- This function only returns whether the current Auth user is
-- registered as an admin. It does not grant admin membership.
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_cms_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
SET row_security = off
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE id = (SELECT auth.uid())
  );
$$;

REVOKE ALL ON FUNCTION public.is_cms_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_cms_admin() TO authenticated;

-- Check super-admin status safely without recursive RLS evaluation.
CREATE OR REPLACE FUNCTION public.is_cms_super_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
SET row_security = off
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE id = (SELECT auth.uid())
      AND is_super_admin = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_cms_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_cms_super_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_page_sections_updated_at ON public.page_sections;
CREATE TRIGGER set_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_programs_updated_at ON public.programs;
CREATE TRIGGER set_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_admins_updated_at ON public.admins;
CREATE TRIGGER set_admins_updated_at
BEFORE UPDATE ON public.admins
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ENABLE RLS
-- ============================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."values" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- REMOVE OLD POLICIES SO THIS SCRIPT CAN BE RUN AGAIN
-- ============================================================

DROP POLICY IF EXISTS "Site settings are publicly readable" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Published page sections are publicly readable" ON public.page_sections;
DROP POLICY IF EXISTS "Published page sections are readable by authenticated users" ON public.page_sections;
DROP POLICY IF EXISTS "Admins can manage page sections" ON public.page_sections;

DROP POLICY IF EXISTS "Hero slides are publicly readable (active)" ON public.hero_slides;
DROP POLICY IF EXISTS "Active hero slides are readable by authenticated users" ON public.hero_slides;
DROP POLICY IF EXISTS "Admins can manage hero slides" ON public.hero_slides;

DROP POLICY IF EXISTS "Values are publicly readable" ON public."values";
DROP POLICY IF EXISTS "Admins can manage values" ON public."values";

DROP POLICY IF EXISTS "Principles are publicly readable" ON public.principles;
DROP POLICY IF EXISTS "Admins can manage principles" ON public.principles;

DROP POLICY IF EXISTS "Programs are publicly readable (published)" ON public.programs;
DROP POLICY IF EXISTS "Published programs are readable by authenticated users" ON public.programs;
DROP POLICY IF EXISTS "Admins can manage programs" ON public.programs;

DROP POLICY IF EXISTS "Testimonials are publicly readable (published)" ON public.testimonials;
DROP POLICY IF EXISTS "Published testimonials are readable by authenticated users" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

DROP POLICY IF EXISTS "Gallery items are publicly readable (published)" ON public.gallery_items;
DROP POLICY IF EXISTS "Published gallery items are readable by authenticated users" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can manage gallery items" ON public.gallery_items;

DROP POLICY IF EXISTS "Admissions steps are publicly readable (published)" ON public.admissions_steps;
DROP POLICY IF EXISTS "Published admissions steps are readable by authenticated users" ON public.admissions_steps;
DROP POLICY IF EXISTS "Admins can manage admissions steps" ON public.admissions_steps;

DROP POLICY IF EXISTS "Team members are publicly readable (published)" ON public.team_members;
DROP POLICY IF EXISTS "Published team members are readable by authenticated users" ON public.team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;

DROP POLICY IF EXISTS "Blog posts are publicly readable (published)" ON public.blog_posts;
DROP POLICY IF EXISTS "Published blog posts are readable by authenticated users" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Media library is admin-only" ON public.media_library;
DROP POLICY IF EXISTS "Public can submit admissions inquiries" ON public.admissions_inquiries;
DROP POLICY IF EXISTS "Admins can manage admissions inquiries" ON public.admissions_inquiries;
DROP POLICY IF EXISTS "Admins can read own row" ON public.admins;
DROP POLICY IF EXISTS "Admins can manage admin records" ON public.admins;
DROP POLICY IF EXISTS "Super admins can insert admin records" ON public.admins;
DROP POLICY IF EXISTS "Super admins can update admin records" ON public.admins;
DROP POLICY IF EXISTS "Super admins can delete admin records" ON public.admins;

-- ============================================================
-- SITE SETTINGS POLICIES
-- ============================================================

CREATE POLICY "Site settings are publicly readable"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

CREATE POLICY "Published page sections are publicly readable"
ON public.page_sections
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published page sections are readable by authenticated users"
ON public.page_sections
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage page sections"
ON public.page_sections
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- HERO SLIDES POLICIES
-- ============================================================

CREATE POLICY "Hero slides are publicly readable (active)"
ON public.hero_slides
FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Active hero slides are readable by authenticated users"
ON public.hero_slides
FOR SELECT
TO authenticated
USING (is_active = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage hero slides"
ON public.hero_slides
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- SCHOOL VALUES POLICIES
-- ============================================================

CREATE POLICY "Values are publicly readable"
ON public."values"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage values"
ON public."values"
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- PRINCIPLES POLICIES
-- ============================================================

CREATE POLICY "Principles are publicly readable"
ON public.principles
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage principles"
ON public.principles
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- PROGRAMS POLICIES
-- ============================================================

CREATE POLICY "Programs are publicly readable (published)"
ON public.programs
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published programs are readable by authenticated users"
ON public.programs
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage programs"
ON public.programs
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- TESTIMONIALS POLICIES
-- ============================================================

CREATE POLICY "Testimonials are publicly readable (published)"
ON public.testimonials
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published testimonials are readable by authenticated users"
ON public.testimonials
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- GALLERY POLICIES
-- ============================================================

CREATE POLICY "Gallery items are publicly readable (published)"
ON public.gallery_items
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published gallery items are readable by authenticated users"
ON public.gallery_items
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage gallery items"
ON public.gallery_items
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- ADMISSIONS POLICIES
-- ============================================================

CREATE POLICY "Admissions steps are publicly readable (published)"
ON public.admissions_steps
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published admissions steps are readable by authenticated users"
ON public.admissions_steps
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage admissions steps"
ON public.admissions_steps
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- TEAM MEMBER POLICIES
-- ============================================================

CREATE POLICY "Team members are publicly readable (published)"
ON public.team_members
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published team members are readable by authenticated users"
ON public.team_members
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- BLOG POLICIES
-- ============================================================

CREATE POLICY "Blog posts are publicly readable (published)"
ON public.blog_posts
FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Published blog posts are readable by authenticated users"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (is_published = true OR (SELECT public.is_cms_admin()));

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- MEDIA LIBRARY POLICIES
-- Only admins can access media metadata.
-- Storage file policies must be configured separately.
-- ============================================================

CREATE POLICY "Media library is admin-only"
ON public.media_library
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

CREATE POLICY "Public can submit admissions inquiries"
ON public.admissions_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can manage admissions inquiries"
ON public.admissions_inquiries
FOR ALL
TO authenticated
USING ((SELECT public.is_cms_admin()))
WITH CHECK ((SELECT public.is_cms_admin()));

-- ============================================================
-- ADMINS POLICIES
-- Admins can read their own membership row.
-- No client-side policy permits granting admin membership.
-- ============================================================

CREATE POLICY "Admins can read own row"
ON public.admins
FOR SELECT
TO authenticated
USING (id = (SELECT auth.uid()));

-- PostgreSQL policies support one command per policy.
-- Use the SECURITY DEFINER helper to avoid recursive RLS on public.admins.
CREATE POLICY "Super admins can insert admin records"
ON public.admins
FOR INSERT
TO authenticated
WITH CHECK ((SELECT public.is_cms_super_admin()));

CREATE POLICY "Super admins can update admin records"
ON public.admins
FOR UPDATE
TO authenticated
USING ((SELECT public.is_cms_super_admin()))
WITH CHECK ((SELECT public.is_cms_super_admin()));

CREATE POLICY "Super admins can delete admin records"
ON public.admins
FOR DELETE
TO authenticated
USING ((SELECT public.is_cms_super_admin()));

-- ============================================================
-- GRANTS
-- RLS still determines which rows each role can access.
-- ============================================================

GRANT SELECT ON
  public.site_settings,
  public.page_sections,
  public.hero_slides,
  public."values",
  public.principles,
  public.programs,
  public.testimonials,
  public.gallery_items,
  public.admissions_steps,
  public.team_members,
  public.blog_posts
TO anon, authenticated;

GRANT INSERT ON public.admissions_inquiries TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON
  public.site_settings,
  public.page_sections,
  public.hero_slides,
  public."values",
  public.principles,
  public.programs,
  public.testimonials,
  public.gallery_items,
  public.admissions_steps,
  public.team_members,
  public.blog_posts,
  public.media_library,
  public.admissions_inquiries,
  public.admins
TO authenticated;

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order
ON public.hero_slides(is_active, display_order);

CREATE INDEX IF NOT EXISTS idx_page_sections_page_order
ON public.page_sections(page_key, is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_programs_published_order
ON public.programs(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_testimonials_published_order
ON public.testimonials(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_gallery_published_order
ON public.gallery_items(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_admissions_published_order
ON public.admissions_steps(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_team_published_order
ON public.team_members(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_blog_published_date
ON public.blog_posts(is_published, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_media_uploaded_by
ON public.media_library(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_admissions_inquiries_created_at
ON public.admissions_inquiries(created_at DESC);

-- ============================================================
-- SUPABASE STORAGE
-- Public read; upload, replacement, and deletion require admin RLS.
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-media',
  'cms-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "CMS images are publicly readable" ON storage.objects;
DROP POLICY IF EXISTS "CMS admins can upload images" ON storage.objects;
DROP POLICY IF EXISTS "CMS admins can update images" ON storage.objects;
DROP POLICY IF EXISTS "CMS admins can delete images" ON storage.objects;

CREATE POLICY "CMS images are publicly readable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'cms-media');

CREATE POLICY "CMS admins can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cms-media' AND (SELECT public.is_cms_admin()));

CREATE POLICY "CMS admins can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'cms-media' AND (SELECT public.is_cms_admin()))
WITH CHECK (bucket_id = 'cms-media' AND (SELECT public.is_cms_admin()));

CREATE POLICY "CMS admins can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cms-media' AND (SELECT public.is_cms_admin()));

-- ============================================================
-- END OF CMS SCHEMA
-- ============================================================