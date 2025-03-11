import { useCallback, useEffect, useState } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { Auth } from "@/modules/auth/types";
import { getCurrentSession, login } from "@/modules/auth/api";
import { supabase } from "@/core/networking/api";

const useSupabaseAuth = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(null);

  const fetchAuth = useCallback(async () => {
    try {
      const auth = await getCurrentSession();
      setAuth(auth);
      return auth;
    } catch (error) {
      setAuth(null);
      console.log("Error fetching auth:", error);
      return null;
    }
  }, []);

  // 1. Bij opstarten checken of user is ingelogd?
  useEffect(() => {
    const checkAuth = async () => {
      await fetchAuth();
      setIsInitialized(true);
    };
    checkAuth();
  }, [fetchAuth]);

  // 2. Daarna "watchen" -> is user nog steeds ingelogd?
  useEffect(() => {
    supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      switch (event) {
        case "USER_UPDATED":
        case "TOKEN_REFRESHED":
          fetchAuth();
          break;

        case "SIGNED_OUT":
          setAuth(null);
          break;
      }
    });
  }, [fetchAuth]);

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
    const auth = await fetchAuth();
    return auth;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
  };
  const isLoggedIn = isInitialized && !!auth;

  return {
    isLoggedIn,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
    refresh: fetchAuth,
    auth,
    user: auth?.user,
  };
};

export default useSupabaseAuth;
