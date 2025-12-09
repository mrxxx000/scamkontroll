'use client';

import { 
  Package, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Mail, 
  ShieldAlert,
  Wallet,
  Heart,
  ChevronRight,
  ArrowRight,
  Shield,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:scale-105">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">Scamkontroll</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              {link.label}
            </Link>
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
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
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

// Footer Component
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Scamkontroll</span>
            </Link>
            <p className="text-sm text-gray-600">
              Sveriges största databas för att identifiera och rapportera bluffnummer och bedrägerier.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Tjänster</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Sök nummer
                </Link>
              </li>
              <li>
                <Link href="/bedrageri" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Bedrägeriarter
                </Link>
              </li>
              <li>
                <Link href="/artiklar" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Artiklar & guider
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/om-oss" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/integritetspolicy" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Integritetspolicy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Vanliga bedrägerier</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/bedrageri/postnord-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  PostNord bluff
                </Link>
              </li>
              <li>
                <Link href="/bedrageri/bankid-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  BankID bluff
                </Link>
              </li>
              <li>
                <Link href="/bedrageri/skatteverket-bluff" className="text-sm text-gray-600 hover:text-foreground transition-colors">
                  Skatteverket bluff
                </Link>
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

const scamTypes = [
  {
    icon: Package,
    title: "PostNord bluff",
    description: "Falska SMS om paket som kräver avgift eller tullkostnad. En av de vanligaste bluffarna i Sverige.",
    href: "/bedrageri/postnord-bluff",
    reports: 15234,
    severity: "high",
  },
  {
    icon: CreditCard,
    title: "BankID signering",
    description: "Bedragare som ringer och lurar dig att signera med BankID. Extremt farligt.",
    href: "/bedrageri/bankid-bluff",
    reports: 12456,
    severity: "high",
  },
  {
    icon: Building2,
    title: "Skatteverket bluff",
    description: "Falska meddelanden om skatteåterbäring eller skulder hos Skatteverket.",
    href: "/bedrageri/skatteverket-bluff",
    reports: 8765,
    severity: "high",
  },
  {
    icon: Smartphone,
    title: "Vishing (telefonbedrägerier)",
    description: "Samtal från falska banktjänstemän, poliser eller myndigheter som vill komma åt dina pengar.",
    href: "/bedrageri/vishing",
    reports: 7543,
    severity: "high",
  },
  {
    icon: Mail,
    title: "Phishing (nätfiske)",
    description: "Falska e-post och SMS med skadliga länkar som leder till falska webbplatser.",
    href: "/bedrageri/phishing",
    reports: 6234,
    severity: "medium",
  },
  {
    icon: ShieldAlert,
    title: "Försäkringsbedrägerier",
    description: "Falska meddelanden från försäkringsbolag om ersättningar eller premier.",
    href: "/bedrageri/forsakring-bluff",
    reports: 4321,
    severity: "medium",
  },
  {
    icon: Wallet,
    title: "Kryptobedrägerier",
    description: "Erbjudanden om investeringar i kryptovalutor med garanterad avkastning.",
    href: "/bedrageri/krypto-bluff",
    reports: 3456,
    severity: "medium",
  },
  {
    icon: Heart,
    title: "Kärleksbedrägerier",
    description: "Romantiska kontakter på nätet som till slut ber om pengar.",
    href: "/bedrageri/karleks-bluff",
    reports: 2345,
    severity: "medium",
  },
];

const getSeverityBadge = (severity: string) => {
  if (severity === "high") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
        Hög risk
      </span>
    );
  }
  return (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
      Medelhög risk
    </span>
  );
};

const ScamTypesListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Bedrägeriarter</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vanliga bedrägeriarter i Sverige
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lär dig känna igen de vanligaste bluffarna och hur du skyddar dig mot dem.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6">
            {scamTypes.map((scam, index) => {
              const IconComponent = scam.icon;
              return (
                <Link
                  key={scam.href}
                  href={scam.href}
                  className="group flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 animate-in fade-in"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                        {scam.title}
                      </h2>
                      {getSeverityBadge(scam.severity)}
                    </div>
                    <p className="text-gray-600">
                      {scam.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{scam.reports.toLocaleString("sv-SE")} rapporter</span>
                    <ArrowRight className="h-5 w-5 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScamTypesListPage;
