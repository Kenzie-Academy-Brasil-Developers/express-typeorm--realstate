import { Router } from 'express';
import categories from '../controllers/Categories.controllers';
import ensure from '../middlewares/Ensurances.middleware';

export const categoriesRoutes = Router();

categoriesRoutes.post('', ensure.onlyAdmin, categories.create);
categoriesRoutes.get('', categories.read);
categoriesRoutes.get('/:id/properties', categories.propertiesById);
