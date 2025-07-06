import { hashPassword, signJWT, comparePassword } from "../utils/auth.js"
import { createAccount, getAccountByUsername } from "../models/accountModel.js"
import { AccountError, AccountErrorStrings } from '../errors.js';

export const createAccountService = async (display_name: string, username: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    const { id } = await createAccount(display_name, username, hashedPassword)
    return signJWT(id, display_name, username);
};

export const loginAccountService = async (username: string, password: string) => {
    const account = await getAccountByUsername(username);

    if (!account) {
        throw new AccountError(AccountErrorStrings.NoAccount);
    }

    if (await comparePassword(account.password, password)) {
        return signJWT(account.id, account.display_name, account.username);
    }

    throw new AccountError(AccountErrorStrings.BadPassword);
};
