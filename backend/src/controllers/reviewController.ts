import { Request, Response } from "express";
import * as reviewModel from '../models/reviewModel.js';

export const getReviewsByRecipeId = async (req: Request, res: Response) => {
  try {
    const recipe_id = parseInt(req.params.recipeId, 10);
    const reviews = await reviewModel.getReviewsByRecipeId(recipe_id);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews by recipe id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}