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
          
          <div className="prose prose-lg max-w-3xl mb-12">
            <p className="text-lg text-gray-600 mb-6">
              Scamkontroll är Sveriges största databas för rapporterade bluffnummer och bedrägerier. Vi hjälper miljoner svenskar varje månad att identifiera farliga samtal och SMS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600">Rapporterade bluffnummer</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">100,000+</div>
              <p className="text-gray-600">Sökningar per månad</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Träffsäkerhet</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Vår Mission</h2>
          <div className="space-y-4 mb-12">
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-600">Skydda svenskar från bluff och bedrägerier genom att dela information</p>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-600">Ge verktyg för att verifiера telefonnummer och SMS</p>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-600">Utbilda om vanliga bedrägerier och hur man skyddar sig</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Hur vi arbetar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Rapportörer</h3>
              <p className="text-gray-600">Användare rapporterar misstänkta nummer och bedrägerier i realtid</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Verifiering</h3>
              <p className="text-gray-600">Vi verifierar rapporter och tar bort falska anmälningar</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Databas</h3>
              <p className="text-gray-600">Alla verifierade nummer läggs in i vår databas</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Sökning</h3>
              <p className="text-gray-600">Användare kan söka för att avgöra om ett nummer är säkert</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
