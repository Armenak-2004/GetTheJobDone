import jwt from 'jsonwebtoken';
import { config } from '../config';

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateToken = (payload: JwtPayload): string => {
    const options: jwt.SignOptions = {
        expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    };

    return jwt.sign(payload, config.jwtSecret, options);
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
};