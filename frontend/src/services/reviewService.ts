const BASE_URL = 'http://localhost:3000/api/reviews';

export async function getRecipeAverageRating(recipeId: string): Promise<string | null> {
  const res = await fetch(`${BASE_URL}/avgrating/${recipeId}`);
  
  if (!res.ok) {
    throw new Error('Failed to return ratings for this recipe');
  }
  return res.json();
}
