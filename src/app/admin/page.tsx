import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBookingsForAdmin, getAllInquiriesForAdmin, getTroupes, getEvents } from "@/lib/data-store";
import { adminLogoutAction } from "@/app/actions";
import {
  Calendar,
  Mail,
  Phone,
  Users,
  CheckCircle,
  Clock,
  LogOut,
  ShieldCheck,
  Building,
  HeartHandshake,
  Tag,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard & CMS — AMEPAC Arba Minch",
  description: "Manage bookings, events, troupes, and partnership inquiries.",
};

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("amepac_admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const [bookings, inquiries, troupes, events] = await Promise.all([
    getAllBookingsForAdmin(),
    getAllInquiriesForAdmin(),
    getTroupes(),
    getEvents(),
  ]);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#17251F] pb-16">
      {/* Admin Nav Bar */}
      <div className="bg-[#17251F] text-[#F7F3EA] border-b border-[#23382F] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#C64B24] flex items-center justify-center font-bold text-xs text-[#F7F3EA]">
              ADM
            </div>
            <div>
              <h1 className="font-bold text-base text-[#F7F3EA] flex items-center gap-2">
                AMEPAC Management Portal
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/30 uppercase font-semibold">
                  Live CMS
                </span>
              </h1>
              <p className="text-[11px] text-[#F7F3EA]/70">
                Arba Minch Entertainment Performing Arts & Circus • Building Tomorrow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#F7F3EA]/80 hover:text-[#D6A84F] px-3 py-1.5 rounded border border-[#23382F]"
            >
              View Live Website
            </Link>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950 text-red-200 hover:bg-red-900 border border-red-800 text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Total Bookings</span>
              <Calendar className="w-4 h-4 text-[#C64B24]" />
            </div>
            <div className="text-2xl font-black text-[#17251F] mt-2">{bookings.length}</div>
            <div className="text-[11px] text-[#C64B24] mt-1 font-medium">
              {pendingBookings} awaiting review
            </div>
          </div>

          <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Confirmed Shows</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#17251F] mt-2">{confirmedBookings}</div>
            <div className="text-[11px] text-[#17251F]/60 mt-1">Calendar scheduled</div>
          </div>

          <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Inquiries & Leads</span>
              <Mail className="w-4 h-4 text-[#D6A84F]" />
            </div>
            <div className="text-2xl font-black text-[#17251F] mt-2">{inquiries.length}</div>
            <div className="text-[11px] text-[#17251F]/60 mt-1">Donations & partnerships</div>
          </div>

          <div className="bg-[#EBE5D6] p-5 rounded-xl border border-[#D6A84F]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#17251F]/70 uppercase">Active Troupes</span>
              <Users className="w-4 h-4 text-[#17251F]" />
            </div>
            <div className="text-2xl font-black text-[#17251F] mt-2">{troupes.length}</div>
            <div className="text-[11px] text-[#17251F]/60 mt-1">80+ artists in training</div>
          </div>
        </div>

        {/* Section 1: Bookings Management */}
        <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
            <div>
              <h2 className="text-lg font-bold text-[#17251F] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#C64B24]" />
                Client Performance Bookings ({bookings.length})
              </h2>
              <p className="text-xs text-[#17251F]/70">
                Incoming booking requests with client contact info, target date, and requested package.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D6A84F]/30 bg-[#F7F3EA] text-[#17251F]/70 font-semibold uppercase">
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Client & Organization</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Date & Venue</th>
                  <th className="py-2.5 px-3">Requested Troupe</th>
                  <th className="py-2.5 px-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6A84F]/20">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F7F3EA]/70 transition-colors">
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3">
                      <strong className="text-[#17251F] block">{b.clientName}</strong>
                      <span className="text-[#17251F]/60 text-[11px]">{b.organization || "Private Individual"}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        <a href={`mailto:${b.clientEmail}`} className="text-[#C64B24] hover:underline block">
                          {b.clientEmail}
                        </a>
                        <a href={`tel:${b.clientPhone}`} className="text-[#17251F]/75 block">
                          {b.clientPhone}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#17251F] block">{b.eventDate}</span>
                      <span className="text-[#17251F]/70">{b.venueLocation}</span>
                      <span className="block text-[10px] text-[#17251F]/50">({b.expectedAttendees} attendees)</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#17251F]">
                      {b.packageRequested}
                    </td>
                    <td className="py-3 px-3 text-[#17251F]/75 max-w-xs truncate">
                      {b.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Incoming Inquiries & Pledges */}
        <div className="bg-[#EBE5D6] rounded-xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
            <div>
              <h2 className="text-lg font-bold text-[#17251F] flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#C64B24]" />
                Support & Partnership Inquiries ({inquiries.length})
              </h2>
              <p className="text-xs text-[#17251F]/70">
                Pledges for the Training Center Facility Fund, volunteer proposals, and partner outreach.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-lg bg-[#F7F3EA] border border-[#D6A84F]/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17251F] text-sm">{inq.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-semibold uppercase">
                      {inq.inquiryType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#17251F]/70 flex flex-wrap items-center gap-3">
                    <span>Email: <a href={`mailto:${inq.email}`} className="text-[#C64B24] hover:underline">{inq.email}</a></span>
                    {inq.phone && <span>Phone: {inq.phone}</span>}
                    {inq.organization && <span>Org: {inq.organization}</span>}
                  </div>
                  <blockquote className="mt-2 bg-[#EBE5D6]/60 p-2.5 rounded border-l-2 border-[#D6A84F] text-[#17251F]/90">
                    {inq.message}
                  </blockquote>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={`mailto:${inq.email}?subject=Regarding your AMEPAC inquiry`}
                    className="px-3 py-1.5 rounded bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F]"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Troupes & Events Registry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Troupes Quick List */}
          <div className="bg-[#EBE5D6] p-6 rounded-xl border border-[#D6A84F]/40 space-y-4">
            <h3 className="font-bold text-base text-[#17251F] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C64B24]" /> Registered Troupes
            </h3>
            <div className="space-y-2 text-xs">
              {troupes.map((t) => (
                <div key={t.id} className="p-2.5 rounded bg-[#F7F3EA] flex items-center justify-between">
                  <div>
                    <strong className="text-[#17251F] block">{t.name}</strong>
                    <span className="text-[#17251F]/60 text-[11px]">{t.acts.slice(0, 2).join(", ")}...</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#17251F] text-[#D6A84F] text-[10px] font-bold">
                    {t.membersCount} {t.membersCount === 1 ? "artist" : "artists"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Events Quick List */}
          <div className="bg-[#EBE5D6] p-6 rounded-xl border border-[#D6A84F]/40 space-y-4">
            <h3 className="font-bold text-base text-[#17251F] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C64B24]" /> Scheduled Public Events
            </h3>
            <div className="space-y-2 text-xs">
              {events.map((e) => (
                <div key={e.id} className="p-2.5 rounded bg-[#F7F3EA] flex items-center justify-between">
                  <div>
                    <strong className="text-[#17251F] block">{e.title}</strong>
                    <span className="text-[#17251F]/60 text-[11px]">{e.date} • {e.location}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C64B24]/10 text-[#C64B24] font-semibold">
                    {e.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
