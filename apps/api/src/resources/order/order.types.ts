import { z } from 'zod';

import schema from './orderschema';

export type Payment = z.infer<typeof schema>;
