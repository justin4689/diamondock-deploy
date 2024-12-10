'use client';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { useState } from 'react';

export interface NewArrival {
  title: string;
  content: string;
  image: string;
}

const NewArrivals = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const newArrivalsData: NewArrival[] = [
    {
      title: 'Collection d\'été élégante',
      content: 'Découvrez notre dernière collection d\'été avec des couleurs vibrantes et des styles tendance parfaits pour la saison.',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    },
    {
      title: 'Chaud pour l\'hiver',
      content: 'Restez au chaud et élégant avec nos nouvelles arrivées d\'hiver, offrant des tissus chauds et des designs chics.',
      image: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg',
    },
    {
      title: 'Mode urbaine',
      content: 'Découvrez les dernières tendances en mode urbaine, conçues pour un look audacieux et moderne.',
      image: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg',
    },
    {
      title: 'Robes de soirée élégantes',
      content: 'Faites sensation avec notre collection de robes de soirée élégantes, parfaites pour toute occasion spéciale.',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
    },
    {
      title: 'Essentiels décontractés du quotidien',
      content: 'Découvrez nos essentiels confortables et élégants pour le quotidien, parfaits pour toute sortie décontractée.',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    },
  ];
  
  return (
    <section className="w-full px-4">
      <div className=" pb-8 xl:pb-24">
        <div className="relative">
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
              <SwiperSlide key={newArrival.title}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg md:aspect-[16/7]">
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={newArrival.image}
                      alt={newArrival.title}
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
                    <h4 className="mb-4 text-2xl font-semibold">
                      {newArrival.title}
                    </h4>
                    <p className="mb-12 w-4/5 text-neutral-300">
                      {newArrival.content}
                    </p>
                    <button className='bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600'>
                        ACHETER MAINTENANT
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;