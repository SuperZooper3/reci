import { Router } from 'express';
import { getAccounts } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);

export default accountRouter;
