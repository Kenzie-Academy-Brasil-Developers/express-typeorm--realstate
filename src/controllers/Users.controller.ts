import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import services from '../services/Users.service';
import { UserRequest, UserUpdateRequest } from '../interfaces/users';

export default class UsersController {
  static async register(request: UserRequest, response: Response) {
    const user = request.body;
    const newUser = await services.register(user);

    return response.status(201).send(instanceToPlain(newUser));
  }

  static async read(_: Request, response: Response) {
    const users = await services.read();

    return response.status(200).send(instanceToPlain(users));
  }

  static async update(request: UserUpdateRequest, response: Response) {
    const { id } = request.params;
    const updates = request.body;

    const updatedUser = await services.update(updates, id);

    return response.status(200).send(instanceToPlain(updatedUser));
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;
    await services.delete(id);

    return response.status(204).send();
  }
}
