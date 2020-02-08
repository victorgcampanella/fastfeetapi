import { Router } from 'express';
// import User from './app/models/User';
// import Recipient from './app/models/Recipient';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.get('/', (request, response) =>
//   response.json({ message: 'Hello FastFeet' })
// );

// routes.get('/', async (request, response) => {
//   const user = await User.create({
//     name: 'Victor',
//     email: 'victor@gmail.com',
//     password_hash: '123456',
//   });
//   return response.json(user);
// });

// routes.get('/', async (request, response) => {
//   const recipient = await Recipient.create({
//     name: 'Mauricio',
//     street: 'Rua Romao',
//     number: '251',
//     complement: 'Pesqueiro',
//     state: 'SP',
//     city: 'Sao Paulo',
//     cep: '18670-000',
//   });
//   return response.json(recipient);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

routes.put('/users', UserController.update);
routes.put('/recipients', RecipientController.update);

export default routes;
