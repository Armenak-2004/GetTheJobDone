import express from 'express';
import userRoutes from './modules/user/user.routes';
import taskRoutes from './modules/task/task.routes';
import authRoutes from './modules/auth/auth.routes';
import { notFound } from './middleware/notFound';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);

app.get('/healthCheck', (req, res) => {
    res.send('Hello World!');
});

app.use(notFound);

export default app;