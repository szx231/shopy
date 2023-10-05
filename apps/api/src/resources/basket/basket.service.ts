import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './basket.schema';
import { Basket } from './basket.types';

const service = db.createService<Basket>(DATABASE_DOCUMENTS.BASKET, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const getUserBasket = async (userID: string) => {
  const products = await service.find({ userID: userID });
  return products;
};

export default Object.assign(service, {
  getUserBasket,
});
