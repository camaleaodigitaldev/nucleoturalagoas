-- ============================================================
-- NúcleoTur Alagoas — Seed Data
-- Migration: 0004_seed.sql
-- ============================================================

-- ── Categories ────────────────────────────────────────────────────────────
INSERT INTO public.categories (name, slug, icon, sort_order) VALUES
  ('Hotelaria',           'hotelaria',    'Hotel',          1),
  ('Gastronomia',         'gastronomia',  'UtensilsCrossed',2),
  ('Agências de Turismo', 'agencias',     'Briefcase',      3),
  ('Transporte',          'transporte',   'Bus',            4),
  ('Cultura & Lazer',     'cultura',      'Palette',        5),
  ('Ecoturismo',          'ecoturismo',   'Leaf',           6),
  ('Outros',              'outros',       'Grid',           7)
ON CONFLICT (slug) DO NOTHING;

-- ── Cities ────────────────────────────────────────────────────────────────
INSERT INTO public.cities (name, slug) VALUES
  ('Maceió',                    'maceio'),
  ('Maragogi',                  'maragogi'),
  ('Penedo',                    'penedo'),
  ('Marechal Deodoro',          'marechal-deodoro'),
  ('Barra de São Miguel',       'barra-de-sao-miguel'),
  ('São Miguel dos Milagres',   'sao-miguel-dos-milagres'),
  ('Japaratinga',               'japaratinga'),
  ('Porto de Pedras',           'porto-de-pedras'),
  ('Paripueira',                'paripueira'),
  ('Arapiraca',                 'arapiraca'),
  ('Palmeira dos Índios',       'palmeira-dos-indios'),
  ('Delmiro Gouveia',           'delmiro-gouveia'),
  ('Piranhas',                  'piranhas'),
  ('Coruripe',                  'coruripe'),
  ('Feliz Deserto',             'feliz-deserto'),
  ('Piaçabuçu',                 'piacabucu'),
  ('Passo de Camaragibe',       'passo-de-camaragibe'),
  ('Outros',                    'outros')
ON CONFLICT (slug) DO NOTHING;

-- ── Site Content ──────────────────────────────────────────────────────────
INSERT INTO public.site_content (key, value_text, value_html) VALUES
  (
    'home_institucional_title',
    'Fortalecendo o Turismo de Alagoas',
    NULL
  ),
  (
    'home_institucional_text',
    'O NúcleoTur Alagoas reúne as melhores empresas e profissionais do setor turístico alagoano. Nossa missão é conectar, fortalecer e dar visibilidade ao turismo local.',
    NULL
  ),
  (
    'home_cta_title',
    'Faça parte do NúcleoTur Alagoas',
    NULL
  ),
  (
    'home_cta_text',
    'Associe-se e ganhe visibilidade, conexões e representatividade no setor turístico de Alagoas.',
    NULL
  ),
  (
    'quem_somos_html',
    NULL,
    '<h2>Quem Somos</h2><p>O NúcleoTur Alagoas é uma organização que reúne empresas e profissionais do turismo do estado de Alagoas, com o objetivo de fortalecer, organizar e dar visibilidade ao setor turístico local.</p><p>Atuamos como um elo entre os agentes do turismo e o mercado, promovendo integração, capacitação e representação institucional.</p>'
  ),
  (
    'missao',
    'Conectar e fortalecer os agentes do turismo alagoano, promovendo o desenvolvimento sustentável do setor e a valorização das riquezas naturais e culturais de Alagoas.',
    NULL
  ),
  (
    'visao',
    'Ser a principal referência do turismo organizado em Alagoas, reconhecida pela qualidade dos serviços, pela unidade dos associados e pelo impacto positivo no desenvolvimento regional.',
    NULL
  ),
  (
    'valores',
    'Transparência, Cooperação, Inovação, Sustentabilidade, Representatividade',
    NULL
  ),
  (
    'historia_html',
    NULL,
    '<p>O NúcleoTur Alagoas surgiu da necessidade de unir os agentes do turismo em torno de objetivos comuns: fortalecer o setor, criar uma voz representativa e promover Alagoas como destino turístico de excelência.</p>'
  ),
  (
    'footer_description',
    'Núcleo de empresas e profissionais do turismo de Alagoas. Conectamos, fortalecemos e representamos o setor turístico alagoano.',
    NULL
  )
ON CONFLICT (key) DO UPDATE SET
  value_text = EXCLUDED.value_text,
  value_html = EXCLUDED.value_html;

-- ── Site Settings ─────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value) VALUES
  ('contact_email',   'contato@nucleoturalagoas.com.br'),
  ('contact_phone',   '(82) 99999-9999'),
  ('whatsapp',        '5582999999999'),
  ('instagram',       'nucleoturalagoas'),
  ('facebook',        ''),
  ('linkedin',        ''),
  ('address',         'Maceió, Alagoas, Brasil'),
  ('cnpj',            ''),
  ('site_title',      'NúcleoTur Alagoas'),
  ('site_description','Núcleo de empresas e profissionais do turismo de Alagoas')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
