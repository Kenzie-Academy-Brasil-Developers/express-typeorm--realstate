import * as core from 'express-serve-static-core';
import { Property } from '../../entities/properties.entity';
import { Request, Response } from 'express';

export type IPropRequest = Request<core.ParamsDictionary, Property, IPropertyRequest>
export type PropResponse = Response<Property>;
export type PropListResponse = Response<Property[]>;

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
