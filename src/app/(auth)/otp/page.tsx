"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

// Schéma de validation pour l'OTP
const otpSchema = z.object({
  otp: z.string().length(6, "Le code OTP doit contenir 6 chiffres"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<{
    success?: string;
    error?: string;
  }>({});

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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
      setVerificationStatus({});
      // Simulation d'une vérification OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVerificationStatus({
        success: "Code OTP vérifié avec succès.",
      });
    } catch (error) {
      setVerificationStatus({
        error: "Code OTP invalide. Veuillez réessayer.",
      });
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
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            {verificationStatus.success}
          </div>
        )}

        {verificationStatus.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {verificationStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value.replace(/[^0-9]/g, ""), index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-12 text-center text-2xl font-bold border rounded-lg 
                  ${index === activeOtpIndex ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Vérifier
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