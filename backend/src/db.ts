import { Client } from 'pg';
import { loadSQL } from './utils/sqlLoader.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

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
  console.log("Initializing the database");
  await client.query(initSQL);
  console.log("Initialized the database");

  // Check if big_seed.sql exists, otherwise use seed.sql
  let seedFileName = 'seed.sql';
  let seedSQL = await loadSQL(seedFileName);
  console.log("Seeding the database with small");
  await client.query(seedSQL);
  console.log("Seeded the database with small");

  try {
    const sqlDir = path.join(__dirname, '..', 'sql');
    seedFileName = 'big_seed.sql';
    console.log("Using big_seed.sql for seeding");
    if (fs.existsSync(path.join(sqlDir, 'big_seed.sql')))
    try {
      seedSQL = await loadSQL(seedFileName);
      console.log("Seeding the database with large");
      await client.query(seedSQL);
      console.log("Seeded the database with large");
    } catch (error) {
      console.log("error seeding big", error);
    }
  } catch {
    console.log("big_seed.sql not found, skipping");
  }

  const triggerSQL = await loadSQL('triggerSaveReviewedRecipes.sql');
  console.log("Creating triggers");
  try {
      await client.query(triggerSQL);
  } 
  catch (error) {
    console.log("Error: ", error)
  }

  console.log("Triggers created");

}
