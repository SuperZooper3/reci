UPDATE Recipe
SET title = $1
WHERE id = $2 AND author_id = $3
RETURNING *;
