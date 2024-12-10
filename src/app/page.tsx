import HeroSection from "@/components/sections/HeroSection";
import PopularCategories from "@/components/sections/Popular-Categorie";
import FlashSaleSection from "@/components/sections/FlashSaleSection";
import FeaturedProductSlider from "@/components/sections/FeaturedProductSlider";
import FeatureSection from "@/components/sections/FeatureSection";
import NewArrival from "@/components/sections/NewArrival";

const products = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 150000,
    oldPrice: 260000,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca",
    discount: 40,
    remainingQuantity: 45,
  },
  {
    id: 2,
    name: "Ordinateur portable ABC",
    price: 350000,
    oldPrice: 500000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    discount: 20,
    remainingQuantity: 30,
  },
  {
    id: 3,
    name: "Écouteurs sans fil",
    price: 89000,
    oldPrice: 100000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    discount: 35,
    remainingQuantity: 67,
  },
  {
    id: 4,
    name: "Montre connectée Pro",
    price: 179000,
    oldPrice: 249000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    discount: 28,
    remainingQuantity: 15,
  },
  {
    id: 5,
    name: "TV 4K Ultra HD",
    price: 560000,
    oldPrice: 750000,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    discount: 40,
    remainingQuantity: 20,
  },
  {
    id: 6,
    name: "Enceinte Bluetooth",
    price: 40000,
    oldPrice: 60000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    discount: 40,
    remainingQuantity: 70,
  },
  {
    id: 7,
    name: "Tablette Pro 10",
    price: 250000,
    oldPrice: 358000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    discount: 33,
    remainingQuantity: 60,
  },
  {
    id: 8,
    name: "Console de jeux",
    price: 194000,
    oldPrice: 250000,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
    discount: 30,
    remainingQuantity: 10,
  },
];
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
      <FlashSaleSection endTime={new Date("2024-12-31")} products={products} />
      <FeaturedProductSlider products={featuredProducts} />
      <FeatureSection />
      <NewArrival />
      
    </div>
  );
};

export default Home;
