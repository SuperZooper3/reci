SELECT Avg(Review.rating)
FROM Review
WHERE Review.recipe_id = $1;
