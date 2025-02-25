"use client";

import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Image from "next/image";
import { Store, MapPin, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ShopDetailsClientProps {
  shop: any;
}

const ShopDetailsClient: React.FC<ShopDetailsClientProps> = ({ shop }) => {
  const { data: session } = useSession();

  if (!shop) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Boutique non trouvée ou erreur de chargement. Veuillez réessayer.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Shop Header */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src={
                  shop.image_url ||
                  "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg"
                }
                alt={shop.shop_name}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Store size={24} className="text-orange-500 mr-2" />
              <Typography variant="h4" component="h1">
                {shop.shop_name}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              {shop.description || "Aucune description disponible"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MapPin size={20} className="text-gray-500 mr-2" />
              <Typography variant="body2" color="text.secondary">
                {shop.city && shop.country
                  ? `${shop.city}, ${shop.country}`
                  : "Emplacement non spécifié"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Type: {shop.type === "beginner" ? "Débutant" : "Professionnel"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Produits: {shop.products?.length || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Grid */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Produits de la boutique
      </Typography>

      <Grid container spacing={3}>
        {shop.products?.map((product: any) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Link href={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "100%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={
                        product.image_url ||
                        "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg"
                      }
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Box>

                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontSize: "1rem",
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {formatPrice(product.price)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {formatPrice(product.old_price)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Package size={16} className="text-gray-500 mr-1" />
                      <Typography variant="body2" color="text.secondary">
                        {product.stock}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopDetailsClient;
