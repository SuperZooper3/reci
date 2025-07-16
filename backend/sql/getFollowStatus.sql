SELECT EXISTS (
SELECT 1
FROM Follower
WHERE follower_id = $1
AND followee_id = $2
);