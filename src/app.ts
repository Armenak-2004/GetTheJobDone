import express from 'express';
import userRoutes from './modules/user/user.routes';
import taskRoutes from './modules/task/task.routes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;