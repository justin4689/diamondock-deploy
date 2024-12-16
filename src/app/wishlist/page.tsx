"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import { ShoppingCart, MoreVertical, Plus, Trash } from "lucide-react";

const WishlistPage: React.FC = () => {
  // États
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Chaussure de sport",
      price: 150000,
      oldPrice: 180000,
      brand: "Nike",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg",
      discount: 25,
      notifications: true,
    },
    {
      id: 2,
      name: "T-shirt",
      price: 68000,
      oldPrice: 80000,
      brand: "Adidas",
      rating: 4.0,
      image:
        "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg",
      discount: 15,
      notifications: false,
    },
  ]);

  // Fonction pour supprimer un produit
  const handleRemoveItem = (id: number) => {
    setLists((prevLists) => prevLists.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* En-tête avec sélection de liste */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">Mes Listes de Souhaits</Typography>
          <IconButton color="primary">
            <Plus />
          </IconButton>
        </Box>
      </Box>

      {/* Grille de produits */}
      <Grid container spacing={3}>
        {lists.map((item) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
            <Card className="relative group rounded-lg">
              <CardContent className="p-4 flex flex-col h-full">
                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton>
                    <MoreVertical />
                  </IconButton>
                </Box>

                <div className="aspect-square relative mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                  />
                </div>

                <Typography variant="h6" className=" md:min-h-16 min-h-6 text-xs md:text-lg ">
                  {item.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        xs: { fontSize: "10px", height: "100px" },
                        md: { fontSize: "16px", height: "16px" },
                      }}
                    >
                      {item.price} FCFA
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textDecoration: "line-through",
                        xs: { fontSize: "8px" },
                        md: { fontSize: "12px" },
                      }}
                    >
                      {item.oldPrice} FCFA
                    </Typography>
                  </Box>
                </Box>

                <Rating
                  value={item.rating}
                  readOnly
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  startIcon={<ShoppingCart size={16} />}
                  fullWidth
                  sx={{
                    bgcolor: "#F57C00",
                    mb: 2,
                    fontSize: { xs: "0.5rem", sm: "0.875rem" }, // Taille du texte
                    py: { xs: 1, sm: 1.5}, // Padding vertical
                  }}
                >
                  Ajouter au panier
                </Button>
                {/* Bouton pour supprimer le produit */}
                <Button
                  variant="outlined"
                  startIcon={<Trash size={16}/>}
                  fullWidth
                  color="error"
                  onClick={() => handleRemoveItem(item.id)}
                  sx={{
                    fontSize: { xs: "0.5rem", sm: "0.875rem"}, // Taille du texte
                    py: { xs: 1, sm: 1.5}, // Padding vertical
                  }}
                >
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
