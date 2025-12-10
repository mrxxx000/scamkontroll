import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
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
              Identifiera och rapportera bluffnummer och bedrägerier.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Tjänster</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Sök nummer
                </Link>
              </li>
              <li>
                <Link href="/bedrageri" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Bedrägeriarter
                </Link>
              </li>
              <li>
                <Link href="/artiklar" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Artiklar & guider
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/om-oss" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Om oss
                </Link>
              </li>
              {/* Contact link temporarily disabled */}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Vanliga bedrägerier</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/bedrageri" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  PostNord bluff
                </Link>
              </li>
              <li>
                <Link href="/bedrageri" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  BankID bluff
                </Link>
              </li>
              <li>
                <Link href="/bedrageri" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
}
