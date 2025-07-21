SELECT Review.*, Recipe.title
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
WHERE Review.account_id = $1
ORDER BY Review.created_at DESC