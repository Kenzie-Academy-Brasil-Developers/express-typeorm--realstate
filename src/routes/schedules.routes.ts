import { Router } from "express";
import schedules from "../controllers/Schedules.controller";
import ensure from "../middlewares/Ensurances.middleware";

export const scheduleRoutes = Router()

scheduleRoutes.post('', ensure.fieldValidation('createSchedule'), ensure.authentication, schedules.create);
scheduleRoutes.get('/properties/:id', ensure.authentication, ensure.onlyAdmin, schedules.byPropertyId)