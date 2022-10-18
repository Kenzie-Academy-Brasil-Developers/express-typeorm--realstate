import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import services from '../services/Users.service';
import { IUserRequest } from '../interfaces/users';

export default class UsersController {
  static async register(request: Request, response: Response) {
    const user: IUserRequest = request.body;
    const newUser = await services.register(user);

    return response.status(201).send(instanceToPlain(newUser));
  }

  static async read(_: Request, response: Response) {
    const users = await services.read();

    return response.status(200).send(instanceToPlain(users));
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const updates: IUserRequest = request.body;

    const updatedUser = await services.update(updates, id);

    return response.status(200).send(instanceToPlain(updatedUser));
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;
    await services.delete(id);

    return response.status(204).send();
  }
}
