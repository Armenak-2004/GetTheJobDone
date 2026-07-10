import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

class InternalError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export const errorHandler = (
    err: Error | InternalError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(`Error occurred: ${err.message}`);

    const statusCode = err instanceof InternalError ? err.statusCode : 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message: message,
    });
};