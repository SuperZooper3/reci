import { Router } from 'express';
import { getReviewsByRecipeId, addReview, getRecipeAverageScore, getReviewsByAccountId } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/:recipeId', getReviewsByRecipeId);
reviewRouter.post('/', addReview);
reviewRouter.get('/avgRating/:recipeId', getRecipeAverageScore);
reviewRouter.get('/account/:accountId', getReviewsByAccountId);

export default reviewRouter;
