import { Request, Response } from 'express';

import { IUserLogin } from '../interfaces/users';
import service from '../services/Session.service';

export default class SessionController {
  static async login(request: Request, response: Response) {
    const user: IUserLogin = request.body;
    const token = await service.login(user);

    return response.status(200).send({ token });
  }
}
