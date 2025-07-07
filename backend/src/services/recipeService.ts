import { getRecipeAverageScore } from "src/models/reviewModel.js";
import { Recipe } from "../../../shared-types/recipeTypes.js";

export async function addAvgRatingToRecipe(recipe: Recipe): Promise<Recipe> {
    return {
        ...recipe,
        avg: recipe.avg = (await getRecipeAverageScore(recipe.id))?.avg
    };
};

export async function addAvgRatingToRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    return await Promise.all(recipes.map(async recipe => (addAvgRatingToRecipe(recipe))));
};