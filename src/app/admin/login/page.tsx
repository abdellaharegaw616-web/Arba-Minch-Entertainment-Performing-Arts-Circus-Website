import { adminLoginAction } from "@/app/actions";
import { Lock, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin CMS Login — AMEPAC Arba Minch",
  description: "Restricted administrative access for AMEPAC content and bookings management.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F3EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#EBE5D6] p-8 rounded-2xl border border-[#D6A84F]/40 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#17251F] text-[#D6A84F] flex items-center justify-center mx-auto border border-[#D6A84F]/40 shadow">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#17251F]">AMEPAC Admin Portal</h1>
          <p className="text-xs text-[#17251F]/70">
            Sign in to review bookings, incoming inquiries, and manage website content.
          </p>
        </div>

        {searchParams.error && (
          <div className="p-3 rounded bg-red-100 border border-red-200 text-red-800 text-xs text-center font-medium">
            {searchParams.error}
          </div>
        )}

        <form action={adminLoginAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17251F] mb-1">
              Admin Passphrase
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter admin passphrase"
              className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
            />
            <p className="text-[10px] text-[#17251F]/50 mt-1">
              Default demo authorization: <code className="bg-[#F7F3EA] px-1 py-0.5 rounded text-[#C64B24]">amepac-admin-2026</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-bold text-xs hover:bg-[#A83C1A] transition-colors shadow flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" /> Authenticate & Access CMS
          </button>
        </form>

        <div className="pt-4 border-t border-[#D6A84F]/30 text-center">
          <Link href="/" className="text-xs text-[#C64B24] hover:underline">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
