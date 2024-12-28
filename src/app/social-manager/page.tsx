"use client";
import React from "react";
import AccordionFAQ from "@/components/sections/AccordionFAQ";
import { Box } from "@mui/material";

export default function SocialManager() {
  return (
    <Box
      sx={{
        mt: {
          xs: 22,
          sm: 3,
        },
      }}
    >
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6 lg:px-8 lg:py-16">
          <h1 className="text-center text-2xl font-bold mb-2">TARIFICATION</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Basic
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 text-gray-700">
                  Contrat Annuel = 100000 FCFA frais unique
                </p>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    25000 FCFA{" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /mois
                  </span>
                </p>

                <a
                  className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="#"
                >
                  S'inscrire
                </a>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">
                  Ce contenu inclut:
                </p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Facebook Page</span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Instagram Business</span>
                  </li>

                  <li className="flex flex-col  gap-1">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>

                      <span className="text-gray-700"> PROMOTION: </span>
                    </div>
                    <p className="text-gray-700 text-sm pl-6">
                      Profiter d'une réduction incroyable de 100 000 FCFA /
                      mois. Après la promotion la tarification sera de 125 000 F
                      CFA / MOIS.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Starter
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 text-gray-700">
                  Contrat Annuel = 125000 FCFA frais unique
                </p>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    75000 FCFA{" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /mois
                  </span>
                </p>

                <a
                  className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="#"
                >
                  S'inscrire
                </a>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">
                  Ce contenu inclut:
                </p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Facebook Page</span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Instagram Business</span>
                  </li>

                  <li className="flex flex-col  gap-1">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>

                      <span className="text-gray-700"> PROMOTION: </span>
                    </div>
                    <p className="text-gray-700 text-sm pl-6">
                      Profiter d'une réduction incroyable de 100 000 FCFA /
                      mois. Après la promotion la tarification sera de 175 000 F
                      CFA / MOIS.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Premium
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 text-gray-700">
                  Contrat Annuel = 150000 FCFA frais unique
                </p>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    150000 FCFA{" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /mois
                  </span>
                </p>

                <a
                  className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="#"
                >
                  S'inscrire
                </a>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">
                  Ce contenu inclut:
                </p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Facebook Page</span>
                  </li>

                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">Instagram Business</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-gray-700">TikTok Business</span>
                  </li>

                  <li className="flex flex-col  gap-1">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>

                      <span className="text-gray-700"> PROMOTION: </span>
                    </div>
                    <p className="text-gray-700 text-sm pl-6">
                      Profiter d'une réduction incroyable de 100 000 FCFA /
                      mois. Après la promotion la tarification sera de 250 000
                      FCFA / MOIS.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AccordionFAQ />
      </div>
    </Box>
  );
}
