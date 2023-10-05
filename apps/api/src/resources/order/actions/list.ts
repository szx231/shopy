import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { orderService } from 'resources/order';
import { productService } from 'resources/products';
import { z } from 'zod';

const schema = z.object({
  page: z.string().transform(Number).default('0'),
});

type ValidatedData = z.infer<typeof schema>;


async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { page } = ctx.query;
  console.log(ctx.query, 'ctx.query');

  const { user } = ctx.state;
  const limitItem = 16;
  const startIndex = !Number(page) ? 0 : (Number(page) - 1) * limitItem;
  const endIndex = startIndex + limitItem;

  const order = await orderService.find({ userID: user._id });
  console.log(order, 'order');

  const listProductsOnOrderID = order.results.flatMap(product => {
    return Object.entries(product.productsID).flatMap(([id, qty]) => {
      return Array(qty).fill(id);
    });
  });
  console.log(listProductsOnOrderID, 'listProductsOnOrderID');

  const productsInOrder = await Promise.all([].concat(...listProductsOnOrderID).map(async (id) => {
    return productService.find({ _id: id });
  }));

  ctx.body = {
    count: productsInOrder.reduce((acc, product) => acc + product.count, 0),
    results: productsInOrder.map((product) => ({ ...product.results[0], orderTime: order.results[0].createdOn })),
  };
}

export default (router: AppRouter) => {
  router.get('/list', validateMiddleware(schema), handler);
};
