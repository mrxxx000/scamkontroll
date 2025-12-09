'use client';

import { Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const articles = [
  {
    title: "10 tips för att undvika bluffnummer",
    description: "Lär dig de viktigaste säkerhetsåtgärderna för att skydda dig mot telefonnummer-bedrägerier.",
    readTime: "5 min",
    date: "9 dec 2025",
    category: "Guide"
  },
  {
    title: "Hur återställer du ditt BankID efter ett bedrägeriforsök?",
    description: "Stegvis guide för att säkra ditt konto om du har varit utsatt för BankID-bluff.",
    readTime: "8 min",
    date: "8 dec 2025",
    category: "Guide"
  },
  {
    title: "PostNord bluff: Så skyddar du dig",
    description: "Allt du behöver veta om de falska PostNord-SMS som cirkulerar i Sverige.",
    readTime: "6 min",
    date: "7 dec 2025",
    category: "Bedrageri"
  },
  {
    title: "Vad gör du om du blir bluffad?",
    description: "Handlingsplan för om du redan har blivit offer för en bluff eller bedrägeri.",
    readTime: "7 min",
    date: "6 dec 2025",
    category: "Råd"
  },
  {
    title: "Kryptobedrägerier ökar - var försiktig",
    description: "Ny rapport visar ökning i kryptorelaterade bedrägerier. Så skyddar du dig.",
    readTime: "4 min",
    date: "5 dec 2025",
    category: "Varning"
  },
  {
    title: "Så verifierar du ett telefonnummer",
    description: "Enkla steg för att kontrollera om ett nummer är en känd bluff.",
    readTime: "3 min",
    date: "4 dec 2025",
    category: "Guide"
  }
];

export default function Artiklar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Artiklar & Guider</h1>
          <p className="text-gray-600 mb-8">Lär dig skydda dig mot bluff och bedrägerier</p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="p-6 border rounded-lg bg-white hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{article.category}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                  <span>{article.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
