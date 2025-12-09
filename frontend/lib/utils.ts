export function formatPhoneNumber(number: string): string {
  return number.replace(/\D/g, '');
}

export function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'just nu';
  if (minutes < 60) return `${minutes}m sedan`;
  if (hours < 24) return `${hours}h sedan`;
  if (days < 7) return `${days}d sedan`;
  
  return past.toLocaleDateString('sv-SE');
}

export function getRiskColor(percentage: number): string {
  if (percentage >= 80) return '#dc2626'; // red
  if (percentage >= 50) return '#f59e0b'; // yellow
  return '#10b981'; // green
}
