import { IPropRequest, IPropResponse } from '../interfaces/properties';
import PropertiesService from '../services/Properties.service';

export default class PropertiesController {
  static async create(request: IPropRequest, response: IPropResponse) {
    const data = request.body;
    const newProperty = await PropertiesService.create(data);

    return response.status(201).send(newProperty)
  }
}
