import { Router } from 'express';
import { getAccount, deleteAccount, getAccounts, getAccountMe, createAccount } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.get('/me', getAccountMe);
accountRouter.get('/:id', getAccount);
accountRouter.post('/create', createAccount);
accountRouter.delete('/:id', deleteAccount);

export default accountRouter;
