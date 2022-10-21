import * as core from 'express-serve-static-core';

import { Request, Response } from 'express';
import { Category } from '../../entities/categories.entity';

export type CatCreateRequest = Request<core.ParamsDictionary, Category, ICategoryRequest>;
export type CatCreateResponse = Response<Category>;
export type CatReadResponse = Response<Category[]>;

export interface ICategoryRequest {
  name: string;
}
