SELECT 
    (SELECT COUNT(*) FROM Follower WHERE Follower.followee_id = $1) AS follower_count,
    (SELECT COUNT(*) FROM SavedRecipe WHERE SavedRecipe.account_id = $1) AS savedRecipe_count,
    (SELECT COUNT(*) FROM Review WHERE Review.account_id = $1) AS review_count,
    (SELECT COUNT(*) FROM Recipe WHERE Recipe.author_id = $1) AS recipe_count,
    (SELECT COUNT(*) FROM Follower WHERE Follower.follower_id = $1) AS following_count,
    (SELECT created_at FROM Account WHERE Account.id = $1) AS member_since;