'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

 const PromoBanner = () => {
 
 
  /**
   * Ferme le bannière de promotion
   */
  

  return (
    (
      <div className="   bg-red-700 p-2 sm:p-4 md:p-5 lg:p-1 rounded-none w-full flex items-center justify-center relative">
        {/* Button to close the promo banner */}
      

        {/* Promo text */}
        <p className="text-xs md:text-base lg:text-lg font-medium text-white text-center">
          Profitez d'une réduction sur tous les produits jusqu'au 31 décembre !
        </p>
      </div>
    )
  );
};

export default PromoBanner;