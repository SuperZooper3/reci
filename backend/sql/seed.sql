INSERT INTO Account (display_name, username, password) VALUES (
    'Bill',
    'bill',
    'bill'
),
(
    'Russell',
    'russel',
    'russel'
),
(
    'Marco',
    'marco',
    'marco'
);

INSERT INTO Recipe (title, body, author_id, created_at) VALUES 
(
    'Cannolu',
    'Cannoli (Cannolu Sicilianu) Recipe

    ## Ingredients

    **Shells**  
    - 2 cups all-purpose flour  
    - 2 tbsp sugar  
    - 1/2 tsp cinnamon  
    - 1/4 tsp salt  
    - 2 tbsp butter  
    - 1 egg  
    - 1/2 cup Marsala wine (or white wine)  
    - 1 egg white (for sealing)  
    - Oil for frying  

    **Filling**  
    - 2 cups ricotta (drained)  
    - 3/4 cup powdered sugar  
    - 1/2 tsp vanilla  
    - Optional: mini chocolate chips, candied orange, pistachios  

    ## Instructions

    **Dough**  
    Mix dry ingredients. Cut in butter. Add egg + wine → knead → rest 30 min.

    **Shells**  
    Roll thin. Cut 4” circles. Wrap on metal tubes, seal w/ egg white. Fry @ 350°F until golden. Cool.

    **Filling**  
    Mix ricotta, sugar, vanilla + add-ins. Chill.

    **Assemble**  
    Fill shells just before serving. Dust w/ powdered sugar, garnish.

    ## Tips  
    - Drain ricotta well.  
    - Fill last minute to keep crisp.  
    - Marsala gives authentic flavor.',
    2,
    '2025-01-01'
),
(
    'Lasagna',
    'I love lasagna',
    2,
    '2025-01-02'
),
(
    'Pasta',
    'Goes well with lasagna',
    2,
    '2025-01-03'
),
(
    'Icecream',
    'It isnt a pasta dish',
    2,
    '2025-01-04'
),
(
    'Mango "Lasagna"',
    'Doesnt mention the special word in the body',
    2,
    '2025-01-05'
),
(
    'Lasagna Ragu',
    'I love this lasagna even more!!!!!',
    2,
    '2025-01-06'
);

INSERT INTO Review (description, rating, recipe_id, account_id) VALUES (
    'Amazing. Trallallero Trallallà would love these',
    '10',
    1,
    1
);

INSERT INTO Follower (follower_id, followee_id) VALUES (
    1,
    2
),
(
    3,
    2
),
(
    3,
    1
);

INSERT INTO SavedRecipe (account_id, recipe_id) VALUES (
    1,
    1
);
