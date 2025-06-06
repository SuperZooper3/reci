import { Client } from 'pg';
import { loadSQL } from './utils/sqlLoader';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
//TODO: Find a better way to use a db connection. Look into using a pool?
export const client = new Client({
  host: process.env.POSTGRES_HOST,
  port:  Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export async function initDb() {
  await client.connect();
  const initSQL = await loadSQL('init.sql');

  await client.query(initSQL);
}
