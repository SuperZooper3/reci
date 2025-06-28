SELECT r.id, r.title, r.body, r.created_at, r.author_id, a.display_name, a.username, sr.saved_at
FROM SavedRecipe sr
JOIN Recipe r ON sr.recipe_id = r.id
JOIN Account a on r.author_id = a.id
WHERE sr.account_id = $1
ORDER BY sr.saved_at DESC;
