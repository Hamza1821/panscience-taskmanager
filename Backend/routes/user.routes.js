import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/', createUser); 

export default router;
