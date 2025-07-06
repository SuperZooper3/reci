SELECT id, username, display_name, created_at, password
FROM Account
WHERE Account.username = $1;
