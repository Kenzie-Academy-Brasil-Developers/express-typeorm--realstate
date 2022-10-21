import * as core from 'express-serve-static-core';
import { Property } from '../../entities/properties.entity';
import { Request, Response } from 'express';
// prettier-ignore
export type IPropRequest = Request<core.ParamsDictionary, Property, IPropertyRequest>
export type IPropResponse = Response<IPropertyRequest>;

export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

interface IAddressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}
