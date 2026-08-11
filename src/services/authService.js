import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet. Please add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY to .env.local');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in with LinkedIn OAuth
 */
export async function signInWithLinkedIn() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet.');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in with Email Magic Link or Password
 */
export async function signInWithEmail(email, password = null) {
  if (!isSupabaseConfigured) {
    // Local demo login fallback
    const mockUser = {
      id: 'demo-user-123',
      email: email,
      user_metadata: {
        full_name: email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        role: 'Verified Reader & Member'
      }
    };
    localStorage.setItem('closetoopen_demo_user', JSON.stringify(mockUser));
    return { user: mockUser };
  }

  if (password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  } else {
    // Magic Link
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) throw error;
    return data;
  }
}

/**
 * Sign Up with Email & Password
 */
export async function signUpWithEmail(email, password, fullName, role = 'Verified Member') {
  if (!isSupabaseConfigured) {
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email,
      user_metadata: { full_name: fullName, role }
    };
    localStorage.setItem('closetoopen_demo_user', JSON.stringify(mockUser));
    return { user: mockUser };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });

  if (error) throw error;
  return data;
}

/**
 * Sign Out
 */
export async function signOutUser() {
  localStorage.removeItem('closetoopen_demo_user');
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
}

/**
 * Get Current User
 */
export async function getCurrentUser() {
  if (!isSupabaseConfigured) {
    const saved = localStorage.getItem('closetoopen_demo_user');
    return saved ? JSON.parse(saved) : null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
