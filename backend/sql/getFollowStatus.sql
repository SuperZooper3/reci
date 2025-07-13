SELECT COUNT(*)
FROM Follower
WHERE follower_id = $1 AND followee_id = $2
LIMIT 1;