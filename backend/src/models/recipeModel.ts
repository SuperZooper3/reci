import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getRecipeById (recipe_id: number): Promise<{ id: number, title: string, body: string, created_at: Date, author_id: number }> {
  const getRecipeByIdSQL = await loadSQL('getRecipeById.sql');
  const { rows } = await client.query(getRecipeByIdSQL, [recipe_id]);
  return rows[0];
};

export async function getAccountRecipes (account_id: number): Promise<{ id: number, title: string, body: string, created_at: Date, author_id: number }[]> {
  const getRecipesFromAccountSQL = await loadSQL('getAccountRecipes.sql')
  const { rows } = await client.query(getRecipesFromAccountSQL, [account_id]);
  return rows;
};

export async function addRecipe (recipe: { title: string, body: string, author_id: number }): Promise<void> {
  const addRecipeSQL = await loadSQL('addRecipe.sql')
  await client.query(addRecipeSQL, [recipe.title, recipe.body, recipe.author_id]);
};
