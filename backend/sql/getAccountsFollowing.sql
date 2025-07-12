SELECT display_name, username, followed_at, followee_id AS id
FROM Follower
JOIN Account ON Follower.followee_id = Account.id
WHERE Follower.follower_id = $1
ORDER BY followed_at DESC;
