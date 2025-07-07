import { Router } from 'express';
import { getReviewsByRecipeId, addReview, getRecipeAverageScore, getReviewsByAccountId, deleteReview, deleteReviewImage } from '../controllers/reviewController.js';

const reviewRouter = Router();

reviewRouter.get('/recipe/:recipeId', getReviewsByRecipeId);
reviewRouter.post('/', addReview);
reviewRouter.delete('/', deleteReview);
reviewRouter.get('/avgRating/:recipeId', getRecipeAverageScore);
reviewRouter.get('/account/:accountId', getReviewsByAccountId);
reviewRouter.delete('/:id/image/:image_id', deleteReviewImage);

export default reviewRouter;
