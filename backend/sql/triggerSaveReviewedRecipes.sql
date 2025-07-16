CREATE OR REPLACE FUNCTION autoSaveReviewedRecipes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO SavedRecipe (account_id, recipe_id)
    VALUES (NEW.account_id, NEW.recipe_id)
    ON CONFLICT (account_id, recipe_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER autoSaveReviewedRecipes
AFTER INSERT ON Review
FOR EACH ROW
EXECUTE FUNCTION autoSaveReviewedRecipes();