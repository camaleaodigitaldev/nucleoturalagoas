-- ============================================================
-- NúcleoTur Alagoas — Drop All (rodar ANTES das migrations)
-- ============================================================

-- Tabelas (ordem importa: filhas antes das mães)
DROP TABLE IF EXISTS public.contact_messages       CASCADE;
DROP TABLE IF EXISTS public.seja_associado_leads   CASCADE;
DROP TABLE IF EXISTS public.site_settings          CASCADE;
DROP TABLE IF EXISTS public.site_content           CASCADE;
DROP TABLE IF EXISTS public.banners                CASCADE;
DROP TABLE IF EXISTS public.eventos                CASCADE;
DROP TABLE IF EXISTS public.noticias               CASCADE;
DROP TABLE IF EXISTS public.associado_photos       CASCADE;
DROP TABLE IF EXISTS public.associado_services     CASCADE;
DROP TABLE IF EXISTS public.associados             CASCADE;
DROP TABLE IF EXISTS public.cities                 CASCADE;
DROP TABLE IF EXISTS public.categories             CASCADE;
DROP TABLE IF EXISTS public.profiles               CASCADE;

-- Funções
DROP FUNCTION IF EXISTS public.set_updated_at()    CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user()   CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin()    CASCADE;

-- Trigger no auth.users (precisa remover separado)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
