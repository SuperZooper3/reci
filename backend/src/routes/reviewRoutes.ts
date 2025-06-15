import { Router } from 'express';
import { getReviewsByRecipeId, addReview, getRecipeAverageScore } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/:recipeId', getReviewsByRecipeId);
reviewRouter.post('/', addReview);
reviewRouter.get('/rating/:recipeId', getRecipeAverageScore);

export default reviewRouter;
