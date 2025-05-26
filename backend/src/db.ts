import { Client } from 'pg';
import { loadSQL } from './utils/sqlLoader';

//Might want to see if there's a better/more reusable way to connect to the db.
export const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password:'postgres',
  database: 'testdb',
});

export async function initDb() {
  await client.connect();
  const initSQL = await loadSQL('init.sql');

  await client.query(initSQL);
}
