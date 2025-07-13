import { Router } from 'express';
import * as accountController from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', accountController.getAccounts);
accountRouter.get('/me', accountController.getAccountMe);
accountRouter.get('/:id', accountController.getAccount);
accountRouter.post('/create', accountController.createAccount);
accountRouter.post('/login', accountController.loginAccount);
accountRouter.delete('/me', accountController.deleteAccount);
accountRouter.delete('/me/follow', accountController.deleteAccountFollow);
accountRouter.get('/:id/following', accountController.getAccountsFollowing);
accountRouter.get('/:id/followers', accountController.getAccountsFollowers);
accountRouter.post('/me/follow', accountController.addAccountFollowing);
accountRouter.get('/:id/metrics', accountController.getUserMetrics);
accountRouter.get('/follow/status/:id', accountController.getFollowStatus);

export default accountRouter;
