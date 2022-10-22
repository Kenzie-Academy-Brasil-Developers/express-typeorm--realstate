import AppDataSource from '../data-source';
import { Category } from '../entities/categories.entity';
import AppError from '../error/AppError';
import { ICategoryRequest } from '../interfaces/categories';

export default class CategoriesServices {
  static repository = AppDataSource.getRepository(Category);

  static async create({ name }: ICategoryRequest): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    if (category) {
      throw new AppError('Category already exists', 400)
    }

    const newCategory = this.repository.create({ name });
    await this.repository.save(newCategory);

    return newCategory;
  }

  static async read() {
    const categoryList = await this.repository.find();
    return categoryList;
  }

  static async propertiesById(id: string) {
    const categoryProperties = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        properties: true,
      },
    });

    if (!categoryProperties) {
      throw new AppError('Category not found', 404);
    }

    return categoryProperties;
  }
}
