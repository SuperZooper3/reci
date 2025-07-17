import type { AvgRating, Review, ReviewInput } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/reviews';

export async function getRecipeAverageRating(recipeId: string): Promise<AvgRating> {
  const res = await fetch(`${BASE_URL}/avgRating/${recipeId}`, {
    credentials: "include"
  });
  
  if (!res.ok) {
    throw new Error('Failed to return average rating for this recipe');
  }
  return res.json();
}

export async function getRecipeRatings(recipeId: string): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/recipe/${recipeId}`, {
    credentials: "include"
  });

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
    credentials: "include",
    body: JSON.stringify(reviewInput)
  });
  
  if (!res.ok) {
    throw new Error('Failed to add review for this recipe');
  }
}

export async function getReviewsByAccount(accountId: string): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/account/${accountId}`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error('Failed to return reviews for this account');
  }
  return res.json();
}
