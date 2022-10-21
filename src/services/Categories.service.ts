import AppDataSource from '../data-source';
import { Category } from '../entities/categories.entity';
import { ICategoryRequest } from '../interfaces/categories';

export default class CategoriesServices {
  static repository = AppDataSource.getRepository(Category);

  static async create({ name }: ICategoryRequest): Promise<Category> {
    const newCategory = this.repository.create({ name });
    await this.repository.save(newCategory);

    return newCategory;
  }

  static async read() {
    const categoryList = await this.repository.find();
    return categoryList;
  }

  static async propertiesById(id: string) {
    const categoryProperties = await this.repository.findBy({ id });
    return categoryProperties;
  }
}
