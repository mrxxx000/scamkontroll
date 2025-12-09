export interface PhoneNumber {
  id: string;
  number: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskPercentage: number;
  fraudType: string;
  reportCount: number;
  lastReported: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  phoneNumberId: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}
