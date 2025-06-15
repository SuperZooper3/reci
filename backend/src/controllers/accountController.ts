import { Request, Response } from 'express';
import * as accountModel from '../models/accountModel.js';
import * as accountService from '../services/accountService.js'
import * as auth from '../utils/auth.js'

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

export const getAccountMe = async (req: Request, res: Response) => {
  const jwt = req.cookies.authToken;

  if (!jwt) {
    res.status(400).json({ message: 'Missing JWT cookie' });
    return
  }
  
  const { id } = auth.verifyAndReadJWT(jwt);

  try {
    const account = await accountModel.getAccount(id);
    if (!account) {
      res.status(400).json({ message: '"Me" not found :/ Seems you have a valid JWT for a bad account, might have been deleted or data was not seeded in the first place' });
      return;
    }
    res.json(account);
  } catch (error) {
    console.error('Error fetching me account', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const createAccount = async (req: Request, res: Response) => {
  const username = req.body?.username;
  const display_name = req.body?.display_name;
  const password = req.body?.password;

  if (!username || !display_name || !password) {
    res.status(400).json({ message: 'Missing username, display_name or password in the body' });
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

export const getAccountsFollowing = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await accountModel.getAccountFollowing(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error getting accounts following', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};