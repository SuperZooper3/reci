import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getAccountNames(): Promise<string[]> {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const { rows } = await client.query<{ display_name: string }>(getAccountNamesSQL);
  return rows.map(r => r.display_name);
}
