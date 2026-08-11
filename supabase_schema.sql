-- ====================================================================
-- CloseToOpen.in — Book Reader Community Portal Supabase SQL Schema
-- Copy and paste this script into Supabase Dashboard -> SQL Editor -> Run
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

-- 3. Create Likes Tracking Table (Prevent multiple likes per session/device)
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection_id UUID NOT NULL REFERENCES public.reflections(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(reflection_id, device_id)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- 5. Set RLS Policies (Allow Public Read & Public Insert for Community Engagement)
CREATE POLICY "Allow public read on reflections" ON public.reflections FOR SELECT USING (true);
CREATE POLICY "Allow public insert on reflections" ON public.reflections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update likes on reflections" ON public.reflections FOR UPDATE USING (true);

CREATE POLICY "Allow public read on comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on comments" ON public.comments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Allow public insert on likes" ON public.likes FOR INSERT WITH CHECK (true);

-- 6. Trigger to automatically increment likes_count on reflection when a like row is inserted
CREATE OR REPLACE FUNCTION update_reflection_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.reflections
  SET likes_count = likes_count + 1
  WHERE id = NEW.reflection_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_increment_like
AFTER INSERT ON public.likes
FOR EACH ROW EXECUTE FUNCTION update_reflection_likes_count();

-- 7. Enable Realtime Publications for instant comments and likes updates across all active users
ALTER PUBLICATION supabase_realtime ADD TABLE public.reflections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;

-- 8. Seed Initial Data
INSERT INTO public.reflections (book_title, author, category, quote, real_life_connection, takeaways, impact_rating, reader_name, reader_role, likes_count, tags, featured)
VALUES
(
  'Atomic Habits', 
  'James Clear', 
  'Productivity', 
  'You do not rise to the level of your goals. You fall to the level of your systems.',
  'In 2024, I set a goal to write 2 strategic whitepapers per month. I kept failing because I relied on raw willpower late at night. After reading this, I built a 30-minute morning system right after espresso. Result: 24 whitepapers published in 1 year without burnout.',
  ARRAY['Design friction-free environments.', 'Focus on identity over outcome targets.', 'Habit stack with morning rituals.'],
  5,
  'Arjun Mehta',
  'VP of Engineering',
  48,
  ARRAY['Systems Over Goals', 'Productivity'],
  true
),
(
  'Never Split the Difference',
  'Chris Voss',
  'Negotiation',
  'He who has control of the frame controls the conversation. Mirroring and calibrated questions open doors.',
  'During a high-stakes client renewal where they demanded a 30% price reduction, instead of getting defensive, I used Voss''s calibrated question: "How am I supposed to maintain our 99.9% SLA uptime if we cut resources by 30%?" The client paused, agreed to keep the contract price, and even added performance bonuses.',
  ARRAY['Use open-ended questions.', 'Practice strategic silence.', 'Label emotions.'],
  5,
  'Sunita Roy',
  'Enterprise Sales Director',
  62,
  ARRAY['Negotiation', 'Calibrated Questions'],
  true
);
