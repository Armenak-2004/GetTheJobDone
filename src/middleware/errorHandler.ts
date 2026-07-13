import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (
    res: Response,
    message: string,
    statusCode: number = 500,
) => {
    logger.error(`❌ Error: ${message}`);
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};

export const appError = (
    err: Error | unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const statusCode = 500;
    const message = err instanceof Error ? err.message : 'Internal server error';
    logger.error(`Error occurred: ${message}`);

    res.status(statusCode).json({
        success: false,
        message: message,
    });
};