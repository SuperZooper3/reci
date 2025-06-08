import { Request, Response } from "express";
import * as recipeModel from '../models/recipeModel.js';

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
