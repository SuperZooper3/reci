import { Router } from 'express';
import { getReviewsByRecipeId, addReview, getRecipeAverageScore } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/recipe/:recipeId', getReviewsByRecipeId);
reviewRouter.post('/', addReview);
reviewRouter.get('/avgRating/:recipeId', getRecipeAverageScore);

export default reviewRouter;
