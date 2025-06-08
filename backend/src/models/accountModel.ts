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

export async function deleteAccount(id: number): Promise<void> {
  const deleteAccountSQL = await loadSQL('deleteAccount.sql');
  await client.query(deleteAccountSQL, [id]);
}