"use client";

import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/store/useCartStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { FaBorderStyle } from "react-icons/fa";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getShippingCost,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [, forceUpdate] = useState({});

  // Gérer l'hydratation
  useEffect(() => {
    // Petit délai pour s'assurer que le store est bien hydraté
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const total = getTotal();
  const shippingCost = getShippingCost();
  const grandTotal = total + shippingCost;

  const getItemKey = (item: CartItem) => {
    return `${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`;
  };

  const handleQuantityUpdate = (itemKey: string, newQuantity: number) => {
    updateQuantity(itemKey, newQuantity);
    forceUpdate({});
  };

  // Fonction pour ouvrir la modale de confirmation
  const handleDeleteClick = (item: CartItem) => {
    setSelectedItemKey(getItemKey(item));
    setIsModalOpen(true);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = () => {
    if (selectedItemKey) {
      removeItem(selectedItemKey);
      setSelectedItemKey(null);
      setIsModalOpen(false);
      forceUpdate({});
    }
  };

  // Afficher un état de chargement tant que l'hydratation n'est pas terminée
  if (!isHydrated) {
    return (
      <div className="p-6 max-w-5xl mx-auto bg-gray-100 min-h-screen mt-44 lg:mt-0">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre panier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 min-h-screen mt-44 lg:mt-0">
      <h1 className="md:text-2xl font-bold mb-6 text-start">
        🛒 Mon Panier {items.length > 0 ? `(${items.length})` : ""}
      </h1>

      {items.length === 0 ? (
        <div className="text-center bg-white p-6 rounded shadow-md">
          <p className="text-gray-500">Votre panier est vide.</p>
          <Link href="/shop">
            <div className="mt-4 inline-block px-6 py-2 bg-orange-600 text-white rounded-md shadow-md">
              🛍️ Continuer mes achats
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne des articles */}
          <div className="md:col-span-2 bg-white p-4 rounded shadow-md">
            {items.map((item) => {
              const itemKey = getItemKey(item);
              return (
                <div
                  key={itemKey}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image.image_url}
                      alt={item.name}
                      className="md:w-24 md:h-24 object-cover rounded w-12 h-12"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-sm md:text-base">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-[9px] md:text-base">
                        {formatPrice(item.price)}
                      </p>
                      {(item.size || item.color) && (
                        <p className="text-gray-500 text-[9px] md:text-sm">
                          {item.size && `Taille: ${item.size}`}
                          {item.size && item.color && ' - '}
                          {item.color && `Couleur: ${item.color}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityUpdate(itemKey, item.quantity - 1)}
                      className="md:px-3 md:py-1 px-2 bg-gray-300 rounded-md"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityUpdate(itemKey, item.quantity + 1)}
                      className="md:px-3 md:py-1 px-2 bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="ml-4 md:px-3 md:py-1 text-[9px] md:text-base text-orange-500 rounded-md bg-gray-100"
                  >
                    Supprimer
                  </button>
                </div>
              );
            })}
          </div>

          {/* Résumé du panier */}
          <div className="bg-white p-4 rounded shadow-md">
            <h1 className="text-xl font-bold mb-2">Résumé du panier</h1>
            <hr />
            <div className="flex justify-between items-center">
              <h2>Sous-total</h2>
              <p className="text-lg font-semibold">
                <span className="text-black">{formatPrice(total)}</span>
              </p>
            </div>

            <p className="text-gray-500">
              Livraison:{" "}
              <span className="text-orange-600">
                {shippingCost === 0
                  ? "Gratuite"
                  : `€${shippingCost.toFixed(2)}`}
              </span>
            </p>
            <p className="text-xl font-bold mt-2">
              Total à payer:{" "}
              <span className="text-orange-600">{formatPrice(grandTotal)}</span>
            </p>

            <Link href="/checkout">
              <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md font-bold flex justify-center items-center gap-2">
                Commander <FaBorderStyle />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Modale de confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Voulez-vous vraiment supprimer cet article ?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-orange-500 text-white rounded-md"
              >
                Oui, retirer le  produit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
