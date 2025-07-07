SELECT Recipe.*, Account.display_name 
FROM Recipe
LEFT JOIN Account ON Recipe.author_id = Account.id
WHERE Recipe.id = $1;
