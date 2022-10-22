export type IUserFields = 'userRegister' | 'userUpdate';
export type ISessionFields = 'login';
export type ICategoryFields = 'createCategory';
export type IPropertyFields = 'createProperty';
export type IScheduleFields = 'createSchedule';

export type ISerializerType =
  | IUserFields
  | ISessionFields
  | ICategoryFields
  | IPropertyFields
  | IScheduleFields;
