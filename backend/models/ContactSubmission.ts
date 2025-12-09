export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'resolved';
  createdAt: string;
  updatedAt: string;
}
