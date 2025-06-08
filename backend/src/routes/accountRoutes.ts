import { Router } from 'express';
import { getAccount, getAccounts } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.get('/:id', getAccount);

export default accountRouter;
