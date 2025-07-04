import { Router } from 'express';
import { getAccount, deleteAccount, getAccounts, getAccountMe, createAccount, getAccountsFollowing, getAccountsFollowers, addAccountFollowing, deleteAccountFollow, loginAccount } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', getAccounts);
accountRouter.get('/me', getAccountMe);
accountRouter.get('/:id', getAccount);
accountRouter.post('/create', createAccount);
accountRouter.post('/login', loginAccount);
accountRouter.delete('/me', deleteAccount);
accountRouter.delete('/me/follow', deleteAccountFollow);
accountRouter.get('/:id/following', getAccountsFollowing);
accountRouter.get('/:id/followers', getAccountsFollowers);
accountRouter.post('/me/follow', addAccountFollowing);

export default accountRouter;
