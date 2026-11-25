import { getAllBookingsForAdmin } from "@/lib/data-store";
import { updateBookingStatusAction } from "@/app/actions";
import { Calendar, CheckCircle2, Clock, XCircle, Archive, Shield, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Booking Inquiries Management — AMEPAC Admin",
};

export default async function AdminBookingsPage() {
  const bookings = await getAllBookingsForAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Client Inquiries
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#C64B24]" />
            Performance Bookings ({bookings.length})
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Review incoming show requests, confirm schedules, and track client inquiries securely under RLS.
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
        {bookings.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#17251F]/60">
            No booking inquiries currently registered in the database.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-xl bg-[#F7F3EA] border border-[#D6A84F]/30 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : booking.status === "pending"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : booking.status === "completed"
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <strong className="text-sm font-extrabold text-[#17251F]">
                      {booking.clientName}
                    </strong>
                    {booking.organization && (
                      <span className="text-[#17251F]/60 text-[11px]">
                        ({booking.organization})
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] text-[#17251F]/80">
                    <div>
                      <span className="text-[#17251F]/50 block">Target Event Date:</span>
                      <strong className="text-[#17251F]">{booking.eventDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#17251F]/50 block">Venue & Location:</span>
                      <span>{booking.venueLocation}</span>
                    </div>
                    <div>
                      <span className="text-[#17251F]/50 block">Requested Package:</span>
                      <strong className="text-[#C64B24]">{booking.packageRequested}</strong>
                    </div>
                    <div>
                      <span className="text-[#17251F]/50 block">Contact Info:</span>
                      <a href={`mailto:${booking.clientEmail}`} className="text-[#C64B24] hover:underline block">
                        {booking.clientEmail}
                      </a>
                      <a href={`tel:${booking.clientPhone}`} className="hover:underline">
                        {booking.clientPhone}
                      </a>
                    </div>
                    <div>
                      <span className="text-[#17251F]/50 block">Expected Attendance:</span>
                      <span>{booking.expectedAttendees || "Not specified"}</span>
                    </div>
                  </div>

                  {booking.notes && (
                    <blockquote className="mt-2 bg-[#EBE5D6]/70 p-2.5 rounded-lg border-l-2 border-[#D6A84F] text-[#17251F]/90 text-[11px]">
                      <strong>Client Note:</strong> {booking.notes}
                    </blockquote>
                  )}
                </div>

                {/* Workflow Status Actions */}
                <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-[#D6A84F]/30 pt-3 lg:pt-0 lg:pl-4">
                  {booking.status !== "confirmed" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateBookingStatusAction(booking.id, "confirmed");
                      }}
                    >
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold text-[11px] hover:bg-emerald-800 transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Show
                      </button>
                    </form>
                  )}

                  {booking.status !== "completed" && booking.status === "confirmed" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateBookingStatusAction(booking.id, "completed");
                      }}
                    >
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-blue-700 text-white font-semibold text-[11px] hover:bg-blue-800 transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Clock className="w-3.5 h-3.5" /> Mark Completed
                      </button>
                    </form>
                  )}

                  {booking.status !== "cancelled" && booking.status !== "completed" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateBookingStatusAction(booking.id, "cancelled");
                      }}
                    >
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-red-100 text-red-800 border border-red-300 font-semibold text-[11px] hover:bg-red-200 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
