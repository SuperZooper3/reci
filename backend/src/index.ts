import express from 'express';
import accountRouter from './routes/accountRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import cors from 'cors';
import { initDb } from './db.js';

initDb();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use('/api/accounts', accountRouter);
app.use('/api/recipes', recipeRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
