-- MODELO PROPOSTO (PostgreSQL). NÃO CONECTADO AO MVP OFFLINE.
-- Usar somente depois de implantar backend com autenticação/validação reais.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS sectors (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL UNIQUE, active boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS users (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 email text NOT NULL UNIQUE,
 password_hash text NOT NULL,
 role text NOT NULL DEFAULT 'colaborador' CHECK(role IN ('colaborador','administrador')),
 sector_id uuid REFERENCES sectors(id),
 avatar_key text,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS material_categories (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE,
 name text NOT NULL, icon_key text, description text NOT NULL DEFAULT '',
 identify text NOT NULL DEFAULT '', separate text NOT NULL DEFAULT '',
 risks text NOT NULL DEFAULT '', destination text NOT NULL DEFAULT '',
 verified_at timestamptz, verified_by uuid REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS category_sector_destinations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), category_id uuid NOT NULL REFERENCES material_categories(id),
 sector_id uuid NOT NULL REFERENCES sectors(id), destination_instructions text NOT NULL,
 approved_by uuid REFERENCES users(id), approved_at timestamptz,
 UNIQUE(category_id,sector_id)
);
CREATE TABLE IF NOT EXISTS lessons (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), category_id uuid NOT NULL REFERENCES material_categories(id),
 level_number integer NOT NULL CHECK(level_number BETWEEN 1 AND 4),
 name text NOT NULL, pass_score integer NOT NULL DEFAULT 3 CHECK(pass_score BETWEEN 1 AND 4),
 UNIQUE(category_id,level_number)
);
CREATE TABLE IF NOT EXISTS questions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lesson_id uuid NOT NULL REFERENCES lessons(id),
 sort_order integer NOT NULL, format text NOT NULL CHECK(format IN ('text','image')),
 prompt text NOT NULL, explanation text NOT NULL, UNIQUE(lesson_id,sort_order)
);
CREATE TABLE IF NOT EXISTS question_options (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
 position integer NOT NULL CHECK(position BETWEEN 0 AND 2), label text NOT NULL,
 image_key text, is_correct boolean NOT NULL DEFAULT false, UNIQUE(question_id,position)
);
-- Impor pelo backend exatamente uma alternativa correta por questão.
CREATE TABLE IF NOT EXISTS user_lesson_progress (
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 lesson_id uuid NOT NULL REFERENCES lessons(id), best_score integer NOT NULL DEFAULT 0,
 completed_at timestamptz, attempts integer NOT NULL DEFAULT 0,
 PRIMARY KEY(user_id,lesson_id)
);
CREATE TABLE IF NOT EXISTS xp_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES users(id),
 source_type text NOT NULL, source_id text NOT NULL,points integer NOT NULL CHECK(points>=0),
 created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(user_id,source_type,source_id)
);
CREATE TABLE IF NOT EXISTS qr_labels (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),category_id uuid NOT NULL REFERENCES material_categories(id),
 sector_id uuid NOT NULL REFERENCES sectors(id),created_by uuid REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS scan_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES users(id),
 qr_label_id uuid REFERENCES qr_labels(id),category_id uuid NOT NULL REFERENCES material_categories(id),
 scanned_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS user_badges (
 user_id uuid NOT NULL REFERENCES users(id),badge_code text NOT NULL,
 awarded_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(user_id,badge_code)
);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id,level_number);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_user_date ON scan_events(user_id,scanned_at DESC);
