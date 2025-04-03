import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xruohsdtjgbsepzhjmyv.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydW9oc2R0amdic2VwemhqbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTY1OTQsImV4cCI6MjA1MDA5MjU5NH0.PE1gPtXnzLN8kkrU1ockfs2v9wnuw_ic1SYUCZoqcTY"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
