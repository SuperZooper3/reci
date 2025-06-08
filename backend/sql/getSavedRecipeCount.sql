SELECT Count(*)
FROM Recipe
WHERE Recipe.account_id = $1;
