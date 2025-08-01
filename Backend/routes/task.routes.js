import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';

const router = express.Router();

router.use(authMiddleware); // all routes require auth

// 👇 Create with up to 3 PDFs
router.post('/', upload.array('documents', 3), createTask);

// 👇 Get all tasks (admin = all, user = own)
router.get('/', getAllTasks);

// 👇 Single task by ID
router.get('/:id', getTaskById);

// 👇 Update task with optional file
// routes/task.routes.js or similar
router.put('/:id', upload.array('documents', 3), updateTask);

// 👇 Delete task
router.delete('/:id', deleteTask);

export default router;
