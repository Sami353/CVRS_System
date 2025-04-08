import supabase from '../config/supabaseClient'

export const registerUser = async (email, password, username = '') => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });
};

