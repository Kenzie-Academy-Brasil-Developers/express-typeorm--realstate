import { Request } from 'express';
import * as yup from 'yup';
import { ISerializerType } from '../interfaces/serializers';

export default class Validations {
  static async serialize(schema: ISerializerType, { body }: Request) {
    switch (schema) {
      case 'userRegister':
        return await this.userRegister.validate(body);
      case 'userUpdate':
        return await this.userUpdate.validate(body);
      case 'login':
        return await this.login.validate(body);
      case 'createCategory':
        return await this.createCategory.validate(body);
      case 'createProperty':
        return await this.createProperty.validate(body);
      case 'createSchedule':
        return await this.createSchedule.validate(body);
    }
  }

  private static userRegister = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      isAdm: yup.boolean().required(),
    }).noUnknown(true).strict();

  private static userUpdate = yup.object().shape({
      name: yup.string().notRequired(),
      email: yup.string().email().notRequired(),
      password: yup.string().notRequired(),
    }).noUnknown(true).strict();

  private static login = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }).noUnknown(true).strict();

  private static createCategory = yup.object().shape({
      name: yup.string().required(),
    }).noUnknown(true).strict();

  private static createAddress = yup.object().shape({
      district: yup.string().required(),
      zipCode: yup.string().length(8, 'Invalid zip code').required(),
      number: yup.string().required(),
      city: yup.string().required(),
      state: yup
        .string()
        .length(2, 'Must be the acronym of a brazilian state (ex: SP)')
        .required(),
    }).noUnknown(true).strict();

  private static createProperty = yup.object().shape({
      value: yup.number().required(),
      size: yup.number().required(),
      address: this.createAddress,
      categoryId: yup.string().required(),
    }).noUnknown(true).strict();

  private static createSchedule = yup.object().shape({
      date: yup
        .string()
        .matches(
          /\d{4}(-|\/)\d{2}(-|\/)\d{2}/,
          ({ path }) =>
            `The ${path} field must be passed in the standard format (yyyy-mm-dd or yyyy/mm/dd)`
        ).required(),
      hour: yup
        .string()
        .matches(/\d{1,2}:\d{2}/, ({path}) => `The ${path} field must be passed in the standart form (0:00 or 00:00)`)
        .required(),
      userId: yup.string().notRequired(),
      propertyId: yup.string().required(),
    }).noUnknown(true).strict();
}