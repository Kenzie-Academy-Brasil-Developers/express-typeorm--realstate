import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import AppError from '../error/AppError';
import { Schemas } from '../serializers/users.serializer';

export default class Ensurances {
  static async authentication(request: Request, _: Response, next: NextFunction) {
    let token = request.headers.authorization;

    if (!token) {
      throw new AppError('Missing Authorization headers', 401);
    }

    token = token!.split(' ')[1];
    jwt.verify(
      token,
      process.env.SECRET_KEY as jwt.Secret,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError('Invalid token', 401);
        }

        request.user = { id: decoded.sub, isAdm: decoded.isAdm };
        next();
      }
    );
  }

  static fieldValidation(schemaType: 'register' | 'login' | 'update') {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        await Schemas[schemaType].validate(request.body);

        next();
      } catch (error) {
        if (error instanceof Error) {
          throw new AppError(error.message, 401);
        }
      }
    };
  }

  static async onlyAdmin(request: Request, _: Response, next: NextFunction) {
    const { isAdm } = request.user;

    if (!isAdm) {
      throw new AppError('User is not the admin', 403);
    }

    next();
  }

  static async permissions(request: Request, _: Response, next: NextFunction) {
    const { isAdm, id: sub } = request.user;
    const { id } = request.params;

    if (!isAdm && sub !== id) {
      throw new AppError('Action not allowed for this user', 401);
    }

    next();
  }
}
