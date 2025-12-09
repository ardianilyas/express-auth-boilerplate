import { NextFunction, Request, Response } from "express";
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "./auth.validation";
import { validate } from "../../utils/validate";
import { AuthService } from "./auth.service";
import logger from "../../lib/logger";

const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production'
};

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: RegisterSchema = validate(registerSchema, req.body);
            
            const user = await this.authService.createUser(data);
            logger.info({ id: user.id }, "User registered");
            res.status(201).json({ message: "User registered" });
        } catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: LoginSchema = validate(loginSchema, req.body);
            
            const user = await this.authService.findUserByEmail(data.email);
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isPasswordValid = await this.authService.comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const payload = { id: user.id, role: user.role };
            const accessToken = this.authService.generateAccessToken(payload);
            const refreshToken = this.authService.generateRefreshToken(payload);

            res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 10 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 3 * 24 * 60 * 60 * 1000 });

            logger.info({ userId: user.id }, 'User logged in');
            res.json({ message: 'User logged in' });
        } catch (error) {
            next(error);
        }
    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.refreshToken;
            
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const payload: any = await this.authService.verifyRefreshToken(token);
            
            const accessToken = this.authService.generateAccessToken({ id: payload.id, role: payload.role });

            res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 10 * 60 * 1000 });

            res.json({ message: "Access token refreshed" });
        } catch (error) {
            next(error);
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('accessToken', cookieOptions);
            res.clearCookie('refreshToken', cookieOptions);
            res.json({ message: "User logged out" });
        } catch (error) {
            next(error);
        }
    }
}