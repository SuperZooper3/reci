SELECT Recipe.*, Account.username 
FROM Recipe
LEFT JOIN Account ON Recipe.author_id = Account.id
WHERE Recipe.id = $1;
