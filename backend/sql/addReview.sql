INSERT INTO Review
(created_at, description, rating, recipe_id, account_id)
VALUES
(NOW(), $1, $2, $3, $4);
