import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://vstbmotqtpyxerrpdsnm.supabase.co",
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdGJtb3RxdHB5eGVycnBkc25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTQ4NjY2MywiZXhwIjoxOTk1MDYyNjYzfQ.amnf5n_CP1VibrVWtXnKgdDopwQI2ogvplqr7YaVQdA");