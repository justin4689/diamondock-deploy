"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'

// Importations des styles Swiper
import 'swiper/css'
import 'swiper/css/pagination'

// Type pour les données de slides
interface SlideData {
  title: string
  description: string
  buttonText: string
  imageUrl: string
  link: string
}

const HeroSection: React.FC = () => {
  const slides: SlideData[] = [
    {
      title: "Découvrez nos Vendeurs Partenaires",
      description: "Une sélection unique de produits de qualité",
      buttonText: "Commencer",
      imageUrl: "/hero.png",
      link: "/shop"
    },
    {
      title: "Promotions Exclusives",
      description: "Jusqu'à -50% sur une large sélection",
      buttonText: "Profiter",
      imageUrl: "/download.jpeg", 
      link: "/promotions"
    },
    // Ajoutez d'autres slides ici
  ]

  return (
    <section className="relative w-full  h-[400px] z-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="h-full w-full text-orange-500"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 text-white pt-2">
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="lg:text-4xl text-2xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="lg:text-xl md:text-base text-sm mb-6 animate-slideUp">
                  {slide.description}
                </p>
                <a 
                  href={slide.link} 
                  className="md:px-6 md:py-3 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-primary-dark transition-all animate-bounce"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
            <div>
            <Image 
              src={slide.imageUrl} 
              alt={slide.title}
              fill
              priority
              className="object-cover animate-scale"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSection