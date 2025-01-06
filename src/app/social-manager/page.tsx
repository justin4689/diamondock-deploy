"use client";
import React from "react";
import AccordionFAQ from "@/components/sections/AccordionFAQ";
import { Box } from "@mui/material";
import PricingCard from "@/components/pricing/PricingCard";
import WhatsAppButton from '@/components/WhatsAppButton';

export default function SocialManager() {
  const pricingPlans = [
    {
      title: "Basic",
      annualFee: "100000",
      monthlyPrice: "25000",
      promotionalText:
        "Profiter d'une réduction incroyable de 100 000 FCFA / mois. Après la promotion la tarification sera de 125 000 F CFA / MOIS.",
      features: ["Facebook Page", "Instagram Business"],
    },
    {
      title: "Starter",
      annualFee: "125000",
      monthlyPrice: "75000",
      promotionalText:
        "Profiter d'une réduction incroyable de 100 000 FCFA / mois. Après la promotion la tarification sera de 175 000 F CFA / MOIS.",
      features: ["Facebook Page", "Instagram Business"],
    },
    {
      title: "Premium",
      annualFee: "150000",
      monthlyPrice: "150000",
      promotionalText:
        "Profiter d'une réduction incroyable de 100 000 FCFA / mois. Après la promotion la tarification sera de 250 000 FCFA / MOIS.",
      features: ["Facebook Page", "Instagram Business", "TikTok Business"],
    },
  ];

  return (
    <Box sx={{ mt: { xs: 22, sm: 3 } }}>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6 lg:px-8 lg:py-16">
          <h1 className="text-center text-2xl font-bold mb-2">TARIFICATION</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
        <AccordionFAQ />
      </div>
      <WhatsAppButton />
    </Box>
  );
}
