import { Router } from 'express';
import { addRecipe, getRecipesByAccountId } from '../controllers/recipeController.js';

const recipeRouter = Router();

recipeRouter.get('/:accountId', getRecipesByAccountId);
recipeRouter.post('/', addRecipe);

export default recipeRouter;
