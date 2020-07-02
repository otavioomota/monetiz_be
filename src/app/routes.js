import { Router } from 'express';

import CheckoutController from './controllers/CheckoutController';
import TransactionsCieloController from './controllers/TransactionsCieloController';

const routes = new Router();

routes.post('/checkout', CheckoutController.store);

routes.get('/transactions', TransactionsCieloController.index);

export default routes;
