SELECT *
FROM Review
WHERE Review.account_id = $1
ORDER BY Review.created_at DESC;
