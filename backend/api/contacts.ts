import { ContactSubmission } from '../models/ContactSubmission';

// Mock database
const contacts: ContactSubmission[] = [];

export async function createContact(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<ContactSubmission> {
  const contact: ContactSubmission = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  contacts.push(contact);
  return contact;
}

export async function getContacts(): Promise<ContactSubmission[]> {
  return contacts;
}

export async function updateContactStatus(
  id: string,
  status: 'pending' | 'read' | 'resolved'
): Promise<ContactSubmission | null> {
  const contact = contacts.find(c => c.id === id);
  if (contact) {
    contact.status = status;
    contact.updatedAt = new Date().toISOString();
  }
  return contact || null;
}
