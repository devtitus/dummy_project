import { z } from "zod";
import { MESSAGES } from "./messages";

export const signUpSchema = z.object({
  email: z.string().email(MESSAGES.EMAIL_NOT_VALID),
  password: z.string().min(6, MESSAGES.PASSWORD_NOT_VALID),
});

export const loginSchema = z.object({
  email: z.string().email(MESSAGES.EMAIL_NOT_VALID),
  password: z.string().min(1, "Password is required."),
})