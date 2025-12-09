import { PhoneNumber, Report } from '../models/PhoneNumber';

// Mock database
const phoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '0123456789',
    riskLevel: 'high',
    riskPercentage: 95,
    fraudType: 'PostNord Bluff',
    reportCount: 1250,
    lastReported: '2025-12-09',
    createdAt: '2025-01-01',
    updatedAt: '2025-12-09',
  },
];

const reports: Report[] = [
  {
    id: '1',
    phoneNumberId: '1',
    content: 'Called me claiming to be PostNord with a delivery issue',
    author: 'Anonymous',
    upvotes: 145,
    downvotes: 2,
    createdAt: '2025-12-08',
  },
];

export async function getPhoneNumber(number: string): Promise<PhoneNumber | null> {
  return phoneNumbers.find(p => p.number === number) || null;
}

export async function searchPhoneNumbers(number: string): Promise<PhoneNumber[]> {
  return phoneNumbers.filter(p => p.number.includes(number));
}

export async function createPhoneNumber(data: Omit<PhoneNumber, 'id' | 'createdAt' | 'updatedAt'>): Promise<PhoneNumber> {
  const phoneNumber: PhoneNumber = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  phoneNumbers.push(phoneNumber);
  return phoneNumber;
}

export async function getReports(phoneNumberId: string): Promise<Report[]> {
  return reports.filter(r => r.phoneNumberId === phoneNumberId);
}

export async function addReport(phoneNumberId: string, content: string, author: string): Promise<Report> {
  const report: Report = {
    id: Date.now().toString(),
    phoneNumberId,
    content,
    author,
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date().toISOString(),
  };
  reports.push(report);
  return report;
}
