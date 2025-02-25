import HeroSection from "@/components/sections/HeroSection";
import PopularCategories from "@/components/sections/Popular-Categorie";
import FlashSaleSection from "@/components/sections/FlashSaleSection";
import FeaturedProductSlider from "@/components/sections/FeaturedProductSlider";
import FeatureSection from "@/components/sections/FeatureSection";
import NewArrival from "@/components/sections/NewArrival";
import { getSession } from "next-auth/react";

const headerProps = {
  cartCount: 0,
  wishlistCount: 0,
  userCount: 0,
  totalPrice: 0.0,
};

const featuredProducts = [
  {
    id: 1,
    name: "Smartphone Pro X",
    price: 150000,
    oldPrice: 200000,
    image:
      "https://images.pexels.com/photos/16004744/pexels-photo-16004744/free-photo-of-apple-pomme-appareil-photo-iphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Électronique",
    discount: 10,
  },
  {
    id: 2,
    name: "Écouteurs Sans Fil Premium",
    price: 45000,
    oldPrice: 60000,
    image:
      "https://images.pexels.com/photos/3921835/pexels-photo-3921835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Audio",
    discount: 5,
  },
  {
    id: 3,
    name: "Montre Intelligente Fitness",
    price: 75000,
    oldPrice: 95000,
    image:
      "https://images.pexels.com/photos/5083221/pexels-photo-5083221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessoires",
    discount: 10,
  },
  {
    id: 4,
    name: "Tablette Ultra Légère",
    price: 120000,
    oldPrice: 160000,
    image:
      "https://images.pexels.com/photos/7341872/pexels-photo-7341872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Électronique",
    discount: 20,
  },
  {
    id: 5,
    name: "Casque Audio Haute Qualité",
    price: 90000,
    oldPrice: 130000,
    image:
      "https://images.pexels.com/photos/3756767/pexels-photo-3756767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Audio",
    discount: 15,
  },
];

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <PopularCategories />
      <FlashSaleSection  />
      <FeaturedProductSlider />
      <FeatureSection />
      <NewArrival />
    </div>
  );
};

export default Home;
