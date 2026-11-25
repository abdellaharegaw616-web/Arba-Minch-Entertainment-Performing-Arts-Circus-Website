import { adminLoginAction } from "@/app/actions";
import { Lock, Shield, ArrowLeft, Info, KeyRound, Mail } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin CMS Login — AMEPAC Arba Minch",
  description: "Restricted administrative authentication for AMEPAC content and bookings management.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; returnTo?: string };
}) {
  const returnTo = searchParams.returnTo || "/admin";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F7F3EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#EBE5D6] p-8 rounded-2xl border border-[#D6A84F]/40 shadow-lg space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#17251F] text-[#D6A84F] flex items-center justify-center mx-auto border-2 border-[#D6A84F] shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-[#17251F]">AMEPAC Admin Portal</h1>
          <p className="text-xs text-[#17251F]/75 leading-relaxed">
            Restricted access for authorized coordinators, editors, and leadership to manage performance bookings, troupe rosters, and website content.
          </p>
        </div>

        {/* Error Alert (Generic & Safe against Account Enumeration) */}
        {searchParams.error && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-red-100/90 border border-red-300 text-red-900 text-xs text-center font-medium shadow-xs"
          >
            {searchParams.error}
          </div>
        )}

        {/* Secure Login Form */}
        <form action={adminLoginAction} className="space-y-4">
          <input type="hidden" name="returnTo" value={returnTo} />

          <div>
            <label htmlFor="admin-email" className="block text-xs font-bold text-[#17251F] mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                name="email"
                required
                autoComplete="username"
                defaultValue="arbaminch.circus@gmail.com"
                placeholder="admin@amepac.org"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] placeholder-[#17251F]/40 focus:outline-none focus:border-[#C64B24] focus:ring-1 focus:ring-[#C64B24]"
              />
              <Mail className="w-4 h-4 text-[#17251F]/50 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="admin-password" className="block text-xs font-bold text-[#17251F]">
                Security Password / Passphrase
              </label>
            </div>
            <div className="relative">
              <input
                id="admin-password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] placeholder-[#17251F]/40 focus:outline-none focus:border-[#C64B24] focus:ring-1 focus:ring-[#C64B24]"
              />
              <KeyRound className="w-4 h-4 text-[#17251F]/50 absolute left-3 top-3 pointer-events-none" />
            </div>
            <p className="text-[10px] text-[#17251F]/55 mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#C64B24] shrink-0" />
              <span>Offline/Demo mode fallback: <code className="bg-[#F7F3EA] px-1 py-0.5 rounded font-mono text-[#C64B24]">amepac-admin-2026</code></span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-[#C64B24] text-[#F7F3EA] font-bold text-xs hover:bg-[#A83C1A] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <Shield className="w-4 h-4" /> Authenticate & Access CMS
          </button>
        </form>

        {/* Security & Access Policies Footnote */}
        <div className="p-3 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/30 text-[11px] text-[#17251F]/70 space-y-1">
          <strong className="text-[#17251F] block text-xs font-semibold">Security Notice:</strong>
          <p>
            Administrative accounts are provisioned exclusively through authorized invitation. Public self-registration is permanently disabled.
          </p>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17251F] hover:text-[#C64B24] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
