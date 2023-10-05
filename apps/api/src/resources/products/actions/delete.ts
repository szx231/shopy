import { AppKoaContext, AppRouter, Next } from 'types';
import { productService } from 'resources/products';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  console.log('b1');
  const isUserExists = await productService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isUserExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  console.log('bb');
  await productService.deleteSoft({ _id: ctx.request.params.id });

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/delete/:id', validator, handler);
};
