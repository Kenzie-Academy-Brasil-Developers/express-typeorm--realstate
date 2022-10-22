import { Request } from 'express';
import { IPropRequest, PropListResponse, PropResponse } from '../interfaces/properties';
import service from '../services/Properties.service';

export default class PropertiesController {
  static async create(request: IPropRequest, response: PropResponse) {
    const data = request.body;
    const newProperty = await service.create(data);

    return response.status(201).send(newProperty);
  }

  static async read(_: Request, response: PropListResponse) {
    const categoryList = await service.read();
    return response.status(200).send(categoryList);
  }
}
