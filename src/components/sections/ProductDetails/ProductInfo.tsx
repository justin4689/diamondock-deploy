import React, { useState } from "react";
import { Box, Typography, Button, Divider, Rating, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  price,
  description,
  rating,
  reviewCount,
  sizes = [],
  colors = [],
  inStock,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log("Ajout au panier", {
      name,
      price,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <Box sx={{ p: 2, position: "relative " }}>
      {/* Nom du produit */}
      <Typography variant="h4" component="h1" gutterBottom>
        {name}
      </Typography>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <div>
          <FavoriteIcon className="transition-all duration-300 ease-in-out hover:text-orange-500" />
        </div>
      </Box>

      {/* Évaluation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating value={rating} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 2 }}>
          ({reviewCount} avis)
        </Typography>
      </Box>

      {/* Prix */}
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        {price.toLocaleString()}
        <span className="text-sm text-gray-500">CFA</span>
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        {description}
      </Typography>

      {/* Statut de stock */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Chip
          label={inStock ? "En stock" : "Rupture de stock"}
          color={inStock ? "success" : "error"}
          size="small"
        />
      </Box>

      {/* Sélection de taille */}
      {/* {sizes.length > 0 && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Taille</InputLabel>
          <Select
            value={selectedSize}
            label="Taille"
            onChange={(e) => setSelectedSize(e.target.value as string)}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


      )} */}

      {/* Sélection de couleur */}
      {colors.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {colors.map((color) => (
            <Chip
              key={color}
              label={color}
              onClick={() => setSelectedColor(color)}
              color={selectedColor === color ? "primary" : "default"}
              variant={selectedColor === color ? "filled" : "outlined"}
            />
          ))}
        </Box>
      )}

      {/* Quantité et boutons d'action */}
      <Box sx={{ mb: 2 }}>
        {/* <FormControl>
          <Select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value as number)}
          >
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={!inStock}
          sx={{ width: "100%", backgroundColor: "#EF6C00", color: "white" }}
        >
          J&apos;achète
        </Button>
      </Box>

      {/* Détails supplémentaires */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocalShippingIcon sx={{ mr: 1 }} />
        <Typography variant="body2">Livraison gratuite à Abidjan</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default ProductInfo;
