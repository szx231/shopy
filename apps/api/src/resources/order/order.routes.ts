import { routeUtil } from 'utils';

import paymentResult from './actions/payment-result';
import list from './actions/list';

const publicRoutes = routeUtil.getRoutes([paymentResult]);

const privateRoutes = routeUtil.getRoutes([paymentResult, list]);

const adminRoutes = routeUtil.getRoutes([paymentResult, list]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
