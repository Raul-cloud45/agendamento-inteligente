import { supabase } from './supabase';

export async function signUp(email: string, password: string, professionalName: string, businessName: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Erro no signUp:', authError);
      throw new Error(authError.message || 'Erro ao criar conta');
    }

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

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        throw new Error('Erro ao criar perfil profissional');
      }
    }

    return authData;
  } catch (error: any) {
    console.error('Erro geral no signUp:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro no signIn:', error);
      
      // Mensagens de erro mais amigáveis
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('E-mail ou senha incorretos');
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Por favor, confirme seu e-mail antes de fazer login');
      }
      
      throw new Error(error.message || 'Erro ao fazer login');
    }

    if (!data.user) {
      throw new Error('Erro ao autenticar usuário');
    }

    return data;
  } catch (error: any) {
    console.error('Erro geral no signIn:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Erro no signOut:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export async function getProfessionalProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Erro geral ao buscar perfil:', error);
    throw error;
  }
}
