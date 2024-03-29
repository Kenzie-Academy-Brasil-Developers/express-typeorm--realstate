import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import appErrors from './middlewares/Errors.middleware';

import userRoutes from './routes/users.routes';
import sessionRoutes from './routes/session.routes';
import { categoriesRoutes } from './routes/categories.routes';
import { propertiesRoutes } from './routes/properties.routes';
import { scheduleRoutes } from './routes/schedules.routes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', sessionRoutes);
app.use('/categories', categoriesRoutes);
app.use('/properties', propertiesRoutes);
app.use('/schedules', scheduleRoutes);

app.use(appErrors.handler);

export default app;
