'use client';

import { Shield, Users, Target, Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Om oss</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Om Svensk Scamkontroll
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vi hjälper svenskar att skydda sig mot telefonbedrägerier och bluffar.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="p-6 md:p-8 rounded-xl border border-gray-200 bg-white animate-in fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Vår mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Svensk Scamkontroll grundades med ett enkelt mål: att göra det lättare för svenskar 
                att skydda sig mot telefonbedrägerier och bluffar. Varje dag utsätts tusentals 
                svenskar för bedrägeriförsök via telefon, SMS och e-post.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Genom att samla rapporter från användare och analysera bedrägeriernas mönster 
                kan vi varna andra innan de blir lurade. Tillsammans är vi starkare mot bedragarna.
              </p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-gray-200 bg-white text-center animate-in fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mx-auto mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">50,000+</div>
                <div className="text-sm text-gray-600">Rapporterade nummer</div>
              </div>
              <div className="p-6 rounded-xl border border-gray-200 bg-white text-center animate-in fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mx-auto mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">100,000+</div>
                <div className="text-sm text-gray-600">Sökningar per månad</div>
              </div>
              <div className="p-6 rounded-xl border border-gray-200 bg-white text-center animate-in fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mx-auto mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">98%</div>
                <div className="text-sm text-gray-600">Träffsäkerhet</div>
              </div>
            </div>

            <section className="p-6 md:p-8 rounded-xl border border-gray-200 bg-white animate-in fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Hur det fungerar
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Sök efter numret</div>
                    <div className="text-sm text-gray-600">
                      Ange telefonnumret du fått ett samtal eller SMS från i vår sökmotor.
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Se rapporter</div>
                    <div className="text-sm text-gray-600">
                      Om numret har rapporterats tidigare ser du vad andra användare upplevt.
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Rapportera själv</div>
                    <div className="text-sm text-gray-600">
                      Hjälp andra genom att rapportera misstänkta nummer och dina erfarenheter.
                    </div>
                  </div>
                </li>
              </ol>
            </section>

            <section className="p-6 md:p-8 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 text-white animate-in fade-in">
              <h2 className="text-xl font-semibold mb-4">
                Hjälp oss stoppa bedragarna
              </h2>
              <p className="text-white/80 mb-6">
                Genom att rapportera misstänkta nummer bidrar du till att skydda andra svenskar. 
                Tillsammans kan vi göra det svårare för bedragare att lyckas.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Sök nummer nu
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
