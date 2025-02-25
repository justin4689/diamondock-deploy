export const fetchReviews = async (slug: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/review/${slug}`);

    if (!response.ok) {
      if (response.status === 404) {
        return []; // Retourne un tableau vide si aucun avis n'est trouvé
      }
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reviews || []; // Assure que la fonction retourne toujours un tableau
  } catch (error) {
    console.error(error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};


 

export interface CreateReviewPayload {
  title: string;
  comment: string;
  rating: string;
  product_id: string;
}

interface ReviewResponse {
  success: string;
  review?: {
    id: string;
    title: string;
    comment: string;
    rating: string;
    product_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  status: string;
}

export const createReview = async (reviewData: CreateReviewPayload, accessToken: string): Promise<ReviewResponse> => {

  console.log(reviewData)
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (response.status === 400) {
    throw new Error(data.success);
  }

  return data;
};