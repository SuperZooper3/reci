import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { Recipe, RecipeInput } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"

export async function getRecipeById (recipe_id: number): Promise<Recipe> {
  const getRecipeByIdSQL = await loadSQL('getRecipe.sql');
  const { rows } = await client.query(getRecipeByIdSQL, [recipe_id]);
  saveQueryResult("getRecipe", rows);
  return rows[0];
};

export async function getAccountRecipes (account_id: number): Promise<Recipe[]> {
  const getRecipesFromAccountSQL = await loadSQL('getAccountRecipes.sql');
  const { rows } = await client.query(getRecipesFromAccountSQL, [account_id]);
  saveQueryResult("getAccountRecipes", rows);
  return rows;
};

export async function addRecipe (recipe: RecipeInput): Promise<void> {
  const addRecipeSQL = await loadSQL('addRecipe.sql');
  const { rows } = await client.query(addRecipeSQL, [recipe.title, recipe.body, recipe.author_id]);
  saveQueryResult("addRecipe", rows);
  return;
};

export async function getRecipes (searchTerm: string | null): Promise<Recipe[]> {
  const getRecipesSQL = await loadSQL('filterRecipes.sql');
  const { rows } = await client.query(getRecipesSQL, [searchTerm == null ? '%' : `%${searchTerm}%`]);
  saveQueryResult("filterRecipes", rows);
  return rows;
};
