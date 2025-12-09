/**
 * API Base URL - connects to Express backend
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

console.log('📡 API Base URL:', API_BASE);

/**
 * Get latest fraud reports for homepage
 */
export async function getLatestReports(limit = 10) {
  try {
    console.log(`🔍 Fetching latest reports (limit: ${limit})...`);
    const response = await fetch(`${API_BASE}/api/numbers/reports/latest?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      console.error(`❌ API error: ${response.status} ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Received ${data?.length || 0} reports`);
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching latest reports:', error);
    return [];
  }
}

/**
 * Get all reports for a specific phone number
 */
export async function getPhoneReports(phoneNumber: string) {
  try {
    const response = await fetch(`${API_BASE}/api/numbers/${encodeURIComponent(phoneNumber)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching reports for ${phoneNumber}:`, error);
    return null;
  }
}

/**
 * Search for fraud reports by phone number
 */
export async function searchReports(query: string) {
  try {
    const response = await fetch(`${API_BASE}/api/numbers/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error searching reports:', error);
    return [];
  }
}

/**
 * Get trending phone numbers
 */
export async function getTrendingNumbers(limit = 10) {
  try {
    const response = await fetch(`${API_BASE}/api/numbers/trending?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending numbers:', error);
    return [];
  }
}

/**
 * Submit a new fraud report
 */
export async function submitReport(phoneNumber: string, fraudType: string, description: string) {
  try {
    const response = await fetch(`${API_BASE}/api/numbers/${encodeURIComponent(phoneNumber)}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: fraudType, message: description }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error submitting report:', error);
    return null;
  }
}

/**
 * Submit contact form
 */
export async function submitContact(name: string, email: string, subject: string, message: string) {
  try {
    const response = await fetch(`${API_BASE}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return null;
  }
}
