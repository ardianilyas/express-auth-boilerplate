import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';
import { prismaErrorHandler } from '../errors/PrismaError';
import { BaseError } from '../errors/BaseError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  err = prismaErrorHandler(err);

  logger.info({ err }, "Unhandled Error");

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      error: err.type,
      message: err.message,
      errors: err.errors ?? null,
    });
  }

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
}