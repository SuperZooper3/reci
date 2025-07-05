SELECT Review.*, Account.username 
FROM Review
JOIN Account ON Review.account_id = Account.id
WHERE Review.recipe_id = $1;