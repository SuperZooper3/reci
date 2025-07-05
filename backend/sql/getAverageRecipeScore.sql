SELECT ROUND(AVG(Review.rating::numeric), 1)
FROM Review
WHERE Review.recipe_id = $1;
