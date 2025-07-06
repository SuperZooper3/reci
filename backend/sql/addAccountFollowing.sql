INSERT INTO Follower
(follower_id, followee_id, followed_at)
VALUES
($1, $2, NOW());
