import { Router } from 'express';
import { getUser, createUser } from './user.controller';
import { authenticate } from '../../middleware/authentication';

const router = Router();

router.get('/users', authenticate, getUser);
router.post('/users', authenticate, createUser);

export default router;