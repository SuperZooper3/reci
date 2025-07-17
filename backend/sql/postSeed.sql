-- After we've seeded, we need to refresh the view so that it can have the data
-- Else, it's just empty
REFRESH MATERIALIZED VIEW CONCURRENTLY anon_feed;
