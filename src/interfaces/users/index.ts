import * as core from 'express-serve-static-core';
import { Request } from 'express';
import { User } from '../../entities/users.entity';

export type UserRequest = Request<core.ParamsDictionary, User, IUserRequest>;
export type UserUpdateRequest = Request<core.ParamsDictionary, User, IUserUpdate>;

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IActivityLog {
  exists: boolean;
  active: boolean;
}
