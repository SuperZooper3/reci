import { loadSQL } from '../utils/sqlLoader.js';
import { Account, AccountInfo, DisplayName, FollowAccountInfo, UserMetrics } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"
import { query } from "../utils/query.js"

export async function getAccountNames(): Promise<Array<DisplayName>> {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const result = await query<{ display_name: string }>(getAccountNamesSQL);
  saveQueryResult("getAccountNames", result);
  return result.rows;
}

export async function getAccount(id: number): Promise<AccountInfo | null>
 {
  const getAccountSQL = await loadSQL('getAccount.sql');
  const result = await query<AccountInfo>(getAccountSQL, [id]);
  saveQueryResult("getAccount", result);
  return result.rows[0] ?? null;
}

export async function getAccountByUsername(username: string): Promise<Account | null>
 {
  const getAccountByUsernameSQL = await loadSQL('getAccountByUsername.sql');
  const result = await query<Account>(getAccountByUsernameSQL, [username]);
  saveQueryResult("getAccountByUsername", result);
  return result.rows[0] ?? null;
}

export async function createAccount(display_name: string, username: string, hashedPassword: string): Promise<{ id: number, display_name: string, username: string }> {
  const createAccountSQL = await loadSQL('createAccount.sql');
  const result = await query<{ id: number, display_name: string, username: string }>(createAccountSQL, [display_name, username, hashedPassword]);
  saveQueryResult("createAccount", result);
  return { ...result.rows[0] };
}

export async function deleteAccount(id: number): Promise<void> {
  const deleteAccountSQL = await loadSQL('deleteAccount.sql');
  const result = await query(deleteAccountSQL, [id]);
  saveQueryResult("deleteAccount", result);
  return;
}

export async function getAccountPassword(id: number): Promise<{ password: string }[]> {
  const getPasswordSQL = await loadSQL('getAccountPassword.sql');
  const result = await query<{ password: string }>(getPasswordSQL, [id]);
  saveQueryResult("getAccountPassword", result);
  return result.rows;
}

export async function getAccountsFollowing(id: number): Promise<FollowAccountInfo[]> {
  const getAccountsFollowingSQL = await loadSQL('getAccountsFollowing.sql');
  const result = await query<FollowAccountInfo>(getAccountsFollowingSQL, [id]);
  saveQueryResult("getAccountsFollowing", result);
  return result.rows;
};

export async function getAccountsFollowers(id: number): Promise<FollowAccountInfo[]> {
  const getAccountsFollowersSQL = await loadSQL('getAccountsFollowers.sql');
  const result = await query<FollowAccountInfo>(getAccountsFollowersSQL, [id]);
  saveQueryResult("getAccountsFollowers", result);
  return result.rows;
};

export async function addAccountFollowing(account_id: number, following_account_id: number): Promise<void> {
  const addAccountFollowing = await loadSQL('addAccountFollowing.sql');
  const result = await query(addAccountFollowing, [account_id, following_account_id]);
  saveQueryResult("addAccountFollowing", result);
  return;
};

export async function deleteAccountFollow(account_id: number, following_account_id: number): Promise<void> {
  const deleteAccountFollow = await loadSQL('deleteAccountFollowing.sql');
  const result = await query(deleteAccountFollow, [account_id, following_account_id]);
  saveQueryResult("deleteAccountFollowing", result);
  return;
};

export async function getUserMetrics(account_id: number): Promise<UserMetrics> {
  const getUserMetrics = await loadSQL('getUserMetrics.sql');
  const result = await query<UserMetrics>(getUserMetrics, [account_id]);
  saveQueryResult("getUserMetrics", result);
  return result.rows[0];
};

export async function getFollowStatus(followerId: number, followingId: number): Promise<boolean> {
  const getFollowStatus = await loadSQL('getFollowStatus.sql');
  const result = await query<{ count: string }>(getFollowStatus, [followerId, followingId]);
  saveQueryResult("getFollowStatus", result);
  return result.rows.length > 0 && parseInt(result.rows[0].count, 10) > 0;
}