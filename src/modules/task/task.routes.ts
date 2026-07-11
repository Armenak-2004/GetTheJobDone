import { Router } from 'express';
import { getTasks, createTask } from './task.controller';
import { authenticate } from '../../middleware/authentication';

const router = Router();

router.get('/tasks', authenticate, getTasks);
router.post('/tasks', authenticate, createTask);

export default router;