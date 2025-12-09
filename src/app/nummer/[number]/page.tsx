'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  Clock, 
  Users, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
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

// Mock data - in real app this would come from API/database
const getPhoneData = (number: string) => ({
  number: `+${number}`,
  formattedNumber: number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4"),
  riskLevel: "high" as const,
  riskScore: 95,
  type: "PostNord bluff",
  totalReports: 234,
  lastReported: "2 timmar sedan",
  firstReported: "15 november 2025",
  comments: [
    {
      id: 1,
      text: "Fick SMS om att mitt paket hade problem och att jag behövde betala 29 kr för leverans. Länken gick till en falsk PostNord-sida.",
      date: "2 timmar sedan",
      helpful: 45,
    },
    {
      id: 2,
      text: "Samma här! De ville ha mina kortuppgifter. Klassisk bluff.",
      date: "5 timmar sedan",
      helpful: 23,
    },
    {
      id: 3,
      text: "Rapporterat till Polisen. Sprid gärna varningen!",
      date: "1 dag sedan",
      helpful: 67,
    },
  ],
});

const getRiskStyles = (level: string) => {
  switch (level) {
    case "high":
      return {
        bg: "bg-red-600",
        text: "text-red-700",
        lightBg: "bg-red-100",
        border: "border-red-200",
        label: "Hög risk - Sannolikt bluff",
      };
    case "medium":
      return {
        bg: "bg-yellow-600",
        text: "text-yellow-700",
        lightBg: "bg-yellow-100",
        border: "border-yellow-200",
        label: "Medelhög risk - Var försiktig",
      };
    default:
      return {
        bg: "bg-green-600",
        text: "text-green-700",
        lightBg: "bg-green-100",
        border: "border-green-200",
        label: "Låg risk - Troligen säkert",
      };
  }
};

const PhoneNumberPage = () => {
  const params = useParams();
  const number = params?.number as string;
  const data = getPhoneData(number || "");
  const riskStyles = getRiskStyles(data.riskLevel);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Nummer {data.formattedNumber}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk Card */}
              <div className={`p-6 md:p-8 rounded-2xl border ${riskStyles.border} ${riskStyles.lightBg} animate-in fade-in`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${riskStyles.bg}`}>
                    <AlertTriangle className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Telefonnummer</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {data.formattedNumber}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${riskStyles.lightBg} ${riskStyles.text} ${riskStyles.border}`}>
                        {riskStyles.label}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        {data.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${riskStyles.text}`}>{data.riskScore}%</div>
                    <div className="text-sm text-gray-600">Riskpoäng</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Om detta nummer
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Detta nummer har rapporterats {data.totalReports} gånger för att skicka falska SMS-meddelanden 
                  som utger sig för att vara från PostNord. Bedragarna påstår att du har ett paket som väntar 
                  och begär en liten avgift för leverans.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-foreground">Viktigt:</strong> PostNord skickar aldrig SMS med betalningslänkar. 
                  Om du får ett sådant meddelande, klicka inte på länken och radera SMS:et omedelbart.
                </p>
              </div>

              {/* Comments */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Användarrapporter ({data.comments.length})
                  </h2>
                  <button className="px-3 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Flag className="h-4 w-4" />
                    Rapportera
                  </button>
                </div>

                <div className="space-y-4">
                  {data.comments.map((comment) => (
                    <div key={comment.id} className="p-4 rounded-lg bg-gray-50">
                      <p className="text-foreground mb-3">{comment.text}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{comment.date}</span>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.helpful}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <h3 className="font-semibold text-foreground mb-4">Statistik</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{data.totalReports}</div>
                      <div className="text-sm text-gray-600">Totala rapporter</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{data.lastReported}</div>
                      <div className="text-sm text-gray-600">Senast rapporterad</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <MessageSquare className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{data.firstReported}</div>
                      <div className="text-sm text-gray-600">Först rapporterad</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Scam Type */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <h3 className="font-semibold text-foreground mb-4">Relaterad bedrägeriart</h3>
                <Link
                  href="/bedrageri/postnord-bluff"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">PostNord bluff</div>
                    <div className="text-sm text-gray-600">15,234 rapporter</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </Link>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 text-white animate-in fade-in">
                <h3 className="font-semibold mb-2">Har du fått ett samtal?</h3>
                <p className="text-sm text-white/80 mb-4">
                  Hjälp andra genom att rapportera dina erfarenheter med detta nummer.
                </p>
                <button className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2">
                  <Flag className="h-4 w-4" />
                  Rapportera nummer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhoneNumberPage;
