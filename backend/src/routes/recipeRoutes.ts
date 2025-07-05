import { Router } from 'express';
import { 
  addRecipe, 
  getRecipeById, 
  getRecipesByAccountId, 
  getRecipes, 
} from '../controllers/recipeController.js';

const recipeRouter = Router();

recipeRouter.get('/recipe/:recipeId', getRecipeById);
recipeRouter.get('/account/:accountId', getRecipesByAccountId);
recipeRouter.post('/', addRecipe);
recipeRouter.get('/', getRecipes);

export default recipeRouter;
