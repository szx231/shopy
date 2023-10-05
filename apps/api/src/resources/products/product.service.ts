import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './product.schema';
import { Product } from './product.types';

const service = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const getYourProducts = async (userID: string) => {
  const products = await service.find({ productOwnerID: userID });
  return products;
};

const getMarketplaceProducts = async (userID: string) => {
  const products = await service.find({ productOwnerID: { $ne: userID } });
  return products;
};

const getProductInBasket = async (productID: string) => {
  const product = await service.find({ _id: productID });

  return product;
};

const detleteProduct = async (id: string) => {
  await service.deleteOne({ _id: id });
};

const createProduct = async (product: any) => {
  const { name, price, imageLink, status, productOwnerID } = product;

  return service.insertOne({
    name,
    price,
    imageLink,
    status,
    productOwnerID,
  });
};

export default Object.assign(service, {
  createProduct,
  getYourProducts,
  detleteProduct,
  getMarketplaceProducts,
  getProductInBasket,
});
