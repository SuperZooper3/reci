import { Client } from 'pg';

//Might want to see if there's a better/more reusable way to connect to the db.
export const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password:'postgres',
  database: 'testdb',
});

export async function initDb() {
    await client.connect();
    await client.query(
      'CREATE TABLE IF NOT EXISTS users(name text);'
    );
    await client.query(
      `INSERT INTO users values('Bill'), ('Russell');`
    );
}
