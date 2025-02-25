import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDiscount(old_price: number, price: number) {
  // if (old_price <= 0) {
  //   throw new Error("Le prix initial (oldPrice) doit être supérieur à 0");
  // }

  let reduction = ((old_price - price) / old_price) * 100;
  return Math.round(reduction);
}

export function formatPrice(price: number, currency = "F CFA") {
  return Math.floor(price).toLocaleString("fr-FR") + " " + currency;
}
