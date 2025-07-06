import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
 
import accountRouter from './routes/accountRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import feedRouter from './routes/feedRoutes.js';

import { initDb } from './db.js';

initDb();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

app.use('/api/accounts', accountRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/feed', feedRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
