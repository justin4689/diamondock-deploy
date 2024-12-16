"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, Badge, Button } from "@mui/material";
import { SlArrowRight } from "react-icons/sl";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface FeaturedProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  category: string;
  discount: number;
}

interface FeaturedProductSliderProps {
  products: FeaturedProduct[];
}

const FeaturedProductSlider: React.FC<FeaturedProductSliderProps> = ({
  products,
}) => {
  return (
    <div className="w-full bg-red-500 mt-3">
      <div className="w-full max-w-7xl mx-auto p-4 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-white text-xs sm:text-sm md:text-2xl">
            Produits Vedettes
          </h2>
          <button className="text-white hover:underline flex items-center space-x-2">
            Voir tous
            <SlArrowRight className="hover:rotate-90 transition-all duration-300" />
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="featured-product-swiper w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="h-full">
              <Card
                key={product.id}
                className="relative group rounded-lg h-full"
              >
                <Badge
                  className="absolute top-3 right-5"
                  badgeContent={`-${product.discount}%`}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#F57C00", // Pure orange color
                      color: "white",
                    },
                  }}
                />

                <CardContent className="p-4 flex flex-col h-full justify-between">
                  <div className="aspect-square relative mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                    />
                  </div>

                  <h3 className="font-semibold text-xs md:text-lg mb-2 md:min-h-16 min-h-8 ">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center mb-2">
                    <div>
                      <span className="text-orange-500 font-bold text-base md:text-xl">
                        {product.price}XOF
                      </span>
                      <span className="ml-2 text-gray-400 line-through text-xs md:text-sm">
                        {product.oldPrice}XOF
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart size={16} />}
                      fullWidth
                      sx={{
                        bgcolor: "#F57C00",
                        mb: 2,
                        fontSize: { xs: "0.49rem", sm: "0.875rem" }, // Taille du texte
                        py: { xs: 1, sm: 1.5 }, // Padding vertical
                      }}
                    >
                      Ajouter au panier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProductSlider;
