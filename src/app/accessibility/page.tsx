import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Accessibility Statement — AMEPAC Arba Minch",
  description:
    "AMEPAC's digital accessibility commitments, WCAG 2.1 compliance standards, and assistive technology accommodations.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[#F7F3EA] text-[#17251F] min-h-screen">
      <Breadcrumbs items={[{ label: "Accessibility Statement" }]} />

      <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider px-3 py-1 rounded bg-[#23382F] border border-[#D6A84F]/30 inline-block">
              Universal Access
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EA]">
              Accessibility Statement
            </h1>
            <p className="text-base sm:text-lg text-[#F7F3EA]/85 leading-relaxed font-light">
              AMEPAC is committed to ensuring digital accessibility for all users, including visitors relying on assistive technologies, keyboard navigation, or screen readers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-[#17251F]/85 leading-relaxed">
          <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#17251F]">
              Conformance Standard
            </h2>
            <p>
              This web platform has been architected to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#17251F]/80">
              <li>High-contrast text tokens meeting or exceeding 4.5:1 contrast ratios.</li>
              <li>Semantic HTML5 landmarks (`&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;`, `&lt;nav&gt;`, `&lt;section&gt;`).</li>
              <li>Visible 2px focus indicators on all interactive inputs and buttons.</li>
              <li>Descriptive alt text for all performer photography and illustrations.</li>
              <li>Keyboard-accessible modal dialogues with Escape key dismiss and focus management.</li>
            </ul>
          </div>

          <div className="bg-[#EBE5D6] p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/40 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#17251F]">
              Feedback & Accommodations
            </h2>
            <p>
              If you experience any difficulty accessing content or completing a performance booking request, please contact our team for immediate assistance:
            </p>
            <div className="p-3 bg-[#F7F3EA] rounded border border-[#D6A84F]/20 text-xs font-mono">
              Accessibility Coordinator: Arbaminch.circus@gmail.com | +251-913-949-209
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
