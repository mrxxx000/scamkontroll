import { supabase } from '../config/supabase';

export async function getFraudTypeCounts() {
  try {
    const { data, error } = await supabase
      .from('fraud_reports')
      .select('fraud_type');

    if (error) throw error;

    const counts = new Map<string, number>();
    (data || []).forEach((r: any) => {
      const t = r.fraud_type || 'unknown';
      counts.set(t, (counts.get(t) || 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error fetching fraud type counts:', error);
    throw error;
  }
}
