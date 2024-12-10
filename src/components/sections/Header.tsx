"use client";

import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import {
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import Link from "next/link";
import {
  ChevronDown,
  ShoppingCart,
  Store,
  Users,
  Diamond,
  Music,
  Layers,
  ShoppingBag,
  Laptop,
  Building,
} from "lucide-react";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  userCount: number;
  totalPrice: number;
}

type MenuItem = {
  title: string;
  icon: React.ComponentType<any>;
  items: Array<{
    name: string;
    icon: React.ComponentType<any>;
    description?: string;
    subItems?: Array<{
      title: string;
      description: string;
      icon: React.ComponentType<any>;
    }>;
  }>;
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

  const IconButton = ({ icon: Icon, count }: { icon: any; count: number }) => (
    <div className="relative cursor-pointer">
      <Icon className="text-2xl text-gray-500 hover:text-[#2E3192] transition-colors" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );

  const menuItems: MenuItem[] = [
    
    {
      title: "Boutique",
      icon: ShoppingBag,
      items: [],
    },
    {
      title: "Digital Mall",
      icon: Store,
      items: [],
    },
    {
      title: "Social Media Manager",
      icon: Users,
      items: [],
    },
    {
      title: "Music Store",
      icon: Music,
      items: [],
    },
    {
      title: "Diamond Ares",
      icon: Diamond,
      items: [],
    },
    {
      title: "Multi-vendeur",
      icon: Store,
      items: [],
    },
  
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-white shadow-sm">
      <nav className="bg-white">
        {/* Desktop Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <img src="/logo.png" alt="logo" className="h-10 md:h-12" />
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
                <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 rounded-r-full flex items-center justify-center">
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
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </div>
                <Link href="/cart">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Mon panier</span>
                    <span className="font-bold text-gray-700">
                      {totalPrice.toFixed(2)} CFA
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex flex-row space-x-2 items-center">
              <Tooltip title="Se connecter" placement="bottom">
                <div className="lg:hidden flex flex-col items-center">
                  <IconButton icon={FaUser} count={userCount} />
                </div>
              </Tooltip>

              <div className="lg:hidden flex flex-col items-center">
                <Tooltip title="Panier" placement="bottom">
                  <div className="relative">
                    <FaShoppingCart className="text-2xl text-gray-500" />
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 rounded-r-full flex items-center justify-center">
                <FaSearch className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
          <List className="w-64 bg-white p-4" disablePadding>
            <h1>Votre compte </h1>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton icon={FaHeart} count={wishlistCount} />
                </ListItemIcon>
                <ListItemText primary="Liste d'envies" />
              </ListItemButton>
            </ListItem>

            {/* Séparateur */}
            <Divider />
            <h1>Navigation des services</h1>

            {menuItems.map((menu, index) => (
              <div key={index}>
                <ListItem className="flex items-center ">
                  <ListItemButton>
                    <ListItemIcon>
                      <menu.icon />
                    </ListItemIcon>
                    <ListItemText primary={menu.title} />
                  </ListItemButton>
                </ListItem>
              </div>
            ))}
          </List>
        </Drawer>
      </nav>
    </div>
  );
};

export default Header;
