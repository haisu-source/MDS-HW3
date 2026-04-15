-- LifeStyling Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables
-- Uses native Clerk + Supabase third-party auth integration
-- RLS policies use (auth.jwt()->>'sub') which maps to the Clerk user's sub claim

-- ============================================
-- REFLECTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS reflections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  mood TEXT NOT NULL,
  intensity INTEGER NOT NULL DEFAULT 3,
  journal TEXT NOT NULL,
  gratitude TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reflections"
  ON reflections FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own reflections"
  ON reflections FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can update own reflections"
  ON reflections FOR UPDATE USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own reflections"
  ON reflections FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- BOOKS
-- ============================================
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'want-to-read',
  rating INTEGER,
  genre TEXT NOT NULL DEFAULT 'Fiction',
  reason_to_read TEXT DEFAULT '',
  personal_connection TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  start_date TEXT,
  finish_date TEXT,
  cover_url TEXT,
  open_library_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own books"
  ON books FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own books"
  ON books FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can update own books"
  ON books FOR UPDATE USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own books"
  ON books FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- HABITS
-- ============================================
CREATE TABLE IF NOT EXISTS habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  identity_tags TEXT[] DEFAULT '{}',
  is_suggested BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own habits"
  ON habits FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own habits"
  ON habits FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can update own habits"
  ON habits FOR UPDATE USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own habits"
  ON habits FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- HABIT COMPLETIONS
-- ============================================
CREATE TABLE IF NOT EXISTS habit_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  completed_date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(habit_id, completed_date)
);

ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own habit completions"
  ON habit_completions FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own habit completions"
  ON habit_completions FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own habit completions"
  ON habit_completions FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- GRATITUDE ENTRIES
-- ============================================
CREATE TABLE IF NOT EXISTS gratitude_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  person_or_thing TEXT NOT NULL,
  message TEXT NOT NULL,
  emotion TEXT NOT NULL DEFAULT 'warmth',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own gratitude entries"
  ON gratitude_entries FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own gratitude entries"
  ON gratitude_entries FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own gratitude entries"
  ON gratitude_entries FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- CONNECTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  relationship_type TEXT NOT NULL DEFAULT 'friend',
  last_appreciation TEXT DEFAULT '',
  harmony_level INTEGER NOT NULL DEFAULT 3,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own connections"
  ON connections FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own connections"
  ON connections FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can update own connections"
  ON connections FOR UPDATE USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can delete own connections"
  ON connections FOR DELETE USING ((auth.jwt()->>'sub') = user_id);

-- ============================================
-- USER IDENTITIES (for habit suggestions)
-- ============================================
CREATE TABLE IF NOT EXISTS user_identities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  identities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_identities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own identities"
  ON user_identities FOR SELECT USING ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can insert own identities"
  ON user_identities FOR INSERT WITH CHECK ((auth.jwt()->>'sub') = user_id);
CREATE POLICY "Users can update own identities"
  ON user_identities FOR UPDATE USING ((auth.jwt()->>'sub') = user_id);
