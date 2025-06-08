import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
 
import accountRouter from './routes/accountRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import cors from 'cors';
import { initDb } from './db.js';

initDb();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/accounts', accountRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/reviews', reviewRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
