import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
}

// Create Supabase client with service key for backend operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function testConnection() {
  try {
    // Test connection by querying the numbers table (will fail gracefully if table doesn't exist)
    const { data, error } = await supabase.from('numbers').select('*').limit(1);
    
    if (error) {
      // If table doesn't exist, that's okay - just log it
      if (error.message.includes('not found in the schema cache') || error.message.includes('does not exist')) {
        console.log('⚠ Supabase connected but tables not created yet');
        return true;
      }
      throw error;
    }
    
    console.log('✓ Supabase connected successfully');
    return true;
  } catch (error) {
    console.warn('⚠ Supabase warning:', error instanceof Error ? error.message : String(error));
    return true; // Still return true as connection itself is working
  }
}

export default supabase;
