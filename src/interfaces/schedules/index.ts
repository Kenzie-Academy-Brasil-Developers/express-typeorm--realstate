import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { Schedule } from '../../entities/schedules.entity';

export type ScheduleRequest = Request<core.ParamsDictionary, Schedule, IScheduleRequest>
export type SchCreateResponse = Response<ICreateScheduleRes>;
export type ScheduleListResponse = Response<Schedule[]>;

export interface IScheduleRequest {
  date: Date | string;
  hour: Date | string;
  propertyId: string;
  userId?: string;
}

export interface ICreateScheduleRes {
  message: string;
  details: Schedule;
}
