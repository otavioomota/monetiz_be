import { Router } from 'express';

import CheckoutController from './controllers/CheckoutController';

const routes = new Router();

routes.post('/checkout', CheckoutController.store);

export default routes;
