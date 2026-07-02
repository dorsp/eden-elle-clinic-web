import Link from "next/link";
import { LogoWordmark } from "@/components/logo-wordmark";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/about", label: "About" }
];

const secondaryLinks = [
  { href: "/locations", label: "Visit" },
  { href: "/contact", label: "Book", featured: true }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="site-header__nav">
        {primaryLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <LogoWordmark className="site-header__logo" />
      <nav aria-label="Booking navigation" className="site-header__nav site-header__nav--right">
        {secondaryLinks.map((link) => (
          <Link
            className={link.featured ? "site-header__book" : undefined}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
