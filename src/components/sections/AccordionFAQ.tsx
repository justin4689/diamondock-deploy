"use client";
import React, { useState } from "react";

const AccordionFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Pourquoi choisir le plan Basic ?",
      answer: (
        <div className="text-gray-600">
          <p>
            Nous agissons en votre nom pour créer et gérer une communauté sur
            les réseaux sociaux, en veillant au contrôle et à la sécurité des
            informations publiées. Notre gestionnaire de communauté vous propose
            les services suivants dans le cadre du plan "Basic", en respectant
            une procédure rigoureuse pour la réception de vos contenus, adaptée
            au type de réseau social choisi (Facebook ou Instagram Business) :
          </p>
          <ol className="list-decimal ml-6 mt-2 space-y-2">
            <li>
              <strong>Création ou Gestion Simple d’une Page :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous mettons en place et gérons une page sur le réseau social
                  de votre choix (Facebook ou Instagram).
                </li>
                <li>
                  Notre objectif est de maintenir une présence efficace et
                  cohérente pour votre entreprise.
                </li>
              </ul>
            </li>
            <li>
              <strong>Diffusion de Contenus de Base :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Nous diffusons cinq (5) contenus de base par semaine.</li>
                <li>
                  Ces contenus sont transmis par vous et soigneusement édités
                  par nos services avant leur publication.
                </li>
                <li>
                  Nous veillons à ce que chaque contenu reflète votre image de
                  marque et vos valeurs.
                </li>
              </ul>
            </li>
            <li>
              <strong>Gestion Basique de la Communauté :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous répondons aux commentaires et messages provenant des
                  utilisateurs.
                </li>
                <li>
                  Notre gestionnaire de communauté interagit avec la communauté
                  pour maintenir un dialogue positif et constructif.
                </li>
              </ul>
            </li>
            <li>
              <strong>Rapport Mensuel de Performance :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Chaque mois, nous vous fournissons un rapport détaillé sur la
                  performance de vos médias sociaux.
                </li>
                <li>
                  Les indicateurs clés de performance (KPI) sont inclus, vous
                  permettant d’évaluer l’efficacité de votre présence en ligne.
                </li>
              </ul>
            </li>
            <li>
              <strong>Support Technique par Email :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre équipe est disponible pour répondre à vos questions et
                  résoudre tout problème technique lié à votre présence sur les
                  réseaux sociaux.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "Pourquoi choisir le plan Starter ?",
      answer: (
        <div className="text-gray-600">
          <p>
            Nous agissons en votre nom pour créer et gérer une communauté sur
            les réseaux sociaux, en veillant au contrôle et à la sécurité des
            informations publiées. Notre gestionnaire de communauté vous propose
            les services suivants , adapté au type de réseau social choisi
            (Facebook ou Instagram Business) :
          </p>
          <ol className="list-decimal ml-6 mt-2 space-y-2">
            <li>
              <strong>Création ou Gestion Simple des Pages :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous créons et optimisons les pages sur une des deux
                  plateformes sociales principales: Facebook ou Instagram.
                </li>
                <li>
                  L'objectif est d'etablir une présence solide et cohérente pour
                  votre entreprise. sur ces reseaux sociaux.
                </li>
              </ul>
            </li>
            <li>
              <strong>Diffusion de Contenus :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Nous diffusons cinq (10) contenus de base par semaine.</li>
                <li>
                  Ces contenus sont transmis par vous et soigneusement édités
                  par nos services avant leur publication.
                </li>
                <li>
                  Nous veillons à ce que chaque contenu reflète votre image de
                  marque et vos valeurs.
                </li>
              </ul>
            </li>
            <li>
              <strong>Gestion de Communauté Proactive:</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre gestionnaire de communauté reponds rapidement aux
                  commentaires et messages des utilisateurs.
                </li>
                <li>
                  Nous encouragons l'interaction en engageant activement avec la
                  communauté .
                </li>
                <li>
                  Notre objectif est de creer un dialogue positif et constructif
                  autour de votre marque .
                </li>
              </ul>
            </li>
            <li>
              <strong>Publicités et Promotion Mensuelle (Sponsoring):</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous allons un budget mensuel pour des campagnes publicitaires
                  ciblées .
                </li>
                <li>
                  Le montant alloué correspond à 10% de votre forfait mensuel .
                </li>
                <li>
                  Nous utilisons ces fonds pour promouvoir vos contenus et
                  accroitre votre visibilité
                </li>
              </ul>
            </li>
            <li>
              <strong>Rapport Mensuel de Performance :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Chaque mois, nous vous fournissons un rapport détaillé sur la
                  performance de vos médias sociaux.
                </li>
                <li>
                  Les indicateurs clés de performance (KPI) sont inclus, vous
                  permettant d’évaluer l’efficacité de votre présence en ligne.
                </li>
              </ul>
            </li>
            <li>
              <strong>Support Technique par Email :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre équipe est disponible pour répondre à vos questions et
                  résoudre tout problème technique lié à votre présence sur les
                  réseaux sociaux.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "Pourquoi choisir le plan Premium ?",
      answer: (
        <div className="text-gray-600">
          <p>
            Nous agissons en votre nom pour créer et gérer une communauté sur
            les réseaux sociaux, en veillant au contrôle et à la sécurité des
            informations publiées. Notre gestionnaire de communauté vous propose
            les services haut de gamme , adaptés au type de réseau social choisi
            (Facebook,Instagram Business ou TikTok Business) :
          </p>
          <ol className="list-decimal ml-6 mt-2 space-y-2">
            <li>
              <strong>Création et Optmisation des Pages :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous créons et optimisons les pages sur les trois plateformes
                  sociales principales: Facebook,Instagram et TikTok.
                </li>
                <li>
                  L'objectif est d'etablir une présence solide et cohérente pour
                  votre entreprise sur l'un ces reseaux sociaux.
                </li>
              </ul>
            </li>
            <li>
              <strong>Diffusion de Contenus Elaborés:</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous diffusons vingt et un (21) contenus de base par semaine.
                </li>
                <li>
                  Ces contenus sont crée par notre equipe et soigneusement
                  adaptés à votre image de marque avant leur publication.
                </li>
                <li>
                  Nous veillons à ce que chaque contenu soit
                  engageant,informatif et en phase avec votrec strategie
                </li>
              </ul>
            </li>
            <li>
              <strong>Gestion de Communauté Proactive et Personnalisée:</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre gestionnaire de communauté reponds rapidement aux
                  commentaires et messages des utilisateurs.
                </li>
                <li>
                  Nous encouragons l'interaction en engageant activement avec la
                  communauté.
                </li>
                <li>
                  la personnalisation est au coeur de notre approche pour
                  renforcer les liens avec vos abonnés
                </li>
              </ul>
            </li>
            <li>
              <strong>Gestion Primaire des Crises et Confilts:</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  En cas de situation délicate, notre service après-vente
                  representatif intervient pour gérer les crises et resoudre les
                  confilts.
                </li>
                <li>Votre reputation est notre priorité.</li>
              </ul>
            </li>
            <li>
              <strong>Publicités et Promotion Mensuelle (Sponsoring):</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous allouons un budget mensuel pour des campagnes
                  publicitaires ciblées.
                </li>
                <li>
                  Le montant alloué correspond à 10% de votre forfait mensuel.
                </li>
                <li>
                  Nous utilisons ces fonds pour promouvoir vos contenus et
                  accroitre votre visibilité.
                </li>
              </ul>
            </li>
            <li>
              <strong>Gestion de Campagnes Publicitaires Stratégiques:</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre equipe suit et ajuste régulièrement les campagnes
                  publicitaires pour maximiser leur efficacité.
                </li>
                <li>
                  Nous analysons les résultats et adaptons la stratégie en
                  consequence.
                </li>
              </ul>
            </li>
            <li>
              <strong>
                Rapport Mensuel de Performance avec Recommendations
                Stratégiques:
              </strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Chaque mois, nous vous fournissons un rapport détaillé sur la
                  performance de vos médias sociaux.
                </li>
                <li>
                  Les indicateurs clés de performance (KPI) sont inclus,
                  accompagnés de recommendations pour une amélioration continue.
                </li>
              </ul>
            </li>
            <li>
              <strong>
                Réunions Mensuelles en Personne ou via Visioconférence:
              </strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Nous discutons des progrès realisés et des objectifs à venir.
                </li>
                <li>Votre satisfaction est notre priorité absolue.</li>
              </ul>
            </li>
            <li>
              <strong>Support Technique par Email ,Téléphone et Chat :</strong>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  Notre équipe est disponible pour répondre à vos questions et
                  résoudre tout problème technique lié à votre présence sur les
                  réseaux sociaux.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Details de chaque plan
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    aria-controls={`faq-${index}`}
                    aria-expanded={activeIndex === index}
                  >
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        className={`h-6 w-6 ${
                          activeIndex === index ? "hidden" : "block"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                      <svg
                        className={`h-6 w-6 ${
                          activeIndex === index ? "block" : "hidden"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>
                {activeIndex === index && (
                  <dd className="mt-2 pr-12" id={`faq-${index}`}>
                    <div className=" text-xs md:text-base leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AccordionFAQ;
