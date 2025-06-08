import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getAccountRecipes (account_id: number): Promise<{ id: number, title: string, body: string, created_at: Date, author_id: number }[]> {
  const getRecipesFromAccountSQL = await loadSQL('getAccountRecipes.sql')
  const { rows } = await client.query(getRecipesFromAccountSQL, [account_id]);
  return rows;
};
