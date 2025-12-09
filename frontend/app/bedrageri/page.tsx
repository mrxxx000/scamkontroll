'use client';

import { Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Wallet, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const scamTypes = [
  { icon: Package, title: "PostNord bluff", description: "Falska SMS om paket", reports: 15234, severity: "high" },
  { icon: CreditCard, title: "BankID signering", description: "Bedragare lurar dig att signera", reports: 12456, severity: "high" },
  { icon: Building2, title: "Skatteverket bluff", description: "Falska meddelanden om skatt", reports: 8765, severity: "high" },
  { icon: Smartphone, title: "Vishing", description: "Telefonbedrägerier", reports: 7543, severity: "high" },
  { icon: Mail, title: "Phishing", description: "Nätfiske via e-post och SMS", reports: 6234, severity: "medium" },
  { icon: ShieldAlert, title: "Försäkringsbedrägerier", description: "Falska försäkringsmeddelanden", reports: 4321, severity: "medium" },
  { icon: Wallet, title: "Kryptobedrägerier", description: "Falska investeringserbjudanden", reports: 3456, severity: "medium" },
  { icon: Heart, title: "Kärleksbedrägerier", description: "Romantiska kontakter som ber om pengar", reports: 2345, severity: "medium" },
];

export default function Bedrageri() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vanliga bedrägeriarter</h1>
          <p className="text-gray-600 mb-8">Lär dig känna igen de vanligaste bluffarna i Sverige</p>
          
          <div className="grid gap-4">
            {scamTypes.map((scam) => {
              const Icon = scam.icon;
              return (
                <div key={scam.title} className="p-6 border rounded-lg bg-white hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{scam.title}</h3>
                      <p className="text-gray-600">{scam.description}</p>
                      <p className="text-sm text-gray-500 mt-2">{scam.reports.toLocaleString('sv-SE')} rapporter</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scam.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {scam.severity === 'high' ? 'Hög risk' : 'Medelhög'}
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
