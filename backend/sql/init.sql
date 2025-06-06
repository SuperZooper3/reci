CREATE TABLE IF NOT EXISTS "User"(
    id INT NOT NULL,
    name TEXT NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS Recipe(
    id INT,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    created_at DATE NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(author_id) REFERENCES "User"(id)
);
CREATE TABLE IF NOT EXISTS Review(
    id INT,
    created_at DATE NOT NULL,
    description VARCHAR NOT NULL,
    rating float NOT NULL CHECK(rating >= 0 AND rating <= 10),
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
    FOREIGN KEY(user_id) REFERENCES "User"(id)
);
CREATE TABLE IF NOT EXISTS Follower(
    id INT NOT NULL,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS SavedRecipes(
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES "User"(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
);

INSERT INTO "User" VALUES (
    0,
    'Bill',
    'bill',
    'bill'
),
(
    1,
    'Russell',
    'bill',
    'bill'
);
