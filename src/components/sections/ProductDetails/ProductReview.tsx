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
      borderColor: 'divider',
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' }, // Adjust layout for small screens
      alignItems: { sm: 'center' }
    }}
  >
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: { xs: 2 , sm: 0  }, // Margin-bottom only for small screens
        mr: { sm: 2 } // Margin-right for non-small screens
      }}
    >
      <Avatar 
        src={review.authorAvatar} 
        alt={review.author} 
        sx={{ 
          mr: {  xs: 2 }, // Remove margin-right for small screens
          mb: { xs: 1, sm: 0 } // Add margin-bottom for small screens
        }}
      />
      <Box >
        <Typography 
          variant="subtitle1" 
          sx={{ display: { xs: 'block', md: 'block' } }}
        >
          {review.author}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }} // Smaller font for small screens
        >
          {review.date}
        </Typography>
      </Box>
    </Box>
    <Box 
      sx={{
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ mb: { xs: 1, sm: 0 }, fontSize: { xs: '0.9rem', sm: 'inherit' } }}
      >
        {review.comment}
      </Typography>
      <Rating 
        value={review.rating} 
        readOnly 
        sx={{ 
          mt: { xs: 1, sm: 0 }, 
          alignSelf: { xs: 'flex-start', sm: 'flex-end' } // Adjust alignment
        }}
      />
    </Box>
  </Paper>
))}

    </Box>
  );
};

export default ProductReviews;