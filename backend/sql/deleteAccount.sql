DELETE FROM Account WHERE id = $1 RETURNING id, display_name, username;
