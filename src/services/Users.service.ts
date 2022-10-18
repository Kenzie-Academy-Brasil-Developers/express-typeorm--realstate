import AppDataSource from '../data-source';
import { hash } from 'bcryptjs';
import { User } from '../entities/users.entity';
import { IActivityLog, IUserRequest } from '../interfaces/users';
import AppError from '../error/AppError';

export default class UsersService {
  static repository = AppDataSource.getRepository(User);

  static async register({ name, email, password, isAdm }: IUserRequest) {
    const user = await this.repository.findOneBy({ email });

    const userCheck = this.isActive(user);
    if (userCheck.active) {
      throw new AppError('This email is already being used', 400);
    }

    const hashedKey = await hash(password, 10);

    const newUser: User = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedKey;
    newUser.isAdm = isAdm;

    if (userCheck.exists) {
      await this.repository.update(user!.id, {
        name,
        email,
        password: hashedKey,
        isAdm,
        isActive: true,
      });

      return await this.repository.findOneBy({ id: user!.id });
    } else {
      this.repository.create(newUser);
      await this.repository.save(newUser);

      return newUser;
    }
  }

  static async read() {
    const usersList = await this.repository.find();
    return usersList;
  }

  static async update({ name, email, password }: IUserRequest, id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new AppError('User not found', 400);
    }

    const hashedKey = password && (await hash(password, 10));

    await this.repository.update(id, {
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? hashedKey : user.password,
    });

    const updatedUser = await this.repository.findOneBy({ id });
    return updatedUser!;
  }

  static async delete(id: User['id']) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new AppError('User not found', 404);
    } else if (!user.isActive) {
      throw new AppError('User inactive', 400);
    }

    await this.repository.update(id, { isActive: false });
  }

  static isActive(user: User | null): IActivityLog {
    if (!user) {
      return { exists: false, active: false };
    } else {
      return { exists: true, active: user.isActive };
    }
  }
}
