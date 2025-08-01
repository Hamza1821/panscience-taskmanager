import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use('/uploads', express.static(path.resolve('uploads')));

app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.send('Task Manager API Running'));

export default app;
