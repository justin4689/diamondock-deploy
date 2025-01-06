"use client";

import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

import {
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaStar,
  FaCog,
  FaHome,
  FaBox,
  FaStore,
  FaMusic,
  FaGem,
  FaUserTie,
  FaLaptop,
  FaBuilding,
  FaUsers,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaRunning,
  FaSprayCan,
  FaGuitar,
} from "react-icons/fa";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
  Avatar,
} from "@mui/material";

import PromoBanner from "./PromoBanner";

import Link from "next/link";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  userCount: number;
  totalPrice: number;
}

type MenuItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: Array<{
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description?: string;
    subItems?: Array<{
      title: string;
      description: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }>;
  }>;
};

type Account = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Category = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const Header: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  userCount,
  totalPrice,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const IconButton = ({
    icon: Icon,
    count,
  }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    count: number;
  }) => (
    <div className="relative cursor-pointer">
      <Icon className="text-2xl text-gray-500 hover:text-[#2E3192] transition-colors" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
  const categories: Category[] = [
    { title: "Électronique", icon: FaMobileAlt },
    { title: "Mode", icon: FaTshirt },
    { title: "Maison", icon: FaCouch },
    { title: "Sports", icon: FaRunning },
    { title: "Beauté", icon: FaSprayCan },
    { title: "Musique", icon: FaGuitar },
  ];

  const accounts: Account[] = [
    { title: "Mes commandes", icon: FaShoppingBag },
    { title: "Mes favoris", icon: FaHeart },

    { title: "Mes avis", icon: FaStar },

    { title: "Mes paramètres", icon: FaCog },
  ];

  const menuItems: MenuItem[] = [
    {
      title: "Shop",
      icon: FaStore,
      items: [],
    },
    {
      title: "Digital Mall",
      icon: FaShoppingBag,
      items: [],
    },
    {
      title: "Social Media Manager",
      icon: FaUserTie,
      items: [],
    },
    {
      title: "Music Store",
      icon: FaMusic,
      items: [],
    },
    {
      title: "Diamond Ares",
      icon: FaGem,
      items: [],
    },
    {
      title: "Devenir Vendeur",
      icon: FaBox,
      items: [],
    },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-white shadow-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <PromoBanner />

      <nav className="bg-white">
        {/* Desktop Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className=" md:h-12"
                />
              </div>
            </Link>

            {/* Search Bar - hidden on mobile */}
            <div className="hidden lg:flex flex-grow mx-4 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 text-md rounded-full text-gray-500 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:shadow-md"
                  placeholder="Rechercher ici..."
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-orange-600 rounded-r-full flex items-center justify-center">
                  <FaSearch className="text-white" />
                </button>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <Tooltip title="Se connecter" placement="bottom">
                <Link href="/login">
                  <IconButton icon={FaUser} count={userCount} />
                </Link>
              </Tooltip>
              <Tooltip title="Liste des envies" placement="bottom">
                <Link href="/wishlist">
                  <IconButton icon={FaHeart} count={wishlistCount} />
                </Link>
              </Tooltip>
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="relative">
                  <FaShoppingCart className="text-2xl text-gray-500 group-hover:text-[#2E3192] transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </div>
                <Link href="/cart">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Mon panier</span>
                    <span className="font-bold text-gray-700">
                      {totalPrice.toFixed(2)} FCFA
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex flex-row space-x-2 items-center">
              <div className="lg:hidden flex flex-col items-center">
                <Tooltip title="Panier" placement="bottom">
                  <div className="relative">
                    <FaShoppingCart className="text-2xl text-gray-500" />
                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </div>
                </Tooltip>
              </div>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={handleDrawerToggle}
              >
                {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search - visible only on mobile */}
          <div className="lg:hidden px-2 pb-4 mt-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 text-md rounded-full text-gray-500 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:shadow-md"
                placeholder="Rechercher ici..."
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-orange-600 rounded-r-full flex items-center justify-center">
                <FaSearch className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: 300,
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {/* User Profile Section */}
          <div className="bg-orange-600 text-white p-4 flex items-center">
            <Avatar
              alt="User Profile"
              sx={{
                width: 56,
                height: 56,
                marginRight: 2,
                bgcolor: "white",
                color: "orange",
              }}
            ></Avatar>
            <div>
              <h2 className="text-lg font-bold">Se Connecter</h2>
              <p className="text-sm">Accédez à votre compte</p>
            </div>
          </div>
          {/* Accounts Section */}
          <div className=" bg-gray-100">
            <h3 className="text-lg font-semibold px-4 text-gray-700">
              <Link href="/">Accueil</Link>
            </h3>
          </div>
          <List>
            {accounts.map((account, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <account.icon className="text-gray-600" />
                    </ListItemIcon>
                    <ListItemText primary={account.title} />
                  </ListItemButton>
                </ListItem>
                {index < categories.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {/* Catégories Section */}
          <div className=" bg-gray-100">
            <h3 className="text-lg font-semibold px-4 text-gray-700">
              Catégories
            </h3>
          </div>
          <List>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <category.icon className="text-gray-600" />
                    </ListItemIcon>
                    <ListItemText primary={category.title} />
                  </ListItemButton>
                </ListItem>
                {index < categories.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {/* Main Menu Items */}
          <div className="bg-gray-100">
            <h3 className="text-lg font-semibold px-4 text-gray-700">
              Nos Plateformes
            </h3>
          </div>
          <List></List>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      /* Handle navigation */
                    }}
                  >
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {item.title === "Mes Favoris" && wishlistCount > 0 && (
                      <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                        {wishlistCount}
                      </span>
                    )}
                    {item.title === "Panier" && cartCount > 0 && (
                      <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                        {cartCount}
                      </span>
                    )}
                  </ListItemButton>
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {/* Footer Section */}
          <div className="p-4 bg-white border-t">
            <button
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              onClick={handleDrawerToggle}
            >
              Fermer
            </button>
          </div>
        </Drawer>
      </nav>
    </div>
  );
};

export default Header;
