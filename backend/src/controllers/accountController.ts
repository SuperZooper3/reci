import { Request, Response } from 'express';
import * as accountModel from '../models/accountModel.js';

export const getUsers = async (req: Request, res:Response) => {
  try{
    const users = await accountModel.getAccountNames();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user names', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
