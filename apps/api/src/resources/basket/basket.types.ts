import { z } from 'zod';

import schema from './basket.schema';

export type Basket = z.infer<typeof schema>;
