import { Next, AppKoaContext, AppRouter } from 'types';
import { basketService } from 'resources/basket';
import { z } from 'zod';

const schema = z.object({
  productID: z.string(),
  newValue: z.number()
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext, next: Next) {
  const { productID, newValue } = ctx.request.body as ValidatedData;

  ctx.assertClientError(productID, { global: 'File cannot be empty' });
  ctx.assertClientError(newValue, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { productID, newValue } = ctx.request.body as ValidatedData;

  const filter = { userID: user._id };

  const updateProductQuantity = (doc: any) => {
    return {
      ...doc,
      productsID: {
        ...doc.productsID,
        [productID]: newValue,
      },
    };
  };

  await basketService.updateOne(filter, updateProductQuantity);

  ctx.body = {
    message: 'File saved successfully',
  };
}

export default (router: AppRouter) => {
  router.post('/changeQuantity', validator, handler);
};
