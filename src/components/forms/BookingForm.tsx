"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitBookingAction, FormState } from "@/app/actions";
import { Calendar, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 px-6 rounded-md bg-[#C64B24] text-[#F7F3EA] font-bold text-xs sm:text-sm hover:bg-[#A83C1A] disabled:opacity-50 transition-all shadow flex items-center justify-center gap-2"
    >
      {pending ? (
        <span>Submitting Booking Request...</span>
      ) : (
        <>
          <Calendar className="w-4 h-4" /> Submit Performance Booking Request
        </>
      )}
    </button>
  );
}

const initialState: FormState = {};

interface BookingFormProps {
  initialTroupe?: string;
  initialPackage?: string;
  initialEvent?: string;
}

export function BookingForm({
  initialTroupe,
  initialPackage,
  initialEvent,
}: BookingFormProps) {
  const [state, formAction] = useFormState(submitBookingAction, initialState);

  const defaultPackage = initialTroupe || initialPackage || initialEvent || "";

  if (state.success) {
    return (
      <div className="p-8 rounded-xl bg-[#17251F] text-[#F7F3EA] border border-[#D6A84F]/40 space-y-4 text-center">
        <CheckCircle2 className="w-12 h-12 text-[#D6A84F] mx-auto" />
        <h3 className="text-xl font-bold text-[#D6A84F]">Booking Request Confirmed!</h3>
        <p className="text-xs sm:text-sm text-[#F7F3EA]/85 max-w-lg mx-auto leading-relaxed">
          {state.message}
        </p>
        {state.bookingId && (
          <p className="text-xs text-[#D6A84F]/80">
            Reference Tracking ID: <span className="font-mono">{state.bookingId}</span>
          </p>
        )}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2 rounded bg-[#C64B24] text-[#F7F3EA] text-xs font-semibold hover:bg-[#A83C1A]"
          >
            Return to Home
          </Link>
          <a
            href="tel:+251913949209"
            className="px-5 py-2 rounded border border-[#D6A84F] text-[#D6A84F] text-xs font-semibold hover:bg-[#D6A84F] hover:text-[#17251F]"
          >
            Direct Call (+251-913-949-209)
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.success && (
        <div className="p-3.5 rounded bg-red-100 text-red-800 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Row 1: Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Client or Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="clientName"
            required
            placeholder="Full Name"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.clientName && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.clientName[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Organization or Entity (Optional)
          </label>
          <input
            type="text"
            name="organization"
            placeholder="Festival Committee / Company / School"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
        </div>
      </div>

      {/* Row 2: Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="clientEmail"
            required
            placeholder="client@example.com"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.clientEmail && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.clientEmail[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="clientPhone"
            required
            placeholder="+251-9... or international number"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.clientPhone && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.clientPhone[0]}</p>
          )}
        </div>
      </div>

      {/* Row 3: Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Event Type <span className="text-red-500">*</span>
          </label>
          <select
            name="eventType"
            defaultValue="Cultural Festival"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          >
            <option value="Cultural Festival">Cultural Festival</option>
            <option value="Corporate Event / Gala">Corporate Event / Gala</option>
            <option value="International Tour">International Tour</option>
            <option value="School / Educational Assembly">School / Educational Assembly</option>
            <option value="Community Parade / Street Arts">Community Parade / Street Arts</option>
            <option value="Private Celebration / Wedding">Private Celebration / Wedding</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Target Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="eventDate"
            required
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.eventDate && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.eventDate[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Expected Attendees <span className="text-red-500">*</span>
          </label>
          <select
            name="expectedAttendees"
            defaultValue="100 - 500"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          >
            <option value="Under 100">Under 100</option>
            <option value="100 - 500">100 - 500</option>
            <option value="500 - 2,000">500 - 2,000</option>
            <option value="2,000+ (Festival/Arena)">2,000+ (Festival / Arena)</option>
          </select>
        </div>
      </div>

      {/* Row 4: Venue location & Package */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Venue / City / Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venueLocation"
            required
            placeholder="e.g. Arba Minch Stadium / Addis Ababa / Abroad"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.venueLocation && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.venueLocation[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17251F] mb-1">
            Requested Troupe or Package <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="packageRequested"
            required
            defaultValue={defaultPackage}
            placeholder="e.g. Troupe African Pride, Giant Puppets, Full Stage"
            className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
          />
          {state.errors?.packageRequested && (
            <p className="text-[11px] text-red-600 mt-1">{state.errors.packageRequested[0]}</p>
          )}
        </div>
      </div>

      {/* Row 5: Notes */}
      <div>
        <label className="block text-xs font-bold text-[#17251F] mb-1">
          Special Requests, Stage Specs or Budget Notes (Optional)
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Mention stage size, outdoor vs indoor, specific acts requested, or lodging/transport arrangements..."
          className="w-full text-xs px-3.5 py-2.5 rounded bg-[#F7F3EA] border border-[#D6A84F]/40 text-[#17251F] focus:outline-none focus:border-[#C64B24]"
        ></textarea>
      </div>

      <SubmitButton />
    </form>
  );
}
