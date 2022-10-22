import AppDataSource from '../data-source';
import { Schedule } from '../entities/schedules.entity';
import AppError from '../error/AppError';
import { ICreateScheduleRes, IScheduleRequest } from '../interfaces/schedules';
import { dateFormatter, isClosed } from '../utils';
import properties from './Properties.service';
import users from './Users.service';

export default class SchedulesService {
  static repository = AppDataSource.getRepository(Schedule);

  static async create(
    id: string,
    { date, hour, propertyId }: IScheduleRequest
  ): Promise<ICreateScheduleRes> {
    const user = await users.repository.findOneBy({ id });
    const property = await properties.repository.findOneBy({ id: propertyId });

    if (!user || !property) {
      throw new AppError(`${!user ? 'User' : 'Property'} not found`, 404);
    }

    const dateFormat = dateFormatter(date, 'day');
    const hourFormat = dateFormatter(hour, 'time');
    const scheduleDate = new Date(`${dateFormat}T${hourFormat}`);

    if (isClosed(scheduleDate)) {
      throw new AppError(
        'Schedules must be made from Monday to Friday, between 8am and 6pm',
        400
      );
    }

    const existingSchedule = await this.repository.findOneBy({
      date,
      hour: hourFormat,
      property: { id: propertyId },
    });
    if (existingSchedule) {
      throw new AppError(
        'There is already a scheduled visit to this property',
        400
      );
    }

    const newSchedule = this.repository.create({
      date,
      hour: hourFormat,
      user,
      property,
    });
    const savedSchedule = await this.repository.save(newSchedule);

    return { message: 'Visit successfully scheduled', details: savedSchedule };
  }

  static async read() {
    const schedules = this.repository.find();
    return schedules;
  }

  static async byPropertyId(id: string) {
    const propertySchedules = await properties.repository.findOne({
      where: { id },
      relations: {
        schedules: true,
      },
    });

    if (!propertySchedules) {
      throw new AppError('Property not found', 404);
    }

    return propertySchedules;
  }
}
