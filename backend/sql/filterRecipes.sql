(
  SELECT Recipe.*, Account.display_name
  FROM Recipe
  LEFT JOIN Account ON Recipe.author_id = Account.id
  WHERE title ILIKE $1
  ORDER BY created_at DESC
)
UNION ALL
(
  SELECT Recipe.*, Account.display_name
  FROM Recipe
  LEFT JOIN Account ON Recipe.author_id = Account.id
  WHERE body ILIKE $1 AND title NOT ILIKE $1
  ORDER BY created_at DESC
)
LIMIT 10;