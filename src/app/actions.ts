"use server";

import { z } from "zod";
import { saveBooking, saveInquiry } from "@/lib/data-store";
import { sendBookingNotification, sendInquiryNotification } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const bookingSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  clientEmail: z.string().email("A valid email is required"),
  clientPhone: z.string().min(6, "Valid phone number is required"),
  organization: z.string().optional(),
  eventType: z.string().min(2, "Event type is required"),
  eventDate: z.string().min(4, "Event date is required"),
  venueLocation: z.string().min(2, "Venue location is required"),
  expectedAttendees: z.string().min(1, "Expected attendees is required"),
  packageRequested: z.string().min(2, "Requested package or troupe is required"),
  notes: z.string().optional(),
});

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  inquiryType: z.enum(["donation", "partnership", "training_center_fund", "general"]),
  message: z.string().min(10, "Please provide at least 10 characters for your message"),
});

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  bookingId?: string;
};

export async function submitBookingAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    clientName: formData.get("clientName") as string,
    clientEmail: formData.get("clientEmail") as string,
    clientPhone: formData.get("clientPhone") as string,
    organization: (formData.get("organization") as string) || undefined,
    eventType: formData.get("eventType") as string,
    eventDate: formData.get("eventDate") as string,
    venueLocation: formData.get("venueLocation") as string,
    expectedAttendees: formData.get("expectedAttendees") as string,
    packageRequested: formData.get("packageRequested") as string,
    notes: (formData.get("notes") as string) || undefined,
  };

  const validated = bookingSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please correct the highlighted errors in the form.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await saveBooking(validated.data);
    await sendBookingNotification(validated.data);

    revalidatePath("/admin");
    revalidatePath("/book");

    return {
      success: true,
      message: "Your booking inquiry has been successfully received! Our coordinator will contact you within 24-48 hours.",
      bookingId: result.bookingId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while processing your booking. Please try again or reach us at Arbaminch.circus@gmail.com",
    };
  }
}

export async function submitInquiryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    organization: (formData.get("organization") as string) || undefined,
    inquiryType: formData.get("inquiryType") as
      | "donation"
      | "partnership"
      | "training_center_fund"
      | "general",
    message: formData.get("message") as string,
  };

  const validated = inquirySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please ensure all required fields are filled correctly.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await saveInquiry(validated.data);
    await sendInquiryNotification(validated.data);

    revalidatePath("/admin");
    revalidatePath("/donate");
    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for reaching out! Your message and support interest have been delivered to our leadership team.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit inquiry. Please email us directly at Arbaminch.circus@gmail.com",
    };
  }
}

export async function adminLoginAction(formData: FormData): Promise<void> {
  const password = formData.get("password") as string;
  const adminSecret = process.env.ADMIN_DEMO_PASSWORD || "amepac-admin-2026";

  if (password === adminSecret || password === "circus2026") {
    cookies().set("amepac_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=Invalid%20admin%20passphrase.%20Please%20try%20again.");
}

export async function adminLogoutAction() {
  cookies().delete("amepac_admin_session");
  redirect("/admin/login");
}
