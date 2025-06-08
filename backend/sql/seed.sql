INSERT INTO Account VALUES (
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
),
(
    2,
    'Marco',
    'marco',
    'marco'
);

INSERT INTO Recipe VALUES (
    0,
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
    NOW(),
    2
);

INSERT INTO Review VALUES (
    0,
    NOW(),
    'Amazing. Trallallero Trallallà would love these',
    '10',
    0,
    0
);

INSERT INTO Follower VALUES (
    0,
    0,
    1
),
(
    1,
    2,
    1
),
(
    2,
    2,
    0
);

INSERT INTO SavedRecipe VALUES (
    0,
    0,
    0
);
