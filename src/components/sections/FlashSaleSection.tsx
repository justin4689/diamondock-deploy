"use client";

import React from "react";
import { Card, CardContent } from "@mui/material"; // Import de Card et CardContent de Material-UI
import { Badge } from "@mui/material"; // Badge peut aussi être de Material-UI
import { Timer, ShoppingCart } from "lucide-react";
import { Chip } from "@mui/material"; // Import du Chip de Material-UI
import { SlArrowRight } from "react-icons/sl";
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
  endTime: Date;
  products: FlashProduct[];
}

const FlashSaleSection: React.FC<FlashSaleProps> = ({ endTime, products }) => {
  const [timeLeft, setTimeLeft] = React.useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
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
  }, [endTime]);

  return (
    <div className="w-full  px-4 py-6">
      {/* Header Section */}
      <div className="flex  md:flex-row items-center justify-between mb-6 bg-orange-600 p-2">
        <div className="flex items-center gap-2 ">
          <h2 className="text-xs sm:text-sm md:text-2xl font-bold text-white">
            Vente Flash
          </h2>
          <Chip
            label="HOT"
            sx={{
              backgroundColor: "#FBC02D", // Pure orange color
              color: "white",
              
            }}
            size="small"
          />
        </div>

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

        <div>
          <button className="md:bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded flex items-center space-x-2 text-xs sm:text-sm">
            Voir plus
            <SlArrowRight />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="relative group rounded-lg">
            <Badge
              className="absolute top-3 right-5 "
              badgeContent={`-${product.discount}%`}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#F57C00", // Pure orange color
                  color: "white",
                },
              }}
            />

            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                />
              </div>

              <h3 className="font-semibold  text-xs md:text-lg mb-2 md:min-h-16 min-h-8">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-orange-500 font-bold text-xs  md:text-xl">
                    {product.price}FCFA
                  </span>
                  <span className="ml-2 text-gray-400 line-through  text-[9px] md:text-sm">
                    {product.oldPrice}FCFA
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
                      width: `${(product.remainingQuantity / 100) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.remainingQuantity} articles restants
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleSection;
