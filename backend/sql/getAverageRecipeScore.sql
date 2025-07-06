SELECT ROUND(AVG(Review.rating::numeric), 1) AS avg
FROM Review
WHERE Review.recipe_id = $1;
