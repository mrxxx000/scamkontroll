export async function fetchFraudTypes() {
  const response = await fetch('/api/fraud-types');
  if (!response.ok) throw new Error('Failed to fetch fraud types');
  return response.json();
}

export async function fetchFraudType(slug: string) {
  const response = await fetch(`/api/fraud-types?slug=${slug}`);
  if (!response.ok) throw new Error('Failed to fetch fraud type');
  return response.json();
}

export async function fetchPhoneNumber(number: string) {
  const response = await fetch(`/api/phone-numbers?number=${number}`);
  if (!response.ok) throw new Error('Failed to fetch phone number');
  return response.json();
}

export async function searchPhoneNumbers(query: string) {
  const response = await fetch(`/api/phone-numbers?search=${query}`);
  if (!response.ok) throw new Error('Failed to search phone numbers');
  return response.json();
}

export async function submitReport(phoneNumberId: string, content: string, author?: string) {
  const response = await fetch('/api/phone-numbers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumberId, content, author }),
  });
  if (!response.ok) throw new Error('Failed to submit report');
  return response.json();
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
