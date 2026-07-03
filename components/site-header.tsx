"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
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

const allLinks = [...primaryLinks, ...secondaryLinks];

function isActive(pathname: string | null, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname?.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // hide when scrolling down past the header, reveal on scroll up
      if (y > 140 && y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock scroll while it's open.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-hidden={hidden && !menuOpen}>
        <nav aria-label="Primary navigation" className="site-header__nav">
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.href} data-active={isActive(pathname, link.href)}>
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
              data-active={!link.featured ? isActive(pathname, link.href) : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="site-header__toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="mobile-menu" data-open={menuOpen} role="dialog" aria-modal="true" aria-label="Menu">
        <button
          className="mobile-menu__close"
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        {allLinks.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
