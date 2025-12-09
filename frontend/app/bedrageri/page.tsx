'use client';

import { Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Wallet, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fraudTypes = [
  {
    id: 1,
    name: 'PostNord bluff',
    description: 'Falska SMS om paket som kräver avgift eller tullkostnad. Länkarna leder till bedragarsajter.',
    icon: Package,
    examples: ['SMS om försenat paket', 'Fake avgiftsbetalning', 'Falska leveransöverraskning'],
  },
  {
    id: 2,
    name: 'BankID signering',
    description: 'Bedragare lurar dig att signera med BankID för att få åtkomst till dina pengar eller data.',
    icon: CreditCard,
    examples: ['Fake verifieringssamtal', 'Länk till falsk BankID-sida', 'SMS om säkerhetskontroll'],
  },
  {
    id: 3,
    name: 'Skatteverket bluff',
    description: 'Falska meddelanden som påstår du har pengar att få tillbaka från skatten.',
    icon: Building2,
    examples: ['SMS med falsk skatteråbäring', 'E-post om skatteåterbäring', 'Länk till falsk inloggning'],
  },
  {
    id: 4,
    name: 'Vishing (telefonbedrägerier)',
    description: 'Bedragare ringer och utger sig för att vara från banken, myndigheter eller IT-support.',
    icon: Smartphone,
    examples: ['Samtal från "banken"', 'Falsk IT-support', 'Falsk myndighetsperson'],
  },
  {
    id: 5,
    name: 'Phishing (nätfiske)',
    description: 'Falska e-post och SMS med skadliga länkar som stjäl dina inloggningsuppgifter.',
    icon: Mail,
    examples: ['Falsk e-post från bank', 'SMS med skadlig länk', 'Fake webbutik-länk'],
  },
  {
    id: 6,
    name: 'Försäkringsbedrägerier',
    description: 'Falska meddelanden från försäkringsbolag som kräver personlig information.',
    icon: ShieldAlert,
    examples: ['Falsk försäkringssamtal', 'SMS om försäkringskrav', 'E-post om ersättning'],
  },
  {
    id: 7,
    name: 'Kryptovalutabedrägerier',
    description: 'Bedragare lockar dig att investera i falska kryptovalutor eller "get rich quick"-scheman.',
    icon: Wallet,
    examples: ['Fake investeringsmöjlighet', 'Pump and dump-scheman', 'Falsk krypto-app'],
  },
  {
    id: 8,
    name: 'Kärleksbedrägerier (Romance scam)',
    description: 'Bedragare skapar falska identiteter online för att stjäla pengar från kärleksintresserade.',
    icon: Heart,
    examples: ['Fake dating-profil', 'Penningförfrågan från "älskade"', 'Falsk personlig historia'],
  },
];

export default function Bedrageri() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vanliga bedrägeriarter</h1>
          <p className="text-gray-600 mb-8">Lär dig känna igen de vanligaste bluffarna i Sverige</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            {fraudTypes.map((scam) => {
              const Icon = scam.icon;
              return (
                <div key={scam.id} className="p-6 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{scam.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{scam.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Exempel:</p>
                    <ul className="space-y-1">
                      {scam.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">📋 Rapporterad ofta</p>
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
