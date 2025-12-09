import { supabase } from '../config/supabase';

export async function getAllFraudTypes() {
  try {
    const { data, error } = await supabase
      .from('fraud_types')
      .select('*')
      .order('report_count', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching fraud types:', error);
    throw error;
  }
}

export async function getFraudType(slug: string) {
  try {
    const { data, error } = await supabase
      .from('fraud_types')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data || null;
  } catch (error) {
    console.error('Error fetching fraud type:', error);
    throw error;
  }
}

export async function createFraudType(fraudType: any) {
  try {
    const { data, error } = await supabase
      .from('fraud_types')
      .insert([{
        name: fraudType.name,
        slug: fraudType.slug,
        description: fraudType.description,
        severity: fraudType.severity,
        icon: fraudType.icon,
        report_count: fraudType.reportCount || 0,
        safety_tips: fraudType.safetyTips || [],
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating fraud type:', error);
    throw error;
  }
}

export async function updateFraudType(slug: string, fraudType: any) {
  try {
    const { data, error } = await supabase
      .from('fraud_types')
      .update({
        name: fraudType.name,
        description: fraudType.description,
        severity: fraudType.severity,
        icon: fraudType.icon,
        report_count: fraudType.reportCount,
        safety_tips: fraudType.safetyTips,
      })
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating fraud type:', error);
    throw error;
  }
}
