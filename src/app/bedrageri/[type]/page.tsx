'use client';

import { 
  Package, 
  AlertTriangle, 
  Shield,
  ChevronRight,
  Clock,
  Phone,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

const scamTypeData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  tips: string[];
  reports: number;
  recentNumbers: { number: string; reports: number }[];
}> = {
  "postnord-bluff": {
    title: "PostNord paketavgift bluff",
    description: "Falska SMS om paket som kräver avgift eller tullkostnad",
    longDescription: `PostNord-bluffen är en av de vanligaste bedrägerierna i Sverige. Bedragare skickar SMS som ser ut att komma från PostNord och påstår att du har ett paket som väntar på leverans. I meddelandet finns en länk till en falsk webbplats som ser ut som PostNords officiella sida.

På den falska sidan uppmanas du att betala en liten avgift, ofta 29-59 kr, för att få paketet levererat. När du anger dina kortuppgifter stjäls de av bedragarna som sedan kan tömma ditt konto eller använda uppgifterna för identitetsstöld.`,
    tips: [
      "PostNord skickar aldrig SMS med betalningslänkar",
      "Kontrollera alltid avsändarens telefonnummer",
      "Gå direkt till PostNords officiella webbplats istället för att klicka på länkar",
      "Väntar du inte på något paket? Då är det definitivt en bluff",
      "Rapportera misstänkta SMS till Polisen och PostNord",
    ],
    reports: 15234,
    recentNumbers: [
      { number: "+46769452000", reports: 234 },
      { number: "+46701234567", reports: 156 },
      { number: "+46761111222", reports: 89 },
    ],
  },
  "bankid-bluff": {
    title: "BankID signering bluff",
    description: "Bedragare som lurar dig att signera med BankID",
    longDescription: `BankID-bedrägerier är extremt farliga då de kan leda till att bedragare får full tillgång till dina bankkonton. Bedragaren ringer och påstår sig vara från din bank, polisen eller annan myndighet. De berättar ofta att ditt konto har blivit hackat och att du måste "säkra" det genom att signera med BankID.

När du signerar ger du i själva verket bedragaren tillgång till ditt konto. De kan sedan överföra pengar, ta lån i ditt namn eller stjäla din identitet.`,
    tips: [
      "Banker ringer ALDRIG och ber dig signera med BankID",
      "Lägg på om någon ringer och påstår sig vara från banken",
      "Ring din bank på det officiella numret om du är orolig",
      "Signera aldrig BankID om du inte själv initierat ärendet",
      "Var extra vaksam om någon säger att det är bråttom",
    ],
    reports: 12456,
    recentNumbers: [
      { number: "+46701234567", reports: 178 },
      { number: "+46731234567", reports: 123 },
      { number: "+46708765432", reports: 98 },
    ],
  },
  "skatteverket-bluff": {
    title: "Skatteverket återbetalning bluff",
    description: "Falska meddelanden om skatteåterbäring",
    longDescription: `I denna bluff utger sig bedragare för att vara Skatteverket. De skickar SMS eller e-post som påstår att du har pengar att få tillbaka, ofta en skatteåterbäring. Meddelandet innehåller en länk till en falsk webbplats där du uppmanas att ange dina bank- eller kortuppgifter för att "få" pengarna.

Skatteverket skickar aldrig ut sådana meddelanden med betalningslänkar. All kontakt om skatteåterbäring sker via Mina sidor på skatteverket.se eller via brev.`,
    tips: [
      "Skatteverket skickar inte SMS med betalningslänkar",
      "Logga in på Mina sidor på skatteverket.se för att se din skattestatus",
      "Kontrollera alltid avsändaradressen på e-post",
      "Skatteåterbäring betalas ut automatiskt till ditt konto",
      "Ring Skatteverket om du är osäker: 0771-567 567",
    ],
    reports: 8765,
    recentNumbers: [
      { number: "+46761111222", reports: 145 },
      { number: "+46723456789", reports: 112 },
      { number: "+46708765432", reports: 87 },
    ],
  },
};

const ScamTypePage = () => {
  const params = useParams();
  const type = params?.type as string;
  const data = scamTypeData[type || ""] || scamTypeData["postnord-bluff"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/bedrageri" className="hover:text-foreground transition-colors">Bedrägeriarter</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{data.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero */}
              <div className="p-6 md:p-8 rounded-2xl border border-red-200 bg-red-50 animate-in fade-in">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Package className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-200 mb-2 inline-block">
                      Varning
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      {data.title}
                    </h1>
                  </div>
                </div>
                <p className="text-lg text-gray-600">
                  {data.description}
                </p>
              </div>

              {/* Description */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Hur fungerar bluffen?
                </h2>
                <div className="space-y-4">
                  {data.longDescription.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-6 rounded-xl border border-green-200 bg-green-50 animate-in fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Så skyddar du dig
                  </h2>
                </div>
                <ul className="space-y-3">
                  {data.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-sm font-medium shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
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
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{data.reports.toLocaleString("sv-SE")}</div>
                      <div className="text-sm text-gray-600">Totala rapporter</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Numbers */}
              <div className="p-6 rounded-xl border border-gray-200 bg-white animate-in fade-in">
                <h3 className="font-semibold text-foreground mb-4">Senaste nummer</h3>
                <div className="space-y-3">
                  {data.recentNumbers.map((item) => (
                    <Link
                      key={item.number}
                      href={`/nummer/${item.number.replace(/\D/g, "")}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-sm font-medium text-foreground">{item.number}</div>
                        <div className="text-xs text-gray-600">{item.reports} rapporter</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Report */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 text-white animate-in fade-in">
                <h3 className="font-semibold mb-2">Blivit utsatt?</h3>
                <p className="text-sm text-white/80 mb-4">
                  Hjälp andra genom att rapportera numret som kontaktade dig.
                </p>
                <button className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
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

export default ScamTypePage;
