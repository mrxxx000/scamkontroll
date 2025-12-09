import { FraudType } from '../models/FraudType';

// Mock database
const fraudTypes: FraudType[] = [
  {
    id: '1',
    name: 'PostNord Bluff',
    slug: 'postnord-bluff',
    description: 'Scammers pretend to be PostNord delivery service claiming you have a package',
    severity: 'high',
    icon: 'Package',
    reportCount: 5420,
    safetyTips: [
      'PostNord never asks for payment via phone',
      'Check your PostNord account directly instead of clicking links',
      'Verify the number on official PostNord website',
      'Never provide personal information over the phone',
      'Report suspicious calls immediately',
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-12-09',
  },
  {
    id: '2',
    name: 'BankID Bluff',
    slug: 'bankid-bluff',
    description: 'Criminals pose as banks requesting BankID confirmation or account details',
    severity: 'critical',
    icon: 'CreditCard',
    reportCount: 8932,
    safetyTips: [
      'Your bank will never ask for BankID codes via phone',
      'Close the call and call your bank directly',
      'Never share your personal ID number',
      'Banks use official channels, not random calls',
      'Report to police and your bank immediately',
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-12-09',
  },
  {
    id: '3',
    name: 'Skatteverket Bluff',
    slug: 'skatteverket-bluff',
    description: 'Fake tax authority calls claiming you owe money or have outstanding taxes',
    severity: 'high',
    icon: 'FileText',
    reportCount: 6750,
    safetyTips: [
      'Skatteverket contacts via postal mail first',
      'Never provide personal data to unknown callers',
      'Verify through official Skatteverket website',
      'Legitimate debt is always sent in writing',
      'Contact Skatteverket directly if unsure',
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-12-09',
  },
];

export async function getAllFraudTypes(): Promise<FraudType[]> {
  return fraudTypes;
}

export async function getFraudType(slug: string): Promise<FraudType | null> {
  return fraudTypes.find(f => f.slug === slug) || null;
}

export async function createFraudType(data: Omit<FraudType, 'id' | 'createdAt' | 'updatedAt'>): Promise<FraudType> {
  const fraudType: FraudType = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fraudTypes.push(fraudType);
  return fraudType;
}
