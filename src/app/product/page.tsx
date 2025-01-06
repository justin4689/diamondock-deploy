"use client";

import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import ProductImageGallery from "@/components/sections/ProductDetails/ProductImageGallery";
import ProductInfo from "@/components/sections/ProductDetails/ProductInfo";
import ProductReviews from "@/components/sections/ProductDetails/ProductReview";
import RelatedProducts from "@/components/sections/ProductDetails/RelatedProducts";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  sx?: any;
}

const ProductDetailsPage: React.FC = () => {
  // Exemple de données de produit (normalement récupérées depuis une API)
  const productData = {
    id: "prod-001",
    name: "Veste en Cuir Élégante",
    price: 299.99,
    description:
      "Une veste en cuir de haute qualité, parfaite pour un look sophistiqué et moderne. Fabriquée avec des matériaux premium et une coupe impeccable.",
    images: [
      "https://images.pexels.com/photos/887898/pexels-photo-887898.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1833082/pexels-photo-1833082.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir", "Marron", "Cognac"],
  };

  const reviewsData = {
    averageRating: 4.5,
    reviews: [
      {
        id: "rev-001",
        author: "Marie Dupont",
        date: "12 novembre 2023",
        rating: 5,
        comment: "Qualité exceptionnelle, très satisfaite de mon achat !",
        authorAvatar: "/images/avatar-marie.jpg",
      },
      {
        id: "rev-002",
        author: "Jean Martin",
        date: "5 octobre 2023",
        rating: 4,
        comment: "Bon rapport qualité-prix, je recommande.",
        authorAvatar: "/images/avatar-jean.jpg",
      },
    ],
  };

  const relatedProductsData = [
    {
      id: "prod-002",
      name: "Pantalon Chino",
      price: 89.99,
      image:
        "https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.2,
    },
    {
      id: "prod-003",
      name: "Chemise Blanche",
      price: 59.99,
      image:
        "https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.7,
    },
  ];

  const questionsData = [
    {
      id: "q-001",
      question: "Ce produit est-il résistant à l'eau ?",
      answer: "Oui, cette veste est résistante à l'eau, mais pas imperméable.",
    },
    {
      id: "q-002",
      question: "Quelle est la politique de retour pour cet article ?",
      answer:
        "Vous pouvez retourner cet article dans les 30 jours suivant l'achat.",
    },
  ];

  const technicalSpecs = [
    { key: "Matériau", value: "Cuir véritable" },
    { key: "Doublure", value: "Polyester" },
    { key: "Fermeture", value: "Zip" },
    { key: "Entretien", value: "Nettoyage à sec uniquement" },
  ];

  const deliveryAndReturns = {
    delivery: "Livraison gratuite sous 3-5 jours ouvrables.",
    returns: "Retours gratuits sous 30 jours.",
  };

  return (
    <Box
      sx={{
        mt: {
          xs: 22, // Petit écran
          sm: 3, // Grand écran et au-delà
        },
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Galerie d'images */}
          <Grid item xs={12} md={4}>
            <ProductImageGallery
              images={productData.images}
              alt={productData.name}
              sx={{ borderRadius: 2, overflow: "hidden" }}
            />
          </Grid>

          {/* Informations du produit */}
          <Grid item xs={12} md={5}>
            <Paper elevation={1} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
              <ProductInfo
                name={productData.name}
                price={productData.price}
                description={productData.description}
                rating={productData.rating}
                reviewCount={productData.reviewCount}
                inStock={productData.inStock}
                sizes={productData.sizes}
                colors={productData.colors}
              />
            </Paper>
          </Grid>

          {/* Section livraison - Maintenant visible sur mobile */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: "#f9f9f9",
               
                zIndex: { xs: 1000, md: 1 },
                width: { xs: "100%", md: "auto" },
                borderRadius: { xs: "20px 20px 0 0", md: "4px" },
                boxShadow: {
                  xs: "0px -4px 10px rgba(0, 0, 0, 0.1)",
                  md: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: { xs: "none", md: "block" } }}
              >
                LIVRAISON & RETOURS
              </Typography>
              <Divider sx={{ display: { xs: "none", md: "block" }, mb: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Région de livraison
                  </label>
                  <select className="mt-2 w-full outline-none rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm">
                    <option value="">Sélectionnez une région</option>
                    <option value="JM">Abidjan-Lagunes</option>
                    <option value="SRV">Comoe-Marahoué</option>
                    <option value="JH">Mankono-Moyen-Comoe</option>
                    <option value="BBK">Denguélé</option>
                    <option value="AK">Savanes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Ville/Commune
                  </label>
                  <select className="mt-2 w-full rounded-lg border outline-none border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm">
                    <option value="">Sélectionnez une ville</option>
                    <option value="JM">Cocody</option>
                    <option value="SRV">Plateau</option>
                    <option value="JH">Djorobité</option>
                    <option value="BBK">Yopougon</option>
                  </select>
                </div>

                
                 

                <Box
                  sx={{p: 2, backgroundColor: "#fff", borderRadius: 1 }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Points de relais
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Prêt pour le retrait entre 07 janvier et 08 janvier si vous commandez dans les prochaines 3hrs 3mins
                  </Typography>
                

                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Politique de retour :
                  </Typography>
                  <Typography variant="body2" component="ul" sx={{ textAlign:"no-wrap"}}>
                    • tours gratuits sur 10 jours <span> details</span>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Caractéristiques Techniques */}
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
              <Typography variant="h6" gutterBottom>
                Caractéristiques Techniques
              </Typography>
              <ul>
                {technicalSpecs.map((spec, index) => (
                  <li key={index}>
                    <Typography variant="body2">
                      <strong>{spec.key}:</strong> {spec.value}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>

          {/* Avis */}
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
              <ProductReviews
                reviews={reviewsData.reviews}
                averageRating={reviewsData.averageRating}
              />
            </Paper>
          </Grid>

          {/* Produits similaires */}
          <Grid item xs={12}>
            <RelatedProducts products={relatedProductsData} sx={{ mt: 2 }} />
          </Grid>

          {/* Questions/Réponses 
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>Questions/Réponses</Typography>
            {questionsData.map((q) => (
              <Box key={q.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1"><strong>Q:</strong> {q.question}</Typography>
                <Typography variant="body2"><strong>R:</strong> {q.answer}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        */}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;
