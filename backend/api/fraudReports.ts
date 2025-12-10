import { supabase } from '../config/supabase';

// Get all reports for a phone number
export async function getReportsByPhoneNumber(phoneNumber: string) {
  console.log(`\n========== getReportsByPhoneNumber START ==========`);
  console.log(`Input: "${phoneNumber}"`);
  
  // Simply try to match as-is, with +46, and with wildcard
  const searches = [
    phoneNumber,
    '+46' + phoneNumber.replace(/\D/g, ''),
    '+' + phoneNumber.replace(/\D/g, ''),
  ];
  
  for (const searchTerm of searches) {
    console.log(`Trying search: "${searchTerm}"`);
    
    const { data, error } = await supabase
      .from('fraud_reports')
      .select('*')
      .eq('phone_number', searchTerm)
      .order('reported_at', { ascending: false });

    if (error) {
      console.log(`  Error: ${error.message}`);
      continue;
    }
    
    if (data && data.length > 0) {
      console.log(`  ✅ Found ${data.length} reports!`);
      console.log(`========== getReportsByPhoneNumber END ==========\n`);
      return data;
    } else {
      console.log(`  No match`);
    }
  }
  
  // Fallback: try wildcard search
  console.log(`Trying wildcard search...`);
  const digits = phoneNumber.replace(/\D/g, '');
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('*')
    .ilike('phone_number', `%${digits}%`)
    .order('reported_at', { ascending: false });

  if (error) {
    console.log(`  Wildcard error: ${error.message}`);
  } else if (data && data.length > 0) {
    console.log(`  ✅ Wildcard found ${data.length} reports!`);
  } else {
    console.log(`  Wildcard: No match`);
  }
  
  console.log(`========== getReportsByPhoneNumber END ==========\n`);
  return data || [];
}

// Get latest fraud reports (for homepage)
export async function getLatestReports(limit = 10) {
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('*')
    .order('reported_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Get all unique phone numbers with their report counts
export async function getAllPhoneNumbers() {
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('phone_number, fraud_type, reported_at')
    .order('reported_at', { ascending: false });

  if (error) throw error;

  // Group by phone number and count
  const grouped = new Map<string, any>();
  
  (data || []).forEach((report: any) => {
    if (!grouped.has(report.phone_number)) {
      grouped.set(report.phone_number, {
        phone_number: report.phone_number,
        total_reports: 0,
        latest_fraud_type: report.fraud_type,
        last_reported_at: report.reported_at,
      });
    }
    const entry = grouped.get(report.phone_number);
    entry.total_reports += 1;
  });

  return Array.from(grouped.values());
}

// Get trending phone numbers (most reported)
export async function getTrendingPhoneNumbers(limit = 10) {
  const allPhones = await getAllPhoneNumbers();
  
  return allPhones
    .sort((a, b) => b.total_reports - a.total_reports)
    .slice(0, limit)
    .map((phone, idx) => ({
      ...phone,
      rank: idx + 1,
      trend: idx === 0 ? '+15%' : idx === 1 ? '+12%' : `+${Math.max(1, 15 - idx * 2)}%`,
    }));
}

// Submit a new fraud report
export async function submitFraudReport(
  phoneNumber: string,
  fraudType: string,
  description: string,
  source = 'user-submitted'
) {
  // Normalize phone number to +46 format
  let normalized = phoneNumber.trim();
  
  // If already has +46, use as-is
  if (normalized.startsWith('+46')) {
    // Already normalized
  } else {
    // Remove all non-digits
    normalized = normalized.replace(/\D/g, '');
    
    // If it starts with 46 (without +), add +
    if (normalized.startsWith('46')) {
      normalized = '+' + normalized;
    } else {
      // Otherwise assume Swedish number and add +46
      normalized = '+46' + normalized;
    }
  }
  
  console.log(`📱 Normalized phone number: ${phoneNumber} → ${normalized}`);
  
  const { data, error } = await supabase
    .from('fraud_reports')
    .insert({
      phone_number: normalized,
      fraud_type: fraudType,
      description,
      source,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Search fraud reports by phone number
export async function searchFraudReports(phoneNumber: string) {
  // Normalize phone number
  const normalized = phoneNumber.replace(/\D/g, '');
  
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('*')
    .ilike('phone_number', `%${normalized}%`)
    .order('reported_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Get fraud type statistics
export async function getFraudTypeStats() {
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('fraud_type');

  if (error) throw error;

  // Count by fraud type
  const counts = new Map<string, number>();
  
  (data || []).forEach((report: any) => {
    counts.set(report.fraud_type, (counts.get(report.fraud_type) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

// Get all reports for a specific fraud type/category
export async function getReportsByType(type: string) {
  if (!type) return [];

  // Try exact match first
  try {
    let { data, error } = await supabase
      .from('fraud_reports')
      .select('*')
      .eq('fraud_type', type)
      .order('reported_at', { ascending: false });

    if (!error && data && data.length > 0) return data;

    // Try case-insensitive / partial match
    ({ data, error } = await supabase
      .from('fraud_reports')
      .select('*')
      .ilike('fraud_type', `%${type}%`)
      .order('reported_at', { ascending: false }));

    if (!error && data && data.length > 0) return data;

    // Fallback: normalize (remove dashes/spaces) and try partial match on normalized string
    const norm = String(type).toLowerCase().replace(/[-_\s]+/g, '');
    ({ data, error } = await supabase
      .from('fraud_reports')
      .select('*')
      .ilike('fraud_type', `%${norm}%`)
      .order('reported_at', { ascending: false }));

    if (!error && data) return data || [];
  } catch (err) {
    console.error('Error fetching reports by type:', err);
  }

  return [];
}

// Track search - increment search_count for a phone number
export async function trackSearch(phoneNumber: string) {
  // Don't track invalid phone numbers
  if (!phoneNumber || phoneNumber.length < 5) {
    console.log('⚠️  Skipping search tracking for invalid number:', phoneNumber);
    return null;
  }

  try {
    // Normalize phone number using same logic as submitFraudReport
    let normalized = phoneNumber.trim();
    
    // If already has +46, use as-is
    if (normalized.startsWith('+46')) {
      // Already normalized
    } else {
      // Remove all non-digits
      normalized = normalized.replace(/\D/g, '');
      
      // If it starts with 46 (without +), add +
      if (normalized.startsWith('46')) {
        normalized = '+' + normalized;
      } else {
        normalized = '+46' + normalized;
      }
    }
    
    console.log(`📱 Tracking search - normalized: ${phoneNumber} → ${normalized}`);

    // Try to find existing report
    const { data: existing, error: selectError } = await supabase
      .from('fraud_reports')
      .select('*')
      .eq('phone_number', normalized);

    if (selectError) {
      console.error('❌ Error fetching reports:', selectError);
      return null;
    }

    if (!existing || existing.length === 0) {
      console.log(`ℹ️  No reports found for ${normalized}, not tracking search`);
      return null;
    }

    // Update ALL reports for this phone number - increment their search_count
    const newSearchCount = (existing[0].search_count || 0) + 1;
    const { error: updateError } = await supabase
      .from('fraud_reports')
      .update({ search_count: newSearchCount })
      .eq('phone_number', normalized);

    if (updateError) {
      console.error('❌ Error updating search count:', updateError);
      throw updateError;
    }

    console.log(`✅ Tracked search for ${normalized}, new count: ${newSearchCount} (updated ${existing.length} reports)`);
    return existing[0]; // Return first report as representative
  } catch (error) {
    console.error('Error tracking search:', error);
    return null;
  }
}

// Get most searched phone numbers
export async function getMostSearched(limit = 10) {
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('*')
    .order('search_count', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
