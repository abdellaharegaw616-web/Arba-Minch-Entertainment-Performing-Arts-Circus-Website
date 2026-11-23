"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, Phone, HeartHandshake, Sparkles, MapPin } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About & Impact" },
    { href: "/troupes", label: "Troupes" },
    { href: "/services", label: "Packages & Offerings" },
    { href: "/events", label: "Calendar" },
    { href: "/highlights", label: "5-Yr Highlights" },
    { href: "/media", label: "Gallery & Videos" },
    { href: "/donate", label: "Support & Facility" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#17251F] text-[#F7F3EA] shadow-md border-b border-[#23382F]">
      {/* Top micro bar with contact & regional identity */}
      <div className="hidden md:block bg-[#0E1814] text-[#D6A84F] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#1E2D27]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F7F3EA]/90">
              <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
              Mehal Ketema, Nech Sar, Arba Minch, South Ethiopia
            </span>
            <span className="text-[#F7F3EA]/40">|</span>
            <span className="text-[#F7F3EA]/80">Est. 2011 • Parent Org: Building Tomorrow (Reg. Nov 2022)</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+251913949209" className="hover:text-[#F7F3EA] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#D6A84F]" /> +251-913-949-209
            </a>
            <Link href="/admin" className="text-[#D6A84F]/70 hover:text-[#D6A84F] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-lg bg-[#C64B24] flex items-center justify-center font-bold text-lg text-[#F7F3EA] shadow-sm border border-[#D6A84F]/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-[#F7F3EA] flex items-center gap-2">
                AMEPAC
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/30 uppercase tracking-widest hidden sm:inline-block">
                  Arba Minch
                </span>
              </span>
              <span className="text-xs text-[#F7F3EA]/70 font-light truncate max-w-[220px] sm:max-w-none">
                Entertainment Performing Arts & Circus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[#D6A84F] bg-[#23382F]"
                      : "text-[#F7F3EA]/90 hover:text-[#D6A84F] hover:bg-[#23382F]/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md border border-[#D6A84F] text-[#D6A84F] hover:bg-[#D6A84F] hover:text-[#17251F] transition-all"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Support Fund
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#C64B24] text-[#F7F3EA] hover:bg-[#A83C1A] transition-all shadow"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Performance
            </Link>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="px-2.5 py-1.5 text-xs font-semibold rounded bg-[#C64B24] text-[#F7F3EA] sm:hidden"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#F7F3EA]/80 hover:text-[#D6A84F] hover:bg-[#23382F] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#0E1814] border-t border-[#23382F] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "text-[#D6A84F] bg-[#17251F]"
                    : "text-[#F7F3EA]/90 hover:text-[#D6A84F] hover:bg-[#17251F]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#23382F] flex flex-col gap-2">
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-sm hover:bg-[#A83C1A]"
            >
              Book a Performance
            </Link>
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded border border-[#D6A84F] text-[#D6A84F] font-semibold text-sm hover:bg-[#D6A84F] hover:text-[#17251F]"
            >
              Donate & Facility Fund
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
