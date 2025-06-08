SELECT username, created_at
FROM Account
WHERE Account.id = $1;
