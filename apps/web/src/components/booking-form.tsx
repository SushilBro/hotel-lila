"use client";

import { submitInquiry, type InquiryActionState } from "@/lib/actions";
import { Input } from "@hotellilain/ui";
import { useActionState } from "react";

const initialState: InquiryActionState = { ok: false, message: "" };

export function BookingForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  return (
    <form action={action} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-medium text-slate-700">Get a quick availability response.</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-xs font-medium text-slate-500">
          Check-in
          <Input name="checkIn" type="date" aria-label="Check in date" required className="mt-1" />
        </label>
        <label className="text-xs font-medium text-slate-500">
          Check-out
          <Input name="checkOut" type="date" aria-label="Check out date" required className="mt-1" />
        </label>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          name="fullName"
          placeholder="Your full name"
          aria-label="Full name"
          required
          className="focus-ring"
        />
        <Input
          name="guests"
          type="number"
          min={1}
          max={10}
          defaultValue={2}
          aria-label="Guests"
          required
          className="focus-ring"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Input name="phone" placeholder="Phone / WhatsApp" aria-label="Phone number" required className="focus-ring" />
        <Input name="email" type="email" placeholder="Email" aria-label="Email" required className="focus-ring" />
      </div>
      <textarea
        name="message"
        className="focus-ring min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        placeholder="Any preference? (view, early check-in, family setup)"
      />
      <button
        type="submit"
        disabled={pending}
        className="focus-ring rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Send Inquiry"}
      </button>
      <p className="text-xs text-slate-500">
        Secure inquiry • Fast response • Transparent pricing, no hidden charges.
      </p>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-700"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
