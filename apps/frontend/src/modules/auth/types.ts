import { Session } from "@supabase/supabase-js";

export type Auth = {
  session: Session;
  user: User;
};

export type AuthBody = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
}
