import * as yup from 'yup';

export default class CategoriesSerializer {
  static create = yup.object().shape({
      name: yup.string().required(),
    }).noUnknown(true).strict();
}
