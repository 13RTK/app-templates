import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL || '';

// TODO: set your own supabase key
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
