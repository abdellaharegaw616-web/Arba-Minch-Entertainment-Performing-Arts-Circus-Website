import Image from "next/image";
import { HeartHandshake, Shield, CheckCircle2, Building, DollarSign, ArrowRight, HelpCircle } from "lucide-react";
import { DonateInquiryForm } from "@/components/forms/DonateInquiryForm";

export const metadata = {
  title: "Support Our Mission & Training Facility — AMEPAC Arba Minch",
  description:
    "Support the Building Tomorrow Training Center Expansion Fund for 80+ street and vulnerable youth in Arba Minch, South Ethiopia.",
};

export default function DonatePage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F]">
      {/* Header Banner */}
      <section className="bg-[#17251F] text-[#F7F3EA] py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C64B24]/20 border border-[#C64B24]/40 text-[#E06840] text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              Community & Facility Fund
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3EA]">
              Building a Safe Haven for Arba Minch Youth
            </h1>
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              Your financial and material contributions directly fund our training hall renovation, safety acrobatic mats, aerial safety rigging, and daily scholastic tutoring for over 80 street and vulnerable children.
            </p>
          </div>
        </div>
      </section>

      {/* The Urgent Reality: Facility Needs & Photos (Per client requirement: "Where is GOfundme? Need a section to talk about the need for monetary support and show pics of the facility and supply area") */}
      <section id="facility" className="py-16 border-b border-[#EBE5D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
                Current Facility Reality
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F]">
                Why Monetary Support is Urgently Needed
              </h2>
              <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                Tucked into a central neighborhood of Arba Minch, reachable only by a narrow pedestrian footpath, sits our current training shed. It was constructed by hand using wooden wattle poles and recycled tin sheets.
              </p>
              <p className="text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
                While it has served as our beloved artistic birthplace, it has critical structural shortcomings:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded bg-[#EBE5D6] border-l-4 border-[#C64B24]">
                  <strong className="text-[#17251F]">Bare Soil Floor & Mud Inundation:</strong>
                  <p className="text-[#17251F]/80 mt-1">During the six months of seasonal rainfall, water leaks heavily through gaps in the roof. Cardboard pieces laid across the floor quickly soak, turning our tumbling area into hazardous mud and exposing children to persistent respiratory flu.</p>
                </div>
                <div className="p-3.5 rounded bg-[#EBE5D6] border-l-4 border-[#C64B24]">
                  <strong className="text-[#17251F]">No Aerial Rigging Capacity:</strong>
                  <p className="text-[#17251F]/80 mt-1">The fragile roof barely supports its own weight. It cannot support aerial silks, trapeze, or safety harnesses, restricting our acrobats from practicing essential high-altitude arts.</p>
                </div>
                <div className="p-3.5 rounded bg-[#EBE5D6] border-l-4 border-[#C64B24]">
                  <strong className="text-[#17251F]">Mattress & Mat Wear:</strong>
                  <p className="text-[#17251F]/80 mt-1">Our tumbling mats were salvaged years ago from discarded student dorm mattresses at Arba Minch University. Professional high-density landing mats are urgently required to prevent joint impact injuries.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border-2 border-[#D6A84F]/40 shadow-xl bg-[#0E1814]">
                <Image
                  src="/images/circus_facility_3.png"
                  alt="Current training ground and shed in Arba Minch"
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 bg-[#17251F] text-[#F7F3EA] text-xs">
                  <p className="font-semibold text-[#D6A84F]">AMEPAC Training Shed & Supply Ground</p>
                  <p className="text-[#F7F3EA]/70 mt-1">
                    Arba Minch, Ethiopia. Where our gymnasts and street youth train daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Breakdown & Giving Channels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
              Transparent Allocation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] mt-1">
              How Every Dollar & Birr is Invested
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C64B24] text-[#F7F3EA] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-base text-[#17251F]">Training Center Renovation</h3>
              <p className="text-xs text-[#17251F]/80 leading-relaxed">
                Poured level concrete foundation, rain-proof galvanized roofing, reinforced steel load-bearing beams for aerial rigging, and secure equipment lockers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D6A84F] text-[#17251F] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-base text-[#17251F]">Acrobatic Gear & Safety Mats</h3>
              <p className="text-xs text-[#17251F]/80 leading-relaxed">
                High-density gymnastics landing crash pads, Cyr wheels, professional juggling clubs, Chinese poles, and tailored performance costumes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#EBE5D6] border border-[#D6A84F]/40 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#17251F] text-[#F7F3EA] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-base text-[#17251F]">Scholastic & Child Welfare Fund</h3>
              <p className="text-xs text-[#17251F]/80 leading-relaxed">
                Mandatory school uniforms, exercise books, pens, nutritious training snacks, and emergency medical/dental support for vulnerable families.
              </p>
            </div>
          </div>

          {/* Giving Methods & Inquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Direct Giving Options */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] space-y-4">
                <h3 className="font-bold text-lg text-[#D6A84F] flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Direct Bank Transfer (Ethiopia)
                </h3>
                <div className="p-4 rounded bg-[#0E1814] text-xs space-y-2 border border-[#23382F]">
                  <p><strong className="text-[#D6A84F]">Bank:</strong> Commercial Bank of Ethiopia (CBE)</p>
                  <p><strong className="text-[#D6A84F]">Account Name:</strong> Building Tomorrow Integrated Youth & Community Development Organization</p>
                  <p><strong className="text-[#D6A84F]">Branch:</strong> Arba Minch Branch, South Ethiopia</p>
                  <p><strong className="text-[#D6A84F]">Reference:</strong> Circus Training Hall Fund</p>
                </div>
                <p className="text-[11px] text-[#F7F3EA]/70">
                  Please notify us after transferring at <strong className="text-[#D6A84F]">Arbaminch.circus@gmail.com</strong> or call <strong className="text-[#D6A84F]">+251-913-949-209</strong> to receive your official receipt.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#17251F] text-[#F7F3EA] border border-[#23382F] space-y-3">
                <h3 className="font-bold text-lg text-[#D6A84F] flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5" />
                  GoFundMe / International Giving
                </h3>
                <p className="text-xs text-[#F7F3EA]/80 leading-relaxed">
                  We are in the process of coordinating our official verified GoFundMe campaign with our international partner diaspora. If you wish to pledge support or organize a corporate/university fundraiser in your country, please submit the partnership form.
                </p>
              </div>
            </div>

            {/* Interactive Support Inquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-xl border border-[#D6A84F]/40 shadow-sm">
                <h3 className="text-lg font-bold text-[#17251F] mb-1">
                  Pledge Support or Inquire on Partnership
                </h3>
                <p className="text-xs text-[#17251F]/70 mb-6">
                  Fill in your details and our executive director Tesfahun Mergia will connect with you directly.
                </p>
                <DonateInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
