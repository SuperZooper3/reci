drop table if exists SavedRecipe;
drop table if exists Follower;
drop table if exists Review;
drop table if exists Recipe;
drop table if exists Accounts;


CREATE TABLE IF NOT EXISTS Accounts(
    id INT NOT NULL,
    display_name TEXT NOT NULL,
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
    FOREIGN KEY(author_id) REFERENCES Accounts(id)
);

CREATE TABLE IF NOT EXISTS Review(
    id INT,
    created_at DATE NOT NULL,
    description VARCHAR NOT NULL,
    rating float NOT NULL CHECK(rating >= 0 AND rating <= 10),
    recipe_id INT NOT NULL,
    account_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
    FOREIGN KEY(account_id) REFERENCES Accounts(id)
);

CREATE TABLE IF NOT EXISTS Follower(
    id INT NOT NULL,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS SavedRecipe(
    account_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY(account_id) REFERENCES Accounts(id),
    FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
);

INSERT INTO Accounts VALUES (
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
