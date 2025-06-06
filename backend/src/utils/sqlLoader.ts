import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const sqlCache = new Map<string, string>();

export async function loadSQL(fileName: string): Promise<string> {
  if (sqlCache.has(fileName)) {
    return sqlCache.get(fileName) as string;
 }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '../../sql', fileName);
  const sql = await readFile(filePath, 'utf-8');
  sqlCache.set(fileName, sql);
  return sql;
}
