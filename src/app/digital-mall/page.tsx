import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import { Store, MapPin, Star } from "lucide-react";
import Link from "next/link";

// Types pour les boutiques
interface Shop {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  productsCount: number;
  followers: number;
}

// Données simulées des boutiques
const shops: Shop[] = [
  {
    id: 1,
    name: "Électro Premium",
    description: "Spécialiste en produits électroniques haut de gamme",
    rating: 4.5,
    reviewCount: 128,
    location: "Cocody, Abidjan",
    image: "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg",
    productsCount: 450,
    followers: 1200,
  },
  {
    id: 2,
    name: "Mode Élégance",
    description: "Boutique de vêtements et accessoires de luxe",
    rating: 4.8,
    reviewCount: 256,
    location: "Plateau, Abidjan",
    image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
    productsCount: 320,
    followers: 2300,
  },
  // Ajoutez d'autres boutiques...
];

const DigitalMallPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        mt: {
          xs: 22,
          sm: 3,
        },
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Digital Mall
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Découvrez nos boutiques partenaires
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <Link
              href={`/digital-mall/shop/${shop.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={shop.image}
                    alt={shop.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Store size={20} className="text-orange-500 mr-2" />
                    <Typography variant="h6" component="h2">
                      {shop.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 40 }}
                  >
                    {shop.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <MapPin size={16} className="text-gray-500 mr-1" />
                    <Typography variant="body2" color="text.secondary">
                      {shop.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating
                      value={shop.rating}
                      readOnly
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({shop.reviewCount} avis)
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-end" }}
                  >
                    <Typography variant="body2">
                      {shop.productsCount} produits
                    </Typography>
                   
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: "#F57C00",
                      "&:hover": {
                        bgcolor: "#EF6C00",
                      },
                    }}
                  >
                    Visiter la boutique
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DigitalMallPage;
