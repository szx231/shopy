import multer from '@koa/multer';
import path from 'path';
import { Next, AppKoaContext, AppRouter } from 'types';
import { productService } from 'resources/products';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { name, price } = ctx.request.body;
  const { file } = ctx.request;

  const fileExt = path.extname(file.originalname).toLowerCase();
  const fileName = `${user._id}-${Date.now()}${fileExt}`;

  // Переименовываем файл с расширением
  const filePath = path.join('uploads', fileName);
  fs.renameSync(file.path, filePath);

  // Возвращаем путь до файла на клиент
  const fileUrl = `uploads/${fileName}`;

  await productService.createProduct({
    name,
    price: Number(price) * 100,
    imageLink: fileUrl,
    status: 'On sale',
    productOwnerID: user._id,
  });

  ctx.body = {
    message: 'successfully',
    filePath: fileUrl,
  };
}

export default (router: AppRouter) => {
  router.post('/add', upload.single('file'), validator, handler);
};
