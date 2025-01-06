"use client";

import Link from "next/link";
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
import { ShoppingCart, Plus, Trash } from "lucide-react";
import Image from "next/image";

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
    <Box
      sx={{
        pb: 4,
        px: 2,
        mt: {
          xs: 22, // Petit écran
          sm: 3, // Grand écran et au-delà
        },
      }}
    >
      {/* En-tête avec sélection de liste */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <h1
          className="text-2xl md:text-4xl font-meduim"
         
          >
            Mes Listes de Souhaits
          </h1>
          <Link href="/shop"> 
          <IconButton color="primary">
            <Plus />
          </IconButton>
          </Link>
        </Box>
      </Box>

      {/* Grille de produits */}
      <Grid container spacing={3}>
        {lists.map((item) => (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item.id}>
            <Card key={item.id} className="relative group rounded-lg">
              <div
                className="absolute top-3 right-0 bg-orange-500 text-white text-sm font-bold rounded-full px-1 md:px-2 md:py-1 z-50"
                style={{ backgroundColor: "#F57C00" }} // Couleur orange pure
              >
                -{item.discount}%
              </div>

              <CardContent className="p-4 flex flex-col h-full">
                <div className="aspect-square relative mb-4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                  />
                </div>

                <h3 className="font-semibold md:min-h-16 min-h-8 text-xs md:text-lg   ">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between ">
                  <div className="flex flex-col">
                    <span className="text-black  text-xs font-bold md:text-xl">
                      {item.price}FCFA
                    </span>
                    <span className="ml-2 text-gray-400 line-through text-[10px] md:text-sm">
                      {item.oldPrice}F FCFA
                    </span>
                  </div>
                  <div className="text-gray-500 text-[9px] md:text-sm">
                    {item.brand}
                  </div>
                </div>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={item.rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({item.rating})
                  </Typography>
                </Box>

                <div className=" mt-4">
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart size={16} />}
                    fullWidth
                    sx={{
                      bgcolor: "#EF6C00",
                      mb: 2,
                      fontSize: { xs: "0.55rem", lg: "0.8rem" }, // Taille du texte
                      py: { xs: 1, sm: 1.5 }, // Padding vertical
                    }}
                  >
                    J&apos;achète
                  </Button>

                  {/* Bouton pour supprimer le produit */}
                  <Button
                    variant="outlined"
                    startIcon={<Trash size={16} />}
                    fullWidth
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                    sx={{
                      fontSize: { xs: "0.5rem", sm: "0.875rem" }, // Taille du texte
                      py: { xs: 1, sm: 1.5 }, // Padding vertical
                    }}
                  >
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
