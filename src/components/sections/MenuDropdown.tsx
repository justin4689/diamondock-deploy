import React, { useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaUserCheck,

} from "react-icons/fa";

interface MenuDropdownProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  userProfile: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  userProfile,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

 

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center justify-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaUserCheck className="inline  w-12 h-5" />
        <span className="capitalize">Bonjour, {userProfile} </span>
      </button>
      {isMenuOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-md">
          <Link href="/account/profile" legacyBehavior>
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              <FaUser className="inline mr-2" /> Votre compte
            </a>
          </Link>
          <Link href="/orders" legacyBehavior>
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              <FaBox className="inline mr-2" /> Mes commandes
            </a>
          </Link>
          <button
            onClick={() => {
              signOut();
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            <FaSignOutAlt className="inline mr-2" /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
