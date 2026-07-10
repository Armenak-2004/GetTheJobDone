import { Router } from 'express';
import { getTasks, createTask } from './task.controller';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);

export default router;