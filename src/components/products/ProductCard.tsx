import React from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  Rating,
} from "@mui/material";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { getDiscount, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

import { toast} from "sonner";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryImage = product.images.find(
    (image: any) => image.is_primary === 1
  );

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage?.image_url || "/placeholder-image.png",
      quantity: 1,
    });

    toast.success("Produit ajouté au panier");
  };

  return (
    <Card className="relative group rounded-lg">
      <div
        className="absolute top-3 right-0 bg-orange-600 text-white text-sm font-bold rounded-full px-1 md:px-2 md:py-1 z-50"
      >
        -{getDiscount(product.old_price, product.price)}%
      </div>

      <CardContent className="p-4 flex flex-col h-full">
        <div className="aspect-square relative mb-4 overflow-hidden">
          <Image
            src={primaryImage?.image_url || "/placeholder-image.png"}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
          />
        </div>

        <h3 className="font-semibold md:min-h-16 min-h-8 text-xs md:text-lg">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-black text-xs font-bold">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-gray-400 line-through text-[10px] md:text-sm">
              {formatPrice(product.old_price)}
            </span>
          </div>
          <div className="text-gray-500 text-[9px] md:text-xs">
            {product.brand.name}
          </div>
        </div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating value={4} readOnly size="small" />
        </Box>

        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            startIcon={<ShoppingCart size={16} />}
            fullWidth
            sx={{
              bgcolor: "#EF6C00",
              fontSize: "0.8rem",
              py: 1.5,
            }}
            onClick={handleAddToCart}
          >
            J&apos;achète
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
