import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { Review, ReviewInput } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"

export async function getReviewsByRecipeId(recipe_id: number): Promise<Review[]> {
    const getReviewsByRecipeIdSQL = await loadSQL('getReviewsByRecipe.sql');
    const { rows } = await client.query(getReviewsByRecipeIdSQL, [recipe_id]); 
    saveQueryResult("getReviewsByRecipe", rows);
    return rows;
};

export async function addReview(review: ReviewInput): Promise<void> {
    const addReviewSQL = await loadSQL('addReview.sql');
    const { rows } = await client.query(addReviewSQL, [review.description, review.rating, review.recipe_id, review.account_id]);
    saveQueryResult("addReview", rows);
    return;
};

export async function deleteReview(reviewID: number, accountID: number): Promise<void> {
    const deleteReviewSQL = await loadSQL('deleteReview.sql');
    const { rows } = await client.query(deleteReviewSQL, [reviewID, accountID]);
    saveQueryResult("deleteReview", rows);
    return;
};

export async function getRecipeAverageScore (recipe_id: number): Promise<number | null> {
  const getAverageRecipeScoreSQL = await loadSQL('getAverageRecipeScore.sql');
  const { rows } = await client.query(getAverageRecipeScoreSQL, [recipe_id]);
  saveQueryResult("getAverageRecipeScore", rows);
  return rows[0];
};

export async function getReviewsByAccountId(account_id: number): Promise<Review[]> {
  const getReviewsByAccountIdSQL = await loadSQL('getAccountReviews.sql');
  const { rows } = await client.query(getReviewsByAccountIdSQL, [account_id]);
  saveQueryResult("getReviewsByAccountId", rows);
  return rows;
}
