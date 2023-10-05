import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import { productService } from 'resources/products';
import { basketService } from 'resources/basket';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']),
    })
    .default({ createdOn: 'desc' }),
  filter: z
    .object({
      createdOn: z
        .object({
          sinceDate: z.string(),
          dueDate: z.string(),
        })
        .nullable()
        .default(null),
    })
    .nullable()
    .default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<any>) {
  const { page } = ctx.query;
  const { user } = ctx.state;
  const limitItem = 17;
  const startIndex = !page ? 0 : (Number(page) - 1) * limitItem;
  const endIndex = startIndex + limitItem;

  const userBasket = await basketService.getUserBasket(user._id);

  if (userBasket.results.length === 0) {
    return (ctx.body = {
      ...userBasket,
      results: [],
    });
  }

  const arrayOfIndexesProductsInBasket = userBasket.results[0].productsID;

  const quantityProductsInBasketArray = Object.values(userBasket.results[0].productsID);

  if (Object.keys(arrayOfIndexesProductsInBasket).length === 0) {
    return (ctx.body = {
      ...userBasket,
      results: [],
    });
  }

  const productsInUserBasket = await Promise.all(Object.keys(arrayOfIndexesProductsInBasket).map((productID) => productService.getProductInBasket(productID)));

  const basketResult = [].concat(...productsInUserBasket.map((product) => product.results));

  const basketResultWithQuantity = basketResult.map((product, index) => ({
    ...product,
    quantity: quantityProductsInBasketArray[index],
  }));

  ctx.body = {
    productsCount: basketResultWithQuantity.length,
    ...userBasket,
    results: basketResultWithQuantity.slice(startIndex, endIndex),
  };
}

export default (router: AppRouter) => {
  router.get('/list', validateMiddleware(schema), handler);
};
