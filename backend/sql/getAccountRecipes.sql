SELECT Recipe.id, title, body, Recipe.created_at, author_id, display_name
FROM Recipe
JOIN Account ON Recipe.author_id = Account.id
WHERE Recipe.author_id = $1
ORDER BY Recipe.created_at DESC;
