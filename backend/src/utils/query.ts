import { client } from '../db.js';
import { performance } from 'perf_hooks';
import type { QueryResult, QueryResultRow } from 'pg';

export type QueryResultWithDuration<R extends QueryResultRow = QueryResultRow> =
  QueryResult<R> & { duration: number };

export async function query<R extends QueryResultRow = QueryResultRow>(
  sql: string,
  values?: unknown[]
): Promise<QueryResultWithDuration<R>> {
  const start = performance.now();

  const result = await client.query<R>(sql, values);

  const duration = Number((performance.now() - start).toFixed(2));

  return { ...result, duration };
}
