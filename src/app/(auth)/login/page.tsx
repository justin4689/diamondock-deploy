"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import des icônes
import type { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from 'lucide-react';


type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Ajout de l'état pour l'erreur du backend

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
      if (
        result.error ===
        "Votre compte n'est pas vérifié. Un nouveau code OTP a été envoyé."
      ) {
        router.push("/otp");
      }
      // Gérer l'erreur d'authentification
    } else {
      // Rediriger vers la page d'accueil ou une autre page
      toast.success("vous etes connecté avec succès");
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-4 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="">
          <Image
            src={"/logo2.png"}
            alt="logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous 👋 
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {error && ( // Afficher l'erreur du backend en haut du formulaire
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="animate-spin mr-2" />
                <span>Connexion ...</span>
              </div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
        <div className="text-center">
          <Link href="/forgot-password" className="text-black">
            <span className="text-orange-600 hover:text-orange-500">
              Mot de passe oublié ?
            </span>
          </Link>
        </div>
        <div className="text-center">
          <Link href="/register" className="text-black">
            Pas encore de compte ?{" "}
            <span className="text-orange-600 hover:text-orange-500">
              S&apos;inscrire
            </span>
          </Link>
        </div>
      </div>
    </main> 
  );
}
