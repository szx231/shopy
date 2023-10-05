import { useQuery } from 'react-query';

import { apiService } from 'services';
import { OrderTypes } from '.';

export function useGetOrder(page: number, options?: {}) {
  const getOrder = () => apiService.get(`/order/list?page=${page}`);

  return useQuery<OrderTypes.ResponseTypes>(['OrderList'], getOrder, options);
}
