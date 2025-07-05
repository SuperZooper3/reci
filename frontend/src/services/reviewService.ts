import type { AvgRating, ReviewInput } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/reviews';

export async function getRecipeAverageRating(recipeId: string): Promise<AvgRating> {
  const res = await fetch(`${BASE_URL}/avgRating/${recipeId}`);
  
  if (!res.ok) {
    throw new Error('Failed to return ratings for this recipe');
  }
  return res.json();
}

export async function addReview(reviewInput: ReviewInput): Promise<void> {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewInput)
  });
  
  if (!res.ok) {
    throw new Error('Failed to add review for this recipe');
  }
}
