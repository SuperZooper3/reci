WITH followed_reviews AS (
    SELECT 
        description, Review.id, Review.created_at, rating, recipe_id, 
        Recipe.title, account_id, Account.display_name, Account.username
    FROM Review 
    JOIN Recipe ON Review.recipe_id = Recipe.id
    JOIN Account ON Review.account_id = Account.id
    JOIN Follower ON 
        Follower.followee_id = Review.account_id AND 
        Follower.follower_id = $1
    ORDER BY Review.created_at DESC
    LIMIT 20
),
unfollowed_reviews AS (
    SELECT 
        description, Review.id, Review.created_at, rating, recipe_id, 
        Recipe.title, account_id, Account.display_name, Account.username
    FROM Review 
    JOIN Recipe ON Review.recipe_id = Recipe.id
    JOIN Account ON Review.account_id = Account.id
    WHERE NOT EXISTS (
        SELECT 1 
        FROM Follower 
        WHERE Follower.followee_id = Review.account_id 
          AND Follower.follower_id = $1
    )
    ORDER BY Review.created_at DESC
    LIMIT 20
)
SELECT * FROM followed_reviews
UNION ALL
SELECT * FROM unfollowed_reviews;
