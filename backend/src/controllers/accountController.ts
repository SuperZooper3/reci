import { Router, Request, Response } from 'express';
import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const getAccountNamesSQL = await loadSQL('getAccountNames.sql');
  const { rows } = await client.query<{ name: string }>(getAccountNamesSQL);
  res.json(rows.map((r: { name: string; }) => r.name));
});

export default router;
