import { z } from "zod";

export const inquiryStatus = z.enum(["new", "contacted", "confirmed", "closed"]);

export const inquirySchema = z.object({
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.coerce.number().int().min(1).max(10),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(32),
  message: z.string().max(1500).optional().default("")
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryStatus = z.infer<typeof inquiryStatus>;

export const roomSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(100),
  title: z.string().min(2).max(200),
  summary: z.string().min(10).max(500),
  description: z.string().min(20),
  pricePerNight: z.coerce.number().int().positive(),
  maxGuests: z.coerce.number().int().min(1).max(12),
  isPublished: z.boolean().default(true),
  featured: z.boolean().default(false)
});

export type RoomInput = z.infer<typeof roomSchema>;
