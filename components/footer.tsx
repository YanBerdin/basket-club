import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">Réveil Basket Is sur Tille</h2>
            <p className="mt-2 text-sm">
              Club de basket-ball d&apos;Is sur Tille, fondé pour promouvoir la pratique du basket et les valeurs
              sportives.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-primary-foreground/80"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-primary-foreground/80"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-primary-foreground/80"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Liens rapides</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-sm hover:underline">
                  Équipes
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm hover:underline">
                  Actualités & Événements
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-sm hover:underline">
                  Média
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact & Adhésion
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contact</h2>
            <address className="mt-2 not-italic text-sm">
              <p>Gymnase du Réveil</p>
              <p>21120 Is-sur-Tille</p>
              <p className="mt-2">
                <a href="mailto:contact@reveilbasket.fr" className="hover:underline">
                  contact@reveilbasket.fr
                </a>
              </p>
              <p>
                <a href="tel:+33380000000" className="hover:underline">
                  03 80 00 00 00
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} Réveil Basket Is sur Tille. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <Link href="/privacy" className="hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="hover:underline">
              Mentions légales
            </Link>
            <Link href="/cookies" className="hover:underline">
              Gestion des cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
