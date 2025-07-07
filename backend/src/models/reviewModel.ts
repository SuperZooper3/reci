import { loadSQL } from '../utils/sqlLoader.js';
import { Review, ReviewInput, ReviewImage, AvgRating } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"
import { query } from "../utils/query.js"

export async function getReviewsByRecipeId(recipe_id: number): Promise<Review[]> {
    const getReviewsByRecipeIdSQL = await loadSQL('getReviewsByRecipe.sql');
    const result = await query<Review>(getReviewsByRecipeIdSQL, [recipe_id]); 
    saveQueryResult("getReviewsByRecipe", result);
    return result.rows;
};

export async function addReview(review: ReviewInput): Promise<Review> {
    const addReviewSQL = await loadSQL('addReview.sql');
    const result = await query<Review>(addReviewSQL, [review.description, review.rating, review.recipe_id, review.account_id]);
    saveQueryResult("addReview", result);
    return result.rows[0];
};

export async function deleteReview(reviewID: number, accountID: number): Promise<void> {
    const deleteReviewSQL = await loadSQL('deleteReview.sql');
    const result = await query(deleteReviewSQL, [reviewID, accountID]);
    saveQueryResult("deleteReview", result);
    return;
};

export async function getRecipeAverageScore (recipe_id: number): Promise<AvgRating | null> {
  const getAverageRecipeScoreSQL = await loadSQL('getAverageRecipeScore.sql');
  const result = await query<{avg: number | null}>(getAverageRecipeScoreSQL, [recipe_id]);
  saveQueryResult("getAverageRecipeScore", result);
  return {avg: result.rows[0].avg};
};

export async function getReviewsByAccountId(account_id: number): Promise<Review[]> {
  const getReviewsByAccountIdSQL = await loadSQL('getAccountReviews.sql');
  const result = await query<Review>(getReviewsByAccountIdSQL, [account_id]);
  saveQueryResult("getReviewsByAccountId", result);
  return result.rows;
}

export async function addImagesToReview(review_id: number, images: ReviewImage[]): Promise<void> {
    const addReviewImageSQL = await loadSQL('addReviewImage.sql');
    for (const image of images) { 
      const result = await query(addReviewImageSQL, [image.url, image.alt, review_id]);
      saveQueryResult("addReviewImage", result);
    }
    return;
};

export async function getReviewImagesByID(review_id: number): Promise<ReviewImage[]> {
  const getReviewImagesSQL = await loadSQL('getReviewImages.sql');
  const result = await query<ReviewImage>(getReviewImagesSQL, [review_id]);
  saveQueryResult("getReviewImagesSQLs", result);
  return result.rows;
};
