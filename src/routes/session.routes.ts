import { Router } from 'express';
import session from '../controllers/Session.controller';
import ensure from '../middlewares/Ensurances.middleware';

const sessionRoutes = Router();

sessionRoutes.post('', ensure.fieldValidation('login'), session.login);

export default sessionRoutes;
