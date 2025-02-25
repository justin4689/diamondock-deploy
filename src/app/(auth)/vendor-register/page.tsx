"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { log } from "node:console";
import { useState, useEffect } from "react";

function FormulaireVendeur() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Utiliser useSearchParams pour récupérer les paramètres
  const [plan, setPlan] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    shopName: "",
    contactEmail: "",
    description: "",
  });

  useEffect(() => {
    const planParam = searchParams.get("plan"); // Récupérer la valeur du paramètre 'plan'
    if (planParam) {
      setPlan(planParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!plan) {
      console.error("Plan non défini");
      return;
    }

    const response = await fetch("/api/devenir-vendeur", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        plan, // inclure le plan choisi
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="container mx-auto p-6 text-center mt-44 lg:mt-0">
      <h1 className="lg:text-4xl text-2xl font-bold mb-8">
        Complétez votre Inscription en tant que Vendeur
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom de votre boutique"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.shopName}
          onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email de contact"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
        />
        <textarea
          placeholder="Description de votre boutique"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default FormulaireVendeur;
