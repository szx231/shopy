import {  AppKoaContext, AppRouter } from 'types';
import Stripe from 'stripe';
import { productService } from 'resources/products';
import { basketService } from 'resources/basket';
import { userService } from 'resources/user';
import config from 'config';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const stripe = new Stripe(
    process.env.STRIPE_KEY,
  );

  const userBasket = await basketService.getUserBasket(user._id);

  const arrayOfIndexesProductsInBasket = userBasket.results[0].productsID;

  const quantityProductsInBasketArray = Object.values(userBasket.results[0].productsID);

  if (Object.keys(arrayOfIndexesProductsInBasket).length === 0) {
    return (ctx.body = {
      ...userBasket,
      results: [],
    });
  }

  const productsInUserBasket = await Promise.all(
    Object.keys(arrayOfIndexesProductsInBasket).map((productID) => productService.getProductInBasket(productID))
  );

  const basketResult = [].concat(...productsInUserBasket.map((product) => product.results));

  const basketResultWithQuantity = basketResult.map((product, index) => ({
    ...product,
    quantity: quantityProductsInBasketArray[index],
  }));

  const transformBasketItemsToStripeShame = basketResultWithQuantity.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`${process.env.SERVER_IP}/${item.imageLink}`],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const orderCustomer = await userService.find({ _id: user._id });

  const session = await stripe.checkout.sessions.create({
    line_items: transformBasketItemsToStripeShame,
    mode: 'payment',
    customer_email: orderCustomer.results[0].email,
    success_url: `${config.WEB_URL}/payment-completed?success=true&session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.WEB_URL}/payment-completed?canceled=true`,
  });

  ctx.redirect(session.url);

  ctx.body = {
    message: 'successfully',
  };
}

export default (router: AppRouter) => {
  router.post('/pay', handler);
};
