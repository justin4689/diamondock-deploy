// components/Footer.tsx
import React from "react";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const links = [
    {
      title: "Boutique",
      href: "/shop",
    },
    {
      title: "Connexion / Inscription",
      href: "/login",
    },
    {
      title: "Suivez Votre Commande",
      href: "/wishlist",
    },
    {
      title: "FAQs",
      href: "/faq",
    },
    {
      title: "Devenir un Vendeur",
      href: "/become-vendor",
    },
    {
      title: "Contactez Nous",
      href: "/contact",
    },
    {
      title: "Carrières",
      href: "/cart",
    },
  ];
  return (
    <footer className="bg-black text-white pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            className="h-10 md:h-12"
            width={100}
            height={100}
          />
          <p className="mb-4 text-xs md:text-sm">
            Nous sommes bien plus qu&apos;un simple gestionnaire de réseaux
            sociaux. Nous sommes votre allié pour vous propulser aux sommets sur
            le digital.
          </p>
          <button className="bg-gray-600 text-white py-2 px-4 rounded">
            PLUS D&apos;INFOS
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4 ">LIENS RAPIDES</h3>
          <ul>
            {links.map((item) => (
              <Link key={item.title} href={item.href} className="flex flex-col">
                <div className="flex items-center">
                  <FaArrowRight className="inline text-blue-500 mr-2" />
                  {item.title}
                </div>
              </Link>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="font-bold mb-4">ACTUALITÉS</h3>
          <form className="flex flex-col gap-2 justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            />
            <button className="bg-gray-600 text-white py-2 px-4 rounded w-full">
              SOUSCRIRE
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-4">CONTACTEZ-NOUS</h3>
          <p className="mb-2 text-xs lg:text-sm">
            <FaPhoneAlt className="inline text-blue-500 mr-2" />
            +1 (469) 509 05 85
          </p>
          <p className="mb-2 text-xs lg:text-sm">
            <FaPhoneAlt className="inline text-blue-500 mr-2" />
            +225 05 01 74 03 03
          </p>
          <p className="mb-2 text-xs lg:text-sm">
            <FaEnvelope className="inline text-blue-500 mr-2" />
            customers@diamonddock.com
          </p>
          <p className="mb-2 text-xs lg:text-sm">
            <FaMapMarkerAlt className="inline text-blue-500 mr-2" />
            Texas, United States.
          </p>
          <p className="mb-2 text-xs lg:text-sm">
            <FaMapMarkerAlt className="inline text-blue-500 mr-2" />
            Abidjan, Côte d’Ivoire.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/p/Diamondock-100081122032326/">
              <FaFacebookF className="text-blue-500" />
            </a>
            <a href="https://www.instagram.com/diamondock/">
              <FaInstagram className="text-pink-500" />
            </a>
            <a href="https://twitter.com/diamondock">
              <FaTwitter className="text-blue-400" />
            </a>
            <a href="https://www.snapchat.com/add/diamondock">
              <FaSnapchatGhost className="text-yellow-500" />
            </a>
            <a href="https://www.tiktok.com/@diamondock">
              <FaTiktok className="text-black" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-900 py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-sm">
          <a href="#" className="text-white mr-4">
            Accessibility
          </a>
          <a href="#" className="text-white mr-4">
            User Agreement
          </a>
          <a href="#" className="text-white mr-4">
            Privacy
          </a>
          <a href="#" className="text-white">
            Return policies
          </a>
          <p className="text-white mt-2">
            © 2008-{new Date().getFullYear()} Diamondock by Univers Digital Marc
            Diamond | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
