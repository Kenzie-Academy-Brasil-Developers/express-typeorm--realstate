import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import AppError from '../error/AppError';
import { ISerializerType } from '../interfaces/serializers';
import Validations from '../serializers';

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

  static fieldValidation(schemaType: ISerializerType) {
    return async (request: Request, _: Response, next: NextFunction) => {
      try {
        await Validations.serialize(schemaType, request);

        next();
      } catch (error) {
        if (error instanceof Error) {
          if (
            ['userRegister', 'userUpdate'].every(
              (schema) => schema !== schemaType
            )
          ) {
            throw new AppError(error.message, 400);
          } else {
            throw new AppError(error.message, 401);
          }
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
