import React from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Avatar, 
  Paper, 
  Divider, 
  LinearProgress
} from '@mui/material';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  authorAvatar?: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ 
  reviews, 
  averageRating 
}) => {
  // Fonction pour calculer la distribution des notes
  const calculateRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // Pour afficher de 5 à 1
  };

  const ratingDistribution = calculateRatingDistribution();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Avis Clients
      </Typography>

      {/* Résumé des évaluations */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" sx={{ mr: 2 }}>
          {averageRating.toFixed(1)}
        </Typography>
        <Box>
          <Rating value={averageRating} precision={0.1} readOnly size="large" />
          <Typography variant="body2">
            {reviews.length} avis
          </Typography>
        </Box>
      </Box>

      {/* Distribution des notes */}
      <Box sx={{ mb: 3 }}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <Box 
            key={star} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1 
            }}
          >
            <Typography variant="body2" sx={{ mr: 2 }}>
              {star} étoiles
            </Typography>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(ratingDistribution[index] / reviews.length) * 100} 
                color="primary"
              />
            </Box>
            <Typography variant="body2">
              {ratingDistribution[index]}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Liste des avis */}
      {reviews.map((review) => (
        <Paper 
          key={review.id} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            border: '1px solid', 
            borderColor: 'divider' 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={review.authorAvatar} 
              alt={review.author} 
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">{review.author}</Typography>
              <Typography variant="body2" color="text.secondary">
                {review.date}
              </Typography>
            </Box>
            <Rating 
              value={review.rating} 
              readOnly 
              sx={{ ml: 'auto' }}
            />
          </Box>
          
          <Typography variant="body1">
            {review.comment}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductReviews;