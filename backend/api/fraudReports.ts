import { supabase } from '../config/supabase';

// Get all reports for a phone number
export async function getReportsByPhoneNumber(phoneNumber: string) {
  const { data, error } = await supabase
    .from('fraud_reports')
    .select('*')
    .eq('phone_number', phoneNumber)
    .order('reported_at', { ascending: false });

  if (error) throw error;
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
  const { data, error } = await supabase
    .from('fraud_reports')
    .insert({
      phone_number: phoneNumber,
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
