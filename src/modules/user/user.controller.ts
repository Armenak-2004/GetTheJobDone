import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Get all users',
        data: [],
    });
};

export const createUser = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'User created successfully',
        data: req.body,
    });
};