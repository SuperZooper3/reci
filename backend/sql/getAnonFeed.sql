SELECT * 
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
JOIN Account ON Review.account_id = Account.id
ORDER BY created_at DESC;
