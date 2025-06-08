SELECT Count(*)
FROM Follower
WHERE Follower.followee_id = $1;
