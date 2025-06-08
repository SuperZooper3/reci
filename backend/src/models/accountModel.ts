import { client } from '../db.js';
import { Account, AccountRow, toAccount } from '../types/account.js';
import { loadSQL } from '../utils/sqlLoader.js';

export async function getAccountNames(): Promise<Account[]> {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const { rows } = await client.query<AccountRow>(getAccountNamesSQL);
  return rows.map(r => toAccount(r));
}
