import { supabase } from './supabase';

export async function signUp(email: string, password: string, professionalName: string, businessName: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    // Criar slug único baseado no nome do negócio
    const slug = businessName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Criar perfil profissional
    const { error: profileError } = await supabase
      .from('professionals')
      .insert({
        user_id: authData.user.id,
        business_name: businessName,
        professional_name: professionalName,
        slug: `${slug}-${Date.now().toString(36)}`,
      });

    if (profileError) throw profileError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfessionalProfile(userId: string) {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}
