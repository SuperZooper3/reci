import { Router, Request, Response } from 'express';
import { client } from '../db';
import { loadSQL } from '../utils/sqlLoader';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const getUserNamesSQL = await loadSQL('getUserNames.sql');
  const { rows } = await client.query<{ name: string }>(getUserNamesSQL);
  res.json(rows.map((r: { name: string; }) => r.name));
});

export default router;
