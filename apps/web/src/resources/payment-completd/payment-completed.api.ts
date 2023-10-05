import { useQuery, useMutation } from 'react-query';
import { apiService } from 'services';
import { MarketplaceTypes } from '.';
import queryClient from 'query-client';

export function useCheckPayment<T>() {
  const checkPayment = (data: T) => apiService.post('/order/payment-result', data);

  return useMutation<any, unknown, T>(checkPayment, {
    onSuccess: (data) => {
      queryClient.setQueryData(['payment-completed'], data);
    },
  });
}
