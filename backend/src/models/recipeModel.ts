import { loadSQL } from '../utils/sqlLoader.js';
import { Recipe, RecipeInput } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"
import { query } from "../utils/query.js"

export async function getRecipeById (recipe_id: number): Promise<Recipe> {
  const getRecipeByIdSQL = await loadSQL('getRecipe.sql');
  const result = await query<Recipe>(getRecipeByIdSQL, [recipe_id]);
  saveQueryResult("getRecipe", result);
  return result.rows[0];
};

export async function getAccountRecipes (account_id: number): Promise<Recipe[]> {
  const getRecipesFromAccountSQL = await loadSQL('getAccountRecipes.sql');
  const result = await query<Recipe>(getRecipesFromAccountSQL, [account_id]);
  saveQueryResult("getAccountRecipes", result);
  return result.rows;
};

export async function addRecipe (recipe: RecipeInput): Promise<void> {
  const addRecipeSQL = await loadSQL('addRecipe.sql');
  const result = await query(addRecipeSQL, [recipe.title, recipe.body, recipe.author_id]);
  saveQueryResult("addRecipe", result);
  return;
};

export async function getRecipes (searchTerm: string | null): Promise<Recipe[]> {
  const getRecipesSQL = await loadSQL('filterRecipes.sql');
  // If the searchTerm query param is omitted, this just filters by '%', matching all recipes. Otherwise, it uses the searchTerm
  const result = await query<Recipe>(getRecipesSQL, [searchTerm == null ? '%' : `%${searchTerm}%`]);
  saveQueryResult("filterRecipes", result);
  return result.rows;
};

export async function getAccountSavedRecipes (account_id: number): Promise<Recipe[]> {
  const getAccountSavedRecipes = await loadSQL('getAccountSavedRecipes.sql');
  const result = await query<Recipe>(getAccountSavedRecipes, [account_id]);
  saveQueryResult("getAccountSavedRecipes", result);
  return result.rows;
};

export async function addSavedRecipe (id: number, recipe_id: number): Promise<void> {
  const addSavedRecipe = await loadSQL('addSavedRecipe.sql');
  const result = await query(addSavedRecipe, [id, recipe_id]);
  saveQueryResult("addSavedRecipe", result);
  return;
};

export async function deleteRecipe (id: number, account_id: number): Promise<void> {
  const deleteRecipe = await loadSQL('deleteRecipe.sql');
  const result = await query(deleteRecipe, [id, account_id]);
  saveQueryResult("deleteRecipe", result);
  return;
};

export async function deleteSavedRecipe (id: number, account_id: number): Promise<void> {
  const deleteSavedRecipe = await loadSQL('deleteSavedRecipe.sql');
  const result = await query(deleteSavedRecipe, [id, account_id]);
  saveQueryResult("deleteSavedRecipe", result);
  return;
};
