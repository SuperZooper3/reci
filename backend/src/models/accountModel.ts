import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getAccountNames(): Promise<string[]> {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const { rows } = await client.query<{ display_name: string }>(getAccountNamesSQL);
  return rows.map(r => r.display_name);
}

export async function getAccount(id: number): Promise<{ id: number, username: string, display_name: string, created_at: Date }[]> {
  const getAccountSQL = await loadSQL('getAccount.sql');
  const { rows } = await client.query<{ id: number, username: string, display_name: string, created_at: Date }>(getAccountSQL, [id]);
  return rows;
}

export async function createAccount(display_name: string, username: string, hashedPassword: string): Promise<{ id: number, display_name: string, username: string }> {
  const createAccountSQL = await loadSQL('createAccount.sql');
  const { rows } = await client.query<{ id: number, display_name: string, username: string }>(createAccountSQL, [display_name, username, hashedPassword]);
  return { ...rows[0] };
}

export async function deleteAccount(id: number): Promise<void> {
  const deleteAccountSQL = await loadSQL('deleteAccount.sql');
  await client.query(deleteAccountSQL, [id]);
}

export async function getAccountPassword(id: number): Promise<{ password: string }[]> {
  const getPasswordSQL = await loadSQL('getAccountPassword.sql');
  const { rows } = await client.query<{ password: string }>(getPasswordSQL, [id]);
  return rows;
}
