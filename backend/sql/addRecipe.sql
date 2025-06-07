INSERT INTO Recipe
(title, body, created_at, author_id)
VALUES
($1, $2, NOW(), $3);
