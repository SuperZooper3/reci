import express from 'express';
import userController from './controllers/userController';
import cors from 'cors';
import { initDb } from './db';

initDb();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userController); 

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
