SELECT display_name, username, followed_at
FROM Follower
JOIN Account ON Follower.followee_id = Account.id
WHERE Follower.follower_id = $1;
