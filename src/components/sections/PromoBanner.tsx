'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

 const PromoBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null); // Initialisation à `null`

 
  /**
   * Ferme le bannière de promotion
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  // Effet pour s'assurer que l'état est mis à jour côté client uniquement
  useEffect(() => {
    setIsOpen(true); // Lors du montage du composant côté client
  }, []);

  // Si `isOpen` est encore `null`, on retourne rien (pas de rendu côté serveur)
  if (isOpen === null) {
    return null;
  }

  return (
    isOpen && (
      <div className="bg-blue-400 p-2 sm:p-4 md:p-5 lg:p-1 rounded-none w-full flex items-center justify-center relative">
        {/* Button to close the promo banner */}
        <button
          className="absolute top-1 right-1 lg:top-2 sm:right-5 text-white hover:bg-blue-300 p-1 rounded-full"
          onClick={handleClose}
        >
          <X size={16} />
        </button>

        {/* Promo text */}
        <p className="text-sm md:text-base lg:text-lg font-medium text-white text-center">
          Profitez d'une réduction sur tous les produits jusqu'au 31 décembre !
        </p>
      </div>
    )
  );
};

export default PromoBanner;