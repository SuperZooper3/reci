import { Router } from 'express';
import { getAccount, deleteAccount, getAccounts } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.get('/:id', getAccount);
accountRouter.delete('/:id', deleteAccount);

export default accountRouter;
