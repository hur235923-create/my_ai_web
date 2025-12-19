import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vkmuoeoselujxbvcmhhm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrbXVvZW9zZWx1anhidmNtaGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMTgxMTEsImV4cCI6MjA4MTY5NDExMX0.ZJw_Lrtrjm2H8upY53fO0hZpRw2Hv7VgNHdtK2jqdLY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
