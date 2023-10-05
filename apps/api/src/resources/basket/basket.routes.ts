import { routeUtil } from 'utils';

import add from './actions/add';
import list from './actions/list';
import changeQuantity from './actions/changeQuantity';
import _delete from './actions/delete';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([add, list, changeQuantity, _delete]);

const adminRoutes = routeUtil.getRoutes([add, list, changeQuantity, _delete]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
