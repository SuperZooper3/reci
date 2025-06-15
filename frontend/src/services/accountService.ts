import type { DisplayName } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/accounts';

export async function getAccounts(): Promise<DisplayName[]> {
    const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error('Failed to return accounts');
  }
    return res.json();
  };