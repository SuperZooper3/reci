SELECT ROUND(AVG(Review.rating), 1)
FROM Review
WHERE Review.recipe_id = $1;
