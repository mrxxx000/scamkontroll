import { supabase } from '../config/supabase';

// Get a phone number by phone string
export async function getPhoneNumber(phone: string) {
  const { data, error } = await supabase
    .from('numbers')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error && error.code === 'PGRST116') {
    // Not found
    return null;
  }

  if (error) throw error;
  return data;
}

// Create a new phone number
export async function createPhoneNumber(phone: string) {
  const { data, error } = await supabase
    .from('numbers')
    .insert({ phone })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get or create a phone number
export async function getOrCreatePhoneNumber(phone: string) {
  let number = await getPhoneNumber(phone);
  
  if (!number) {
    number = await createPhoneNumber(phone);
  }

  return number;
}

// Increase search count for a phone number (via RPC or direct update)
export async function increaseSearchCount(phone: string) {
  try {
    // Try RPC first
    const { data, error } = await supabase
      .rpc('increase_search_count', { number_phone: phone });

    if (!error) return data;
  } catch (err) {
    // RPC might not exist, fall through to direct update
    console.warn('RPC not available, using direct update');
  }

  // Fallback: direct update if RPC doesn't exist
  try {
    const { error } = await supabase
      .from('numbers')
      .update({ search_count: supabase.rpc('count') })
      .eq('phone', phone);

    if (error) {
      // Even simpler fallback - just fetch and increment
      const { data: num } = await supabase
        .from('numbers')
        .select('search_count')
        .eq('phone', phone)
        .single();

      if (num) {
        await supabase
          .from('numbers')
          .update({ search_count: (num.search_count || 0) + 1 })
          .eq('phone', phone);
      }
    }
  } catch (err) {
    console.warn('Could not update search count:', err);
    // Don't throw - this is not critical
  }
}

// Get all reports for a phone number
export async function getPhoneNumberReports(numberId: number) {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('number_id', numberId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Get latest reported scams (for homepage)
export async function getLatestReports(limit = 10) {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      id,
      category,
      message,
      created_at,
      number_id,
      numbers:number_id(
        id,
        phone,
        total_reports,
        risk_level
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Get trending numbers (most searched today)
export async function getTrendingNumbers(limit = 10) {
  // First try to get from trending table
  const { data, error } = await supabase
    .from('trending')
    .select(`
      id,
      searches_today,
      delta,
      numbers:number_id(
        id,
        phone,
        total_reports,
        risk_level
      )
    `)
    .order('searches_today', { ascending: false })
    .limit(limit);

  if (error && !error.message.includes('no rows')) {
    // If it's a real error (not just empty table), throw it
    console.error('Trending error:', error);
  }

  // If no trending data, fallback to most reported numbers
  if (!data || data.length === 0) {
    const { data: topNumbers, error: topError } = await supabase
      .from('numbers')
      .select('*')
      .gt('total_reports', 0)
      .order('total_reports', { ascending: false })
      .limit(limit);

    if (topError) throw topError;

    // Format as trending response
    return (topNumbers || []).map((num: any, idx: number) => ({
      id: num.id,
      number_id: num.id,
      searches_today: num.search_count || 0,
      delta: idx === 0 ? 0 : -5,
      numbers: num,
    }));
  }

  return data || [];
}

// Submit a new report for a phone number
export async function submitReport(
  numberId: number,
  category: string,
  message: string
) {
  // Insert the report
  const { data: report, error: reportError } = await supabase
    .from('reports')
    .insert({
      number_id: numberId,
      category,
      message,
    })
    .select()
    .single();

  if (reportError) throw reportError;

  // Update the number's total_reports and risk_level
  const { data: number, error: fetchError } = await supabase
    .from('numbers')
    .select('total_reports')
    .eq('id', numberId)
    .single();

  if (fetchError) throw fetchError;

  const newTotalReports = (number?.total_reports || 0) + 1;
  let riskLevel = 'LOW';
  if (newTotalReports > 20) riskLevel = 'HIGH';
  else if (newTotalReports > 5) riskLevel = 'MEDIUM';

  const { error: updateError } = await supabase
    .from('numbers')
    .update({
      total_reports: newTotalReports,
      last_reported_at: new Date().toISOString(),
      risk_level: riskLevel,
    })
    .eq('id', numberId);

  if (updateError) throw updateError;

  return report;
}

// Like/upvote a report
export async function likeReport(reportId: number) {
  // First get the current likes count
  const { data: report, error: fetchError } = await supabase
    .from('reports')
    .select('likes')
    .eq('id', reportId)
    .single();

  if (fetchError) throw fetchError;

  // Update with incremented likes
  const { data, error } = await supabase
    .from('reports')
    .update({ likes: (report?.likes || 0) + 1 })
    .eq('id', reportId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Search phone numbers (with fuzzy matching if needed)
export async function searchPhoneNumbers(query: string, limit = 5) {
  const { data, error } = await supabase
    .from('numbers')
    .select('*')
    .ilike('phone', `%${query}%`)
    .order('total_reports', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
