import type { Recipe, Review } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/recipes';

export async function filterRecipes(searchTerm?: string): Promise<Recipe[]> {
  const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';

  const res = await fetch(`${BASE_URL}${query}`);

  if (!res.ok) {
    throw new Error('Failed to return filtered recipes');
  }
  return res.json();
}

export async function getRecipesFromAccount(accountId: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/account/${accountId}`);
  
  if (!res.ok) {
    throw new Error('Failed to return recipes from an account');
  }
  return res.json();
}

export async function getRecipeRatings(recipeId: string): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/rating/${recipeId}`);
  
  if (!res.ok) {
    throw new Error('Failed to return ratings for this recipe');
  }
  return res.json();
}
