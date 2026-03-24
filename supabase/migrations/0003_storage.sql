-- ============================================================
-- NúcleoTur Alagoas — Storage Buckets
-- Migration: 0003_storage.sql
-- ============================================================

-- Create public buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos',   'logos',   true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('covers',  'covers',  true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('gallery', 'gallery', true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('banners', 'banners', true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('assets',  'assets',  true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- ── Storage RLS Policies ──────────────────────────────────────────────────

-- Public read for all buckets
CREATE POLICY "logos_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'logos');

CREATE POLICY "covers_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'covers');

CREATE POLICY "gallery_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery');

CREATE POLICY "banners_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'banners');

CREATE POLICY "assets_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'assets');

-- Logos: authenticated users can upload/delete own logo
CREATE POLICY "logos_auth_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'logos'
    AND (
      -- Path: logos/{associado_id}/{filename}
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

CREATE POLICY "logos_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'logos'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

-- Covers: authenticated users can upload/delete own cover
CREATE POLICY "covers_auth_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'covers'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

CREATE POLICY "covers_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'covers'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

-- Gallery: authenticated users can upload/delete own gallery
CREATE POLICY "gallery_auth_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'gallery'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

CREATE POLICY "gallery_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'gallery'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_super_admin()
    )
  );

-- Banners: admin only
CREATE POLICY "banners_admin_write"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'banners' AND public.is_super_admin())
  WITH CHECK (bucket_id = 'banners' AND public.is_super_admin());

-- Assets: admin only
CREATE POLICY "assets_admin_write"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'assets' AND public.is_super_admin())
  WITH CHECK (bucket_id = 'assets' AND public.is_super_admin());
