import { Router } from 'express';
import { getUser, getUserTasks, assignTask, patchUser, deleteUser } from './user.controller';
import { authenticate } from '../../middleware/authentication';
import { validate } from '../../middleware/validation';
import { userSchema } from '../../utils/zod';

const router = Router();

router.get('/users/profile', authenticate, getUser);
router.get('/users/tasks', authenticate, getUserTasks);
router.post('/users/tasks/:id/assign', authenticate, assignTask);
router.patch('/users/profile', authenticate, validate(userSchema), patchUser);
router.delete('/users/profile', authenticate, deleteUser);

export default router;