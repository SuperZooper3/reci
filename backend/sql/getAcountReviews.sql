SELECT *
FROM Review
JOIN Account ON Review.account_id = Account.id
WHERE Review.id = $1
