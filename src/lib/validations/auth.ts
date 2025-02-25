import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
   
});

export const registerSchema = z
  .object({
    firstname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
     ,
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas", 
    path: ["confirmPassword"],
  });
