import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { ValidationError } from 'yup';

export default function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ValidationError) {
    let errors: ValidationErrors = {};

    err.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: 'Validation fails', errors });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.log('!error', err);

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internval server error',
  });
}
