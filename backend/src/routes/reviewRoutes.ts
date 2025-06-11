import { Router } from 'express';
import { getReviewsByRecipeId } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/:recipeId', getReviewsByRecipeId);

export default reviewRouter;
