SELECT display_name, username, followed_at
FROM Follower
JOIN Account ON Follower.follower_id = Account.id
WHERE Follower.followee_id = $1;
