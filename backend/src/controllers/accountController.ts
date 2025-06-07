import { Request, Response } from 'express';
import * as accountModel from '../models/accountModel.js';

export const getAccounts = async (req: Request, res:Response) => {
  try{
    const accountNames = await accountModel.getAccountNames();
    res.json(accountNames);
  } catch (error) {
    console.error('Error fetching account names', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
