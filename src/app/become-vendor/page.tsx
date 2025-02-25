"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  bgColor: string;
  planId: string;
}

const BecomeVendorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const router = useRouter(); // Utilisation du hook useRouter

  const plans: Plan[] = [
    {
      title: "DEBUTANT",
      price: "0 F CFA / Mois",
      description: "Votre Marché Virtuel : Ouvrez Votre Boutique en Ligne !",
      features: [
        "Liberté de Vente : Vendez vos produits et services gratuitement.",
        "Limite de 30 ventes par Mois.: Limitation de 30 ventes de produits ou services par mois.",
      ],
      bgColor: "bg-gray-100",
      planId: "debutant",
    },
    {
      title: "PROFESSIONNEL",
      price: "20000 F CFA / Mois",
      description: "Votre Boutique en Ligne : Gérez Votre Succès !",
      features: [
        "Liberté Totale : Vendez plus de 30 produits ou services par mois.",
        "Flexibilité de Gestion : Choisissez votre niveau d’implication.",
        "Équipe à Votre Service : Ajoutez un staff de membres de confiance.",
      ],
      bgColor: "bg-gray-200",
      planId: "professionnel",
    },
  ];

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true); // Ouvrir la modale lorsque le plan est sélectionné
  };

  const handleContinue = () => {
    setIsModalOpen(false); // Fermer la modale
    if (selectedPlan) {
      router.push(`/vendor-register?plan=${selectedPlan.planId}`); // Rediriger vers la page
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Fermer la modale sans redirection
  };

  return (
    <div className="container mx-auto p-6 text-center mt-44 lg:mt-0">
      <h1 className="lg:text-4xl text-2xl font-bold mb-8">
        Nous vous aiderons à vendre plus intelligemment, plus rapidement et
        mieux.
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-full md:w-1/2 p-6 ${plan.bgColor} rounded-lg shadow-lg flex flex-col h-full`}
          >
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-bold">{plan.title}</h2>
            </div>
            <div className="bg-gray-800 text-white text-lg py-2 px-4 rounded mb-4">
              {plan.price}
            </div>
            <p className="mb-4 font-semibold flex-grow">{plan.description}</p>
            <ul className="list-disc list-inside text-left mb-4 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="bg-orange-600 text-white hover:bg-orange-700 py-2 px-4 rounded w-full mt-auto"
              onClick={() => handlePlanSelect(plan)}
            >
              Choisir ce plan
            </button>
          </div>
        ))}
      </div>

      {/* Afficher la modale si un plan est sélectionné */}
      {isModalOpen && selectedPlan && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg
                        className="size-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                      >
                        Vous avez sélectionné le plan {selectedPlan.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Continuez pour compléter votre inscription.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 sm:ml-3 sm:w-auto"
                    onClick={handleContinue} // Rediriger si "Continuer" est cliqué
                  >
                    Continuer
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel} // Juste fermer la modale sans redirection
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeVendorPage;
