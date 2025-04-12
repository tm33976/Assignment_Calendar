
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fhjzxcoinkcnclwihmdl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanp4Y29pbmtjbmNsd2lobWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDEwMDMsImV4cCI6MjA2MDAxNzAwM30.qdRpDzKoHmIBeCjp0o0vUDWE3HviOjsMDtpeL7ZY8ng";

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and key must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
