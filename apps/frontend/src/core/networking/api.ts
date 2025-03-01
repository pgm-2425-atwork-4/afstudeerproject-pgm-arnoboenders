import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types"; // Adjust the import path as necessary

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
