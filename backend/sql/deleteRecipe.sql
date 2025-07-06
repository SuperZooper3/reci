DELETE FROM Recipe
WHERE id = $1 AND author_id = $2;
