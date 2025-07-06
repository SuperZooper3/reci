import type { DisplayName, FollowAccountInfo, AccountInfo, AccountCreate } from "../../../shared-types";

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

export async function createAccount(accountInfo: AccountCreate) : Promise<void> {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(accountInfo),
  });

  if (!res.ok) {
    throw new Error('Failed to create account');
  }
};

export async function deleteAccount() : Promise<void> {
  const res = await fetch(`${BASE_URL}/me`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error('Failed to delete account');
  }

};

export async function getAccountsFollowers(accountId: string) : Promise<FollowAccountInfo[]> {
  const res = await fetch(`${BASE_URL}/${accountId}/followers`);

  if (!res.ok) {
    throw new Error('Failed to return accounts following');
  }
  return res.json();

};

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username: username,
      password: password,
    })
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }
};