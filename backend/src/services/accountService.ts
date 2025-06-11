import { hashPassword, signJWT } from "../utils/auth.js"
import { createAccount } from "../models/accountModel.js"

export const createAccountService = async (display_name: string, username: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    const { id } = await createAccount(display_name, username, hashedPassword)
    return signJWT(id, display_name, username);
};
