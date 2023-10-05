import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import { productService } from 'resources/products';

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

  const allProducts = await productService.getYourProducts(user._id);

  ctx.body = {
    ...allProducts,
    results: allProducts.results.slice(startIndex, endIndex),
  };
}

export default (router: AppRouter) => {
  router.get('/your-products', validateMiddleware(schema), handler);
};
