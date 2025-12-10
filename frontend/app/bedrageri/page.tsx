'use client';

import { Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Wallet, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const fraudTypes = [
  {
    id: 1,
    name: '📦 PostNord-bluff',
    description:
      'Falska SMS som påstår att ett paket är försenat eller fastnat i tull. Länkarna leder till falska betalningssidor där bedragare försöker stjäla kortuppgifter.',
    icon: Package,
    examples: ['SMS om försenat paket', 'Krav på “tullavgift”', 'Falska leveransöverraskningar'],
  },
  {
    id: 2,
    name: '🔐 BankID-signering',
    description:
      'Bedragare lurar dig att signera med BankID för att få åtkomst till ditt bankkonto eller din privata information.',
    icon: CreditCard,
    examples: ['Fake verifieringssamtal', 'Länk till falsk BankID-sida', 'SMS om “säkerhetskontroll”'],
  },
  {
    id: 3,
    name: '💸 Skatteverket-bluff',
    description:
      'Falska meddelanden som påstår att du har pengar att få tillbaka från skatten. När du klickar på länken kommer du till en falsk inloggningssida.',
    icon: Building2,
    examples: ['SMS om skatteåterbäring', 'Falsk återbetalning via e-post', 'Länk till falsk BankID-inloggning'],
  },
  {
    id: 4,
    name: '📞 Vishing (telefonbedrägerier)',
    description:
      'Bedragare ringer och påstår sig vara från banken, myndigheter eller IT-support för att få dig att lämna ut uppgifter.',
    icon: Smartphone,
    examples: ['Samtal från “banken”', 'Falskt IT-supportsamtal', 'Falsk myndighetsperson'],
  },
  {
    id: 5,
    name: '✉️ Phishing (nätfiske)',
    description:
      'Falska e-postmeddelanden och SMS med skadliga länkar som stjäl dina inloggningsuppgifter eller bankdetaljer.',
    icon: Mail,
    examples: ['Falsk e-post från bank', 'SMS med misstänkt länk', 'Fake webbutik'],
  },
  {
    id: 6,
    name: '🛡️ Försäkringsbedrägerier',
    description:
      'Falska meddelanden som utger sig för att komma från försäkringsbolag och försöker få dig att lämna ut personuppgifter.',
    icon: ShieldAlert,
    examples: ['Falskt försäkringssamtal', 'SMS om “ersättning”', 'E-post som kräver personuppgifter'],
  },
  {
    id: 7,
    name: '🪙 Kryptovalutabedrägerier',
    description: 'Bedragare lockar dig att investera i falska projekt, appar eller snabba vinster.',
    icon: Wallet,
    examples: ['Fake investeringsmöjligheter', 'Pump-and-dump-scheman', 'Falska kryptoappar'],
  },
  {
    id: 8,
    name: '❤️ Kärleksbedrägerier (Romance scam)',
    description:
      'Bedragare skapar falska profiler och bygger förtroende för att senare be om pengar eller gåvor.',
    icon: Heart,
    examples: ['Fejkade datingprofiler', 'Förfrågan om pengar', 'Uppdiktade livshistorier'],
  },
];

export default function Bedrageri() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vanliga bedrägeriarter</h1>
          <p className="text-gray-600 mb-8">Lär dig känna igen de vanligaste bluffarna i Sverige.</p>

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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-between">
              <div>
                <p className="text-base mb-2 font-medium">Vill du kontrollera om ett nummer är bluff?</p>
                <p className="text-sm text-gray-700 mb-4">Skriv numret i sökfältet högst upp på sidan.</p>
              </div>
              <div>
                <button
                  onClick={() => router.push('/#search')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kontrollera
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-between">
              <div>
                <p className="text-base mb-2 font-medium">Vill du rapportera bluff?</p>
                <p className="text-sm text-gray-700 mb-4">Hjälp andra genom att anmäla bluffen till oss.</p>
              </div>
              <div>
                <button
                  onClick={() => router.push('/rapportera')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Rapportera bluff
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
