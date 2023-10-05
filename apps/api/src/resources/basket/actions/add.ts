import { Next, AppKoaContext, AppRouter } from 'types';
import { basketService } from 'resources/basket';
import { z } from 'zod';

const schema = z.object({
  productID: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext, next: Next) {
  const { productID } = ctx.request.body as ValidatedData;

  ctx.assertClientError(productID, { global: 'productID not found' });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { productID } = ctx.request.body as ValidatedData;

  const filter = { userID: user._id };

  const userBasket = await basketService.find(filter);

  if (userBasket) {
    const updateYourProducts = (doc: any) => {
      const basketIncludesProduct = Object.keys(doc.productsID).includes(productID);

      if (!basketIncludesProduct) {
        return {
          ...doc,
          productsID: { ...doc.productsID, [productID]: 1 },
        };
      }

      if (basketIncludesProduct) {
        const { [productID]: _, ...productsIDWithoutID } = doc.productsID;

        return {
          ...doc,
          productsID: productsIDWithoutID,
        };
      }
    };

    await basketService.updateOne(filter, updateYourProducts);
  }

  if (!userBasket.count) {
    const basket = { userID: user._id, productsID: { [productID]: 1 } };
    await basketService.insertOne(basket);
  }

  ctx.body = {
    message: 'File saved successfully',
  };
}

export default (router: AppRouter) => {
  router.post('/toggle', validator, handler);
};
