import { Router } from 'express';
import { getAccount, deleteAccount, getAccounts, createAccount } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.post('/create', createAccount);
accountRouter.get('/:id', getAccount);
accountRouter.delete('/:id', deleteAccount);

export default accountRouter;
