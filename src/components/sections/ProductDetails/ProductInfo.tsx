"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Rating,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  image: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  name,
  price,
  description,
  rating,
  reviewCount,
  sizes = [],
  colors = [],
  inStock,
  image,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showAddToCartButton, setShowAddToCartButton] = useState(true); // Nouvel état pour contrôler la visibilité du bouton

  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  // Vérifier si le produit existe déjà dans le panier
  const existingItem = items.find(
    (item) =>
      item.id === id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!inStock) return;

    if (sizes.length > 0 && !selectedSize) {
      alert("Veuillez sélectionner une taille");
      return;
    }

    if (colors.length > 0 && !selectedColor) {
      alert("Veuillez sélectionner une couleur");
      return;
    }

    addItem({
      id,
      name,
      price,
      image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    setOpenSnackbar(true);
    setShowQuantity(true);
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
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
      <Typography variant="h5" sx={{ mb: 2, color: "primary" }}>
        {formatPrice(price)}
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
      {sizes.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Sélectionnez une taille:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {sizes.map((size: any, index) => (
              <Chip
                key={typeof size === "string" ? size : `${size.name}-${index}`}
                label={typeof size === "string" ? size : size.name}
                onClick={() =>
                  setSelectedSize(typeof size === "string" ? size : size.name)
                }
                color={
                  selectedSize === (typeof size === "string" ? size : size.name)
                    ? "primary"
                    : "default"
                }
                variant={
                  selectedSize ===
                  (typeof size === "string" ? size : size?.name)
                    ? "filled"
                    : "outlined"
                }
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Sélection de couleur */}
      {colors.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Sélectionnez une couleur:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {colors.map((color: any, index) => (
              <Chip
                key={
                  typeof color === "string" ? color : `${color.name}-${index}`
                }
                label={typeof color === "string" ? color : color.name}
                onClick={() =>
                  setSelectedColor(
                    typeof color === "string" ? color : color.name
                  )
                }
                color={
                  selectedColor ===
                  (typeof color === "string" ? color : color.name)
                    ? "primary"
                    : "default"
                }
                variant={
                  selectedColor ===
                  (typeof color === "string" ? color : color.name)
                    ? "filled"
                    : "outlined"
                }
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Quantité et boutons d'action (affichés seulement après l'ajout au panier) */}
      {showQuantity && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Quantité:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}>
                {quantity}
              </Typography>
              <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}

      {/* Bouton "Ajouter au panier" (affiché seulement si showAddToCartButton est true) */}
      <Box sx={{ mt: 4 }}>
        {showAddToCartButton ? (
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {/* Icône du panier */}
            <ShoppingCartIcon sx={{ color: "white" }} />
            Ajouter au panier
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 bg-orange-600 text-white rounded-md"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 bg-orange-600 text-white rounded-md"
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              className="px-4 py-1 bg-orange-600 text-white rounded-md"
            >
              Ajouter
            </button>
          </div>
        )}
      </Box>

      {/* Détails supplémentaires */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocalShippingIcon sx={{ mr: 1 }} />
        <Typography variant="body2">Livraison gratuite à Abidjan</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Snackbar pour la confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Produit ajouté au panier avec succès!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductInfo;
