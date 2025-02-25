import { Card, CardContent } from "@mui/material"; // Import de Card et CardContent de Material-UI
import { Badge } from "@mui/material"; // Badge peut aussi être de Material-UI
import { Timer, ShoppingCart } from "lucide-react";
import { Chip } from "@mui/material"; // Import du Chip de Material-UI
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";
import HeaderFlashSale from "./HeaderFlashSale";
import { getDiscount } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import{ formatPrice }from "@/lib/utils";

interface FlashProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  discount: number;
  remainingQuantity: number;
}

interface FlashSaleProps {
  products: FlashProduct[];
}

const FlashSaleSection: React.FC = async () => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/product-flash-sale`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch product details: ${response.statusText}`
        );
      }
      const data = await response.json();

      const product = data.data;

      return product;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };

  const products = await fetchProduct();

  return (
    <div className="w-full  px-4 py-6">
      {/* Header Section */}
      <HeaderFlashSale />

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="relative group rounded-lg">
              <div
                className="absolute top-3 right-0 bg-orange-600 text-white text-sm font-bold rounded-full px-1 md:px-2 md:py-1 z-50"
                style={{ backgroundColor: "#EF6C00" }}
              >
                -{getDiscount(product.old_price, product.price)}%
              </div>

              <CardContent className="p-4">
                <div className="aspect-square relative mb-4 overflow-hidden">
                  <Image
                    src={product.images?.find((image:any)=> image.is_primary === 1)?.image_url || product.images[0]?.image_url}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                  />
                </div>

                <h3 className="font-semibold  text-xs md:text-lg mb-2 md:min-h-16 min-h-8">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-orange-500 font-bold text-xs  md:text-xl">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ml-2 text-gray-400 line-through  text-[9px] md:text-sm">
                      {formatPrice(product.old_price)}
                    </span>
                  </div>

                  <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 sm:p-1">
                    <ShoppingCart
                      size={16}
                      className="sm:w-2 sm:h-2 md:w-6 md:h-6"
                    />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${(20/ 100) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.stock} articles restants
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleSection;
