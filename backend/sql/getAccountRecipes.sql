SELECT title, created_at
FROM Recipe
WHERE Recipe.author_id = $1
ORDER BY Recipe.created_at DESC;
