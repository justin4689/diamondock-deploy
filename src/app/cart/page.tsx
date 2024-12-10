"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const CartPage: React.FC = () => {
  // Tableau simulant les articles dans le panier
  const [cart, setCart] = useState([
    {
      product: {
        id: 1,
        name: 'Produit A',
        price: 29990,
        image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca',
      },
      quantity: 2,
    },
    {
      product: {
        id: 2,
        name: 'Produit B',
        price: 49990,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      },
      quantity: 1,
    },
  ]);

  // Calcul du total du panier
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Fonctions pour gérer le panier
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
        <Link href="/products" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      <div className="grid gap-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center border-b pb-4"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-gray-600">{item.product.price} CFA</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="ml-4">
              <p className="font-bold">
                {(item.product.price * item.quantity)} CFA
              </p>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500 hover:underline mt-2"
              >
                Supprimer
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-xl font-bold">{cartTotal}  CFA</span>
      </div>
      <div className="mt-6 flex justify-end">
        <Link
          href="/checkout"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
         Commander
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
