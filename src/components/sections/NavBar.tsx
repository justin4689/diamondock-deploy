"use client";

import React, { useState } from "react";
import {
  FaAngleDown,
  FaShoppingCart,
  FaStore,
  FaUsers,
  FaGem,
  FaMusic,
  FaLayerGroup,
  FaShoppingBag,
  FaLaptop,
  FaBuilding,
  FaBox
} from "react-icons/fa";
import Link from "next/link";

type CategoryItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Menu = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories: CategoryItem[] = [
    {
      title: "Électronique",
      description: "Smartphones, laptops, et accessoires",
      icon: FaLaptop,
    },
    {
      title: "Mode",
      description: "Vêtements, chaussures, et accessoires",
      icon: FaShoppingBag,
    },
    {
      title: "Maison",
      description: "Meubles, décoration, et jardinage",
      icon: FaBuilding,
    },
    {
      title: "Sport",
      description: "Équipement sportif et vêtements",
      icon: FaUsers,
    },
  ];

  const menuItems: Menu[] = [
    { title: "Boutique", icon: FaShoppingCart, link: "/shop" },
    { title: "Digital Mall", icon: FaStore, link: "/digital-mall" },
    { title: "Social Media Manager", icon: FaUsers, link: "/social-manager" },
    { title: "Music Store", icon: FaMusic, link: "/music-store" },
    { title: "Diamonds Ares", icon: FaGem, link: "/diamonds-ares" },
    { title: "Devenir Vendeur", icon: FaBox, link: "/multi-vendeur" },
  ];

  return (
    <nav className="hidden lg:flex bg-orange-600 shadow-lg pt-4 md:pt-24 relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center md:flex-nowrap flex-wrap">
          {/* Menu Catégories */}
          <div className="relative ">
            <button
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
              className="flex items-center space-x-2 py-4 px-6 text-white hover:text-gray-300 transition duration-300"
            >
              <FaLayerGroup className="h-5 w-5" />
              <span className="font-medium">Catégories</span>
              <FaAngleDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
              className={`absolute left-0 w-64 bg-white rounded-md shadow-xl transition-all duration-300 ease-out transform origin-top-left ${
                isCategoryOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="p-4 space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition duration-150 cursor-pointer group"
                  >
                    <div className="flex-shrink-0">
                      <category.icon className="h-6 w-6 text-[#2E3192] opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex items-center space-x-6 no-wap ">
            {menuItems.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <button
                  key={index}
                  className="py-4 px-3 text-white hover:text-gray-300 flex items-center transition duration-300 font-medium"
                >
                  <menu.icon className="h-5 w-5 mr-2" />
                  {menu.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
