import { Router } from 'express';
import properties from '../controllers/Properties.controller';
import ensure from '../middlewares/Ensurances.middleware';

export const propertiesRoutes = Router();

propertiesRoutes.post('', ensure.fieldValidation('createProperty'), ensure.authentication, ensure.onlyAdmin, properties.create);
propertiesRoutes.get('', properties.read);
