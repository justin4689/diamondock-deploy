"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import type { z } from "zod";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import des icônes
import { useState } from "react";
import Image from "next/image";
import { apiUrl } from "@/app/config/index";
import { toast } from "sonner";


import { useRouter } from "next/navigation";
import { LoaderCircle } from 'lucide-react';
// ...

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
  
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const result = await response.json();
      toast.success(result.message);
      console.log("Redirection vers OTP...");

      // Stocker l'email dans sessionStorage
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("password", data.password);
      

      // Rediriger vers la page OTP sans passer l'email dans l'URL
      router.push(`/otp`);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <Image
            src={"/logo2.png"}
            alt="logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              {...register("lastname")}
              type="text"
              placeholder="Entrez votre nom"
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              {...register("firstname")}
              type="text"
              placeholder="Entrez votre prenom"
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Entrez votre email"
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label="Afficher ou masquer le mot de passe"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                {...register("password_confirmation")}
                type={showPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label="Afficher ou masquer le mot de passe"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="animate-spin mr-2" />

                <span>Inscription...</span>
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-black">
            Déjà un compte ?{" "}
            <span className="text-orange-600 hover:text-orange-400">
              Se connecter
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
