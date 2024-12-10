// components/Footer.tsx
import React from 'react';
import { FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <img src="/logo.png" alt="logo" className="h-10 md:h-12" />
          <p className="mb-4">
            Nous sommes bien plus qu’un simple gestionnaire de réseaux sociaux. Nous sommes votre allié pour vous propulser aux sommets sur le digital.
          </p>
          <button className="bg-gray-600 text-white py-2 px-4 rounded">
            PLUS D'INFOS
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">LIENS RAPIDES</h3>
          <ul>
            {['Boutique', 'Connexion / Inscription', 'Suivez Votre Commande', 'FAQs', 'Devenir un Vendeur', 'Contactez Nous', 'Carrières'].map((item) => (
              <li key={item} className="mb-2">
                <FaArrowRight className="inline text-blue-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="font-bold mb-4">ACTUALITÉS</h3>
          <form>
            <input
              type="text"
              placeholder="Nom"
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
            />
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
          <p className="mb-2">
            <FaPhoneAlt className="inline text-blue-500 mr-2" />
            +1 (469) 509 05 85
          </p>
          <p className="mb-2">
            <FaPhoneAlt className="inline text-blue-500 mr-2" />
            +225 05 01 74 03 03
          </p>
          <p className="mb-2">
            <FaEnvelope className="inline text-blue-500 mr-2" />
            customers@diamonddock.com
          </p>
          <p className="mb-2">
            <FaMapMarkerAlt className="inline text-blue-500 mr-2" />
            Texas, United States.
          </p>
          <p className="mb-2">
            <FaMapMarkerAlt className="inline text-blue-500 mr-2" />
            Abidjan, Côte d’Ivoire.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#"><FaFacebookF className="text-blue-500" /></a>
            <a href="#"><FaInstagram className="text-pink-500" /></a>
            <a href="#"><FaTwitter className="text-blue-400" /></a>
            <a href="#"><FaSnapchatGhost className="text-yellow-500" /></a>
            <a href="#"><FaTiktok className="text-black" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-900 py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-sm">
          <a href="#" className="text-white mr-4">Accessibility</a>
          <a href="#" className="text-white mr-4">User Agreement</a>
          <a href="#" className="text-white mr-4">Privacy</a>
          <a href="#" className="text-white">Return policies</a>
          <p className="text-white mt-2">
            © 2008-2024 Diamonddock by Univers Digital Marc Diamond | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
