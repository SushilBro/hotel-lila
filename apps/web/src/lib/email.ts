import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "HotelLilaIn <noreply@hotellilain.com>";
const hotelInbox = process.env.HOTEL_INBOX_EMAIL ?? "susheelgautam321@gmail.com";

export async function sendInquiryEmails(payload: {
  fullName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  phone: string;
  message: string;
}) {
  if (!resendKey) {
    return;
  }

  const resend = new Resend(resendKey);
  await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: "We received your HotelLilaIn inquiry",
      html: `<p>Namaste ${payload.fullName},</p><p>Thank you for contacting HotelLilaIn. We received your inquiry for ${payload.checkIn} to ${payload.checkOut} for ${payload.guests} guest(s).</p><p>Owned and operated by Sushil Gautam, committed to warm Nepali hospitality.</p>`
    }),
    resend.emails.send({
      from: fromEmail,
      to: hotelInbox,
      subject: "New HotelLilaIn inquiry",
      html: `<p><strong>Name:</strong> ${payload.fullName}</p><p><strong>Email:</strong> ${payload.email}</p><p><strong>Phone:</strong> ${payload.phone}</p><p><strong>Dates:</strong> ${payload.checkIn} to ${payload.checkOut}</p><p><strong>Guests:</strong> ${payload.guests}</p><p><strong>Message:</strong> ${payload.message || "-"}</p>`
    })
  ]);
}
