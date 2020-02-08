import { Router } from 'express';
// import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello FastFeet' })
);

// routes.get('/', async (request, response) => {
//   const user = await User.create({
//     name: 'Victor',
//     email: 'victor@gmail.com',
//     password_hash: '123456',
//   });
//   return response.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
