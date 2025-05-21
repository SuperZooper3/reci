import { Router, Request, Response } from 'express';
import { client } from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const { rows } = await client.query<{ name: string }>(
    'SELECT name FROM users'
  );
  res.json(rows.map((r: { name: string; }) => r.name));    
});

export default router;
