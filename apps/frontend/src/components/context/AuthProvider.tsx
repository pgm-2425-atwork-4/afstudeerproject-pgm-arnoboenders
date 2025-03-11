'use client'
import { createContext, useContext } from "react";
import useSupabaseAuth from "./useSupabaseAuth";
import { Auth, User } from "@/modules/auth/types";

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User | null;
  auth: Auth | null;
  refresh: () => Promise<Auth | null>;
  login: (email: string, password: string) => Promise<Auth | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  auth: null,
  refresh: async () => null,
  login: async () => null,
  logout: async () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isLoggedIn, isInitialized, auth, user, refresh, login, logout } =
    useSupabaseAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        auth,
        refresh,
        login,
        logout,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
