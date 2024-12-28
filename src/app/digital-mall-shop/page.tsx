"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Rating,
  Button,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Divider,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Filter,
  ShoppingCart,
} from "lucide-react";

// Types
interface ShopProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  category: string;
  discount: number;
  inStock: boolean;
}

interface ShopDetails {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  coverImage: string;
  logo: string;
  productsCount: number;
  followers: number;
  joinedDate: string;
  contact: {
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  // Données simulées de la boutique
  const shopDetails: ShopDetails = {
    id: 1,
    name: "Électro Premium",
    description:
      "Votre destination de confiance pour tous vos besoins en électronique haut de gamme. Nous proposons une large sélection de produits authentiques avec garantie.",
    rating: 4.5,
    reviewCount: 128,
    location: "Cocody, Abidjan",
    coverImage: "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg",
    logo: "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg",
    productsCount: 450,
    followers: 1200,
    joinedDate: "Janvier 2023",
    contact: {
      phone: "+225 0123456789",
      email: "contact@electropremium.com",
      facebook: "electropremium",
      instagram: "electropremium",
      twitter: "electropremium",
    },
  };

  // Données simulées des produits
  const products: ShopProduct[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 950000,
      oldPrice: 1000000,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
      category: "Smartphones",
      discount: 5,
      inStock: true,
    },
    // Ajoutez d'autres produits...
  ];

  return (
    <Box
      sx={{
        mt: {
          xs: 22,
          sm: 0,
        },
        mb: 10,
      }}
    >
      {/* Bannière de la boutique */}
      <Box
        sx={{
          height: 300,
          position: "relative",
          backgroundImage: `url(${shopDetails.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: 50,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Avatar
            src={shopDetails.logo}
            sx={{ width: 100, height: 100, border: "4px solid white" }}
          />
          <Box sx={{ ml: 2, mb: 2 }}>
            <Typography variant="h4" color="white" sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
              {shopDetails.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
              <MapPin size={16} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {shopDetails.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 8, px: 4 }}>
        {/* Informations de la boutique */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Onglets */}
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
              <Tab label="Produits" />
              <Tab label="À propos" />
              <Tab label="Avis" />
            </Tabs>

            {activeTab === 0 && (
              <>
                {/* Filtres et tri */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <TextField
                    select
                    size="small"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ width: 200 }}
                  >
                    <MenuItem value="newest">Plus récents</MenuItem>
                    <MenuItem value="price_asc">Prix croissant</MenuItem>
                    <MenuItem value="price_desc">Prix décroissant</MenuItem>
                  </TextField>
                </Box>

                {/* Grille de produits */}
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card>
                        <Box sx={{ position: "relative", paddingTop: "100%" }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              position: "absolute",
                              top: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {product.discount > 0 && (
                            <Chip
                              label={`-${product.discount}%`}
                              color="error"
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                              }}
                            />
                          )}
                        </Box>
                        <CardContent>
                          <Typography variant="h6" noWrap>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {product.category}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                              <Typography variant="h6" color="primary">
                                {product.price} FCFA
                              </Typography>
                              {product.oldPrice > product.price && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ textDecoration: "line-through" }}
                                >
                                  {product.oldPrice} FCFA
                                </Typography>
                              )}
                            </Box>
                            <IconButton color="primary" size="small">
                              <ShoppingCart />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="body1" paragraph>
                  {shopDetails.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Contact
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Phone size={20} className="mr-2" />
                    <Typography>{shopDetails.contact.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Mail size={20} className="mr-2" />
                    <Typography>{shopDetails.contact.email}</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Typography variant="body1">
                Section des avis clients (à implémenter)
              </Typography>
            )}
          </Grid>

          {/* Sidebar avec statistiques */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Statistiques de la boutique
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Produits</Typography>
                <Typography>{shopDetails.productsCount}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Abonnés</Typography>
                <Typography>{shopDetails.followers}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Note moyenne</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={shopDetails.rating} readOnly size="small" />
                  <Typography sx={{ ml: 1 }}>({shopDetails.reviewCount})</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Membre depuis</Typography>
                <Typography>{shopDetails.joinedDate}</Typography>
              </Box>
            </Card>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#F57C00",
                "&:hover": {
                  bgcolor: "#EF6C00",
                },
              }}
            >
              Suivre la boutique
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopPage;