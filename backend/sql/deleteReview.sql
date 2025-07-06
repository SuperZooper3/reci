DELETE FROM Review 
WHERE id = $1 AND account_id = $2;