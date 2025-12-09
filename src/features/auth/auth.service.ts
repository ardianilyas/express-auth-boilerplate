import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import logger from "../../lib/logger";
import { RegisterSchema } from "./auth.validation";
import { AuthRepository } from "./auth.repository";

interface JwtPayload {
    id: string;
    role: string;
}

const ACCESS_EXP = '10m';
const REFRESH_EXP = '3d';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;


export class AuthService {
    constructor(private authRepository: AuthRepository) {}
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    generateAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
    }

    generateRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
    }

    async verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
        } catch (error) {
            logger.warn({ error }, "Invalid or expired refresh token");
            throw Object.assign(new Error("Invalid or expired refresh token"), { type: 'FORBIDDEN' });
        }
    }

    async createUser(data: RegisterSchema) {
        const hash = await this.hashPassword(data.password);
        return this.authRepository.createUser({ ...data, password: hash });
    }

    async findUserByEmail(email: string) {
        return this.authRepository.findUserByEmail(email);
    }
}