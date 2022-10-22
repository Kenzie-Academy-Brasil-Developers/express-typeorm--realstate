import { Router } from 'express';
import users from '../controllers/Users.controller';
import ensure from '../middlewares/Ensurances.middleware';

const userRoutes = Router();

userRoutes.post('', ensure.fieldValidation('userRegister'), users.register);
userRoutes.get('', ensure.authentication, ensure.onlyAdmin, users.read);
userRoutes.patch('/:id', ensure.fieldValidation('userUpdate'), ensure.authentication, ensure.permissions, users.update);
userRoutes.delete('/:id', ensure.authentication, ensure.onlyAdmin, users.delete);

export default userRoutes;
