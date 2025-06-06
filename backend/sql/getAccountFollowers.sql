SELECT display_name, username
FROM Follower
JOIN Account ON Follower.follower_id = Account.id
WHERE Follower.followee_id = $1;
