INSERT INTO SavedRecipe
(account_id, recipe_id, saved_at)
VALUES
($1, $2, NOW());
