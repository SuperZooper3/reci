SELECT 
    description, Review.id, Review.created_at, rating, recipe_id, Recipe.title, 
    account_id, Account.display_name, Account.username
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
JOIN Account ON Review.account_id = Account.id
ORDER BY Review.created_at DESC
LIMIT 40;
