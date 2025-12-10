'use client';

import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OmOss() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Om Scamkontroll</h1>

          <div className="prose prose-lg max-w-3xl mb-8">
            <p className="text-lg text-gray-600">
              Scamkontroll är en tjänst som samlar in rapporter om misstänkta bluffar, bedrägerier och falska meddelanden. Målet är att hjälpa användare att snabbt förstå om ett nummer, SMS eller meddelande kan vara farligt.
            </p>

            <h2>Vad vi visar</h2>
            <ul>
              <li>Rapporter från användare</li>
              <li>Vanliga typer av bedrägerier</li>
              <li>Exempel och varningar</li>
              <li>Sammanställd information för att underlätta egna bedömningar</li>
            </ul>

            <h2>Vår mission</h2>
            <ul>
              <li>Hjälpa människor att känna igen och undvika bedrägerier</li>
              <li>Göra det enkelt att kontrollera misstänkta meddelanden</li>
              <li>Sprida kunskap om hur moderna bluffar fungerar</li>
            </ul>

            <h2>Hur vi arbetar</h2>

            <h3>Rapportering</h3>
            <p>Användare skickar in rapporter om misstänkta samtal, länkar, SMS och andra bedrägeriförsök.</p>

            <h3>Granskning</h3>
            <p>Rapporter kontrolleras och uppenbart felaktiga eller dubbla anmälningar tas bort.</p>

            <h3>Databas</h3>
            <p>Godkända rapporter sparas så att andra användare kan se informationen.</p>

            <h3>Sökning</h3>
            <p>Besökare kan söka på nummer eller kategorier för att hitta relevanta rapporter.</p>
          </div>

          {/* Quick links: small styled boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <a href="/rapportera" className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold">Rapportera</div>
                  <div className="text-xs text-gray-500">Skicka in ett misstänkt nummer eller meddelande</div>
                </div>
              </div>
            </a>

            <a href="/bedrageri" className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <div className="text-sm font-semibold">Vanliga bedrägerier</div>
                  <div className="text-xs text-gray-500">Utforska kategorier och exempel</div>
                </div>
              </div>
            </a>

            <a href="/" className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-purple-600" />
                <div>
                  <div className="text-sm font-semibold">Sök nummer</div>
                  <div className="text-xs text-gray-500">Hitta rapporter för ett telefonnummer</div>
                </div>
              </div>
            </a>

            <a href="/bedrageri" className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
                <div>
                  <div className="text-sm font-semibold">Exempel & Varningar</div>
                  <div className="text-xs text-gray-500">Praktiska exempel för att känna igen bluff</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
