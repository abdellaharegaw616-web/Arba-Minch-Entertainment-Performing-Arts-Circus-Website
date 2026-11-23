"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitInquiryAction, FormState } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 rounded-md bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs sm:text-sm hover:bg-[#A83C1A] disabled:opacity-50 transition-all shadow flex items-center justify-center gap-2"
    >
      {pending ? (
        <span>Submitting...</span>
      ) : (
        <>
          <Send className="w-4 h-4" /> Submit Partnership or Pledge
        </>
      )}
    </button>
  );
}

const initialState: FormState = {};

export function DonateInquiryForm() {
  const [state, formAction] = useFormState(submitInquiryAction, initialState);

  if (state.success) {
    return (
      <div className="p-6 rounded-lg bg-[#17251F] text-[#F7F3EA] border border-[#D6A84F]/40 space-y-3 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#D6A84F] mx-auto" />
        <h4 className="font-bold text-base text-[#D6A84F]">Thank You for Your Support!</h4>
        <p className="text-xs text-[#F7F3EA]/80 leading-relaxed">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message && !state.success && (
        <div className="p-3 rounded bg-red-100 text-red-800 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#17251F] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          required
          placeholder="e.g. Dr. Abebe / Sarah Johnson"
          className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
        />
        {state.errors?.fullName && (
          <p className="text-[11px] text-red-600 mt-1">{state.errors.fullName[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#17251F] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@domain.com"
            className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.email && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#17251F] mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+251-9..."
            className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#17251F] mb-1">
            Organization or Entity
          </label>
          <input
            type="text"
            name="organization"
            placeholder="NGO, University, Diaspora Group..."
            className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#17251F] mb-1">
            Inquiry Interest Type <span className="text-red-500">*</span>
          </label>
          <select
            name="inquiryType"
            defaultValue="training_center_fund"
            className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          >
            <option value="training_center_fund">Training Center Hall Renovation</option>
            <option value="donation">Equipment / Scholastic Materials Donation</option>
            <option value="partnership">International Cultural Partnership / Tour</option>
            <option value="general">General Support Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#17251F] mb-1">
          Message & Support Details <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Tell us how you would like to help or what you would like to discuss..."
          className="w-full text-xs px-3 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
        ></textarea>
        {state.errors?.message && (
          <p className="text-[11px] text-red-600 mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
