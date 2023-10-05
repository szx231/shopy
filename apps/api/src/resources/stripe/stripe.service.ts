import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './stripe.schema';
import { Basket } from './stripe.types';

const service = db.createService<any>(DATABASE_DOCUMENTS.STRIPE, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});
export default Object.assign(service, {});
