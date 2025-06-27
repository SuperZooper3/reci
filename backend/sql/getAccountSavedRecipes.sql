SELECT id, saved_at, account_id, recipe_id
FROM SavedRecipe
JOIN Recipe ON SavedRecipe.recipe_id = Recipe.id
WHERE SavedRecipe.account_id = $1
ORDER BY SavedRecipe.saved_at DESC;
