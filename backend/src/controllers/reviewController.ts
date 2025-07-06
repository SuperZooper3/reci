import { Request, Response } from "express";
import * as reviewModel from '../models/reviewModel.js';
import { fetchImagesForReviews } from "src/services/reviewService.js";
import { addReviewService } from "src/services/reviewService.js";
import * as auth from '../utils/auth.js'

export const getReviewsByRecipeId = async (req: Request, res: Response) => {
  try {
    const recipe_id = parseInt(req.params.recipeId, 10);
    const reviews = await fetchImagesForReviews(await reviewModel.getReviewsByRecipeId(recipe_id));
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews by recipe id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const addReview = async (req: Request, res: Response) => {
  try {
    const jwt = req.cookies.authToken;
  
    if (!jwt) {
      res.status(400).json({ message: 'Missing JWT cookie' });
      return
    }
    
    const { id } = auth.verifyAndReadJWT(jwt);
    
    const review = req.body;
    await addReviewService({
      account_id: id,
      description: review.description, 
      rating: review.rating,
      recipe_id: review.recipe_id,
      images: review.images
    });

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteReview = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
  }
  try {
    const payload = auth.verifyAndReadJWT(jwt);
    const id = payload.id;

    const review = req.body;
    if (!review.id) {
      res.status(400).json({ message: 'Invalid review data' });
    }

    try {
      await reviewModel.deleteReview(review.id, id);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch {
    res.status(401).json({ message: 'Invalid JWT token' });
  }
}

export const getRecipeAverageScore = async (req: Request, res:Response) => {
  try{
    const recipe_id = parseInt(req.params.recipeId, 10);
    const recipeAvgScore = await reviewModel.getRecipeAverageScore(recipe_id);
    res.json(recipeAvgScore);
  } catch (error){
    console.error('Error fetching reviews average by recipe id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getReviewsByAccountId = async (req: Request, res: Response) => {
  try {
    const account_id = parseInt(req.params.accountId, 10);
    const reviews = await fetchImagesForReviews(await reviewModel.getReviewsByAccountId(account_id));
    res.json(reviews);
  } catch(error) {
    console.error('Error fetching reviews by account id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

