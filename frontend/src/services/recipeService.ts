import type { Recipe, RecipeInput } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/recipes';

export async function addRecipe(recipe: RecipeInput): Promise<void> {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(recipe)
  });
  
  if (!res.ok) {
    throw new Error('Failed to add recipe');
  }
}

export async function filterRecipes(searchTerm?: string): Promise<Recipe[]> {
  const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';

  const res = await fetch(`${BASE_URL}${query}`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error('Failed to return filtered recipes');
  }
  return res.json();
}

export async function getRecipesFromAccount(accountId: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/account/${accountId}`, {
    credentials: "include"
  });
  
  if (!res.ok) {
    throw new Error('Failed to return recipes from an account');
  }
  return res.json();
}

export async function getRecipe(recipeId: string): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/${recipeId}`, {
    credentials: "include"
  });
  
  if (!res.ok) {
    throw new Error('Failed to return information for the recipe');
  }
  return res.json();
}

export async function getSavedRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/saved`, {
    credentials: "include",
  });
  
  if (!res.ok) {
    throw new Error('Failed to return saved recipes');
  }
  return res.json();
}
