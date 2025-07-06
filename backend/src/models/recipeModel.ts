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
  // If the searchTerm query param is omitted, this just filters by '%', matching all recipes. Otherwise, it uses the searchTerm
  const { rows } = await client.query(getRecipesSQL, [searchTerm == null ? '%' : `%${searchTerm}%`]);
  saveQueryResult("filterRecipes", rows);
  return rows;
};

export async function getAccountSavedRecipes (account_id: number): Promise<Recipe[]> {
  const getAccountSavedRecipes = await loadSQL('getAccountSavedRecipes.sql');
  const { rows } = await client.query(getAccountSavedRecipes, [account_id]);
  saveQueryResult("getAccountSavedRecipes", rows);
  return rows;
};

export async function addSavedRecipe (id: number, recipe_id: number): Promise<void> {
  const addSavedRecipe = await loadSQL('addSavedRecipe.sql');
  await client.query(addSavedRecipe, [id, recipe_id]);
  return;
};

export async function deleteRecipe (id: number, account_id: number): Promise<void> {
  const deleteRecipe = await loadSQL('deleteRecipe.sql');
  await client.query(deleteRecipe, [id, account_id]);
  return;
};

export async function deleteSavedRecipe (id: number, account_id: number): Promise<void> {
  const deleteSavedRecipe = await loadSQL('deleteSavedRecipe.sql');
  await client.query(deleteSavedRecipe, [id, account_id]);
  return;
};
