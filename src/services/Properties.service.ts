import { number } from 'yup';
import AppDataSource from '../data-source';
import { Address } from '../entities/addresses.entity';
import { Property } from '../entities/properties.entity';
import AppError from '../error/AppError';
import { IPropertyRequest } from '../interfaces/properties';

export default class PropertiesService {
  static repository = AppDataSource.getRepository(Property);
  static addressRepo = AppDataSource.getRepository(Address);

  static async create({ value, size, address, categoryId }: IPropertyRequest) {
    const addressCheck = await this.addressRepo.findOne({
      where: {
        district: address.district,
        number: address.number,
      },
    });
    if (addressCheck) {
      throw new AppError('This address is already being used', 400);
    }

    const newProperty = this.repository.create({ value, size, address, categoryId });
    await this.repository.save(newProperty);

    return newProperty;
  }
}
