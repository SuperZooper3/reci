import { Router } from 'express';
import { addRecipe, getRecipeById, getRecipesByAccountId } from '../controllers/recipeController.js';

const recipeRouter = Router();

recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.get('/account/:accountId', getRecipesByAccountId);
recipeRouter.post('/', addRecipe);

export default recipeRouter;
