import { Request } from 'express';
import { PropResponse } from '../interfaces/properties';
import { SchCreateResponse, ScheduleListResponse, ScheduleRequest } from '../interfaces/schedules';
import service from '../services/Schedules.service';

export default class SchedulesController {
  static async create(request: ScheduleRequest, response: SchCreateResponse) {
    const data = request.body;
    const { id } = request.user;
    const newSchedule = await service.create(id, data);

    return response.status(201).send(newSchedule);
  }

  static async read(_: Request, response: ScheduleListResponse) {
    const schedules = await service.read();
    return response.status(200).send(schedules);
  }

  static async byPropertyId(request: Request, response: PropResponse) {
    const { id } = request.params;
    const schedules = await service.byPropertyId(id);

    return response.status(200).send(schedules);
  }
}
