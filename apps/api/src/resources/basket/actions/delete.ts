import multer from '@koa/multer';
import path from 'path';
import fs from 'fs';
import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import { userSchema, userService } from 'resources/user';
import { basketService } from 'resources/basket';
import { productService } from 'resources/products';
import { tokenService } from 'resources/token';
import mime from 'mime';
const upload = multer({ dest: 'uploads/' });

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { id } = ctx.params;
  const filter = { userID: user._id };

  const updateBasket = (doc: any) => {
    const { [id]: _, ...productsIDWithoutID } = doc.productsID;

    return {
      ...doc,
      productsID: productsIDWithoutID,
    };
  };

  await basketService.updateOne(filter, updateBasket);

  ctx.body = {
    message: 'File saved successfully',
  };
}

export default (router: AppRouter) => {
  router.delete('/delete/:id', handler);
};
