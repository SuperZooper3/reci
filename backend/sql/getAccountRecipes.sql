SELECT id, title, body, created_at, author_id
FROM Recipe
WHERE Recipe.author_id = $1
ORDER BY Recipe.created_at DESC;
