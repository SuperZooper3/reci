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

export const addReview = async (req: Request, res: Response) => {
  try {
    const review = req.body;
    await reviewModel.addReview(review);
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review', error);
    res.status(500).json({ message: 'Internal server error' });
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
    const reviews = await reviewModel.getReviewsByAccountId(account_id);
    res.json(reviews);
  } catch(error) {
    console.error('Error fetching reviews by account id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

