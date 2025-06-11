import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { Review } from '../../../shared-types/index.js';

export async function getReviewsByRecipeId(recipe_id: number): Promise<Review[]> {
    const getReviewsByRecipeIdSQL = await loadSQL('getReview.sql')
    const { rows } = await client.query(getReviewsByRecipeIdSQL, [recipe_id]);
    return rows;
};
