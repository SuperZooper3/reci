import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { Review, ReviewInput } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"

export async function getReviewsByRecipeId(recipe_id: number): Promise<Review[]> {
    const getReviewsByRecipeIdSQL = await loadSQL('getReview.sql');
    const { rows } = await client.query(getReviewsByRecipeIdSQL, [recipe_id]); 
    saveQueryResult("getReview", rows);
    return rows;
};

export async function addReview(review: ReviewInput): Promise<void> {
    const addReviewSQL = await loadSQL('addReview.sql');
    const { rows } = await client.query(addReviewSQL, [review.description, review.rating, review.recipe_id, review.account_id]);
    saveQueryResult("addReview", rows);
    return;
};
