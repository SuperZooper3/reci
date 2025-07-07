import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { Account, AccountInfo, DisplayName, FollowAccountInfo } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"

export async function getAccountNames(): Promise<Array<DisplayName>> {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const { rows } = await client.query<{ display_name: string }>(getAccountNamesSQL);
  saveQueryResult("getAccountNames", rows);
  return rows;
}

export async function getAccount(id: number): Promise<AccountInfo | null>
 {
  const getAccountSQL = await loadSQL('getAccount.sql');
  const { rows } = await client.query<AccountInfo>(getAccountSQL, [id]);
  saveQueryResult("getAccount", rows);
  return rows[0] ?? null;
}

export async function getAccountByUsername(username: string): Promise<Account | null>
 {
  const getAccountByUsernameSQL = await loadSQL('getAccountByUsername.sql');
  const { rows } = await client.query<Account>(getAccountByUsernameSQL, [username]);
  saveQueryResult("getAccountByUsername", rows);
  return rows[0] ?? null;
}

export async function createAccount(display_name: string, username: string, hashedPassword: string): Promise<{ id: number, display_name: string, username: string }> {
  const createAccountSQL = await loadSQL('createAccount.sql');
  const { rows } = await client.query<{ id: number, display_name: string, username: string }>(createAccountSQL, [display_name, username, hashedPassword]);
  saveQueryResult("createAccount", rows);
  return { ...rows[0] };
}

export async function deleteAccount(id: number): Promise<void> {
  const deleteAccountSQL = await loadSQL('deleteAccount.sql');
  const { rows } = await client.query(deleteAccountSQL, [id]);
  saveQueryResult("deleteAccount", rows);
  return;
}

export async function getAccountPassword(id: number): Promise<{ password: string }[]> {
  const getPasswordSQL = await loadSQL('getAccountPassword.sql');
  const { rows } = await client.query<{ password: string }>(getPasswordSQL, [id]);
  saveQueryResult("getAccountPassword", rows);
  return rows;
}

export async function getAccountsFollowing(id: number): Promise<FollowAccountInfo[]> {
  const getAccountsFollowingSQL = await loadSQL('getAccountsFollowing.sql');
  const { rows } = await client.query<FollowAccountInfo>(getAccountsFollowingSQL, [id]);
  saveQueryResult("getAccountsFollowing", rows);
  return rows;
};

export async function getAccountsFollowers(id: number): Promise<FollowAccountInfo[]> {
  const getAccountsFollowersSQL = await loadSQL('getAccountsFollowers.sql');
  const { rows } = await client.query<FollowAccountInfo>(getAccountsFollowersSQL, [id]);
  saveQueryResult("getAccountsFollowers", rows);
  return rows;
};

export async function addAccountFollowing(account_id: number, following_account_id: number): Promise<void> {
  const addAccountFollowing = await loadSQL('addAccountFollowing.sql');
  await client.query(addAccountFollowing, [account_id, following_account_id]);
  return;
};

export async function deleteAccountFollow(account_id: number, following_account_id: number): Promise<void> {
  const deleteAccountFollow = await loadSQL('deleteAccountFollowing.sql');
  await client.query(deleteAccountFollow, [account_id, following_account_id]);
  return;
};

export async function getFollowerCount(account_id: number): Promise<number> {
  const getFollowerCount = await loadSQL('getFollowerCount.sql');
  const { rows } = await client.query(getFollowerCount, [account_id]);
  return rows[0];
};

export async function getFolloweeCount(account_id: number): Promise<number> {
  const getFolloweeCount = await loadSQL('getFolloweeCount.sql');
  const { rows } = await client.query(getFolloweeCount, [account_id]);
  return rows[0];
};
