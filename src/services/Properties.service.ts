import AppDataSource from '../data-source';
import { Address } from '../entities/addresses.entity';
import { Property } from '../entities/properties.entity';
import AppError from '../error/AppError';
import { IPropertyRequest } from '../interfaces/properties';
import categories from './Categories.service';

export default class PropertiesService {
  static repository = AppDataSource.getRepository(Property);
  static addressRepo = AppDataSource.getRepository(Address);
  
  static async create({ value, size, address, categoryId }: IPropertyRequest): Promise<Property> {
    const category = await categories.repository.findOneBy({ id: categoryId });
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const addressCheck = await this.addressRepo.findOne({
      where: {
        district: address.district,
        number: address.number,
      },  
    });  
    if (addressCheck) {
      throw new AppError('Another property already have this address', 400);
    }  

    const newAddress = this.addressRepo.create(address);
    const newSavedAddress = await this.addressRepo.save(newAddress);
    const newProperty = this.repository.create({ value, size, address: newSavedAddress, category: categoryId });
    await this.repository.save(newProperty);

    return newProperty;
  }

  static async read(): Promise<Property[]> {
    const propertiesList = await this.repository.find();
    return propertiesList;
  }
}
