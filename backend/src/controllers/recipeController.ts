import { Request, Response } from "express";
import * as recipeModel from '../models/recipeModel.js';

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe_id = parseInt(req.params.recipeId, 10);
    const recipe = await recipeModel.getRecipeById(recipe_id);
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getRecipesByAccountId = async (req: Request, res:Response) => {
  try{
    const account_id = parseInt(req.params.accountId, 10);
    const accountRecipes = await recipeModel.getAccountRecipes(account_id);
    res.json(accountRecipes);
  } catch (error) {
    console.error('Error fetching account\'s recipes', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = req.body;
    await recipeModel.addRecipe(recipe);
    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (error) {
    console.error('Error adding recipe', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}