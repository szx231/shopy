import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './orderschema';
import { Payment } from './order.types';

const service = db.createService<Payment>(DATABASE_DOCUMENTS.ORDER, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const createOrder = (basket) => {
  return service.insertOne({ ...basket });
};

export default Object.assign(service, {
  createOrder,
});
