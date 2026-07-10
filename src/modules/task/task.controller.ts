import { Request, Response } from 'express';

export const getTasks = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Get all tasks',
        data: [],
    });
};

export const createTask = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Task created successfully',
        data: req.body,
    });
};