import { z } from 'zod';

const schema = z
  .object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    imageLink: z.string(),
    createdOn: z.date(),
    updatedOn: z.date(),
    status: z.string(),
    productOwnerID: z.string(),
    inBasket: z.boolean().optional(),
  })
  .strict();

export default schema;
