export interface FraudType {
  id: string;
  name: string;
  slug: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
  icon: string;
  reportCount: number;
  safetyTips: string[];
  createdAt: string;
  updatedAt: string;
}
