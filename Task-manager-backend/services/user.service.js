import { supabase } from '../db/supabase.js'

export async function registrarUsuarioService({ name, email, password }) {

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Para manejar tu verificación por Resend
    user_metadata: {
      display_name: `${name}`
    }
  })

  if (authError) throw new Error(authError.message)

  const userId = authData.user.id

  return { userId, message: 'Usuario creado exitosamente en el backend' }
}

export const verificarUsuarioService = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_verified: true })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  // Marca el email como confirmado también en auth.users
  const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });
  if (authError) throw new Error(authError.message);

  return data;
};

export const loginUserService = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const getUserService = async (token) => {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) throw new Error(error.message);
  return user;
};