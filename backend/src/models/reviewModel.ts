import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getReviewsByRecipeId(recipe_id: number): Promise<{ id: number, created_at: Date, description: string, rating: number, recipe_id: number, account_id: number }[]> {
    const getReviewsByRecipeIdSQL = await loadSQL('getReviewsByRecipeId.sql')
    const { rows } = await client.query(getReviewsByRecipeIdSQL, [recipe_id]);
    return rows;
};
