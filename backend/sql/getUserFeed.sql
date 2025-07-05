SELECT * 
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
JOIN Account ON Review.account_id = Account.id
LEFT JOIN Follower ON 
    Follower.followee_id = Review.account_id AND 
    Follower.follower_id = $1
ORDER BY followee_id DESC, Review.created_at DESC;
