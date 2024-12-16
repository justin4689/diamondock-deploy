import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ReplayIcon from '@mui/icons-material/Replay';
import { IoIosLock } from "react-icons/io";
import { FaHeadset } from 'react-icons/fa';
import { FaShippingFast } from "react-icons/fa";



const features = [
  {
    icon: <FaShippingFast className="text-xs md:text-lg lg:text-xl" />,
    title: 'LIVRAISON RAPIDE ET EFFICACE',
    description: 'Dans le monde entier',
  },
  {
    icon: <FaHeadset className="text-xs md:text-lg lg:text-xl" />,
    title: 'OFFRE SERVICE 24/7',
    description: 'Nous sommes disponibles 24/7',
  },
  {
    icon:<IoIosLock  className="text-xs md:text-lg lg:text-xl"/>,
    title: 'PAYEMENTS SECURISES',
    description: 'Payements sécurisés et rapides',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 md:space-x-8 py-6 md:py-10 px-2 md:px-4">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <Box display="flex" justifyContent="center" alignItems="center" className="mb-1 md:mb-2">
            <Avatar className="bg-black p-1 md:p-2 rounded-full w-8 h-8 md:w-12 md:h-12 ">
              {feature.icon}
            </Avatar>
          </Box>
          <Typography 
            variant="h6" 
            component="h3" 
            className="font-bold text-[10px] md:text-base lg:text-lg"
          >
            {feature.title}
          </Typography>
          <Typography 
            variant="body2" 
            className="text-gray-600 text-[5px] md:text-base "
          >
            {feature.description}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
