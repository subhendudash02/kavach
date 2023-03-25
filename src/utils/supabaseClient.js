import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, PUBLIC_API_KEY);