import { Router } from 'express';
import { 
  addRecipe,
  getRecipeById,
  getRecipesByAccountId,
  getRecipes,
  getSavedRecipesByAccountId,
  addSavedRecipe,
  deleteRecipe,
  deleteSavedRecipe
} from '../controllers/recipeController.js';

const recipeRouter = Router();

recipeRouter.get('/saved', getSavedRecipesByAccountId);
recipeRouter.post('/saved', addSavedRecipe);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.get('/account/:accountId', getRecipesByAccountId);
recipeRouter.post('/', addRecipe);
recipeRouter.get('/', getRecipes);
recipeRouter.delete('/', deleteRecipe);
recipeRouter.delete('/saved', deleteSavedRecipe);

export default recipeRouter;
