const API_BASE = 'http://localhost:5000';

export async function fetchLatestReports(limit = 10) {
  try {
    console.log('🔍 Fetching latest reports from', `${API_BASE}/api/numbers/reports/latest?limit=${limit}`);
    const response = await fetch(`${API_BASE}/api/numbers/reports/latest?limit=${limit}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log('✅ Received', data?.length || 0, 'reports');
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching reports:', error);
    return [];
  }
}

export async function fetchFraudTypes() {
  // The `/api/fraud-types` endpoint was removed in favor of counts.
  // Return an empty list so frontend falls back to its static type list.
  return [];
}

export async function fetchFraudType(_slug: string) {
  // Try the backend per-type reports endpoint. Returns { reports: [...] } on success.
  try {
    const response = await fetch(`${API_BASE}/api/fraud-type-reports?type=${encodeURIComponent(_slug)}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    // Expect { reports: [...] }
    return data;
  } catch (error) {
    console.warn('fetchFraudType failed:', error);
    return null;
  }
}

export async function fetchPhoneNumber(number: string) {
  try {
    console.log('🔍 Fetching phone number from backend:', number);
    const response = await fetch(`${API_BASE}/api/numbers/${encodeURIComponent(number)}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log('✅ Received phone data:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching phone number:', error);
    return null;
  }
}

export async function searchPhoneNumbers(query: string) {
  try {
    console.log('🔍 Searching phone numbers:', query);
    const response = await fetch(`${API_BASE}/api/numbers/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log('✅ Search results:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error searching phone numbers:', error);
    return [];
  }
}

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

export async function getMostSearched(limit = 10) {
  try {
    console.log('🔍 Fetching most searched numbers from', `${API_BASE}/api/numbers/most-searched?limit=${limit}`);
    const response = await fetch(`${API_BASE}/api/numbers/most-searched?limit=${limit}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log('✅ Received', data?.length || 0, 'most searched numbers');
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching most searched numbers:', error);
    return [];
  }
}

export async function submitContact(name: string, email: string, subject: string, message: string) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
  return response.json();
}
