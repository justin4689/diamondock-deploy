"use client";

import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductImageGallery from "@/components/sections/ProductDetails/ProductImageGallery";
import ProductInfo from "@/components/sections/ProductDetails/ProductInfo";
import ProductReviews from "@/components/sections/ProductDetails/ProductReview";
import RelatedProducts from "@/components/sections/ProductDetails/RelatedProducts";

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

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
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
        {/* Informations du produit */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>
              LIVRAISON & RETOURS
            </Typography>
            <Divider className="md:mt-2" />
            <Typography variant="subtitle2" gutterBottom>
              Livraison rapide en 48h Abidjan.
            </Typography>
            <Divider className="md:mt-2" />
            <Typography variant="h6" gutterBottom>
              Choisissez le lieu
            </Typography>
            <div>
              <label
                htmlFor="Regions"
                className="block text-sm font-medium text-gray-900"
              >
                {" "}
                Regions
              </label>
              <select
                name="Regions"
                id="Regions"
                className="mt-2 w-full outline-none rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
              >
                <option value="">Choisissez...</option>
                <option value="JM">Abidjan-Lagunes</option>
                <option value="SRV">Comoe-Marahoué</option>
                <option value="JH">Mankono-Moyen-Comoe</option>
                <option value="BBK">Denguélé</option>
                <option value="AK">Savanes</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="Villes ou Communes"
                className="block text-sm font-medium text-gray-900"
              >
                {" "}
                Villes ou Communes
              </label>

              <select
                name="Villes ou Communes"
                id="Villes ou Communes"
                className="mt-2 w-full rounded-lg border outline-none border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
              >
                <option value="">Choisissez...</option>
                <option value="JM">Cocody</option>
                <option value="SRV">Plateau</option>
                <option value="JH">Djorobité</option>
                <option value="BBK">Yopougon</option>
              </select>
            </div>
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
  );
};

export default ProductDetailsPage;
