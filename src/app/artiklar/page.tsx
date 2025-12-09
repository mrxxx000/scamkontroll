'use client';

import { Clock, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    slug: "hur-vet-man-om-sms-ar-falskt",
    title: "Hur vet man om ett SMS är falskt?",
    description: "Lär dig känna igen de vanligaste tecknen på att ett SMS är en bluff och hur du skyddar dig.",
    category: "Guide",
    readTime: "5 min",
    date: "8 december 2025",
  },
  {
    slug: "vanliga-telefonbedragerier-2025",
    title: "Vanliga telefonbedrägerier i Sverige 2025",
    description: "En översikt över de mest förekommande telefonbedrägerierna just nu och hur de fungerar.",
    category: "Översikt",
    readTime: "8 min",
    date: "5 december 2025",
  },
  {
    slug: "vad-gora-om-utsatt-for-bluff",
    title: "Vad gör man om man blivit utsatt för en bluff?",
    description: "Steg-för-steg guide för vad du ska göra om du misstänker att du blivit lurad.",
    category: "Guide",
    readTime: "6 min",
    date: "1 december 2025",
  },
  {
    slug: "skydda-aldre-fran-bedragare",
    title: "Så skyddar du äldre anhöriga från bedragare",
    description: "Tips och råd för hur du kan hjälpa äldre familjemedlemmar att undvika bedrägerier.",
    category: "Tips",
    readTime: "7 min",
    date: "28 november 2025",
  },
  {
    slug: "bankid-sakerhet-guide",
    title: "Allt du behöver veta om BankID-säkerhet",
    description: "En komplett guide till hur BankID fungerar och hur du använder det säkert.",
    category: "Guide",
    readTime: "10 min",
    date: "25 november 2025",
  },
];

const ArticlesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Artiklar</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Artiklar & guider
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Läs våra guider och artiklar för att lära dig mer om bedrägerier och hur du skyddar dig.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/artiklar/${article.slug}`}
                className="group flex flex-col p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 animate-in fade-in"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{article.date}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesPage;
