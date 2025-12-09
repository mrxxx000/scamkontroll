import { supabase } from '../config/supabase';

export async function createContact(contactData: any) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
        subject: contactData.subject,
        status: 'new',
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

export async function getContacts(status?: string) {
  try {
    let query = supabase.from('contacts').select('*');

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function updateContactStatus(id: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
}
