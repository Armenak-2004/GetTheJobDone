import { Router } from 'express';
import { register, login } from './auth.controller';
import { validate } from '../../middleware/validation';
import { registerSchema, loginSchema } from '../../utils/zod';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;