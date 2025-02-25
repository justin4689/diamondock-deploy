"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { apiUrl } from "@/app/config";
import { useRouter } from "next/navigation";
import { Span } from "next/dist/trace";
import { log } from "console";
import { LoaderCircle } from 'lucide-react';

// ...
// Zod schema for reset password validation
const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer un email valide" }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetStatus, setResetStatus] = useState<{
    success?: string;
    error?: string;
  }>({});

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      // Reset previous status
      console.log(data);
      setResetStatus({});

      // Logique pour réinitialiser le mot de passe
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      sessionStorage.setItem("email", data.email);
      if (!response.ok) {
        const errorData = await response.json(); // Récupérer le message d'erreur du backend
        throw new Error(
          errorData.error ||
            "Erreur lors de la réinitialisation du mot de passe"
        );
      }
      router.push(`/reset-password`);
      // Simulated success scenario
      setResetStatus({
        success:
          "Un email de réinitialisation de mot de passe vous a été envoyé.",
      });
    } catch (error) {
      // Gérer les erreurs
      setResetStatus({
        error:
          error instanceof Error
            ? error.message
            : "Une erreur s'est produite. Veuillez réessayer.",
      });
      console.error(error);
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-4 md:py-12 px-4 sm:px-6 lg:px-8">
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
            Réinitialisation
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {resetStatus.success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {resetStatus.success}
          </div>
        )}

        {resetStatus.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {resetStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {isSubmitting ? (
              <div className="flex">
                {" "}
                <LoaderCircle className="mr-3 animate-spin" />
                <span>Envoi en cours...</span>
              </div>
            ) : (
              "Réinitialiser le mot de passe"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="text-black">
            Retour à la{" "}
            <span className="text-orange-600 hover:text-orange-500">
              connexion
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
