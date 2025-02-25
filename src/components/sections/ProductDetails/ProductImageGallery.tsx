'use client'
import React, { useState } from "react";
import {
  Box,
  Grid,
  ImageListItem,
  Dialog,
  DialogContent,
} from "@mui/material";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: {
    id: number;
    image_url: string;
    is_primary: number;
    product_id: number;
    created_at: string;
    updated_at: string;
  }[];
  alt: string;
  sx?: any;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  alt,
  sx,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    images.length > 0 ? images[0].image_url : "" // Défaut : première image ou chaîne vide
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (images.length === 0) {
    return <Box>Aucune image disponible</Box>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Galerie de miniatures */}
        <Grid item xs="auto">
          {images.map((image, index) => (
            <ImageListItem
              key={image.id} // Utilisation de `id` comme clé
              sx={{
                opacity: selectedImage === image.image_url ? 1 : 0.6,
                cursor: "pointer",
                border:
                  selectedImage === image.image_url
                    ? "2px solid primary.main"
                    : "none",
                borderRadius: "4px",
                marginTop: 1,
                objectFit: "cover",
                width: "80px",
                height: "80px",
              }}
              onClick={() => handleImageClick(image.image_url)} // Utilisation de `image_url`
            >
              <Image
                src={image.image_url}
                alt={`${alt} thumbnail ${index + 1}`}
                width={80}
                height={80}
                style={{
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </ImageListItem>
          ))}
        </Grid>

        {/* Image principale */}
        <Grid item xs>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              cursor: "pointer",
              mb: 2,
            }}
            onClick={handleOpenDialog}
          >
            <Image
              src={selectedImage}
              alt={alt}
              fill
              style={{
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Dialog pour vue agrandie */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 600,
            }}
          >
            <Image
              src={selectedImage}
              alt={`${alt} fullsize`}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductImageGallery;
