import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';
import { INITIAL_REFLECTIONS } from '../data/communityData';

const LOCAL_STORAGE_KEY = 'closetoopen_community_reflections';

// Helper to get local reflections fallback
function getLocalReflections() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return INITIAL_REFLECTIONS;
}

// Helper to save local reflections fallback
function saveLocalReflections(reflections) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reflections));
}

/**
 * Fetch all reflections (with nested comments) from Supabase or LocalStorage
 */
export async function fetchReflections() {
  if (!isSupabaseConfigured) {
    return getLocalReflections();
  }

  try {
    const { data: reflectionsData, error: reflectionsError } = await supabase
      .from('reflections')
      .select(`
        id,
        book_title,
        author,
        category,
        quote,
        real_life_connection,
        takeaways,
        impact_rating,
        reader_name,
        reader_role,
        reader_avatar,
        likes_count,
        tags,
        featured,
        created_at,
        comments (
          id,
          author_name,
          author_role,
          comment_text,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (reflectionsError) throw reflectionsError;

    // Transform DB snake_case columns to camelCase component schema
    return reflectionsData.map(r => ({
      id: r.id,
      bookTitle: r.book_title,
      author: r.author,
      category: r.category,
      quote: r.quote,
      realLifeConnection: r.real_life_connection,
      actionableTakeaways: r.takeaways || [],
      impactRating: r.impact_rating,
      readerName: r.reader_name,
      readerRole: r.reader_role,
      readerAvatar: r.reader_avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      likes: r.likes_count || 0,
      featured: r.featured,
      createdAt: r.created_at,
      tags: r.tags || [],
      comments: (r.comments || []).map(c => ({
        id: c.id,
        author: c.author_name,
        text: c.comment_text,
        date: new Date(c.created_at).toLocaleDateString()
      }))
    }));
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local storage:', err);
    return getLocalReflections();
  }
}

/**
 * Submit a new Book Reflection
 */
export async function createReflection(newReflection) {
  if (!isSupabaseConfigured) {
    const local = getLocalReflections();
    const updated = [newReflection, ...local];
    saveLocalReflections(updated);
    return newReflection;
  }

  try {
    const { data, error } = await supabase
      .from('reflections')
      .insert([{
        book_title: newReflection.bookTitle,
        author: newReflection.author,
        category: newReflection.category,
        quote: newReflection.quote,
        real_life_connection: newReflection.realLifeConnection,
        takeaways: newReflection.actionableTakeaways,
        impact_rating: newReflection.impactRating,
        reader_name: newReflection.readerName,
        reader_role: newReflection.readerRole,
        tags: newReflection.tags,
        featured: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to save reflection to Supabase:', err);
    const local = getLocalReflections();
    const updated = [newReflection, ...local];
    saveLocalReflections(updated);
    return newReflection;
  }
}

/**
 * Post a new Comment on a Reflection
 */
export async function addCommentToReflection(reflectionId, commentData) {
  if (!isSupabaseConfigured) {
    const local = getLocalReflections();
    const updated = local.map(r => {
      if (r.id === reflectionId) {
        return {
          ...r,
          comments: [...(r.comments || []), { id: 'c-' + Date.now(), ...commentData, date: 'Just now' }]
        };
      }
      return r;
    });
    saveLocalReflections(updated);
    return commentData;
  }

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        reflection_id: reflectionId,
        author_name: commentData.author,
        comment_text: commentData.text,
        author_role: 'Book Community Reader'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to post comment to Supabase:', err);
    // Fallback to local storage
    const local = getLocalReflections();
    const updated = local.map(r => {
      if (r.id === reflectionId) {
        return {
          ...r,
          comments: [...(r.comments || []), { id: 'c-' + Date.now(), ...commentData, date: 'Just now' }]
        };
      }
      return r;
    });
    saveLocalReflections(updated);
    return commentData;
  }
}

/**
 * Like / Resonate with a Reflection
 */
export async function toggleLikeReflection(reflectionId, deviceId) {
  if (!isSupabaseConfigured) {
    const local = getLocalReflections();
    const updated = local.map(r => r.id === reflectionId ? { ...r, likes: r.likes + 1 } : r);
    saveLocalReflections(updated);
    return;
  }

  try {
    await supabase.from('likes').insert([{ reflection_id: reflectionId, device_id: deviceId }]);
  } catch (err) {
    console.error('Failed to register like on Supabase:', err);
  }
}

/**
 * Real-time listener for comments & new reflections
 */
export function subscribeToCommunityUpdates(onUpdateCallback) {
  if (!isSupabaseConfigured) return () => {};

  const channel = supabase
    .channel('community_channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
      onUpdateCallback();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reflections' }, () => {
      onUpdateCallback();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
