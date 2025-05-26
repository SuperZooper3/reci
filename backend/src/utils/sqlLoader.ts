import { readFile } from 'fs/promises';
import path from 'path';

const sqlCache = new Map<string, string>();

export async function loadSQL(fileName: string): Promise<string> {
  if (sqlCache.has(fileName)) {
    return sqlCache.get(fileName) as string;
 }

  const filePath = path.join(__dirname, '../../sql', fileName);
  const sql = await readFile(filePath, 'utf-8');
  sqlCache.set(fileName, sql);
  return sql;
}
