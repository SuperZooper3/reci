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

export const getAccount = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const account = await accountModel.getAccount(id);
    res.json(account);
  } catch (error) {
    console.error('Error fetching account', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await accountModel.deleteAccount(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting account', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};