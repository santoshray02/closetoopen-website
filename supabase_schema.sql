-- ====================================================================
-- CloseToOpen.in — Book Reader Community & Advisory Supabase SQL Schema
-- Fully Idempotent Script: Safe to re-run anytime without errors
-- ====================================================================

-- 1. Create Reflections Table
CREATE TABLE IF NOT EXISTS public.reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Mindset',
  quote TEXT NOT NULL,
  real_life_connection TEXT NOT NULL,
  takeaways TEXT[] DEFAULT '{}',
  impact_rating INT DEFAULT 5 CHECK (impact_rating >= 1 AND impact_rating <= 5),
  reader_name TEXT NOT NULL,
  reader_role TEXT DEFAULT 'Book Reader',
  reader_avatar TEXT,
  likes_count INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Comments Table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection_id UUID NOT NULL REFERENCES public.reflections(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'Book Reader',
  comment_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Likes Tracking Table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection_id UUID NOT NULL REFERENCES public.reflections(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(reflection_id, device_id)
);

-- 4. Create Bookings Table (Stores Keynotes, Mentorship & Corporate Requests)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  engagement_focus TEXT NOT NULL,
  preferred_date DATE,
  preferred_time_slot TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 6. Set RLS Policies (Drop existing if present to avoid 42710 errors)
DROP POLICY IF EXISTS "Allow public read on reflections" ON public.reflections;
CREATE POLICY "Allow public read on reflections" ON public.reflections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on reflections" ON public.reflections;
CREATE POLICY "Allow public insert on reflections" ON public.reflections FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update likes on reflections" ON public.reflections;
CREATE POLICY "Allow public update likes on reflections" ON public.reflections FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public read on comments" ON public.comments;
CREATE POLICY "Allow public read on comments" ON public.comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on comments" ON public.comments;
CREATE POLICY "Allow public insert on comments" ON public.comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on likes" ON public.likes;
CREATE POLICY "Allow public read on likes" ON public.likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on likes" ON public.likes;
CREATE POLICY "Allow public insert on likes" ON public.likes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert on bookings" ON public.bookings;
CREATE POLICY "Allow public insert on bookings" ON public.bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on bookings" ON public.bookings;
CREATE POLICY "Allow public read on bookings" ON public.bookings FOR SELECT USING (true);

-- 7. Trigger to automatically increment likes_count on reflection when a like row is inserted
CREATE OR REPLACE FUNCTION update_reflection_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.reflections
  SET likes_count = likes_count + 1
  WHERE id = NEW.reflection_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_increment_like ON public.likes;
CREATE TRIGGER trigger_increment_like
AFTER INSERT ON public.likes
FOR EACH ROW EXECUTE FUNCTION update_reflection_likes_count();

-- 8. Add Tables to Realtime Publication safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'bookings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
  END IF;
END $$;
