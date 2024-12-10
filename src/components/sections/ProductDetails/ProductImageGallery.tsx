import React, { useState } from "react";
import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
} from "@mui/material";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  alt,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Galerie de miniatures */}
        <Grid item xs="auto">
        
            {images.map((image, index) => (
              <ImageListItem
                key={index}
                sx={{
                  opacity: selectedImage === image ? 1 : 0.6,
                  cursor: "pointer",
                  border:
                    selectedImage === image ? "2px solid primary.main" : "none",
                  borderRadius: "4px",
                  marginTop: 1,
                  objectFit: "cover",
                  width: "80px",
                  height: "80px",
            
                }}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
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
