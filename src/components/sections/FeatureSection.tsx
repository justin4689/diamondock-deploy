import React from 'react';
import { FaShippingFast, FaHeadset } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

const features = [
  {
    icon: <FaShippingFast size={30} className="text-lg md:text-2xl lg:text-3xl text-white" />,
    title: 'LIVRAISON RAPIDE ET EFFICACE',
    description: 'Dans le monde entier ',
  },
  {
    icon: <FaHeadset  size={30} className="text-lg md:text-2xl lg:text-3xl text-white" />,
    title: 'SERVICE CLIENT 24/7',
    description: 'Nous sommes disponibles 24/7',
  },
  {
    icon: <IoIosLock size={30} className="text-lg md:text-2xl lg:text-3xl text-white" />,
    title: 'PAYEMENTS SECURISES',
    description: 'Payements sécurisés et rapides',
  },
];

const FeatureSection = () => {
  return (
    <div className="flex justify-center space-y-0  md:space-x-8 py-8 px-4">
      {features.map((feature, index) => (
        <div key={index} className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center bg-black p-4 rounded-full w-16 h-16 md:w-20 md:h-20">
            {feature.icon}
          </div>
          <h3 className="font-bold text-xs md:text-lg lg:text-xl mt-4">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mt-2">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
