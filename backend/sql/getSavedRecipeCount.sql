SELECT Count(*)
FROM SavedRecipe
WHERE SavedRecipe.account_id = $1;
