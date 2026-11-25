import { Settings, Phone, Mail, MapPin, Building2, Calendar, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Site Settings & Contact Info — AMEPAC Admin",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm">
        <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
          Configuration & Registry
        </span>
        <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#C64B24]" />
          Organization & Contact Settings
        </h1>
        <p className="text-xs text-[#17251F]/70 mt-1">
          Verified contact details, historical founding distinctions, and public metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-[#17251F] flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C64B24]" />
            Official Client Contact Information
          </h2>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30">
              <span className="text-[10px] text-[#17251F]/50 block">Primary Telephone</span>
              <strong className="text-[#17251F] text-xs">+251-913-949-209</strong>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30">
              <span className="text-[10px] text-[#17251F]/50 block">Primary Email</span>
              <strong className="text-[#C64B24] text-xs">Arbaminch.circus@gmail.com</strong>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30">
              <span className="text-[10px] text-[#17251F]/50 block">Physical Location</span>
              <span className="text-[#17251F] text-xs">
                Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia
              </span>
            </div>
          </div>
        </div>

        {/* Legal Entities & Dates */}
        <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-[#17251F] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C64B24]" />
            Legal Registration & Founding Distinctions
          </h2>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30">
              <span className="text-[10px] text-[#17251F]/50 block">Performing Arts Group Founding</span>
              <strong className="text-[#17251F] text-xs">Established 2011</strong>
              <p className="text-[10px] text-[#17251F]/60 mt-0.5">
                Over 13 years of grassroots athletic youth coaching in Arba Minch.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30">
              <span className="text-[10px] text-[#17251F]/50 block">Parent Non-Profit Entity</span>
              <strong className="text-[#17251F] text-xs">
                Building Tomorrow Integrated Youth & Community Development Organization
              </strong>
              <p className="text-[10px] text-[#C64B24] font-semibold mt-0.5">
                Officially Registered: November 2022
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-[11px] text-[#17251F]/80">
                Preserved distinction per client documentation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
