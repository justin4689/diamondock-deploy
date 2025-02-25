'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Avatar, 
  Paper, 
  Divider, 
  LinearProgress,
  Button
} from '@mui/material';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  image_url: string | null;
}

interface Review {
  id: number;
  title: string;
  comment: string;
  rating: number;
  created_at: string;
  user: User;
}

interface ProductReviewsProps {
  reviews: Review[];
}

const REVIEWS_PER_PAGE = 1;

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  const [displayedReviews, setDisplayedReviews] = useState(REVIEWS_PER_PAGE);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  // Fonction pour calculer la distribution des notes
  const calculateRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // Pour afficher de 5 à 1
  };

  const ratingDistribution = calculateRatingDistribution();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShowMore = () => {
    setDisplayedReviews(prev => Math.min(prev + REVIEWS_PER_PAGE, reviews.length));
  };

  const visibleReviews = reviews.slice(0, displayedReviews);

  if (reviews.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Avis Clients
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
          }}
        >
          <RateReviewOutlinedIcon 
            sx={{ 
              fontSize: 60, 
              color: 'text.secondary',
              mb: 2
            }} 
          />
          <Typography variant="h6" gutterBottom color="text.secondary">
            Aucun avis pour le moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Soyez le premier à donner votre avis sur ce produit
          </Typography>
        </Paper>
      </Box>
    );
  }

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
            <Typography variant="body2" sx={{ mr: 2, minWidth: '70px' }}>
              {star} étoiles
            </Typography>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(ratingDistribution[index] / reviews.length) * 100} 
                color="primary"
              />
            </Box>
            <Typography variant="body2" sx={{ minWidth: '30px' }}>
              {ratingDistribution[index]}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Liste des avis */}
      {visibleReviews.map((review) => (
        <Paper 
          key={review.id} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            border: '1px solid', 
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={review.user.image_url || undefined}
              alt={`${review.user.firstname} ${review.user.lastname}`}
              sx={{ mr: 2 }}
            >
              {review.user.firstname[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">
                {`${review.user.firstname} ${review.user.lastname}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(review.created_at)}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <Rating value={review.rating} readOnly size="small" />
          </Box>
          
          <Typography variant="h6" gutterBottom>
            {review.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {review.comment}
          </Typography>
        </Paper>
      ))}

      {/* Bouton "Voir plus" */}
      {displayedReviews < reviews.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleShowMore}
            sx={{ 
              px: 4,
              py: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
              }
            }}
          >
            Voir plus d'avis ({reviews.length - displayedReviews} restants)
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductReviews;