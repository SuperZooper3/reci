INSERT INTO Account
(display_name, username, password)
VALUES
($1, $2, $3)
RETURNING id, display_name, username;
