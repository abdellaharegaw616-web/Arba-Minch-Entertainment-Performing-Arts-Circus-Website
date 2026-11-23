import Link from "next/link";
import { Sparkles, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F3EA] text-[#17251F] py-16 px-4">
      <div className="max-w-md w-full bg-[#EBE5D6] p-8 sm:p-10 rounded-2xl border border-[#D6A84F]/40 shadow-md text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#17251F] text-[#D6A84F] flex items-center justify-center mx-auto border border-[#D6A84F]/40 shadow">
          <Sparkles className="w-8 h-8 text-[#D6A84F]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Page Not Found • Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17251F]">
            Lost in the Arena?
          </h1>
          <p className="text-xs sm:text-sm text-[#17251F]/70 leading-relaxed pt-1">
            The page or performing arts resource you are looking for may have moved or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full py-2 px-4 rounded border border-[#D6A84F]/40 text-[#17251F] font-semibold text-xs hover:bg-[#D6A84F]/20 transition-colors"
          >
            Browse Packages & Offerings
          </Link>
          <Link
            href="/troupes"
            className="w-full py-2 px-4 rounded border border-[#D6A84F]/40 text-[#17251F] font-semibold text-xs hover:bg-[#D6A84F]/20 transition-colors"
          >
            Explore Performing Troupes
          </Link>
        </div>
      </div>
    </div>
  );
}
