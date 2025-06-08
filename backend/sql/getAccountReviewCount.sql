SELECT Count(*)
FROM Review
WHERE Review.account_id = $1;
