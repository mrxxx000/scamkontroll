'use client';

import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Phone, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchLatestReports, getMostSearched, fetchFraudTypes, fetchFraudType } from '@/lib/api';
import { getIconForType } from '@/lib/fraudTypeIcons';

// Hero Section Component
const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.location.hash === '#search') {
        const el = document.getElementById('search-input') as HTMLInputElement | null;
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      // Navigate to number page
      window.location.href = `/nummer/${cleanNumber}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge removed per request */}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-in fade-in">
            Är detta ett{' '}
            <span className="relative">
              bluffnummer
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400/60 rounded-full" />
            </span>
            ?
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-in fade-in">
            Kolla om ett SMS, samtal eller länk är falskt. Sök bland tusentals rapporterade bluffnummer i Sverige.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto animate-in fade-in"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-input"
                type="tel"
                placeholder="Ange telefonnummer, t.ex. 0769452000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-12 pr-4 h-14 text-base bg-white text-black border-0 rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 h-14 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg"
            >
              Kontrollera
            </button>
          </form>

          {/* Quick Stats (replaced with descriptive items) */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 pt-8 animate-in fade-in">
            <div className="text-center max-w-xs">
              <div className="text-lg md:text-xl font-semibold">Stort antal rapporter från användare</div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-lg md:text-xl font-semibold">Aktiv sökfunktion som används dagligen</div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-lg md:text-xl font-semibold">Kontinuerligt växande databas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 50L48 45C96 40 192 30 288 33.3C384 37 480 53 576 60C672 67 768 63 864 53.3C960 43 1056 27 1152 23.3C1248 20 1344 30 1392 35L1440 40V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

// Latest Scams Component
const LatestScams = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate risk percentage based on search count
  const calculateRiskPercentage = (searchCount: number) => {
    if (searchCount === 0) return 0;
    return Math.min(95, Math.round(searchCount * 4.25));
  };

  const getRiskColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-red-100 text-red-700 border-red-200';
    if (percentage >= 60) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (percentage >= 20) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        console.log('📱 LatestScams: Fetching data...');
        const data = await fetchLatestReports(10);
        console.log('📱 LatestScams: Got', data?.length, 'reports');
        console.log('📱 LatestScams: Data:', data);
        if (!data || data.length === 0) {
          setError('No reports found');
        }
        setReports(data || []);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Could not load latest reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      // Handle ISO format "2025-02-14T11:55:00"
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Okänt datum';
      }
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'just nu';
      if (diffMins < 60) return `${diffMins} min sedan`;
      if (diffHours < 24) return `${diffHours} timmar sedan`;
      if (diffDays === 1) return '1 dag sedan';
      return `${diffDays} dagar sedan`;
    } catch {
      return 'Okänt datum';
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Senaste rapporterade bluffar</h2>
            <p className="text-gray-600 mt-2">Nyligen anmälda bedrägeriförsök i Sverige</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
          <p>
            <strong>Observera:</strong> Informationen på denna sida är baserad på användarrapporter och offentliga källor.
            Den är inte 100 % korrekt och vissa nummer kan vara felaktigt markerade.
            Gör alltid en egen bedömning och lämna aldrig ut känsliga uppgifter.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Laddar rapporter...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div className="grid gap-4">
            {reports.map((report: any, index: number) => {
              const phone = report.phone_number || 'Okänt nummer';
              const fraudType = report.fraud_type || 'Okänd typ';
              const description = report.description || '';

              return (
                <a
                  key={`${report.id}-${index}`}
                  href={`/nummer/${phone.replace(/\D/g, '')}`}
                  className="group block p-4 md:p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono font-semibold text-foreground">{phone}</span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-700 border-red-200">
                            {fraudType}
                          </span>
                          {report.search_count !== undefined && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColorClass(calculateRiskPercentage(report.search_count))}`}>
                              Risknivå: {calculateRiskPercentage(report.search_count)}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(report.reported_at)}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {!loading && reports.length === 0 && !error && (
          <div className="text-center py-12 text-gray-600">
            Inga rapporter än. Rapportera ett bluffnummer för att starta!
          </div>
        )}
      </div>
    </section>
  );
};

// PopularScamNumbers removed: using `MostSearchedNumbers` (real data) instead

// Most Searched Numbers Component  
const MostSearchedNumbers = () => {
  const [mostSearched, setMostSearched] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get background color based on search count
  const getSearchColorClass = (searchCount: number) => {
    if (searchCount >= 15) return 'bg-red-100 border-red-200 hover:shadow-lg hover:shadow-red-200/50';
    if (searchCount >= 10) return 'bg-orange-100 border-orange-200 hover:shadow-lg hover:shadow-orange-200/50';
    if (searchCount >= 5) return 'bg-yellow-100 border-yellow-200 hover:shadow-lg hover:shadow-yellow-200/50';
    if (searchCount >= 1) return 'bg-blue-100 border-blue-200 hover:shadow-lg hover:shadow-blue-200/50';
    return 'bg-gray-100 border-gray-200 hover:shadow-md';
  };

  const getSearchTextColor = (searchCount: number) => {
    if (searchCount >= 15) return 'text-red-700';
    if (searchCount >= 10) return 'text-orange-700';
    if (searchCount >= 5) return 'text-yellow-700';
    if (searchCount >= 1) return 'text-blue-700';
    return 'text-gray-600';
  };

  const getRankBadgeColor = (searchCount: number) => {
    if (searchCount >= 15) return 'bg-red-600 text-white';
    if (searchCount >= 10) return 'bg-orange-600 text-white';
    if (searchCount >= 5) return 'bg-yellow-600 text-white';
    if (searchCount >= 1) return 'bg-blue-600 text-white';
    return 'bg-gray-400 text-white';
  };

  useEffect(() => {
    const fetchMostSearched = async () => {
      try {
        console.log('📱 MostSearched: Fetching data...');
        const data = await getMostSearched(10);
        console.log('📱 MostSearched: Got', data?.length, 'numbers');
        setMostSearched(data || []);
      } catch (err) {
        console.error('Error fetching most searched:', err);
        setError('Kunde inte ladda mest sökta nummer');
      } finally {
        setLoading(false);
      }
    };

    fetchMostSearched();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mest sökta bluffnummer</h2>
          <p className="text-gray-600 mt-2">Nummer som användare söker på mest</p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
          <p>
            <strong>Observera:</strong> Informationen på denna sida är baserad på användarrapporter och offentliga källor.
            Den är inte 100 % korrekt och vissa nummer kan vara felaktigt markerade.
            Gör alltid en egen bedömning och lämna aldrig ut känsliga uppgifter.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Laddar mest sökta nummer...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {!loading && mostSearched.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostSearched.map((item: any, index: number) => {
              const phone = item.phone_number || 'Okänt nummer';
              const searches = item.search_count || 0;

              return (
                <a
                  key={`${item.id}-${index}`}
                  href={`/nummer/${phone.replace(/\D/g, '')}`}
                  className={`group flex items-center gap-4 p-4 rounded-xl border ${getSearchColorClass(searches)} bg-white hover:shadow-md transition-all duration-200`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getRankBadgeColor(searches)} text-sm font-bold shrink-0`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      {phone}
                    </div>
                    <div className={`flex items-center gap-2 text-sm font-semibold ${getSearchTextColor(searches)}`}>
                      <Search className="h-3 w-3" />
                      <span>{searches.toLocaleString('sv-SE')} sökningar</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {!loading && mostSearched.length === 0 && !error && (
          <div className="text-center py-12 text-gray-600">
            Inga sökta nummer än.
          </div>
        )}
      </div>
    </section>
  );
};

// Scam Types Section Component - fetch real data and show reports on click
const ScamTypesSection = () => {
  const [scamTypes, setScamTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<any | null>(null);
  const [typeReports, setTypeReports] = useState<any[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        // Try frontend helper first
        let data: any[] = [];
        try {
          data = await fetchFraudTypes();
        } catch (err) {
          console.warn('fetchFraudTypes failed, falling back to static list', err);
        }

        // If API returned nothing, fall back to static list (keeps previous behavior)
        if (!data || data.length === 0) {
          data = [
            { icon: Package, title: 'PostNord bluff', description: 'Falska SMS om paket som kräver avgift eller tullkostnad', href: '/bedrageri/postnord-bluff', reports: 0, slug: 'postnord-bluff' },
            { icon: CreditCard, title: 'BankID-bedrägeri', description: 'Bedragare som lurar dig att signera med BankID eller kapa konton', href: '/bedrageri/bankid-bluff', reports: 0, slug: 'bankid-bedrageri' },
            { icon: Building2, title: 'Skatteverket bluff', description: 'Falska meddelanden om skatteåterbäring eller påstådda skulder', href: '/bedrageri/skatteverket-bluff', reports: 0, slug: 'skatteverket-bluff' },
            { icon: Smartphone, title: 'Vishing (telefonbedrägerier)', description: 'Samtal från falska banktjänstemän eller myndigheter', href: '/bedrageri/vishing', reports: 0, slug: 'vishing' },
            { icon: Mail, title: 'Smishing (SMS-bedrägeri)', description: 'Falska SMS som länkar till bedrägliga sidor eller betalningar', href: '/bedrageri/smishing', reports: 0, slug: 'smishing' },
            { icon: ShieldAlert, title: 'Kodkapning', description: 'Kontokapning och obehörig åtkomst via stulna koder eller credentials', href: '/bedrageri/kodkapning', reports: 0, slug: 'kodkapning' },
            { icon: Mail, title: 'Phishing / falska länkar', description: 'E-post och meddelanden som försöker få dig lämna ut uppgifter via falska sidor', href: '/bedrageri/phishing', reports: 0, slug: 'phishing' },
            { icon: ShieldAlert, title: 'Investeringsbedrägeri', description: 'Bedrägerier som utger sig för att vara investeringsmöjligheter eller kryptoinvesteringar', href: '/bedrageri/investeringsbedrageri', reports: 0, slug: 'investeringsbedrageri' },
            { icon: Package, title: 'Tech-support-bedrägeri', description: 'Falsk teknisk support som ber om fjärråtkomst eller betalning', href: '/bedrageri/tech-support', reports: 0, slug: 'tech-support-bedrageri' },
            { icon: Package, title: 'Blocket / Marketplace-bedrageri', description: 'Bedrägerier vid köp/sälj på marknadsplatser som Blocket', href: '/bedrageri/marketplace-bedrageri', reports: 0, slug: 'marketplace-bedrageri' },
            { icon: CreditCard, title: 'Vinstbedrägeri', description: 'Falska vinnarmejl eller meddelanden som kräver betalning för att hämta ut pris', href: '/bedrageri/vinstbedrageri', reports: 0, slug: 'vinstbedrageri' },
            { icon: CreditCard, title: 'Fakturabedrägeri', description: 'Falska fakturor som försöker få företag eller privatpersoner att betala', href: '/bedrageri/fakturabedrageri', reports: 0, slug: 'fakturabedrageri' },
            { icon: ShieldAlert, title: 'Romance scam', description: 'Bedrägerier som sker via dejtingsidor eller sociala kontakter för att lura pengar', href: '/bedrageri/romance-scam', reports: 0, slug: 'romance-scam' },
            { icon: ShieldAlert, title: 'Jobb- eller hyresbedrägeri', description: 'Falska jobb- eller hyresannonser som kräver förskottsbetalning eller personlig information', href: '/bedrageri/jobb-hyres-bedrageri', reports: 0, slug: 'jobb-hyres-bedrageri' },
            { icon: ShieldAlert, title: 'Identitetsstöld', description: 'Stulna identiteter eller information som används för bedrägerier', href: '/bedrageri/identitetsstod', reports: 0, slug: 'identitetsstold' },
            { icon: Phone, title: 'Ping call / Wangiri', description: 'Kort samtal eller missade samtal avsiktligt för att få dig ringa tillbaka', href: '/bedrageri/ping-call', reports: 0, slug: 'ping-call' },
          ];
        }

        // Fetch counts from backend proxy and merge into types
        try {
          const countsRes = await fetch('/api/fraud-type-counts');
            if (countsRes.ok) {
              const countsData: Array<{ type: string; count: number }> = await countsRes.json();
              // build lookup by original type string
              const countsByType = new Map<string, number>();
              (countsData || []).forEach((c: any) => countsByType.set(String(c.type), Number(c.count)));

              // helper to find best match for a scam entry
              const findCount = (scam: any) => {
                // exact matches
                if (countsByType.has(scam.title)) return countsByType.get(scam.title) || 0;
                if (scam.slug && countsByType.has(scam.slug)) return countsByType.get(scam.slug) || 0;

                // case-insensitive match
                const lowerTitle = (scam.title || '').toLowerCase();
                for (const [k, v] of countsByType.entries()) {
                  if (String(k).toLowerCase() === lowerTitle) return v;
                  // match if k equals slug with dashes/spaces normalized
                  const normK = String(k).toLowerCase().replace(/[-_\s]+/g, '');
                  const normTitle = lowerTitle.replace(/[-_\s]+/g, '');
                  if (normK === normTitle) return v;
                }

                return 0;
              };

              data = data.map((s: any) => {
                const reports = findCount(s);
                // Prefer existing icon if present; otherwise use mapped icon
                const iconComp = s.icon || getIconForType(s.title || s.slug);
                return { ...s, reports, icon: iconComp };
              });
            }
        } catch (err) {
          console.warn('Could not fetch fraud type counts', err);
        }

        setScamTypes(data);
      } catch (err) {
        console.error('Error loading fraud types:', err);
        setError('Kunde inte ladda bedrägeriarter');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const openType = async (scam: any) => {
    setSelectedType(scam);
    setReportsLoading(true);
    setTypeReports([]);

    // Use the actual type string for backend request
    const type = scam.title || scam.type || scam.slug;

    try {
      let data: any = null;
      if (type) {
        try {
          data = await fetchFraudType(type); // Pass type, not slug
        } catch (e) {
          console.warn('fetchFraudType failed', e);
        }
      }

      // If the API returned an object with reports, use it. Otherwise try generic endpoint
      if (data && data.reports) {
        setTypeReports(data.reports);
      } else {
        setTypeReports([]);
      }
    } finally {
      setReportsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vanliga bedrägeriarter</h2>
            <p className="text-gray-600 mt-2">Lär dig känna igen de vanligaste bluffarna i Sverige</p>
          </div>
          <a href="/bedrageri" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Alla bedrägeriarter
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {loading && <div className="text-center py-8">Laddar bedrägeriarter...</div>}
        {error && <div className="text-center py-8 text-red-600">{error}</div>}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scamTypes.map((scam: any) => {
              const IconComponent = scam.icon || Package;
              const reportsCount = scam.reports || scam.count || scam.reports_count || 0;
              const slug = scam.slug || (scam.href ? scam.href.replace('/bedrageri/', '') : '');

              return (
                <div
                  key={slug || scam.title}
                  onClick={() => openType(scam)}
                  className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 animate-in fade-in cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                    {scam.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{scam.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{reportsCount.toLocaleString('sv-SE')} rapporter</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal / drawer for selected type reports */}
        {selectedType && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => { setSelectedType(null); setTypeReports([]); }} />
            <div className="relative bg-white rounded-t-lg md:rounded-lg w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-auto p-6 m-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedType.title}</h3>
                  <p className="text-sm text-gray-600">{selectedType.description}</p>
                </div>
                <button className="text-sm text-gray-500" onClick={() => { setSelectedType(null); setTypeReports([]); }}>Stäng</button>
              </div>

              <div>
                {reportsLoading && <div>Laddar rapporter...</div>}
                {!reportsLoading && typeReports.length === 0 && (
                  <div className="text-gray-600">Inga rapporter hittades för denna kategori.</div>
                )}

                {!reportsLoading && typeReports.length > 0 && (
                  <div className="grid gap-4">
                    {typeReports.map((r: any) => (
                      <a key={r.id} href={`/nummer/${(r.phone_number || '').replace(/\D/g, '')}`} className="block p-4 rounded-lg border border-gray-200 hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-mono font-semibold">{r.phone_number}</div>
                            <div className="text-sm text-gray-600">{r.category || r.fraud_type} — {r.message ? (r.message.length > 140 ? r.message.slice(0, 140) + '…' : r.message) : ''}</div>
                          </div>
                          <div className="text-sm text-gray-500">{new Date(r.reported_at || r.created_at || '').toLocaleDateString('sv-SE')}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Warnings Section Component
const WarningsSection = () => {
  const warnings = [
    {
      title: 'Ny våg av PostNord-bedrägerier',
      description: 'Polisen varnar för en kraftig ökning av falska SMS som utger sig för att vara från PostNord. Klicka aldrig på länkar i SMS.',
      date: '9 december 2025',
      source: 'Polisen',
      link: 'https://www.postnord.se/om-oss/nyheter-press-och-artiklar/2025/varannan-svensk-har-utsatts-for-digitala-bedrageriforsok/',
    },
    {
      title: 'BankID-bedrägerier ökar dramatiskt',
      description: 'Signera aldrig med BankID om någon ringer och påstår sig vara från banken. Banker ber aldrig om detta.',
      date: '8 december 2025',
      source: 'Bankföreningen',
      link: 'https://support.bankid.com/sv/sakerhet/vanliga-bedragerier',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Aktuella varningar</h2>
        </div>

        <div className="grid gap-4">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-red-200 bg-white animate-in fade-in"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{warning.title}</h3>
                  <p className="text-gray-600 mb-3">{warning.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{warning.date}</span>
                    <span className="text-blue-600 font-medium">{warning.source}</span>
                  </div>
                </div>
                <a 
                  href={warning.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-blue-600 hover:text-blue-700 hover:border-blue-300"
                >
                  Läs mer
                  <ExternalLink className="h-4 w-4 ml-2 inline" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Removed Footer component - now using shared Footer from @/components/Footer

// Main Page Component
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <LatestScams />
      <MostSearchedNumbers />
      <ScamTypesSection />
      <WarningsSection />
      <Footer />
    </>
  );
}
