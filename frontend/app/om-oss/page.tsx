'use client';

import { CheckCircle, Shield, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OmOss() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div>
          <section className="max-w-3xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-4">Om Scamkontroll</h2>
            <p className="text-gray-700 mb-6">
              Scamkontroll är en tjänst som samlar in rapporter om misstänkta bluffar, bedrägerier och falska meddelanden.
              Målet är att hjälpa användare att snabbt förstå om ett nummer, SMS eller meddelande kan vara farligt.
            </p>

            {/* Quick links: responsive icon cards placed right after main prose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <a href="/rapportera" className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
                <CheckCircle className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Rapporter</div>
                  <div className="text-xs text-gray-500">Skicka in ett misstänkt nummer eller meddelande</div>
                </div>
              </a>

              <a href="/bedrageri" className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
                <Shield className="h-6 w-6 text-green-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Vanliga bedrägerier</div>
                  <div className="text-xs text-gray-500">Utforska kategorier och exempel</div>
                </div>
              </a>

              <a href="/" className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
                <Users className="h-6 w-6 text-purple-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Sök nummer</div>
                  <div className="text-xs text-gray-500">Hitta rapporter för ett telefonnummer</div>
                </div>
              </a>

              <a href="/artiklar" className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-colors">
                <TrendingUp className="h-6 w-6 text-yellow-600 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Artiklar och Guide</div>
                  <div className="text-xs text-gray-500">Praktiska exempel för att känna igen bluff</div>
                </div>
              </a>
            </div>

            <h3 className="text-xl font-semibold mt-8">Vad vi visar</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Rapporter från användare</li>
              <li>Vanliga typer av bedrägerier</li>
              <li>Exempel och varningar</li>
              <li>Sammanställd information för att underlätta egna bedömningar</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8">Vår mission</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Hjälpa människor att känna igen och undvika bedrägerier</li>
              <li>Göra det enkelt att kontrollera misstänkta meddelanden</li>
              <li>Sprida kunskap om hur moderna bluffar fungerar</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8">Hur vi arbetar</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                <h4 className="font-semibold mb-1">1. Rapportering</h4>
                <p className="text-gray-600">Användare skickar in rapporter om misstänkta samtal, länkar och SMS.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <h4 className="font-semibold mb-1">2. Granskning</h4>
                <p className="text-gray-600">Rapporter kontrolleras och felaktiga anmälningar tas bort.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <h4 className="font-semibold mb-1">3. Databas</h4>
                <p className="text-gray-600">Godkända rapporter sparas i databasen.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <h4 className="font-semibold mb-1">4. Sökning</h4>
                <p className="text-gray-600">Besökare kan söka för att hitta relevanta rapporter.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
