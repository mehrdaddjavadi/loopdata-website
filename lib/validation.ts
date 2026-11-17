import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(254, "Email address is too long.");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: emailSchema,
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(5, "Please add a little more detail.").max(2000),
});

export const demoSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: emailSchema,
  company: z.string().trim().min(1, "Enter your company name.").max(120),
  teamSize: z.enum([
    "Just me",
    "2–10 people",
    "11–50 people",
    "51–200 people",
    "201+ people",
  ]),
  plan: z.enum(["Starter", "Growth", "Scale", "Enterprise"]),
  message: z.string().trim().max(2000).optional(),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});
