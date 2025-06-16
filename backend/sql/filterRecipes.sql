(
  SELECT id, title, body, created_at, author_id
  FROM Recipe
  WHERE title ILIKE $1
  ORDER BY created_at DESC
)
UNION ALL
(
  SELECT id, title, body, created_at, author_id
  FROM Recipe
  WHERE body ILIKE $1 AND title NOT ILIKE $1
  ORDER BY created_at DESC
)
LIMIT 10;