drop table if exists SavedRecipe;
drop table if exists Follower;
drop table if exists ReviewImage;
drop table if exists Review;
drop table if exists Recipe;
drop table if exists Account;


CREATE TABLE IF NOT EXISTS Account(
    id SERIAL,
    display_name VARCHAR NOT NULL,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Recipe(
    id SERIAL,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id INT,
    PRIMARY KEY(id),
    -- If the author's account is deleted, their recipes should persist
    FOREIGN KEY(author_id) REFERENCES Account(id) ON DELETE SET NULL
);

CREATE INDEX recipe_index ON Recipe(author_id);

CREATE TABLE IF NOT EXISTS Review(
    id SERIAL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR NOT NULL,
    rating float NOT NULL CHECK(rating >= 0 AND rating <= 10),
    recipe_id INT NOT NULL,
    account_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
    FOREIGN KEY(account_id) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE INDEX review_index ON Review(account_id, recipe_id);

CREATE TABLE IF NOT EXISTS ReviewImage(
    id SERIAL,
    url VARCHAR NOT NULL,
    alt VARCHAR,
    review_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(review_id) REFERENCES Review(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Follower(
    id SERIAL,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,
    followed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(followee_id) REFERENCES Account(id) ON DELETE CASCADE,
    FOREIGN KEY(follower_id) REFERENCES Account(id) ON DELETE CASCADE,
    CONSTRAINT unique_follower_followee UNIQUE (follower_id, followee_id),
    CHECK (follower_id != followee_id)
);

CREATE TABLE IF NOT EXISTS SavedRecipe(
    id SERIAL,
    account_id INT NOT NULL,
    recipe_id INT NOT NULL,
    saved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(account_id) REFERENCES Account(id) ON DELETE CASCADE,
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
    CONSTRAINT unique_account_id_recipe_id UNIQUE (account_id, recipe_id)
);

CREATE INDEX saved_recipe_index ON SavedRecipe(account_id, recipe_id);

CREATE MATERIALIZED VIEW anon_feed AS
SELECT 
    description, Review.id, Review.created_at, rating, recipe_id, Recipe.title, 
    account_id, Account.display_name, Account.username
FROM Review 
JOIN Recipe ON Review.recipe_id = Recipe.id
JOIN Account ON Review.account_id = Account.id
ORDER BY Review.created_at DESC
LIMIT 40;

-- Required for CONCURRENTLY REFRESH to work caus it enables attomic
-- This prevents other people's connections to the feed from being blocked while it refreshes (would defeat the point!) 
CREATE UNIQUE INDEX idx_anon_feed_id ON anon_feed(id);
