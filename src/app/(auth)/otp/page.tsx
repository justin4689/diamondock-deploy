"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { apiUrl } from "@/app/config";
import { log } from "console";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { LoaderCircle } from 'lucide-react';

// Schéma de validation pour l'OTP
const otpSchema = z.object({
  otp_code: z.string().length(6, "Le code OTP doit contenir 6 chiffres"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<{
    success?: string;
    error?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    // Vérifiez si nous sommes dans le navigateur
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("email");
      setEmail(storedEmail);

      const storedPassword = sessionStorage.getItem("password");
      setPassword(storedPassword);
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Déplacer vers le champ suivant si un chiffre est entré
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveOtpIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Gérer la suppression
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Si le champ actuel est vide, retourner au champ précédent
        inputRefs.current[index - 1]?.focus();
        setActiveOtpIndex(index - 1);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setVerificationStatus({
        error: "Veuillez entrer les 6 chiffres du code",
      });
      return;
    }

    try {
      setLoading(true);
      setVerificationStatus({});

      // Remplacez par l'URL réelle de votre endpoint backend
      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp_code: otpValue }), // Inclure l'email ici
      });

      if (response.ok) {
        const data = await response.json();
        setVerificationStatus({
          success: data.message || "Code OTP vérifié avec succès.",
        });

        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });
        if (result?.error) {
          console.error(result.error);
          // Gérer l'erreur d'authentification
        } else {
          // Rediriger vers la page d'accueil ou une autre page
          toast.success("vous etes connecté avec succès");
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        setVerificationStatus({
          error: errorData.message || "Code OTP invalide. Veuillez réessayer.",
        });
      }
    } catch (error) {
      setVerificationStatus({
        error: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
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
            Vérification OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veuillez entrer le code à 6 chiffres envoyé à votre email
          </p>
        </div>

        {verificationStatus.success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {verificationStatus.success}
          </div>
        )}

        {verificationStatus.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {verificationStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value.replace(/[^0-9]/g, ""), index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-12 text-center text-2xl font-bold border rounded-lg 
                  ${
                    index === activeOtpIndex
                      ? "border-orange-500 ring-1 ring-orange-500"
                      : "border-gray-300"
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                   <LoaderCircle className="animate-spin mr-2" />
                <span>Vérification ...</span>
              </div>
            ) : (
              "Vérifier"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
