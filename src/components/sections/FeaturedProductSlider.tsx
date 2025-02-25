"use client"; // 👈 Indique que ce composant est un Client Component

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, Button, Skeleton } from "@mui/material";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { getDiscount } from "@/lib/utils";
import{ formatPrice }from "@/lib/utils";
import Link from "next/link";

interface FeaturedProduct {
  id: number;
  name: string;
  price: number;
  old_price: number;
  images: { image_url: string; is_primary: number }[];
}

const FeaturedProductSlider = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/product-featured-product`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details: ${response.statusText}`
          );
        }
        const data = await response.json();
        setProducts(data.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-red-500 mt-3">
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-white text-xs sm:text-sm md:text-2xl">
            Produits Vedettes
          </h2>

          <Link href="/shop">
          <button className="text-white hover:underline flex items-center space-x-2">
            Voir tous
            <SlArrowRight className="hover:rotate-90 transition-all duration-300" />
          </button>
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="featured-product-swiper w-full"
        >
          {loading
            ? // Show skeletons while loading
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={index} className="h-full">
                  <Card className="relative group rounded-lg h-full">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={350}
                      className="mb-4"
                    />
                    <CardContent className="p-4 flex flex-col h-full justify-between">
                      <Skeleton width="60%" height={20} className="mb-2" />
                      <Skeleton width="40%" height={15} className="mb-4" />
                      <div className="flex justify-center">
                        <Skeleton variant="rectangular" width="100%" height={36} />
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className="h-full">
                  <Card className="relative group rounded-lg h-full">
                    <div className="absolute top-3 right-0 bg-orange-500 text-white text-sm font-bold rounded-full px-2 py-1 z-50">
                      -{getDiscount(product.old_price, product.price)}%
                    </div>

                    <CardContent className="p-4 flex flex-col h-full justify-between">
                      <div className="aspect-square relative mb-4 overflow-hidden">
                        <Image
                          width={200}
                          height={200}
                          src={product.images?.find((image:any)=> image.is_primary === 1)?.image_url || product.images[0]?.image_url}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                        />
                      </div>

                      <h3 className="font-semibold text-xs md:text-lg mb-2 md:min-h-16 min-h-8">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-start mb-2">
                        <div className="flex flex-col items-center">
                          <span className="text-orange-500 font-bold text-base md:text-xl">
                            {formatPrice(product.price)}
                          </span>
                          <span className="ml-2 text-gray-400 line-through text-xs md:text-sm">
                            {formatPrice(product.old_price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          variant="contained"
                          startIcon={<ShoppingCart size={16} />}
                          fullWidth
                          sx={{
                            bgcolor: "#EF6C00",
                            mb: 2,
                            fontSize: { xs: "0.49rem", sm: "0.875rem" },
                            py: { xs: 1, sm: 1.5 },
                          }}
                        >
                          J&apos;achète
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
