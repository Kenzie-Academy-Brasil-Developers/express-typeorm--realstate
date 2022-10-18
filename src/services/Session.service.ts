import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import users from './Users.service';
import { IUserLogin } from '../interfaces/users';
import AppError from '../error/AppError';

export default class SessionService {
  static async login({ email, password }: IUserLogin): Promise<string> {
    const repository = users.repository;

    const user = await repository.findOneBy({ email });
    if (!user) {
      throw new AppError('Invalid email or password', 403);
    }

    const hashMatch = await compare(password, user.password);
    if (!hashMatch) {
      throw new AppError('Invalid email or password', 403);
    }

    const token = jwt.sign(
      {
        isAdm: user.isAdm,
      },
      process.env.SECRET_KEY as jwt.Secret,
      {
        subject: user.id,
        expiresIn: '24h',
      }
    );

    return token;
  }
}
