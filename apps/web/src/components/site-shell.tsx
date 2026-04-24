"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${scrolled ? "border-b border-white/30 bg-white/85 shadow-soft backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-primary">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-primary text-white">L</span>
          HotelLilaIn
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-700 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-2 py-1 transition hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href="tel:+9779846777055" className="focus-ring rounded-lg px-3 py-1.5 text-sm text-slate-700">
            Call
          </a>
          <Link
            href="/contact"
            className="focus-ring rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book Your Stay
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md px-2 py-2 text-sm text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="focus-ring mt-2 rounded-lg bg-brand-primary px-3 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Book Your Stay
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3 lg:col-span-2">
          <p className="text-base font-semibold text-brand-text">HotelLilaIn</p>
          <p className="leading-6">
            A serene premium stay in Pokhara with personalized care, nature-connected views, and easy access to
            lakeside adventures.
          </p>
          <p className="text-slate-500">
            HotelLilaIn is proudly led by Sushil Gautam, with a focus on genuine care and memorable stays in Pokhara.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-brand-text">Quick Links</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring rounded-md transition hover:text-brand-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold text-brand-text">Contact</p>
          <ul className="space-y-2">
            <li>Pokhara, Nepal (Methlang area context)</li>
            <li>Methlang, Pokhara, Nepal</li>
            <li>
              <a href="tel:+9779846777055" className="focus-ring rounded-md hover:text-brand-primary">
                9846777055
              </a>
            </li>
            <li>
              <a href="mailto:susheelgautam321@gmail.com" className="focus-ring rounded-md hover:text-brand-primary">
                susheelgautam321@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HotelLilaIn. All rights reserved.
      </div>
    </footer>
  );
}

export function MobileStickyBookingCta() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 px-4 md:hidden">
      <a
        href="/contact"
        className="block rounded-xl bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-soft focus-ring"
      >
        Book Your Stay
      </a>
    </div>
  );
}
