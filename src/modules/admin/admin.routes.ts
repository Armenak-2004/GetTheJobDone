import { Router } from 'express';
import { getUsersByAdmin, createUserByAdmin, pathUserByAdmin, deleteUserByAdmin } from './admin.controller';
import { createTaskByAdmin, patchTaskByAdmin, deleteTaskByAdmin } from './admin.controller';
import { authenticate } from '../../middleware/authentication';
import { validate } from '../../middleware/validation';
import { registerSchema, taskSchema, userSchema } from '../../utils/zod';

const router = Router();

router.get('/admin/users', authenticate, getUsersByAdmin);
router.post('/admin/users', authenticate, validate(registerSchema), createUserByAdmin);
router.patch('/admin/users/:id', authenticate, validate(userSchema), pathUserByAdmin);
router.delete('/admin/users/:id', authenticate, deleteUserByAdmin);

router.post('/admin/tasks', authenticate, validate(taskSchema), createTaskByAdmin);
router.patch('/admin/tasks/:id', authenticate, validate(taskSchema), patchTaskByAdmin); //Bug: title required
router.delete('/admin/tasks/:id', authenticate, deleteTaskByAdmin);


export default router;