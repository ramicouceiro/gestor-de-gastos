import supabase from "../supabase";
import { useAppStore } from "../store";

export interface User {
  id: number;
  username: string;
}

export async function login(username: string, password: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('usr')
    .select('id, username')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error) {
    console.error('Error during login:', error);
    return null;
  }

  const user = data as User;
  useAppStore.getState().setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    useAppStore.getState().setUser(user);
    return user;
  }

  // Si no hay usuario en localStorage, intentamos obtenerlo de Supabase
  const { data: { user: supabaseUser } } = await supabase.auth.getUser();
  if (!supabaseUser) return null;

  const { data, error } = await supabase
    .from('usr')
    .select('id, username')
    .eq('id', supabaseUser.id)
    .single();

  if (error) {
    console.error('Error fetching current user:', error);
    return null;
  }

  const userData = data as User;
  useAppStore.getState().setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
  return userData;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
  }
  useAppStore.getState().setUser(null);
  localStorage.removeItem('user');
}

export function getCurrentUserId(): number | null {
  const user = useAppStore.getState().user;
  return user ? user.id : null;
}

export async function signUp(username: string, password: string, email: string, name: string, surname: string): Promise<User | null> {
  // First, check if the username or email already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('usr')
    .select('username, email')
    .or(`username.eq.${username},email.eq.${email}`)
    .single();

  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Username already exists');
    } else {
      throw new Error('Email already exists');
    }
  }

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing user:', checkError);
    throw new Error('An error occurred during sign-up');
  }

  // If username and email don't exist, proceed with insertion
  const { data, error } = await supabase
    .from('usr')
    .insert([{ username, password, email, name, surname }])
    .select('id, username')
    .single();

  if (error) {
    console.error('Error during sign-up:', error);
    throw new Error('An error occurred during sign-up');
  }

  const user = data as User;
  useAppStore.getState().setUser(user);
  return user;
}