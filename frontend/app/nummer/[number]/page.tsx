'use client';

import { useState, useEffect, use } from 'react';
import { AlertTriangle, Phone, Clock, ThumbsUp, SendHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPhoneNumber, submitReport } from '@/lib/api';

export default function NumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = use(params);
  const phone = number;
  const [numberData, setNumberData] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ category: '', message: '' });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchNumberData = async () => {
      try {
        console.log('🔍 Fetching phone number data for:', phone);
        const data = await fetchPhoneNumber(phone);
        console.log('✅ Received phone data:', data);
        
        if (!data) {
          setError('Telefonnumret hittades inte');
          setReports([]);
        } else {
          setNumberData(data);
          setReports(data || []);
        }
      } catch (err) {
        console.error('Error fetching number:', err);
        setError('Kunde inte ladda telefonnumrets detaljer');
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    if (phone) fetchNumberData();
  }, [phone]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const phoneWithFormat = phone.replace(/\D/g, '');
      const result = await submitReport(`+46${phoneWithFormat}`, formData.category, formData.message);
      
      if (!result) throw new Error('Failed to submit report');

      setFormData({ category: '', message: '' });
      setSubmitSuccess(true);

      // Refresh reports after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Error submitting report:', err);
      setSubmitError('Kunde inte skicka rapporten. Försök igen.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskLevelLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return '🔴 Högrisk';
      case 'MEDIUM':
        return '🟡 Medel risk';
      case 'LOW':
        return '🟢 Låg risk';
      default:
        return 'Okänd';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just nu';
    if (diffMins < 60) return `${diffMins} min sedan`;
    if (diffHours < 24) return `${diffHours}h sedan`;
    if (diffDays === 1) return '1d sedan';
    return `${diffDays}d sedan`;
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="border-b bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Tillbaka
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Laddar...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="container mx-auto px-4 py-12">
            <div className="rounded-lg bg-red-50 border border-red-200 p-6 text-red-700">
              {error}
            </div>
          </div>
        )}

        {/* Number Details */}
        {numberData && !loading && (
          <div className="container mx-auto px-4 py-8">
            {/* Header Card */}
            <div className={`rounded-xl border p-6 mb-8 ${getRiskLevelColor(numberData.risk_level)}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium opacity-75">Telefonnummer</div>
                  <h1 className="text-3xl md:text-4xl font-bold font-mono mt-2">+46{phone}</h1>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium opacity-75">Risknivå</div>
                  <div className="text-2xl font-bold mt-2">{getRiskLevelLabel(numberData.risk_level)}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-current border-opacity-20">
                <div>
                  <div className="text-sm opacity-75">Totala rapporter</div>
                  <div className="text-2xl font-bold mt-1">{numberData.total_reports}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Sökningar</div>
                  <div className="text-2xl font-bold mt-1">{numberData.search_count}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Senast rapporterad</div>
                  <div className="text-sm font-bold mt-1">
                    {numberData.last_reported_at ? formatDate(numberData.last_reported_at) : 'Aldrig'}
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                Rapporter ({reports.length})
              </h2>

              {reports.length > 0 ? (
                <div className="grid gap-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{report.category}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(report.created_at)}
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-blue-50 text-blue-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{report.likes || 0}</span>
                        </button>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{report.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
                  Inga rapporter ännu för detta nummer.
                </div>
              )}
            </div>

            {/* Report Form */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 mb-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Rapportera detta nummer</h3>

              {submitSuccess && (
                <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
                  ✓ Rapporten skickades! Tack för att du hjälper andra.
                </div>
              )}

              {submitError && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typ av bluff *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Välj en typ...</option>
                    <option value="PostNord bluff">PostNord bluff</option>
                    <option value="BankID signering">BankID signering</option>
                    <option value="Skatteverket bluff">Skatteverket bluff</option>
                    <option value="Försäkringskassan bluff">Försäkringskassan bluff</option>
                    <option value="Vishing (telefonbedrägerier)">Vishing (telefonbedrägerier)</option>
                    <option value="Phishing (nätfiske)">Phishing (nätfiske)</option>
                    <option value="Annan">Annan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beskriv vad som hände *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="T.ex. 'Fick ett SMS om att mitt paket inte leverades, med en suspicious länk...'"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <SendHorizontal className="h-4 w-4" />
                  {submitting ? 'Skickar...' : 'Skicka rapport'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
