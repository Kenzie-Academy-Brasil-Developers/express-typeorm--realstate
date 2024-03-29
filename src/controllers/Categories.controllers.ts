import { CatCreateRequest, CatResponse, CatListResponse } from '../interfaces/categories';
import { Request } from 'express';
import service from '../services/Categories.service';

export default class CategoriesController {
  static async create(request: CatCreateRequest, response: CatResponse) {
    const data = request.body;
    const newCategory = await service.create(data);

    return response.status(201).send(newCategory);
  }

  static async read(_: Request, response: CatListResponse) {
    const categoryList = await service.read();
    return response.status(200).send(categoryList);
  }

  static async propertiesById(request: Request, response: CatResponse) {
    const { id } = request.params;
    const categoryProperties = await service.propertiesById(id);

    return response.status(200).send(categoryProperties);
  }
}
