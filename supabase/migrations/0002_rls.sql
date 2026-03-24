-- ============================================================
-- NúcleoTur Alagoas — Row Level Security Policies
-- Migration: 0002_rls.sql
-- ============================================================

-- ── Enable RLS on all tables ──────────────────────────────────────────────
ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associados         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associado_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associado_photos   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seja_associado_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages   ENABLE ROW LEVEL SECURITY;

-- ── profiles ──────────────────────────────────────────────────────────────
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_super_admin());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_super_admin());

-- ── categories (public read, admin write) ────────────────────────────────
CREATE POLICY "categories_select_all"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "categories_admin_write"
  ON public.categories FOR ALL
  USING (public.is_super_admin());

-- ── cities (public read, admin write) ────────────────────────────────────
CREATE POLICY "cities_select_all"
  ON public.cities FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "cities_admin_write"
  ON public.cities FOR ALL
  USING (public.is_super_admin());

-- ── associados ────────────────────────────────────────────────────────────
-- Public: only active associados
CREATE POLICY "associados_select_active"
  ON public.associados FOR SELECT
  TO anon
  USING (status = 'active');

-- Authenticated: own record (any status) OR admin sees all
CREATE POLICY "associados_select_authenticated"
  ON public.associados FOR SELECT
  TO authenticated
  USING (
    status = 'active'
    OR user_id = auth.uid()
    OR public.is_super_admin()
  );

-- Associado: insert own record (pending by default)
CREATE POLICY "associados_insert_own"
  ON public.associados FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_super_admin());

-- Associado: update limited fields on own record
CREATE POLICY "associados_update_own"
  ON public.associados FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_super_admin())
  WITH CHECK (
    -- Associates cannot change status/featured/sort_order
    (user_id = auth.uid() AND public.is_super_admin() IS FALSE)
    OR public.is_super_admin()
  );

-- Admin: full delete
CREATE POLICY "associados_delete_admin"
  ON public.associados FOR DELETE
  USING (public.is_super_admin());

-- ── associado_services ────────────────────────────────────────────────────
CREATE POLICY "services_select_public"
  ON public.associado_services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "services_write_owner"
  ON public.associado_services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.associados a
      WHERE a.id = associado_id
        AND (a.user_id = auth.uid() OR public.is_super_admin())
    )
  );

-- ── associado_photos ──────────────────────────────────────────────────────
CREATE POLICY "photos_select_public"
  ON public.associado_photos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "photos_write_owner"
  ON public.associado_photos FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.associados a
      WHERE a.id = associado_id
        AND (a.user_id = auth.uid() OR public.is_super_admin())
    )
  );

-- ── noticias ──────────────────────────────────────────────────────────────
CREATE POLICY "noticias_select_published"
  ON public.noticias FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "noticias_select_admin"
  ON public.noticias FOR SELECT
  TO authenticated
  USING (published = true OR public.is_super_admin());

CREATE POLICY "noticias_write_admin"
  ON public.noticias FOR ALL
  USING (public.is_super_admin());

-- ── eventos ───────────────────────────────────────────────────────────────
CREATE POLICY "eventos_select_published"
  ON public.eventos FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "eventos_select_admin"
  ON public.eventos FOR SELECT
  TO authenticated
  USING (published = true OR public.is_super_admin());

CREATE POLICY "eventos_write_admin"
  ON public.eventos FOR ALL
  USING (public.is_super_admin());

-- ── banners ───────────────────────────────────────────────────────────────
CREATE POLICY "banners_select_active"
  ON public.banners FOR SELECT
  TO anon
  USING (active = true);

CREATE POLICY "banners_select_admin"
  ON public.banners FOR SELECT
  TO authenticated
  USING (active = true OR public.is_super_admin());

CREATE POLICY "banners_write_admin"
  ON public.banners FOR ALL
  USING (public.is_super_admin());

-- ── site_content ──────────────────────────────────────────────────────────
CREATE POLICY "site_content_select_all"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "site_content_write_admin"
  ON public.site_content FOR ALL
  USING (public.is_super_admin());

-- ── site_settings ─────────────────────────────────────────────────────────
CREATE POLICY "site_settings_select_all"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "site_settings_write_admin"
  ON public.site_settings FOR ALL
  USING (public.is_super_admin());

-- ── seja_associado_leads ──────────────────────────────────────────────────
CREATE POLICY "leads_insert_public"
  ON public.seja_associado_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "leads_select_admin"
  ON public.seja_associado_leads FOR SELECT
  USING (public.is_super_admin());

CREATE POLICY "leads_update_admin"
  ON public.seja_associado_leads FOR UPDATE
  USING (public.is_super_admin());

CREATE POLICY "leads_delete_admin"
  ON public.seja_associado_leads FOR DELETE
  USING (public.is_super_admin());

-- ── contact_messages ──────────────────────────────────────────────────────
CREATE POLICY "contact_insert_public"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contact_select_admin"
  ON public.contact_messages FOR SELECT
  USING (public.is_super_admin());

CREATE POLICY "contact_update_admin"
  ON public.contact_messages FOR UPDATE
  USING (public.is_super_admin());

CREATE POLICY "contact_delete_admin"
  ON public.contact_messages FOR DELETE
  USING (public.is_super_admin());
