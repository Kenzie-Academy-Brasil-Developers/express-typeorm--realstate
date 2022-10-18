import * as yup from 'yup';

export class Schemas {
  static register = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      isAdm: yup.boolean().required(),
    }).noUnknown(true).strict();

  static login = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).noUnknown(true).strict();

  static update = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
  }).noUnknown(true).strict()
}
