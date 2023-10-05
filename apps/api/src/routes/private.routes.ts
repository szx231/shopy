import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';
import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';
import { productsRoutes } from 'resources/products';
import { basketsRoutes } from 'resources/basket';
import { stripeRoutes } from 'resources/stripe';
import { orderRoutes } from 'resources/order';

import auth from './middlewares/auth.middleware';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth, userRoutes.privateRoutes])));
  app.use(mount('/products', compose([auth, productsRoutes.privateRoutes])));
  app.use(mount('/basket', compose([auth, basketsRoutes.privateRoutes])));
  app.use(mount('/stripe', compose([auth, stripeRoutes.privateRoutes])));
  app.use(mount('/order', compose([auth, orderRoutes.privateRoutes])));
};
