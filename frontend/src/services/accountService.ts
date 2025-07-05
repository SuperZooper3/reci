import type { DisplayName, FollowAccountInfo, AccountInfo } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/accounts';

export async function getAccounts(): Promise<DisplayName[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error('Failed to return accounts');
  }
    return res.json();
  };

export async function getAccount(id: string): Promise<AccountInfo> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error('Failed to return account');
  }
    return res.json();
  };

export async function getAccountsFollowing(accountId: string) : Promise<FollowAccountInfo[]> {
  const res = await fetch(`${BASE_URL}/${accountId}/following`);

  if (!res.ok) {
    throw new Error('Failed to return accounts following');
  }
  return res.json();

};

export async function getAccountsFollowers(accountId: string) : Promise<FollowAccountInfo[]> {
  const res = await fetch(`${BASE_URL}/${accountId}/followers`);

  if (!res.ok) {
    throw new Error('Failed to return accounts following');
  }
  return res.json();

};