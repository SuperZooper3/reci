import { Router } from 'express';
import { getAccount, deleteAccount, getAccounts, getAccountMe, createAccount, getAccountsFollowing, getAccountsFollowers, addAccountFollowing } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.get('/me', getAccountMe);
accountRouter.get('/:id', getAccount);
accountRouter.post('/create', createAccount);
accountRouter.delete('/me/delete', deleteAccount);
accountRouter.get('/:id/following', getAccountsFollowing);
accountRouter.get('/:id/followers', getAccountsFollowers);
accountRouter.post('/:id/following/:followingAccountId', addAccountFollowing);
accountRouter.post('/me/follow', addAccountFollowing);

export default accountRouter;
