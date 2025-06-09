import { Request, Response } from 'express';
import * as accountModel from '../models/accountModel.js';
import * as accountService from '../services/accountService.js'

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


export const createAccount = async (req: Request, res: Response) => {
  const username = req.body.username;
  const display_name = req.body.display_name;

  if (!username || !display_name) {
    res.status(400).json({ message: 'Missing username or display_name' });
    return;
  }

  const password = req.body.password;

  if (!password) {
    res.status(400).json({ message: 'Missing password' });
    return;
  }

  try {
    const jwt = await accountService.createAccountService(display_name, username, password);
    res.status(201).cookie('authToken', jwt).send();
  } catch (error) {
    // TODO: do custom error validation for username clashes
    console.error('Error creating account', error);
    res.status(500).json({ message: 'Error creating your account' });
  }
};

// TODO: add an auth check to delete the account
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