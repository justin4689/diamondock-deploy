"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between items-center z-50">
    <p className="text-sm mb-3">
      Ce site utilise des cookies afin d'améliorer votre expérience. En
      cliquant sur « Accepter », vous autorisez leur utilisation. Nous vous
      encourageons à consulter notre politique de confidentialité et des
      cookies <Link href={"/privacy-policy"}><span className="underline text-orange-600">pour en savoir plus</span></Link>.
    </p>
    <button
      className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition ml-auto"
      onClick={handleAccept}
    >
      Accepter
    </button>
  </div>
  
  );
};

export default CookieConsent;
