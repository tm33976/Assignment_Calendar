
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fhjzxcoinkcnclwihmdl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanp4Y29pbmtjbmNsd2lobWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDEwMDMsImV4cCI6MjA2MDAxNzAwM30.qdRpDzKoHmIBeCjp0o0vUDWE3HviOjsMDtpeL7ZY8ng";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
