import { requireAdminSession } from "@/lib/auth";
import { adminLogoutAction } from "@/app/actions";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Trophy,
  Camera,
  HeartHandshake,
  MessageSquareQuote,
  ClipboardList,
  PiggyBank,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  // 1. Enforce Server-Side Authentication & Authorization
  const session = await requireAdminSession();

  const navigationItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "Troupes & Members", href: "/admin/troupes", icon: Users },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "5-Year Highlights", href: "/admin/highlights", icon: Trophy },
    { label: "Gallery & Videos", href: "/admin/gallery", icon: Camera },
    { label: "Impact Stories", href: "/admin/impact", icon: HeartHandshake },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Booking Inquiries", href: "/admin/bookings", icon: ClipboardList },
    { label: "Fundraising Settings", href: "/admin/fundraising", icon: PiggyBank },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#17251F] flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-[#17251F] text-[#F7F3EA] border-b border-[#23382F] py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C64B24] flex items-center justify-center font-bold text-xs text-[#F7F3EA] shadow-inner">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-[#F7F3EA]">
                  AMEPAC Management Portal
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/30 uppercase font-semibold">
                  {session.user?.role.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-[11px] text-[#F7F3EA]/70 hidden sm:block">
                Arba Minch Entertainment Performing Arts & Circus • Building Tomorrow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right text-[11px] text-[#F7F3EA]/70">
              <span className="font-semibold text-[#F7F3EA]">{session.user?.email}</span>
              <span className="text-[10px] text-[#D6A84F]">
                {session.mode === "supabase" ? "Supabase Auth" : "Local Demo Session"}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-[#F7F3EA]/80 hover:text-[#D6A84F] px-2.5 py-1.5 rounded border border-[#23382F] transition-colors"
              title="Open public website in a new tab"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 text-red-200 hover:bg-red-900 border border-red-800 text-xs font-semibold transition-colors"
                title="Secure Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Dynamic Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#EBE5D6] rounded-2xl border border-[#D6A84F]/40 p-4 shadow-sm shrink-0 md:sticky md:top-24">
          <div className="px-3 py-2 mb-2 border-b border-[#D6A84F]/30">
            <span className="text-[11px] font-bold text-[#17251F]/70 uppercase tracking-wider">
              CMS Navigation
            </span>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#17251F] hover:bg-[#F7F3EA] hover:text-[#C64B24] transition-all group"
                >
                  <Icon className="w-4 h-4 text-[#17251F]/70 group-hover:text-[#C64B24] transition-colors shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#D6A84F]/30 px-3 text-[11px] text-[#17251F]/60 space-y-1">
            <div className="flex items-center gap-1 text-[#17251F] font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>RLS Protected</span>
            </div>
            <p>Access Clearance: {session.user?.role}</p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
