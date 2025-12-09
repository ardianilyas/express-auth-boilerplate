import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import authRouter from './features/auth/auth.route';
import { errorHandler } from './middlewares/error.middleware';
import { authenticate } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => res.status(200).json({ status: "health check" }));

app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})