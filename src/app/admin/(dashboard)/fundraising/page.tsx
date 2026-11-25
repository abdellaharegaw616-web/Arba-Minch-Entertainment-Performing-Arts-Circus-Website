import { PiggyBank, ShieldCheck, HeartHandshake, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fundraising & Donation Settings — AMEPAC Admin",
};

export default function AdminFundraisingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm">
        <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
          Campaign Administration
        </span>
        <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
          <PiggyBank className="w-6 h-6 text-[#C64B24]" />
          Fundraising & Facility Campaigns
        </h1>
        <p className="text-xs text-[#17251F]/70 mt-1">
          Active funding targets, equipment requirements, and verified donation links.
        </p>
      </div>

      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
          <div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">
              Primary Active Need
            </span>
            <h2 className="text-base font-extrabold text-[#17251F] mt-1">
              Emergency Training Hall Roof & Safety Matting Restoration
            </h2>
          </div>
          <span className="text-sm font-black text-[#C64B24]">Target: $15,000 USD</span>
        </div>

        <p className="text-xs text-[#17251F]/80 leading-relaxed">
          During rainy seasons, rainwater pours through rusted corrugated roof sheets onto bare soil training grounds. Trainees slip during aerial launches and banquine catches. The campaign funds corrugated steel sheets, timber trusses, waterproof sealant, and 12 FIG-standard gymnastics landing mats.
        </p>

        <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 space-y-2">
          <strong className="text-[#17251F] block text-xs">Policy on Donation URLs:</strong>
          <p className="text-[11px] text-[#17251F]/70">
            Per client rules, unverified third-party donation links are strictly prohibited. Donors are directed to reach the leadership directly via <a href="mailto:Arbaminch.circus@gmail.com" className="text-[#C64B24] underline">Arbaminch.circus@gmail.com</a> or wire directly to registered non-profit accounts under Building Tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}
