import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Rating
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface RelatedProductsProps {
  products: Product[];
  sx?: any;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, sx }) => {
  return (
    <Box sx={{ p: 2, ...sx }}>
      <Typography variant="h5" gutterBottom>
        Produits Similaires
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <CardMedia 
                sx={{ 
                  position: 'relative', 
                  height: 250, 
                  width: '100%' 
                }}
              >
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  style={{ 
                    objectFit: 'cover' 
                  }}
                />
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  noWrap
                >
                  {product.name}
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mt: 1 
                }}>
                  <Typography 
                    variant="body1" 
                    color="primary"
                  >
                    {product.price.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </Typography>

                  <Rating 
                    value={product.rating} 
                    precision={0.5} 
                    readOnly 
                    size="small" 
                  />
                </Box>
              </CardContent>

              <CardActions>
                <Link 
                  href={`/products/${product.id}`} 
                  passHref
                >
                  <Button 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  >
                    Voir le produit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;