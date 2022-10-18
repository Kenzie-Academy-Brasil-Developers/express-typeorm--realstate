import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';

export default class MiddlewareErrors {
  static handler(error: Error, _: Request, response: Response, next: NextFunction) {

    if (error instanceof AppError) {
      return response.status(error.status).send({ message: error.message });
    }
    console.error(error);

    return response.status(500).send({ message: 'Internal server Error' });

  }
}
