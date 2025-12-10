import {
  Package,
  CreditCard,
  Building2,
  Smartphone,
  Mail,
  ShieldAlert,
  Phone,
  AlertTriangle,
} from 'lucide-react';

// Mapping from common fraud type titles or slugs to icon components
const fraudTypeIcons: Record<string, any> = {
  'postnord-bluff': Package,
  'postnord bluff': Package,
  'bankid-bedrageri': CreditCard,
  'bankid-bedrägeri': CreditCard,
  'bankid': CreditCard,
  'skatteverket-bluff': Building2,
  'vishing': Smartphone,
  'vishing (telefonbedrägerier)': Smartphone,
  'smishing': Mail,
  'smishing (sms-bedrägeri)': Mail,
  'kodkapning': ShieldAlert,
  'phishing': Mail,
  'phishing / falska länkar': Mail,
  'investeringsbedrageri': ShieldAlert,
  'investeringsbedrägeri': ShieldAlert,
  'tech-support-bedrageri': Package,
  'tech-support-bedrägeri': Package,
  'marketplace-bedrageri': Package,
  'blocket / marketplace-bedrägeri': Package,
  'vinstbedrageri': CreditCard,
  'vinstbedrägeri': CreditCard,
  'fakturabedrageri': CreditCard,
  'fakturabedrägeri': CreditCard,
  'romance-scam': ShieldAlert,
  'romance scam': ShieldAlert,
  'jobb-hyres-bedrageri': ShieldAlert,
  'jobb- eller hyresbedrägeri': ShieldAlert,
  'identitetsstod': ShieldAlert,
  'identitetsstöld': ShieldAlert,
  'ping-call': Phone,
  'ping call / wangiri': Phone,
  'default': AlertTriangle,
};

function normalizeKey(key?: string) {
  if (!key) return '';
  return String(key).toLowerCase().replace(/[\s_]+/g, ' ').replace(/[-]+/g, '-').trim();
}

export function getIconForType(key?: string) {
  const k = normalizeKey(key);
  if (!k) return fraudTypeIcons.default;

  // direct match
  if (fraudTypeIcons[k]) return fraudTypeIcons[k];

  // try without spaces / normalized
  const compact = k.replace(/[\s/]+/g, '-');
  if (fraudTypeIcons[compact]) return fraudTypeIcons[compact];

  // fallback to default
  return fraudTypeIcons.default;
}

export default fraudTypeIcons;
