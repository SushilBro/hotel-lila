import { describe, expect, it } from "vitest";
import { inquirySchema, roomSchema } from "./index";

describe("domain schemas", () => {
  it("validates inquiry payload", () => {
    const result = inquirySchema.safeParse({
      checkIn: "2026-06-01",
      checkOut: "2026-06-03",
      guests: 2,
      fullName: "Sita Rai",
      email: "sita@example.com",
      phone: "+9779800000000",
      message: "Need a room with mountain view."
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid room price", () => {
    const result = roomSchema.safeParse({
      slug: "suite",
      title: "Suite",
      summary: "Very spacious room summary",
      description: "A long enough room description for validation pass",
      pricePerNight: 0,
      maxGuests: 2
    });
    expect(result.success).toBe(false);
  });
});
