import Link from "next/link";
import { Phone, Mail, MapPin, HeartHandshake, ShieldCheck, ExternalLink, Calendar } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#17251F] text-[#F7F3EA] border-t border-[#23382F]">
      {/* Upper Footer: Organization Context & Distinction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Organization Context */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-[#F7F3EA] tracking-wider">AMEPAC</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#C64B24]/20 text-[#E06840] border border-[#C64B24]/40 font-medium">
                Est. 2011
              </span>
            </div>
            <p className="text-xs text-[#F7F3EA]/80 leading-relaxed">
              Arba Minch Entertainment Performing Arts & Circus (AMEPAC) is a grassroots cultural powerhouse based in the Gamo Zone of South Ethiopia.
            </p>
            <div className="p-3 rounded bg-[#0E1814] border border-[#23382F] text-xs text-[#F7F3EA]/70">
              <strong className="text-[#D6A84F] block mb-1">Parent Organization:</strong>
              Building Tomorrow Integrated Youth & Community Development Organization (Registered November 2022).
            </div>
          </div>

          {/* Column 2: Public Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D6A84F]">
              Explore AMEPAC
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#D6A84F] transition-colors">
                  About & Mission
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-[#D6A84F] transition-colors">
                  Founder Tesfahun Mergia
                </Link>
              </li>
              <li>
                <Link href="/troupes" className="hover:text-[#D6A84F] transition-colors">
                  Performing Arts Troupes
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D6A84F] transition-colors">
                  Services & Packages
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D6A84F] transition-colors">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/highlights" className="hover:text-[#D6A84F] transition-colors">
                  5-Year Highlights
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D6A84F] transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Impact, Bookings & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D6A84F]">
              Impact & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/impact" className="hover:text-[#D6A84F] transition-colors">
                  Social Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#D6A84F] transition-colors">
                  Approved Testimonials
                </Link>
              </li>
              <li>
                <Link href="/book-us" className="hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C64B24]" />
                  Book Performance
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#D6A84F] transition-colors flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#D6A84F]" />
                  Training Facility Fund
                </Link>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/profile.php?id=100063595935774"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1"
                >
                  Facebook Page <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-[#F7F3EA]/50 hover:text-[#D6A84F] transition-colors flex items-center gap-1 pt-1">
                  <ShieldCheck className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D6A84F]">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-xs text-[#F7F3EA]/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>
                  Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href="tel:+251913949209" className="hover:text-[#D6A84F]">
                  +251-913-949-209
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href="mailto:Arbaminch.circus@gmail.com" className="hover:text-[#D6A84F]">
                  Arbaminch.circus@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#F7F3EA]/60">
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:underline">
                Accessibility
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom micro notice */}
        <div className="mt-10 pt-6 border-t border-[#23382F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F3EA]/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} AMEPAC (Arba Minch Entertainment Performing Arts & Circus). All rights reserved.
          </p>
          <p className="text-[11px] text-[#F7F3EA]/50">
            Registered Non-Profit Umbrella: Building Tomorrow Integrated Youth & Community Development Organization (Nov 2022).
          </p>
        </div>
      </div>
    </footer>
  );
}
