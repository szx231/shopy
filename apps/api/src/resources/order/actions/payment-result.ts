import { Next, AppKoaContext, AppRouter } from 'types';
import Stripe from 'stripe';
import { basketService } from 'resources/basket';
import orderService from '../order.service';
import { z } from 'zod';

const schema = z.object({
  sessionID: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext, next: Next) {
  const { sessionID } = ctx.request.body as ValidatedData;

  ctx.assertClientError(sessionID, { global: 'sessionID required' });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { sessionID } = ctx.request.body as ValidatedData;

  const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2023-08-16',
  });

  const session = await stripe.checkout.sessions.retrieve(sessionID);

  const userBasket = await basketService.find({ userID: user._id });

  const basket = userBasket.results[0];

  const newOrder = {
    userID: basket.userID,
    sessionID,
    paymentStatus: session.payment_status,
    productsID: basket.productsID,
  };

  await orderService.createOrder(newOrder);

  await basketService.deleteOne({ userID: user._id });

  ctx.body = {
    paymentStatus: 'session.payment_status',
  };
}

export default (router: AppRouter) => {
  router.post('/payment-result', validator,  handler);
};
