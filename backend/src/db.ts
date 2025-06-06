import { Client } from 'pg';
import { loadSQL } from './utils/sqlLoader.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

//TODO: Find a better way to use a db connection. Look into using a pool?
export const client = new Client({
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: (() => {
    const port = parseInt(process.env.POSTGRES_PORT || '', 10);
    if (isNaN(port)) {
      throw new Error('Invalid or missing POSTGRES_PORT environment variable');
    }
    return port;
  })(),
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'password',
  database: process.env.POSTGRES_DB ?? 'postgres',
});

export async function initDb() {
  await client.connect();
  const initSQL = await loadSQL('init.sql');

  await client.query(initSQL);
}
