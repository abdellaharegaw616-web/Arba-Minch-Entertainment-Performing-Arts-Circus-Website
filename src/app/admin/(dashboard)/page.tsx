import { getAllBookingsForAdmin, getAllInquiriesForAdmin, getTroupes, getEvents } from "@/lib/data-store";
import {
  Calendar,
  Mail,
  Users,
  CheckCircle,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard & CMS — AMEPAC Arba Minch",
  description: "Manage bookings, events, troupes, and partnership inquiries.",
};

export default async function AdminDashboardOverviewPage() {
  const [bookings, inquiries, troupes, events] = await Promise.all([
    getAllBookingsForAdmin(),
    getAllInquiriesForAdmin(),
    getTroupes(),
    getEvents(),
  ]);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Administrative Control Panel
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1">
            AMEPAC System Overview
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1">
            Real-time status of event bookings, grassroots artist troupes, and donor inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-colors shadow-xs"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 rounded-xl bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F] transition-colors"
          >
            Site Settings
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Bookings</span>
            <Calendar className="w-4 h-4 text-[#C64B24]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{bookings.length}</div>
          <div className="text-[11px] text-[#C64B24] mt-1 font-medium">
            {pendingBookings} awaiting review
          </div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Confirmed</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{confirmedBookings}</div>
          <div className="text-[11px] text-[#17251F]/60 mt-1">Scheduled on stage</div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Inquiries</span>
            <Mail className="w-4 h-4 text-[#D6A84F]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{inquiries.length}</div>
          <div className="text-[11px] text-[#17251F]/60 mt-1">Support & donations</div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Troupes</span>
            <Users className="w-4 h-4 text-[#17251F]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{troupes.length}</div>
          <div className="text-[11px] text-[#17251F]/60 mt-1">80+ artists in training</div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#17251F] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C64B24]" />
              Recent Booking Inquiries
            </h2>
            <p className="text-xs text-[#17251F]/70">
              Direct performance inquiries received through the public booking system.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-[#C64B24] hover:underline flex items-center gap-1"
          >
            All Bookings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#D6A84F]/30 bg-[#F7F3EA] text-[#17251F]/70 font-semibold uppercase">
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Client</th>
                <th className="py-2 px-3">Event Date</th>
                <th className="py-2 px-3">Package</th>
                <th className="py-2 px-3">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6A84F]/20">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-[#F7F3EA]/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        b.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : b.status === "pending"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <strong className="text-[#17251F] block">{b.clientName}</strong>
                    <span className="text-[#17251F]/60 text-[10px]">{b.clientEmail}</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#17251F] font-medium">{b.eventDate}</td>
                  <td className="py-2.5 px-3 text-[#17251F]">{b.packageRequested}</td>
                  <td className="py-2.5 px-3 text-[#17251F]/70">{b.venueLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support & Partnership Inquiries */}
      <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#17251F] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#C64B24]" />
              Support & Partnership Inquiries
            </h2>
            <p className="text-xs text-[#17251F]/70">
              Training hall facility pledges and collaboration proposals.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {inquiries.slice(0, 3).map((inq) => (
            <div
              key={inq.id}
              className="p-3.5 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/30 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#17251F]">{inq.fullName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-semibold uppercase">
                    {inq.inquiryType.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-[11px] text-[#17251F]/70">
                  {inq.email} {inq.organization ? `• ${inq.organization}` : ""}
                </p>
                <blockquote className="mt-1.5 bg-[#EBE5D6]/60 p-2 rounded border-l-2 border-[#D6A84F] text-[#17251F]/90 text-[11px]">
                  {inq.message}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
