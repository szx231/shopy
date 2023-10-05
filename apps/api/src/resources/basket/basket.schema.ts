import { z } from 'zod';

const schema = z
  .object({
    _id: z.string(),
    userID: z.string(),
    productsID: z.record(z.number()),
    createdOn: z.date(),
    updatedOn: z.date(),
  })
  .strict();

export default schema;
