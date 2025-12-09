import { supabase } from '../config/supabase';

export async function getPhoneNumber(number: string) {
  try {
    const { data, error } = await supabase
      .from('phone_numbers')
      .select(`
        *,
        reports:phone_reports(*)
      `)
      .eq('number', number)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching phone number:', error);
    throw error;
  }
}

export async function searchPhoneNumbers(query: string) {
  try {
    const { data, error } = await supabase
      .from('phone_numbers')
      .select(`
        *,
        reports:phone_reports(*, count: count())
      `)
      .ilike('number', `%${query}%`)
      .limit(20);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching phone numbers:', error);
    throw error;
  }
}

export async function createPhoneNumber(phoneData: any) {
  try {
    const { data, error } = await supabase
      .from('phone_numbers')
      .insert([{
        number: phoneData.number,
        description: phoneData.description,
        risk_level: phoneData.riskLevel || 'medium',
        total_reports: phoneData.totalReports || 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating phone number:', error);
    throw error;
  }
}

export async function addReport(phoneNumber: string, reportData: any) {
  try {
    // Get phone number ID first
    const { data: phoneData, error: phoneError } = await supabase
      .from('phone_numbers')
      .select('id')
      .eq('number', phoneNumber)
      .single();

    if (phoneError) throw phoneError;

    // Add report
    const { data, error } = await supabase
      .from('phone_reports')
      .insert([{
        phone_number_id: phoneData.id,
        content: reportData.content,
        author: reportData.author,
        upvotes: reportData.upvotes || 0,
        downvotes: reportData.downvotes || 0,
      }])
      .select()
      .single();

    if (error) throw error;

    // Increment report count
    await supabase
      .from('phone_numbers')
      .update({ total_reports: (phoneData.total_reports || 0) + 1 })
      .eq('id', phoneData.id);

    return data;
  } catch (error) {
    console.error('Error adding report:', error);
    throw error;
  }
}

export async function upvoteReport(reportId: string) {
  try {
    const { data, error } = await supabase
      .from('phone_reports')
      .update({ upvotes: (await supabase.from('phone_reports').select('upvotes').eq('id', reportId).single()).data?.upvotes + 1 || 1 })
      .eq('id', reportId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error upvoting report:', error);
    throw error;
  }
}
