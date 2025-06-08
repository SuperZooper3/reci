SELECT id, username, display_name, created_at
FROM Account
WHERE Account.id = $1;
