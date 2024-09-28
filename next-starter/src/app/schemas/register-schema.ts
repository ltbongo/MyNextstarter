import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    surname: z.string().min(3, { message: "Surname must be at least 3 characters long" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    // confirmPassword: z
    //   .string()
    //   .min(8, { message: "Password must be at least 8 characters long" }),
  // })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords do not match",
  //   path: ["confirmPassword"],
  });
