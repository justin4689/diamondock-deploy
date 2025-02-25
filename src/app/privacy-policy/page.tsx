import React from 'react';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Politique de Confidentialité et des Cookies - Diamondock</title>
        <meta name="description" content="Politique de confidentialité et des cookies de Diamondock" />
      </Head>
      <main className="bg-gray-50 p-8 font-sans text-gray-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl  underline font-semibold text-orange-600 mb-6">
            Politique de Confidentialité et des Cookies
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Introduction</h2>
            <p className="text-lg leading-relaxed">
              Chez <strong className="font-bold text-black">Diamondock</strong>, nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site web. Elle décrit également l'utilisation des cookies pour améliorer votre expérience sur notre plateforme.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Collecte des Informations Personnelles</h2>
            <p className="text-lg leading-relaxed">
              Lorsque vous interagissez avec notre site, nous pouvons collecter certaines informations personnelles telles que votre nom, adresse e-mail, et autres informations pertinentes pour vous fournir nos services. Nous collectons ces informations uniquement lorsque vous les soumettez volontairement, par exemple lors de la création de compte, de la prise de contact, ou de l'abonnement à notre newsletter.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Utilisation des Informations</h2>
            <p className="text-lg leading-relaxed">Les informations que nous collectons sont utilisées dans les buts suivants :</p>
            <ul className="list-disc pl-6">
              <li>Améliorer et personnaliser votre expérience utilisateur sur notre site.</li>
              <li>Fournir les services que vous avez demandés.</li>
              <li>Répondre à vos questions et demandes de support.</li>
              <li>Vous informer sur des offres, mises à jour, ou promotions (si vous y avez consenti).</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Partage des Informations</h2>
            <p className="text-lg leading-relaxed">
              Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour répondre à une demande ou une obligation légale. Nous pourrions partager vos données avec nos partenaires de confiance qui nous aident à gérer notre site web ou à fournir des services, mais ces partenaires sont tenus de respecter la confidentialité de vos informations.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Cookies</h2>
            <p className="text-lg leading-relaxed">
              Notre site utilise des cookies pour améliorer votre expérience en ligne. Les cookies sont de petits fichiers texte stockés sur votre appareil. Ils permettent de mémoriser vos préférences, d'analyser l'utilisation du site, et de vous offrir une expérience plus fluide et personnalisée.
            </p>
            <p className="text-lg leading-relaxed">
              En utilisant notre site, vous consentez à l'utilisation de cookies conformément à cette politique. Vous pouvez modifier vos préférences de cookies dans les paramètres de votre navigateur, mais cela pourrait affecter certaines fonctionnalités du site.
            </p>
            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Types de cookies que nous utilisons :</h3>
            <ul className="list-disc pl-6">
              <li><strong className="font-bold text-gray-700">Cookies essentiels :</strong> Nécessaires au fonctionnement du site.</li>
              <li><strong className="font-bold text-gray-700">Cookies de performance :</strong> Aident à analyser la performance du site et à améliorer son fonctionnement.</li>
              <li><strong className="font-bold text-gray-700">Cookies de fonctionnalité :</strong> Permettent de se souvenir de vos préférences et de personnaliser votre expérience.</li>
              <li><strong className="font-bold text-gray-700">Cookies de publicité :</strong> Utilisés pour afficher des publicités pertinentes pour vous.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Sécurité des Informations</h2>
            <p className="text-lg leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos informations personnelles contre l'accès non autorisé, la divulgation, ou la modification. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est complètement sécurisée. Nous ne pouvons donc garantir une sécurité absolue.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">6. Vos Droits</h2>
            <p className="text-lg leading-relaxed">
              Vous avez le droit de demander l'accès, la correction, la suppression, ou la limitation de l'utilisation de vos données personnelles. Si vous souhaitez exercer ces droits, vous pouvez nous contacter via les informations fournies ci-dessous.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">7. Contactez-nous</h2>
            <p className="text-lg leading-relaxed">
              Si vous avez des questions concernant notre politique de confidentialité ou si vous souhaitez exercer vos droits relatifs à vos données personnelles, vous pouvez nous contacter à l'adresse suivante :
            </p>
            <p className="text-lg leading-relaxed">
              Email : <a href="mailto:admin@diamondock.com" className="text-orange-600">admin@diamondock.com</a><br />
              Adresse : Abidjan, Côte d’Ivoire , Djorobité
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;
