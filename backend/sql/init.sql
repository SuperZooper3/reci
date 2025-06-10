drop table if exists SavedRecipe;
drop table if exists Follower;
drop table if exists Review;
drop table if exists Recipe;
drop table if exists Account;


CREATE TABLE IF NOT EXISTS Account(
    id SERIAL,
    display_name TEXT NOT NULL,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Recipe(
    id SERIAL,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- If the author's account is deleted, their recipes should persist
    author_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(author_id) REFERENCES Account(id)
);

CREATE TABLE IF NOT EXISTS Review(
    id SERIAL,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR NOT NULL,
    rating float NOT NULL CHECK(rating >= 0 AND rating <= 10),
    recipe_id INT NOT NULL,
    account_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
    FOREIGN KEY(account_id) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Follower(
    id SERIAL,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(followee_id) REFERENCES Account(id) ON DELETE CASCADE,
    FOREIGN KEY(follower_id) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SavedRecipe(
    id SERIAL,
    account_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(account_id) REFERENCES Account(id) ON DELETE CASCADE,
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
);
