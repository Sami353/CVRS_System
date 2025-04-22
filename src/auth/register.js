import supabase from '../config/supabaseClient'

export const registerUser = async (email, password, username) => {
  // 1. Sign up user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { error: signUpError };
  }

  // 2. Get the authenticated session (important for auth.uid)
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    return { error: sessionError };
  }

  const userId = sessionData?.session?.user?.id;

  if (!userId) {
    return { error: { message: 'User session not available. Please confirm your email first or check email confirmation settings.' } };
  }

  // 3. Insert user profile
  const { error: insertError } = await supabase.from('profiles').insert([
    {
      id: userId,
      email,
      username,
      role: 'user',
    },
  ]);

  if (insertError) {
    return { error: insertError };
  }

  return { data: signUpData };
};
