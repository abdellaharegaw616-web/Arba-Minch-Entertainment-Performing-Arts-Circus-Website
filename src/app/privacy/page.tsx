import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Privacy & Child Safeguarding Policy — AMEPAC Arba Minch",
  description:
    "Privacy guidelines and child safeguarding commitments for AMEPAC and Building Tomorrow Integrated Youth & Community Development Organization.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Privacy & Safeguarding" }]} />

      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Ethics & Data Protection
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Privacy & Child Safeguarding Policy
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              How AMEPAC and Building Tomorrow Integrated Youth protect client contact information and uphold the highest standards of child safeguarding.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
          <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#17251F]">
              1. Child Protection & Media Safeguarding (FIG Certified)
            </h2>
            <p>
              AMEPAC is operated under the direct leadership of Tesfahun Mergia, certified under the International Federation of Gymnastics (FIG) Safeguarding for Coaches program.
            </p>
            <p>
              All photographs and video documentations featuring minors are captured with parental, guardian, or institutional consent. We strictly prohibit the unauthorized distribution or exploitative reproduction of any image depicting our youth performers.
            </p>
          </div>

          <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#17251F]">
              2. Client Data & Inquiries
            </h2>
            <p>
              When you submit a performance booking request or support pledge through this website, we collect your name, email, phone number, and event details. This data is utilized solely for communicating contract terms, technical stage requirements, and donation receipts.
            </p>
            <p>
              We never sell, lease, or monetize client or donor personal data to third parties.
            </p>
          </div>

          <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#17251F]">
              3. Contact Our Data Controller
            </h2>
            <p>
              For privacy inquiries, media consent requests, or to update your contact preferences, please write directly to:
            </p>
            <div className="p-3 bg-[#F7F3EA] rounded border border-[#D6A84F]/20 text-xs font-mono">
              AMEPAC Privacy Desk: Arbaminch.circus@gmail.com | +251-913-949-209
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
