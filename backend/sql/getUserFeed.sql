SELECT description, Review.created_at, rating, recipe_id, Recipe.title, account_id, Account.display_name, Account.username
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
JOIN Account ON Review.account_id = Account.id
LEFT JOIN Follower ON 
    Follower.followee_id = Review.account_id AND 
    Follower.follower_id = $1
ORDER BY followee_id DESC NULLS LAST, Review.created_at DESC;
