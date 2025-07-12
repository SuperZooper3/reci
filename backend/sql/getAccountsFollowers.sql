SELECT display_name, username, followed_at, follower_id AS id
FROM Follower
JOIN Account ON Follower.follower_id = Account.id
WHERE Follower.followee_id = $1
ORDER BY followed_at DESC;
