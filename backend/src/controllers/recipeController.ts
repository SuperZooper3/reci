import { Request, Response } from "express";
import * as recipeModel from '../models/recipeModel.js';
import * as auth from '../utils/auth.js'
import { addAvgRatingToRecipe, addAvgRatingToRecipes } from "src/services/recipeService.js";

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe_id = parseInt(req.params.recipeId, 10);
    const recipe = await addAvgRatingToRecipe(await recipeModel.getRecipeById(recipe_id));
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by id', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRecipesByAccountId = async (req: Request, res:Response) => {
  try{
    const account_id = parseInt(req.params.accountId, 10);
    const accountRecipes = await addAvgRatingToRecipes(await recipeModel.getAccountRecipes(account_id));

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
};

export const getRecipes = async (req: Request, res:Response) => {
  try{
    const searchTerm = req.query.searchTerm as string | null;
    const searchedRecipes = await addAvgRatingToRecipes(await recipeModel.getRecipes(searchTerm));

    res.json(searchedRecipes);
  } catch (error) {
    console.error('Error searching for recipes', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSavedRecipesByAccountId = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
    return
  }
  const { id } = auth.verifyAndReadJWT(jwt);
  try{
    const accountSavedRecipes = await addAvgRatingToRecipes(await recipeModel.getAccountSavedRecipes(id));
    res.json(accountSavedRecipes);
  } catch (error) {
    console.error('Error fetching account\'s saved recipes', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addSavedRecipe = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
    return
  }
  const { id } = auth.verifyAndReadJWT(jwt);
  const recipe_id = req.body.recipe_id;
  try{
    await recipeModel.addSavedRecipe(id, recipe_id);
    res.status(201).json({ message: 'Recipe saved successfully' });
  } catch (error) {
    console.error('Error adding account\'s saved recipes', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
    return
  }
  const { id } = auth.verifyAndReadJWT(jwt);
  const recipe_id = req.body.recipe_id;
  try{
    await recipeModel.deleteRecipe(recipe_id, id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteSavedRecipe = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
    return
  }
  const { id } = auth.verifyAndReadJWT(jwt);
  const recipe_id = req.body.recipe_id;
  try{
    await recipeModel.deleteSavedRecipe(recipe_id, id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;
  if (!jwt) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  
  const { id } = auth.verifyAndReadJWT(jwt);
  const { title } = req.body;
  const recipe_id = parseInt(req.params.recipeId, 10);

  if (!title) {
    res.status(400).json({ message: 'Recipe title is required' });
    return;
  }

  try {
    const updatedRecipe = await recipeModel.updateRecipe(recipe_id, title, id);

    if (!updatedRecipe) {
      res.status(404).json({ message: 'Recipe not found or you are not authorized to update it.' });
      return;
    }
    
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
