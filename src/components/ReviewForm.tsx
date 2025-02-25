"use client";

import React, { useState } from 'react';
import { Box, Typography, TextField, Rating, Button, Alert, Snackbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import { createReview } from '@/lib/api/reviewsService';

interface ReviewFormProps {
  productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<string>('0');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setComment('');
    setRating('0');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.accessToken) {
      setError('Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!title || !comment || rating === '0') {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await createReview({
        title,
        comment,
        rating,
        product_id: productId.toString()
      }, session.accessToken);

      if (response?.status === "201") {
        setSuccessMessage(response?.success);
        resetForm();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Donnez votre avis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Note</Typography>
        <Rating
          name="rating"
          value={Number(rating)}
          onChange={(_, newValue) => setRating(newValue ? newValue.toString() : '0')}
          precision={1}
          size="large"
        />
      </Box>

      <TextField
        fullWidth
        label="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        margin="normal"
        required
        multiline
        rows={4}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Publier mon avis'}
      </Button>
    </Box>
  );
};

export default ReviewForm;
