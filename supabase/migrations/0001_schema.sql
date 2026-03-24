-- ============================================================
-- NúcleoTur Alagoas — Database Schema
-- Migration: 0001_schema.sql
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ── Helper: updated_at trigger ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── profiles ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'associado'
               CHECK (role IN ('super_admin', 'associado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'associado')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── is_super_admin helper ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── categories ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  icon       TEXT,
  sort_order INT  NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── cities ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cities (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

-- ── associados ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.associados (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  logo_url         TEXT,
  cover_url        TEXT,
  description      TEXT,
  description_html TEXT,
  category_id      UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  city_id          UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  phone            TEXT,
  whatsapp         TEXT,
  instagram        TEXT,
  website          TEXT,
  external_link    TEXT,
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'active', 'inactive')),
  featured         BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order       INT     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS associados_status_idx    ON public.associados(status);
CREATE INDEX IF NOT EXISTS associados_category_idx  ON public.associados(category_id);
CREATE INDEX IF NOT EXISTS associados_city_idx      ON public.associados(city_id);
CREATE INDEX IF NOT EXISTS associados_featured_idx  ON public.associados(featured);
CREATE INDEX IF NOT EXISTS associados_slug_idx      ON public.associados(slug);

DROP TRIGGER IF EXISTS associados_updated_at ON public.associados;
CREATE TRIGGER associados_updated_at
  BEFORE UPDATE ON public.associados
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── associado_services ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.associado_services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  associado_id  UUID NOT NULL REFERENCES public.associados(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  sort_order    INT  NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS assoc_services_assoc_idx ON public.associado_services(associado_id);

-- ── associado_photos ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.associado_photos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  associado_id  UUID NOT NULL REFERENCES public.associados(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  caption       TEXT,
  sort_order    INT  NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS assoc_photos_assoc_idx ON public.associado_photos(associado_id);

-- ── noticias ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.noticias (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content_html TEXT NOT NULL DEFAULT '',
  cover_url    TEXT,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  author_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS noticias_published_idx    ON public.noticias(published);
CREATE INDEX IF NOT EXISTS noticias_featured_idx     ON public.noticias(featured);
CREATE INDEX IF NOT EXISTS noticias_published_at_idx ON public.noticias(published_at DESC);

DROP TRIGGER IF EXISTS noticias_updated_at ON public.noticias;
CREATE TRIGGER noticias_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── eventos ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.eventos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content_html TEXT,
  cover_url    TEXT,
  location     TEXT,
  city_id      UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  start_date   TIMESTAMPTZ NOT NULL,
  end_date     TIMESTAMPTZ,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  author_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS eventos_published_idx  ON public.eventos(published);
CREATE INDEX IF NOT EXISTS eventos_start_date_idx ON public.eventos(start_date);

DROP TRIGGER IF EXISTS eventos_updated_at ON public.eventos;
CREATE TRIGGER eventos_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── banners ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.banners (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT,
  subtitle   TEXT,
  cta_text   TEXT,
  cta_url    TEXT,
  image_url  TEXT NOT NULL,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── site_content ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  key        TEXT PRIMARY KEY,
  value_text TEXT,
  value_html TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- ── site_settings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

-- ── seja_associado_leads ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.seja_associado_leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  city_id     UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'contacted', 'converted', 'rejected')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── contact_messages ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
