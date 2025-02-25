import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
    const currentDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  return (
    <>
      <Head>
        <title>Politique de Confidentialité et des Cookies - Diamondock</title>
        <meta name="description" content="Politique de confidentialité et des cookies de Diamondock" />
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fc', color: '#333' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className='text-6xl text-center font-bold mb-6 text-[#1e3a8a]'>Politique de Confidentialité et des Cookies de Diamondock</h1>
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}><strong>Dernière mise à jour : </strong>{currentDate}</p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>Introduction</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Chez <strong>Diamondock</strong>, nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site web. 
              Elle décrit également l'utilisation des cookies pour améliorer votre expérience sur notre plateforme.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>1. Collecte des Informations Personnelles</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Lorsque vous interagissez avec notre site, nous pouvons collecter certaines informations personnelles telles que votre nom, adresse e-mail, 
              et autres informations pertinentes pour vous fournir nos services. Nous collectons ces informations uniquement lorsque vous les soumettez volontairement, 
              par exemple lors de la création de compte, de la prise de contact, ou de l'abonnement à notre newsletter.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>2. Utilisation des Informations</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Les informations que nous collectons sont utilisées dans les buts suivants :
            </p>
            <ul style={{ fontSize: '1.125rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Améliorer et personnaliser votre expérience utilisateur sur notre site.</li>
              <li>Fournir les services que vous avez demandés.</li>
              <li>Répondre à vos questions et demandes de support.</li>
              <li>Vous informer sur des offres, mises à jour, ou promotions (si vous y avez consenti).</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>3. Partage des Informations</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour répondre à une demande ou une obligation légale. 
              Nous pourrions partager vos données avec nos partenaires de confiance qui nous aident à gérer notre site web ou à fournir des services, 
              mais ces partenaires sont tenus de respecter la confidentialité de vos informations.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>4. Cookies</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Notre site utilise des cookies pour améliorer votre expérience en ligne. Les cookies sont de petits fichiers texte stockés sur votre appareil. 
              Ils permettent de mémoriser vos préférences, d'analyser l'utilisation du site, et de vous offrir une expérience plus fluide et personnalisée.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              En utilisant notre site, vous consentez à l'utilisation de cookies conformément à cette politique. Vous pouvez modifier vos préférences de cookies 
              dans les paramètres de votre navigateur, mais cela pourrait affecter certaines fonctionnalités du site.
            </p>
            <h3 style={{ color: '#1e3a8a', fontSize: '1.5rem', fontWeight: '600' }}>Types de cookies que nous utilisons :</h3>
            <ul style={{ fontSize: '1.125rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site.</li>
              <li><strong>Cookies de performance :</strong> Aident à analyser la performance du site et à améliorer son fonctionnement.</li>
              <li><strong>Cookies de fonctionnalité :</strong> Permettent de se souvenir de vos préférences et de personnaliser votre expérience.</li>
              <li><strong>Cookies de publicité :</strong> Utilisés pour afficher des publicités pertinentes pour vous.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>5. Sécurité des Informations</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos informations personnelles contre l'accès non autorisé, la divulgation, ou la modification. 
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est complètement sécurisée. Nous ne pouvons donc garantir une sécurité absolue.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>6. Vos Droits</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Vous avez le droit de demander l'accès, la correction, la suppression, ou la limitation de l'utilisation de vos données personnelles. 
              Si vous souhaitez exercer ces droits, vous pouvez nous contacter via les informations fournies ci-dessous.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#4B5563', fontSize: '2rem', fontWeight: '600' }}>7. Contactez-nous</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Si vous avez des questions concernant notre politique de confidentialité ou si vous souhaitez exercer vos droits relatifs à vos données personnelles, 
              vous pouvez nous contacter à l'adresse suivante :
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              Email : <a href="mailto:support@diamondock.com" style={{ color: '#1e3a8a', textDecoration: 'none' }}>support@diamondock.com</a><br />
              Adresse : [Votre adresse physique ici]
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
