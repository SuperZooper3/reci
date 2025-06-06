import { Router } from 'express';
import { getUsers } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getUsers);

export default accountRouter;
