'use client';

import { useState, useEffect } from 'react';
import { Search, Shield, AlertTriangle, Package, CreditCard, Building2, Smartphone, Mail, ShieldAlert, Phone, Clock, ArrowRight, TrendingUp, ExternalLink, Menu, X } from 'lucide-react';
import { getLatestReports, getTrendingNumbers } from '@/lib/api';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Hem' },
    { href: '/bedrageri', label: 'Bedrägeriarter' },
    { href: '/artiklar', label: 'Artiklar' },
    { href: '/om-oss', label: 'Om oss' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:scale-105">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">Scamkontroll</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-accent transition-colors">
            Rapportera bluff
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background animate-in fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="mt-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-accent transition-colors">
              Rapportera bluff
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm animate-in fade-in">
            <Shield className="h-4 w-4" />
            <span>Sveriges mest pålitliga scamkontroll</span>
          </div>

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

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 animate-in fade-in">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">50,000+</div>
              <div className="text-sm text-white/70">Rapporterade nummer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">100,000+</div>
              <div className="text-sm text-white/70">Sökningar/månad</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">98%</div>
              <div className="text-sm text-white/70">Träffsäkerhet</div>
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
  const [scams, setScams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScams = async () => {
      try {
        console.log('📱 LatestScams: Fetching data...');
        const data = await getLatestReports(4);
        console.log('📱 LatestScams: Got', data?.length, 'scams');
        console.log('📱 LatestScams: Data:', data);
        if (!data || data.length === 0) {
          setError('No data from API - make sure Supabase table is set up!');
        }
        setScams(data || []);
      } catch (error) {
        console.error('Error loading scams:', error);
        setError('Failed to load scams');
      } finally {
        setLoading(false);
      }
    };

    fetchScams();
  }, []);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Okänt datum';
    try {
      // Handle format "2025-01-12 10:23:00"
      const date = new Date(dateString.replace(' ', 'T'));
      if (isNaN(date.getTime())) {
        return 'Okänt datum';
      }
      return date.toLocaleDateString('sv-SE');
    } catch {
      return 'Okänt datum';
    }
  };

  const getSeverityStyles = (reports: number) => {
    // Estimate severity based on report count
    if (reports > 100) return 'bg-red-100 text-red-700 border-red-200';
    if (reports > 50) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Senaste rapporterade bluffar</h2>
              <p className="text-gray-600 mt-2">Nyligen anmälda bedrägeriförsök i Sverige</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !scams || scams.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Senaste rapporterade bluffar</h2>
              <p className="text-gray-600 mt-2">Nyligen anmälda bedrägeriförsök i Sverige</p>
            </div>
          </div>
          <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-yellow-800 font-medium">
              ⚠️ Ingen data ännu
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              Kör SQL-skriptet från <code className="bg-yellow-100 px-2 py-1 rounded">SETUP_DATABASE.md</code> för att fylla databasen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Senaste rapporterade bluffar</h2>
            <p className="text-gray-600 mt-2">Nyligen anmälda bedrägeriförsök i Sverige</p>
          </div>
        </div>

        <div className="grid gap-4">
          {scams.map((scam) => (
            <a
              key={scam.id}
              href={`/nummer/${scam.phone_number.replace(/\D/g, '')}`}
              className="group block p-4 md:p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-200 animate-in fade-in"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-semibold text-foreground">{scam.phone_number}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityStyles(1)}`}>
                        {scam.fraud_type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{scam.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(scam.reported_at)}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Popular Scam Numbers Component
const PopularScamNumbers = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingNumbers(6);
        setTrending(data || []);
      } catch (error) {
        console.error('Error loading trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mest sökta bluffnummer</h2>
            <p className="text-gray-600 mt-2">Nummer som svenskar söker på mest just nu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mest sökta bluffnummer</h2>
          <p className="text-gray-600 mt-2">Nummer som svenskar söker på mest just nu</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.map((item: any, index: number) => (
            <a
              key={item.phone_number}
              href={`/nummer/${item.phone_number.replace(/\D/g, '')}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-200 animate-in fade-in"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                  {item.phone_number}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-3 w-3" />
                  <span>{item.total_reports} rapporter</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4" />
                {item.trend}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Scam Types Section Component
const ScamTypesSection = () => {
  const scamTypes = [
    {
      icon: Package,
      title: 'PostNord bluff',
      description: 'Falska SMS om paket som kräver avgift eller tullkostnad',
      href: '/bedrageri/postnord-bluff',
      reports: 15234,
    },
    {
      icon: CreditCard,
      title: 'BankID signering',
      description: 'Bedragare som lurar dig att signera med BankID',
      href: '/bedrageri/bankid-bluff',
      reports: 12456,
    },
    {
      icon: Building2,
      title: 'Skatteverket bluff',
      description: 'Falska meddelanden om skatteåterbäring',
      href: '/bedrageri/skatteverket-bluff',
      reports: 8765,
    },
    {
      icon: Smartphone,
      title: 'Vishing (telefonbedrägerier)',
      description: 'Samtal från falska banktjänstemän eller myndigheter',
      href: '/bedrageri/vishing',
      reports: 7543,
    },
    {
      icon: Mail,
      title: 'Phishing (nätfiske)',
      description: 'Falska e-post och SMS med skadliga länkar',
      href: '/bedrageri/phishing',
      reports: 6234,
    },
    {
      icon: ShieldAlert,
      title: 'Försäkringsbedrägerier',
      description: 'Falska meddelanden från försäkringsbolag',
      href: '/bedrageri/forsakring-bluff',
      reports: 4321,
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scamTypes.map((scam, index) => {
            const IconComponent = scam.icon;
            return (
              <a
                key={scam.href}
                href={scam.href}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 animate-in fade-in"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                  {scam.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{scam.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{scam.reports.toLocaleString('sv-SE')} rapporter</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            );
          })}
        </div>
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
      link: '#',
    },
    {
      title: 'BankID-bedrägerier ökar dramatiskt',
      description: 'Signera aldrig med BankID om någon ringer och påstår sig vara från banken. Banker ber aldrig om detta.',
      date: '8 december 2025',
      source: 'Bankföreningen',
      link: '#',
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
                <button className="shrink-0 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Läs mer
                  <ExternalLink className="h-4 w-4 ml-2 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Scamkontroll</span>
            </a>
            <p className="text-sm text-gray-600">
              Sveriges största databas för att identifiera och rapportera bluffnummer och bedrägerier.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Tjänster</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Sök nummer
                </a>
              </li>
              <li>
                <a href="/bedrageri" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Bedrägeriarter
                </a>
              </li>
              <li>
                <a href="/artiklar" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Artiklar & guider
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Information</h4>
            <ul className="space-y-2">
              <li>
                <a href="/om-oss" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Om oss
                </a>
              </li>
              <li>
                <a href="/kontakt" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="/integritetspolicy" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Integritetspolicy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Vanliga bedrägerier</h4>
            <ul className="space-y-2">
              <li>
                <a href="/bedrageri/postnord-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  PostNord bluff
                </a>
              </li>
              <li>
                <a href="/bedrageri/bankid-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  BankID bluff
                </a>
              </li>
              <li>
                <a href="/bedrageri/skatteverket-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Skatteverket bluff
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 Svensk Scamkontroll. Alla rättigheter förbehållna.</p>
          <p className="text-sm text-gray-600">Hjälp oss stoppa bedragare i Sverige 🇸🇪</p>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <LatestScams />
      <PopularScamNumbers />
      <ScamTypesSection />
      <WarningsSection />
      <Footer />
    </>
  );
}
