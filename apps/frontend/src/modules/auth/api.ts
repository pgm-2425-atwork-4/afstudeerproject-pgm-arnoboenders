
import { supabase } from "@/core/networking/api";
import { Auth, AuthBody } from "./types";

export const getCurrentSession = async (): Promise<Auth | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    return null;
  }
  const { user } = session;

  return {
    session,
    user: {
      email: user.email ?? "",
      id: user.id ?? "",
    },
  };
};

export const login = async ({ email, password }: AuthBody) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data.user);
};

export const logout = async () => {
  return supabase.auth.signOut();
};

export const fetchCurrentUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};
