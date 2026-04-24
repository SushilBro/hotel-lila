"use server";

import { inquirySchema } from "@hotellilain/domain";
import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "./supabase";
import { sendInquiryEmails } from "./email";

export type InquiryActionState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const parsed = inquirySchema.safeParse({
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    guests: formData.get("guests"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form fields and try again." };
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("inquiries").insert({
    check_in: parsed.data.checkIn,
    check_out: parsed.data.checkOut,
    guests: parsed.data.guests,
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
    status: "new"
  });

  if (error) {
    return { ok: false, message: "Could not submit inquiry now. Please try again." };
  }

  await sendInquiryEmails(parsed.data);
  revalidatePath("/");
  revalidatePath("/contact");
  return { ok: true, message: "Inquiry submitted! We will contact you shortly." };
}
