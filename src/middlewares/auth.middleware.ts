import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.JWT_ACCESS_SECRET!;

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN) as { id: string, role: string };

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token expired' });
        }
        return res.status(401).json({ message: 'Invalid access token' });
    }
}