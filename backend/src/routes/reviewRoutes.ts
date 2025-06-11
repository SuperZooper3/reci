import { Router } from 'express';
import { getReviewsByRecipeId, addReview } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/:recipeId', getReviewsByRecipeId);
reviewRouter.post('/', addReview);

export default reviewRouter;
