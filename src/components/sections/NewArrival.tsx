'use client';

import { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import Link from 'next/link';

export interface NewArrival {
  id: string;
  name: string;
  description: string;
  images: { image_url: string; is_primary: number }[];
}

const NewArrivals = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [newArrivalsData, setNewArrivalsData] = useState<NewArrival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/product-new-arrivals`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch product details: ${response.statusText}`);
        }
        const data = await response.json();
        setNewArrivalsData(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Arrête le chargement une fois les données récupérées
      }
    };  

    fetchProduct();
  }, []);

  return (
    <section className="w-full px-4">
      <div className="pb-8 xl:pb-24">
        <div className="relative">
          {loading ? (
            <div className="flex space-x-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              onSwiper={setSwiper}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full"
            >
              {newArrivalsData.map((newArrival) => (
                <SwiperSlide key={newArrival.id}>
                 
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg md:aspect-[16/7]">
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={
                          newArrival.images?.find((img) => img.is_primary === 1)?.image_url ||
                          newArrival.images[0]?.image_url
                        }
                        alt={newArrival.name}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white lg:w-1/2 lg:p-14">
                      <span className="mb-2 block text-xs uppercase tracking-wider">
                        Nouveautés
                      </span>
                      <h4 className="mb-4 text-2xl font-semibold">{newArrival.name}</h4>
                      <p className="mb-12 w-4/5 text-neutral-300">{newArrival.description}</p>
                      <Link href={`/product/${newArrival.id}`}>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                        ACHETER MAINTENANT
                      </button>
                      </Link>
                    </div>
                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
