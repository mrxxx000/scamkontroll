'use client';

import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Kontakt() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      setSuccessMessage('Tack för ditt meddelande! Vi kommer att svara så snart som möjligt.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Ett fel uppstod');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Kontakta Oss</h1>
          <p className="text-gray-600 mb-8">Vi finns här för att hjälpa dig</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Kontaktuppgifter</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-post</h3>
                    <p className="text-gray-600">info@scamkontroll.se</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-gray-600">+46 8 123 456 789</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adress</h3>
                    <p className="text-gray-600">Scamkontroll AB<br />Exempelvägen 123<br />100 00 Stockholm</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Vanliga Frågor</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Hur långt tid tar det att få svar?</h3>
                  <p className="text-gray-600 text-sm">Vi svarar på e-post inom 2-3 arbetsdagar.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Kan jag rapportera ett bluffnummer?</h3>
                  <p className="text-gray-600 text-sm">Ja, använd vårt rapportformulär på startsidan.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Är Scamkontroll gratis?</h3>
                  <p className="text-gray-600 text-sm">Ja, Scamkontroll är helt gratis att använda.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Skicka ett meddelande</h2>
              
              {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  Fel: {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Namn</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">E-post</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Meddelande</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {isLoading ? 'Skickar...' : 'Skicka meddelande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
