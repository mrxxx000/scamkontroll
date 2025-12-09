'use client';

import { useEffect, useState } from 'react';
import { Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Wallet, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const iconMap: { [key: string]: any } = {
  'PostNord': Package,
  'BankID': CreditCard,
  'Skatteverket': Building2,
  'Vishing': Smartphone,
  'Phishing': Mail,
  'Försäkring': ShieldAlert,
  'Krypto': Wallet,
  'Kärleks': Heart,
};

export default function Bedrageri() {
  const [scamTypes, setScamTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/fraud-types`);
        if (!response.ok) throw new Error('Failed to fetch fraud types');
        const data = await response.json();
        setScamTypes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600">Laddar...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <p className="text-center text-red-600">Fel: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vanliga bedrägeriarter</h1>
          <p className="text-gray-600 mb-8">Lär dig känna igen de vanligaste bluffarna i Sverige</p>
          
          <div className="grid gap-4">
            {scamTypes.map((scam) => {
              const IconKey = Object.keys(iconMap).find(key => scam.name?.includes(key)) || 'Phishing';
              const Icon = iconMap[IconKey];
              return (
                <div key={scam.id} className="p-6 border rounded-lg bg-white hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{scam.name}</h3>
                      <p className="text-gray-600">{scam.description}</p>
                      <p className="text-sm text-gray-500 mt-2">{scam.reportCount?.toLocaleString('sv-SE') || 0} rapporter</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scam.severity === 'high' || scam.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {scam.severity === 'critical' ? 'Kritisk' : scam.severity === 'high' ? 'Hög risk' : 'Medelhög'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
