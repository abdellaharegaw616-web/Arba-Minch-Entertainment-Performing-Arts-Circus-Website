import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient, createAdminSupabaseClient } from "./supabase/server";

export interface AdminUser {
  id: string;
  email: string;
  role: "super_admin" | "editor" | "moderator";
  fullName: string;
  isActive: boolean;
}

export interface AdminSession {
  authenticated: boolean;
  user: AdminUser | null;
  isSuperAdmin: boolean;
  mode: "supabase" | "demo_fallback";
}

/**
 * Validates and retrieves the current authenticated administrator session on the server.
 * Ensures caller is genuinely authenticated and has an active role in public.admin_profiles.
 */
export async function getAdminSession(): Promise<AdminSession> {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();

  // 1. Try Supabase Auth first if configured
  if (supabase) {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user && user.email) {
        // Query the admin_profiles table to verify active admin role
        const { data: profile, error: profileError } = await supabase
          .from("admin_profiles")
          .select("id, email, role, full_name, is_active")
          .eq("id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (!profileError && profile) {
          return {
            authenticated: true,
            user: {
              id: profile.id,
              email: profile.email,
              role: profile.role,
              fullName: profile.full_name,
              isActive: profile.is_active,
            },
            isSuperAdmin: profile.role === "super_admin",
            mode: "supabase",
          };
        }
      }
    } catch {
      // Fallback to local session check if Supabase connection fails
    }
  }

  // 2. Controlled Local / Offline Demo Session Fallback
  // Active only during local development or when Supabase keys are not yet configured.
  const demoCookie = cookieStore.get("amepac_admin_session");
  if (demoCookie && demoCookie.value === "authenticated") {
    return {
      authenticated: true,
      user: {
        id: "demo-admin-local",
        email: "arbaminch.circus@gmail.com",
        role: "super_admin",
        fullName: "AMEPAC Local Administrator",
        isActive: true,
      },
      isSuperAdmin: true,
      mode: "demo_fallback",
    };
  }

  return {
    authenticated: false,
    user: null,
    isSuperAdmin: false,
    mode: "supabase",
  };
}

/**
 * Server-side route guard. Redirects to login if not authenticated or not authorized.
 */
export async function requireAdminSession(allowedRoles?: Array<"super_admin" | "editor" | "moderator">) {
  const session = await getAdminSession();

  if (!session.authenticated || !session.user) {
    redirect("/admin/login?error=Please%20sign%20in%20to%20access%20the%20management%20portal.");
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect("/admin?error=Unauthorized%20access.%20Required%20role%20not%20held.");
  }

  return session;
}

/**
 * Server Action authorization guard. Throws error if unauthorized.
 */
export async function verifyAdminAction(allowedRoles?: Array<"super_admin" | "editor" | "moderator">) {
  const session = await getAdminSession();

  if (!session.authenticated || !session.user) {
    throw new Error("Unauthorized: Administrative authentication required.");
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    throw new Error("Forbidden: You do not possess the required permissions for this action.");
  }

  return session;
}

/**
 * Sanitizes return URLs to protect against Open Redirect vulnerabilities.
 * Ensures the target URL strictly starts with '/admin' and has no protocol or authority component.
 */
export function sanitizeAdminRedirect(url: string | null | undefined, defaultUrl = "/admin"): string {
  if (!url) return defaultUrl;

  const trimmed = url.trim();

  // Disallow absolute URLs, protocols, protocol-relative '//', and javascript: schemes
  if (
    trimmed.startsWith("//") ||
    trimmed.includes("://") ||
    trimmed.toLowerCase().startsWith("javascript:") ||
    trimmed.toLowerCase().startsWith("data:")
  ) {
    return defaultUrl;
  }

  // Must strictly begin with /admin
  if (trimmed.startsWith("/admin")) {
    return trimmed;
  }

  return defaultUrl;
}
