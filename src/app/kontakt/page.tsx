'use client';

import { Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Kontakt</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kontakta oss
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Har du frågor eller vill rapportera ett problem? Vi är här för att hjälpa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Kontaktinformation
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">E-post</div>
                      <a href="mailto:info@scamkontroll.se" className="text-blue-600 hover:text-blue-700">
                        info@scamkontroll.se
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Telefon</div>
                      <a href="tel:+46812345678" className="text-blue-600 hover:text-blue-700">
                        +46 (0)8 123 456 78
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Adress</div>
                      <div className="text-gray-600">
                        <div>Scamkontroll Sverige AB</div>
                        <div>Strandvägen 1</div>
                        <div>114 51 Stockholm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-foreground mb-2">
                  Snabb respons garanterad
                </h3>
                <p className="text-sm text-gray-600">
                  Vi svarar på alla inquiries inom 24 timmar under arbetsdagar.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Skicka ett meddelande
              </h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Namn
                  </label>
                  <input
                    type="text"
                    placeholder="Ditt namn"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-post
                  </label>
                  <input
                    type="email"
                    placeholder="din.email@exempel.se"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ämne
                  </label>
                  <input
                    type="text"
                    placeholder="Vad gäller det?"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Meddelande
                  </label>
                  <textarea
                    placeholder="Berätta mer..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Skicka meddelande
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 p-8 rounded-xl border border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Vanliga frågor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Hur rapporterar jag ett nummer?
                </h3>
                <p className="text-gray-600">
                  Du kan rapportera ett nummer direkt på nummersidan. Klicka på "Rapportera nummer" och fyll i dina uppgifter.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Är mina uppgifter säkra?
                </h3>
                <p className="text-gray-600">
                  Ja, vi skyddar din personliga information enligt GDPR och högsta säkerhetsstandarder.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Kan jag få pengar tillbaka?
                </h3>
                <p className="text-gray-600">
                  Om du blivit lurad, kontakta din bank omedelbar. Vi rekommenderar också att anmäla till Polisen.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Hur ofta uppdateras databasen?
                </h3>
                <p className="text-gray-600">
                  Vi uppdaterar databasen i realtid när nya rapporter kommer in från användare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
