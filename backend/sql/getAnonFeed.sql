SELECT * FROM anon_feed
ORDER BY created_at DESC; -- needed because materialization doesn't preserve sorting order
