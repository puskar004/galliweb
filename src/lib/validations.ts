import { z } from "zod";

/** Admin login form. */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

/** Creating or editing a shop from the admin dashboard. */
export const shopSchema = z.object({
  name: z.string().min(2, "Shop name is too short").max(80),
  category: z.string().min(2, "Add a short category, e.g. 'Kirana Store'").max(60),
  templateType: z.enum(["RETAIL", "RESTAURANT", "BOUTIQUE"]),
  tagline: z.string().min(3, "Tagline is too short").max(120),
  description: z.string().min(10, "Tell customers a bit more about the shop").max(1000),
  phone: z
    .string()
    .regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),
  whatsapp: z
    .string()
    .regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid WhatsApp number")
    .optional()
    .or(z.literal("")),
  address: z.string().min(5, "Address is too short").max(300),
  mapEmbedUrl: z.string().url("Paste a valid Google Maps embed URL").optional().or(z.literal("")),
  published: z.boolean().default(true),
});
export type ShopInput = z.infer<typeof shopSchema>;

/** Admin's free-text description of a shop, used to auto-fill the shop form via AI. */
export const generateShopSchema = z.object({
  prompt: z.string().min(10, "Describe the shop in a bit more detail").max(2000),
});
export type GenerateShopInput = z.infer<typeof generateShopSchema>;

/** A single image upload request (sent as a base64 data URL from the browser). */
export const uploadSchema = z.object({
  shopId: z.string().min(1),
  fileDataUrl: z.string().startsWith("data:image/", "File must be an image"),
});
export type UploadInput = z.infer<typeof uploadSchema>;
