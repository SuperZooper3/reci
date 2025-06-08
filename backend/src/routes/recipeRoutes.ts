import { Router } from 'express';
import { getRecipesByAccountId } from '../controllers/recipeController.js';

const recipeRouter = Router();

recipeRouter.get('/:accountId', getRecipesByAccountId);

export default recipeRouter;
