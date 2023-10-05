import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import { productService } from 'resources/products';
import { basketService } from 'resources/basket';
import { query } from 'winston';

const schema = z.object({
  page: z.string().transform(Number).default('0'),
  sortBy: z.string().default('newest'),
  fromPrice: z.string().transform(Number).default('0'),
  toPrice: z.string().transform(Number).default('0'),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { page, sortBy, fromPrice, toPrice, searchValue } = ctx.query;
  console.log(ctx.query, 'ctx.query');

  const { user } = ctx.state;
  const limitItem = 16;
  const startIndex = !Number(page) ? 0 : (Number(page) - 1) * limitItem;
  const endIndex = startIndex + limitItem;

  console.log(startIndex, endIndex);

  const basket = await basketService.find({ userID: user._id });

  const listProductsOnBasket = basket?.results[0]?.productsID;
  const getPriceFilter = (fromPrice: number, toPrice: number) => {
    if (!fromPrice && !toPrice) {
      return {};
    } else if (fromPrice && toPrice) {
      return { price: { $gte: fromPrice, $lte: toPrice } };
    } else if (fromPrice) {
      return { price: { $gte: fromPrice } };
    } else {
      return { price: { $lte: toPrice } };
    }
  };

  const priceFilter = getPriceFilter(+fromPrice, +toPrice);

  const queryMongo = [
    {
      $match: {
        name: { $regex: searchValue, $options: 'i' },
        productOwnerID: { $ne: user._id },
        ...priceFilter,
      },
    },
    {
      $facet: {
        count: [{ $count: 'totalCount' }],
        results: [
          { $sort: { createdOn: sortBy === 'newest' ? -1 : 1 } },
          { $skip: startIndex },
          { $limit: endIndex - startIndex },
        ],
      },
    },
  ];

  const allProducts = await productService.aggregate(queryMongo);

  if (allProducts[0].results.length === 0) {
    return (ctx.body = {
      count: 0,
      results: allProducts[0].results,
    });
  }

  if (!listProductsOnBasket) {
    return (ctx.body = {
      count: allProducts[0].count[0].totalCount,
      results: allProducts[0].results,
    });
  }

  ctx.body = {
    count: allProducts[0].count[0].totalCount,
    results: allProducts[0].results.map((product) => {
      return { ...product, inBasket: Object.keys(listProductsOnBasket).includes(product._id) ? true : false };
    }),
  };
}

export default (router: AppRouter) => {
  router.get('/marketplace', validateMiddleware(schema), handler);
};
