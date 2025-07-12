DELETE FROM SavedRecipe
WHERE recipe_id = $1 AND account_id = $2;
