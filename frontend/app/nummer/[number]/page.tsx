'use client';

import { Shield, AlertCircle, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Number({ params }: { params: { number: string } }) {
  const [reports, setReports] = useState([
    { id: 1, author: 'Användare123', text: 'Fick ett SMS om ett paket från PostNord. Var en bluff!', upvotes: 145, downvotes: 2, date: '2 timmar sedan' },
    { id: 2, author: 'Anonym', text: 'Ringde och sa att jag hade pengar att få tillbaka från skatten', upvotes: 87, downvotes: 1, date: '5 timmar sedan' },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{params.number}</h1>
            <p className="text-gray-600">Telefonnummer information och rapporter</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2">
              <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-600">Högrisk nummer</h2>
                </div>
                <p className="text-gray-700">Detta nummer har flera rapporter av bluff och bedrägeri. Var försiktig om du får samtal eller SMS från detta nummer.</p>
              </div>

              <h2 className="text-2xl font-bold mb-4">Rapporter ({reports.length})</h2>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold">{report.author}</span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {report.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{report.text}</p>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                        <ThumbsUp className="h-4 w-4" />
                        {report.upvotes}
                      </button>
                      <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                        <ThumbsDown className="h-4 w-4" />
                        {report.downvotes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="p-6 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg mb-4">Statistik</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Totala rapporter</p>
                    <p className="text-3xl font-bold text-blue-600">2,345</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Risk nivå</p>
                    <p className="text-lg font-bold text-red-600">HÖGT RISK</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Senaste rapport</p>
                    <p className="text-sm">2 timmar sedan</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4">
                    Rapportera detta nummer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
