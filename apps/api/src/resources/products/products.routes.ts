import { routeUtil } from 'utils';

import yourProducts from './actions/your-products';
import add from './actions/add';
import _delete from './actions/delete';
import marketplace from './actions/marketplace';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([yourProducts, add, _delete, marketplace]);

const adminRoutes = routeUtil.getRoutes([yourProducts, add, _delete, marketplace]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
