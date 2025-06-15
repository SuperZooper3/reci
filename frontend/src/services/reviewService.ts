import type { AvgRating } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/reviews';

export async function getRecipeAverageRating(recipeId: string): Promise<AvgRating> {
  const res = await fetch(`${BASE_URL}/avgRating/${recipeId}`);
  
  if (!res.ok) {
    throw new Error('Failed to return ratings for this recipe');
  }
  return res.json();
}
