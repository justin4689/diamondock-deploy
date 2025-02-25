"use client";

import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { Timer } from "lucide-react";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";

const HeaderFlashSale: React.FC = () => {
  const endTime = new Date("2025-02-14");
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endTime - +new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex md:flex-row items-center justify-between mb-6 bg-orange-600 p-2">
      {/* Titre */}
      <div className="flex items-center gap-2">
        <h2 className="text-xs sm:text-sm md:text-2xl font-bold text-white">
          Vente Flash
        </h2>
        <Chip
          label="HOT"
          sx={{ backgroundColor: "#FBC02D", color: "white" }}
          size="small"
        />
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 md:gap-4 text-xs sm:text-sm">
        <Timer className="text-white" size={20} />
        <div className="flex gap-1 sm:gap-2">
          <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded text-xs">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          :
          <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded text-xs">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          :
          <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded text-xs">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Bouton Voir Plus */}
      <div>
        <Link href="/shop">
        <button className="md:bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded flex items-center space-x-2 text-xs sm:text-sm">
          Voir plus <SlArrowRight />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderFlashSale;
