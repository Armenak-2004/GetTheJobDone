import { Router } from 'express';
import { getTask, getAllTasks } from './task.controller';
import { authenticate } from '../../middleware/authentication';

const router = Router();

router.get('/tasks/:id', authenticate, getTask);
router.get('/tasks', getAllTasks);

export default router;