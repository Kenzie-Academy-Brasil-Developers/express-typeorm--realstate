import { Router } from 'express';
import categories from '../controllers/Categories.controllers';
import ensure from '../middlewares/Ensurances.middleware';

export const categoriesRoutes = Router();

categoriesRoutes.post('', ensure.authentication, ensure.onlyAdmin, ensure.fieldValidation('createCategory'), categories.create);
categoriesRoutes.get('', categories.read);
categoriesRoutes.get('/:id/properties', categories.propertiesById);
