import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey && resendApiKey.startsWith("re_") ? new Resend(resendApiKey) : null;
const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT || "Arbaminch.circus@gmail.com";

export interface BookingEmailPayload {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  organization?: string;
  eventType: string;
  eventDate: string;
  venueLocation: string;
  expectedAttendees: string;
  packageRequested: string;
  notes?: string;
}

export interface InquiryEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: string;
  message: string;
}

export async function sendBookingNotification(data: BookingEmailPayload) {
  const emailSubject = `[AMEPAC Booking Request] ${data.eventType} - ${data.clientName}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="background-color: #17251F; padding: 15px; border-radius: 6px; text-align: center;">
        <h2 style="color: #D6A84F; margin: 0;">AMEPAC Performance Booking Request</h2>
        <p style="color: #F7F3EA; margin: 5px 0 0 0; font-size: 14px;">Arba Minch Entertainment Performing Arts & Circus</p>
      </div>

      <div style="padding: 20px 0;">
        <p><strong>A new booking inquiry has been submitted through the website:</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Client Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.clientName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.clientEmail}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.clientPhone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Organization:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.organization || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Event Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.eventDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Event Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.eventType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Venue / Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.venueLocation}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Package / Troupe:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.packageRequested}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Expected Attendees:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.expectedAttendees}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Additional Notes:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.notes || "None"}</td></tr>
        </table>
      </div>

      <div style="background-color: #F7F3EA; padding: 12px; border-radius: 6px; font-size: 13px; color: #17251F;">
        <p style="margin: 0;"><strong>Office Contact:</strong> +251-913-949-209 | Arbaminch.circus@gmail.com</p>
        <p style="margin: 4px 0 0 0;">Nech Sar Sub-city, Arba Minch, South Ethiopia</p>
      </div>
    </div>
  `;

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: "AMEPAC Booking <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: data.clientEmail,
        subject: emailSubject,
        html: htmlContent,
      });
      return { success: true, id: response.data?.id };
    } catch (err: any) {
      console.warn("Resend email dispatch error:", err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log("[DEV / FALLBACK] Resend API key not configured. Booking simulated successfully:", data);
    return { success: true, simulated: true };
  }
}

export async function sendInquiryNotification(data: InquiryEmailPayload) {
  const emailSubject = `[AMEPAC Inquiry] ${data.inquiryType.toUpperCase()}: ${data.fullName}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h3 style="color: #C64B24;">New Website Inquiry</h3>
      <p><strong>Type:</strong> ${data.inquiryType}</p>
      <p><strong>From:</strong> ${data.fullName} (${data.email})</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Organization:</strong> ${data.organization || "Individual"}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; border-left: 3px solid #C64B24; padding: 10px;">${data.message}</blockquote>
    </div>
  `;

  if (resend) {
    try {
      const res = await resend.emails.send({
        from: "AMEPAC Outreach <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: data.email,
        subject: emailSubject,
        html: htmlContent,
      });
      return { success: true, id: res.data?.id };
    } catch (err: any) {
      console.warn("Resend email error:", err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log("[DEV / FALLBACK] Inquiry received:", data);
    return { success: true, simulated: true };
  }
}
