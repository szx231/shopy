import { z } from 'zod';

import schema from './stripe.schema';

export type Basket = z.infer<typeof schema>;
