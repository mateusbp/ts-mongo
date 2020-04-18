import { Router } from 'express';

import User from './controllers/UserController';

const routes = Router();

routes.post('/users', User.store);
routes.get('/users', User.index);
routes.get('/users/:id', User.show);

export default routes;
