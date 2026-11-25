import {
  getAllBookingsForAdmin,
  getAllInquiriesForAdmin,
  getAllServicesForAdmin,
  getAllTroupesForAdmin,
  getAllArtistsForAdmin,
  getAllEventsForAdmin,
  getAllGalleryAssetsForAdmin,
  getAllImpactStoriesForAdmin,
  getAllTestimonialsForAdmin,
  getAllCampaignsForAdmin,
  getAuditLogsForAdmin,
} from "@/lib/data-store";
import {
  Calendar,
  Mail,
  Users,
  Briefcase,
  Camera,
  Heart,
  MessageSquare,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Trophy,
  History,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard & CMS — AMEPAC Arba Minch",
  description: "Comprehensive content-management and bookings administration system.",
};

export default async function AdminDashboardOverviewPage() {
  const [
    bookings,
    inquiries,
    services,
    troupes,
    artists,
    events,
    gallery,
    stories,
    testimonials,
    campaigns,
    auditLogs,
  ] = await Promise.all([
    getAllBookingsForAdmin(),
    getAllInquiriesForAdmin(),
    getAllServicesForAdmin(),
    getAllTroupesForAdmin(),
    getAllArtistsForAdmin(),
    getAllEventsForAdmin(),
    getAllGalleryAssetsForAdmin(),
    getAllImpactStoriesForAdmin(),
    getAllTestimonialsForAdmin(),
    getAllCampaignsForAdmin(),
    getAuditLogsForAdmin(),
  ]);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const pendingTestimonials = testimonials.filter((t) => t.isApproved === false).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-[#EBE5D6] p-6 rounded-2xl border border-[#D6A84F]/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C64B24] uppercase tracking-wider">
            Administrative Content Management System
          </span>
          <h1 className="text-2xl font-black text-[#17251F] mt-1">
            AMEPAC Operations Dashboard
          </h1>
          <p className="text-xs text-[#17251F]/70 mt-1 max-w-xl">
            Manage public website content, performance troupes, event bookings, and community impact narratives with live preview and draft controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-[#C64B24] text-[#F7F3EA] text-xs font-bold hover:bg-[#A83C1A] transition-all shadow-sm"
          >
            Review Inquiries ({pendingBookings})
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-[#17251F] text-[#F7F3EA] text-xs font-semibold hover:bg-[#23382F] transition-all"
          >
            View Live Site
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-[#EBE5D6] p-5 rounded-2xl border border-[#D6A84F]/40 shadow-xs">
          <div className="flex items-center justify-between text-[#17251F]/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Booking Inquiries</span>
            <Calendar className="w-4 h-4 text-[#C64B24]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{bookings.length}</div>
          <div className="text-[11px] text-[#C64B24] mt-1 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> {pendingBookings} pending review
          </div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-2xl border border-[#D6A84F]/40 shadow-xs">
          <div className="flex items-center justify-between text-[#17251F]/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Troupes & Artists</span>
            <Users className="w-4 h-4 text-[#D6A84F]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">
            {troupes.length} <span className="text-xs font-normal text-[#17251F]/60">({artists.length} artists)</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> All rosters active
          </div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-2xl border border-[#D6A84F]/40 shadow-xs">
          <div className="flex items-center justify-between text-[#17251F]/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Scheduled Shows</span>
            <Sparkles className="w-4 h-4 text-[#C64B24]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{events.length}</div>
          <div className="text-[11px] text-[#17251F]/70 mt-1">
            {events.filter((e) => e.isUpcoming).length} upcoming live dates
          </div>
        </div>

        <div className="bg-[#EBE5D6] p-5 rounded-2xl border border-[#D6A84F]/40 shadow-xs">
          <div className="flex items-center justify-between text-[#17251F]/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Testimonials</span>
            <MessageSquare className="w-4 h-4 text-[#17251F]" />
          </div>
          <div className="text-2xl font-black text-[#17251F] mt-2">{testimonials.length}</div>
          <div className="text-[11px] text-amber-800 mt-1 font-semibold">
            {pendingTestimonials > 0 ? `${pendingTestimonials} pending review` : "All approved"}
          </div>
        </div>
      </div>

      {/* Modules Jump Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-[#17251F]">
          Content Modules Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <Link
            href="/admin/services"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Entertainment Packages
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {services.length} packages (circus, dance, workshops)
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/troupes"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Troupes & Artists
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {troupes.length} troupes, {artists.length} performers & coaches
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/events"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Events & Tour Dates
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {events.length} festivals, community shows & tours
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/highlights"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Five-Year Highlights
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                Awards, national team selections & milestones
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/gallery"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Gallery & Videos
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {gallery.length} verified photos and video productions
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/impact"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Impact Stories
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {stories.length} verified transformation case studies
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/testimonials"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Testimonials & Quotes
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {testimonials.length} endorsements from partners
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/fundraising"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Fundraising Campaigns
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {campaigns.length} campaigns (facility & education funds)
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>

          <Link
            href="/admin/settings"
            className="p-5 rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/40 hover:border-[#C64B24] transition-all flex items-start gap-4 group shadow-xs"
          >
            <div className="p-3 rounded-xl bg-[#17251F] text-[#D6A84F] group-hover:bg-[#C64B24] group-hover:text-white transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                Settings & Audit Trail
              </h3>
              <p className="text-xs text-[#17251F]/70 mt-0.5">
                {auditLogs.length} logged administrative operations
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform self-center" />
          </Link>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#D6A84F]/30 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-[#17251F] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C64B24]" />
              Recent Booking Inquiries
            </h2>
            <p className="text-xs text-[#17251F]/70">
              Direct inquiries submitted from the public booking page.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-[#C64B24] hover:underline flex items-center gap-1"
          >
            Manage All ({bookings.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#D6A84F]/30 bg-[#F7F3EA] text-[#17251F]/70 font-semibold uppercase">
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Event Date</th>
                <th className="py-2.5 px-3">Package Requested</th>
                <th className="py-2.5 px-3">Venue / Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6A84F]/20">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-[#F7F3EA]/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
                  <td className="py-2.5 px-3 text-[#17251F] font-semibold">{b.eventDate}</td>
                  <td className="py-2.5 px-3 text-[#17251F]">{b.packageRequested}</td>
                  <td className="py-2.5 px-3 text-[#17251F]/70">{b.venueLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
