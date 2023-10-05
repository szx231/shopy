import { routeUtil } from 'utils';

import pay from './actions/pay';

const publicRoutes = routeUtil.getRoutes([pay]);

const privateRoutes = routeUtil.getRoutes([pay]);

const adminRoutes = routeUtil.getRoutes([pay]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
