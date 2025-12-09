'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RapporteraPage() {
  const [reportForm, setReportForm] = useState({
    phoneNumber: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fraudCategories = [
    'PostNord Bluff',
    'BankID-bedrägeri',
    'Vishing (telefonbedrägeri)',
    'Smishing (SMS-bedrägeri)',
    'Kodkapning',
    'Phishing / falska länkar',
    'Investeringsbedrägeri',
    'Tech-support-bedrägeri',
    'Blocket / Marketplace-bedrägeri',
    'Vinstbedrägeri',
    'Fakturabedrägeri',
    'Romance scam',
    'Jobb- eller hyresbedrägeri',
    'Identitetsstöld',
    'Ping call / Wangiri',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Normalize phone number on frontend before sending
      let normalized = reportForm.phoneNumber.trim();
      
      // If already has +46, use as-is
      if (!normalized.startsWith('+46')) {
        // Remove all non-digits
        normalized = normalized.replace(/\D/g, '');
        
        // If it starts with 46 (without +), add +
        if (normalized.startsWith('46')) {
          normalized = '+' + normalized;
        } else {
          // Otherwise assume Swedish number and add +46
          normalized = '+46' + normalized;
        }
      }
      
      console.log(`📱 Submitting report for: ${reportForm.phoneNumber} → ${normalized}`);

      const response = await fetch(
        'http://localhost:5000/api/numbers/' + encodeURIComponent(normalized) + '/report',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: reportForm.category,
            message: reportForm.description,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to submit report');

      setSubmitMessage({ type: 'success', text: 'Tack! Din rapport har registrerats.' });
      setReportForm({ phoneNumber: '', category: '', description: '' });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Kunde inte skicka rapporten. Försök igen.' });
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="h-4 w-4" />
            Tillbaka
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapportera en bluff</h1>
            <p className="text-gray-600">Hjälp andra användare genom att rapportera misstänkta bluffnummer</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  placeholder="T.ex. +46701234567 eller 0701234567"
                  value={reportForm.phoneNumber}
                  onChange={(e) => setReportForm({ ...reportForm, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Det nummer du vill rapportera</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Typ av bedrägeri *
                </label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  required
                >
                  <option value="">Välj en kategori...</option>
                  {fraudCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">Vad slags bedrägeri var det?</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Beskrivning *
                </label>
                <textarea
                  placeholder="Beskriv vad som hände. T.ex. vilken typ av meddelande du fick, vad de ville ha från dig, etc."
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Mer detaljer hjälper andra att identifiera bedrägerier</p>
              </div>

              {/* Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                    : 'bg-red-50 text-red-700 border-l-4 border-red-600'
                }`}>
                  <p className="font-medium">{submitMessage.text}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
                >
                  Avbryt
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:bg-red-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka rapport'}
                </button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Tips för en bra rapport:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Inkludera det fullständiga telefonnumret</li>
                <li>✓ Beskriv exakt vad som hände</li>
                <li>✓ Nämn tidpunkten om du kommer ihåg den</li>
                <li>✓ Beskriv vad de försökte få dig att göra</li>
                <li>✓ Din rapport hjälper andra att undvika samma bedrägerier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
