SELECT 
    (SELECT COUNT(*) AS FROM Follower WHERE Follower.followee_id = $1) AS follower_count,
    (SELECT COUNT(*) FROM SavedRecipe WHERE SavedRecipe.account_id = $1) AS savedRecipe_count,
    (SELECT COUNT(*) FROM Follower WHERE Follower.follower_id = $1) AS following_count;
    (SELECT Account.created_at FROM Account WHERE Account.id = $1) AS member_since;